/**
 * Settings Panel Module
 * Creates and manages the main settings UI
 */

import { WebI18n, t, _i18nResolve } from '../core/i18n.js';
import { NewAlert } from '../core/api.js';
import { upgradeAllSelects, refreshAllSelects } from '../core/ui/select.ts';
import { attachColorPreviews, refreshAllColorPreviews } from './colorPreview.ts';
import { openImportExportDialog } from './importExport.ts';
import { openNavbarLayoutDialog } from '../features/navbar.ts';
import { openSnippetPanel, openSnippetManager } from '../features/snippets.ts';
import { injectDiscussionInterceptor, injectDiscussionEditInterceptor, injectGroupCreateInterceptor } from '../features/vditor.ts';
import { injectRankTag, clearRankTags, pushMyTag, scheduleRankTag, injectUserHomeTag, isUserHomePage } from '../features/customTag.ts';
import { syncAutoSaveCode } from '../features/autoSave.ts';
import { initAllTools, setSettingsPanel } from '../features/tools.ts';
import { applySmoothClasses, injectCss } from '../styles/index.ts';
import { applyBackground } from '../styles/background.ts';
import { saveConfig, loadConfig, Config, CONFIG_GROUPS } from '../core/config.js';
import { GM_setClipboard } from '../core/storage.js';
import { VERSION_INFO } from '../version.js';

let settingsPanel: HTMLElement | null = null;
/** 当前生效的配置（供无参创建时复用） */
let _panelConfig: Config | null = null;
let _rankTagDebounce: number | null = null;

export function createSettingsPanel(config: Config): HTMLElement {
  _panelConfig = config;
  const p = document.createElement('div');
  p.id = 'hoj-settings-panel';
  p.innerHTML = getSettingsPanelHTML();
  p.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')!;
    (el as HTMLElement).textContent = t(key);
  });

  /* ---------- Fullscreen toggle ---------- */
  const fsToggle = p.querySelector('#hoj-fullscreen-toggle') as HTMLInputElement;
  if (fsToggle) {
    fsToggle.checked = !!config.SettingsFullscreen;
    fsToggle.addEventListener('change', () => {
      config.SettingsFullscreen = fsToggle.checked;
      saveConfig(config);
      applySettingsPanelFullscreen();
    });
  }

  document.body.appendChild(p);
  upgradeAllSelects(p);
  WebI18n.apply(p);

  WebI18n.onChange(() => {
    if (p.isConnected) WebI18n.apply(p);
  });

  initVersionCopy(p);
  bindSettingsEvents(p, config);
  enablePanelDrag(p);
  attachColorPreviews(p, config);

  settingsPanel = p;
  setSettingsPanel(p);
  return p;
}

function getSettingsPanelHTML(): string {
  return `
<div class="hoj-panel-header">
    <span class="hoj-panel-title" data-i18n="panel.title">Better HOJ</span>
    <button id="hoj-import-export-btn" type="button" class="hoj-mini-btn" data-i18n="panel.importExport">导入导出</button>
    <button id="hoj-close" type="button" class="hoj-mini-btn" data-i18n="panel.close">关闭</button>
</div>
<div class="hoj-panel-body">

<!-- ==================== Better HOJ 27 ==================== -->
<div class="hoj-section" data-level="1">
    <button type="button" class="hoj-section-header">
        <i class="hoj-section-arrow el-icon-arrow-down"></i>
        <span class="hoj-section-title" data-i18n="better.title">Better HOJ 27 设置 by longStone</span>
    </button>
    <div class="hoj-section-body">

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.login">自动登录</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="login.enable">启用自动登录</span><input type="checkbox" data-key="AutoLogin"></div>
                <div class="hoj-row"><span data-i18n="login.username">默认用户名</span><input type="text" data-key="DefaultUsername"></div>
                <div class="hoj-row"><span data-i18n="login.password">默认密码</span><input type="password" data-key="DefaultPassword"></div>
                <div class="hoj-row" style="flex-wrap:wrap;gap:6px;">
                    <button id="hoj-login-manual" type="button" class="hoj-mini-btn" data-i18n="login.manual">手动登录</button>
                    <button id="hoj-logout-manual" type="button" class="hoj-mini-btn" data-i18n="login.clear">清除登录状态</button>
                </div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.problemTools">题目工具</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row">
                    <span data-i18n="cph.realurl">使用真链接（CF）</span>
                    <input type="checkbox" data-key="realCPHurl">
                </div>
                <div class="hoj-row">
                    <span data-i18n="autosave.enable">启用自动保存</span>
                    <input type="checkbox" data-key="AutoSaveCode">
                </div>
                <div class="hoj-row">
                    <span data-i18n="autosave.interval">保存频率</span>
                    <select data-key="AutoSaveCodeInterval">
                        <option value="15" data-i18n="autosave.15">15 秒</option>
                        <option value="30" data-i18n="autosave.30">30 秒</option>
                        <option value="60" data-i18n="autosave.60">1 分钟</option>
                        <option value="120" data-i18n="autosave.120">2 分钟</option>
                        <option value="300" data-i18n="autosave.300">5 分钟</option>
                    </select>
                </div>
                <div class="hoj-row" style="flex-wrap:wrap;gap:6px;">
                    <button id="hoj-clear-favorites" type="button" class="hoj-mini-btn" data-i18n="fav.clear">清空所有收藏</button>
                </div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.redirect">重定向</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="redirect.enable">启用重定向</span><input type="checkbox" data-key="EnableRedirect"></div>
                <div class="hoj-row"><span data-i18n="redirect.target">重定向目标</span>
                    <select data-key="AutoRedirectHost">
                        <option value="ssf.hdoi.cn" data-i18n="redirect.host1">ssf.hdoi.cn（外网）</option>
                        <option value="oi.cnuschool.org.cn" data-i18n="redirect.host2">oi.cnuschool.org.cn（内网）</option>
                        <option value="172.16.21.199" data-i18n="redirect.host3">172.16.21.199（内网 IP）</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.checkin">每日签到</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="checkin.enable">启用签到</span><input type="checkbox" data-key="CheckInEnabled"></div>
                <div class="hoj-row"><span data-i18n="checkin.popup">签到后自动弹窗</span><input type="checkbox" data-key="CheckInAutoPopup"></div>
                <div class="hoj-row"><span data-i18n="checkin.luck">今日运势</span><span id="hoj-checkin-luck" style="font-weight:600;">…</span></div>
                <div class="hoj-row" style="flex-wrap:wrap;">
                    <button id="hoj-checkin-do" type="button" class="hoj-mini-btn" data-i18n="checkin.do">立即签到</button>
                    <button id="hoj-checkin-refresh" type="button" class="hoj-mini-btn" data-i18n="checkin.refresh">刷新状态</button>
                </div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.tag">个人标签</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="tag.text">标签文字</span><input type="text" data-key="CustomRankTag"></div>
                <div class="hoj-row"><span data-i18n="tag.color">标签颜色</span><input type="text" data-key="CustomRankTagColor" placeholder="#18BE6A"></div>
                <div class="hoj-row" style="flex-wrap:wrap;gap:6px;">
                    <button id="hoj-tag-refresh" type="button" class="hoj-mini-btn" data-i18n="tag.refresh">刷新云端标签</button>
                    <button id="hoj-tag-push" type="button" class="hoj-mini-btn" data-i18n="tag.push">重新上传当前标签</button>
                    <button id="hoj-tag-delete" type="button" class="hoj-mini-btn" data-i18n="tag.delete">清除云端标签</button>
                </div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.tools">小组件</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="tools.enable">启用小组件</span><input type="checkbox" data-key="ToolsEnabled"></div>
                <div class="hoj-row"><span data-i18n="tools.keystroke">按键显示</span><input type="checkbox" data-key="ToolsKeystroke"></div>
                <div class="hoj-row"><span data-i18n="tools.time">今日使用时长</span><input type="checkbox" data-key="ToolsPageTime"></div>
                <div class="hoj-row"><span data-i18n="tools.clock">时钟</span><input type="checkbox" data-key="ToolsClock"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.rec">题目推荐</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="rec.cfname">Codeforces 用户名</span><input type="text" data-key="hdnoipCFName"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.vditor">Vditor</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row">
                    <span data-i18n="vditor.publishOverride">讨论发布覆盖</span>
                    <input type="checkbox" data-key="VditorDiscussionPublish">
                </div>
                <div class="hoj-row">
                    <span data-i18n="vditor.editOverride">讨论编辑覆盖</span>
                    <input type="checkbox" data-key="VditorDiscussionEdit">
                </div>
                <div class="hoj-row">
                    <span data-i18n="vditor.groupCreateOverride">创建团队覆盖</span>
                    <input type="checkbox" data-key="VditorGroupCreate">
                </div>
                <div class="hoj-row">
                    <span data-i18n="vditor.uploadMode">图片 / 文件上传</span>
                    <select data-key="VditorUploadMode">
                        <option value="disabled" data-i18n="vditor.uploadModeDisabled"></option>
                        <option value="admin" data-i18n="vditor.uploadModeAdmin"></option>
                        <option value="group" data-i18n="vditor.uploadModeGroup"></option>
                    </select>
                </div>
                <div class="hoj-row" id="hoj-vditor-gid-row" style="display:none;">
                    <span data-i18n="vditor.uploadGid">团队 ID</span>
                    <input type="text" data-key="VditorUploadGid" placeholder="114514">
                </div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.vscode">VS Code 编辑器</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row">
                    <span data-i18n="vscode.enable">启用 VS Code 编辑器</span>
                    <input type="checkbox" data-key="VSCodeEditor">
                </div>
                <div class="hoj-row">
                    <span data-i18n="vscode.theme">主题</span>
                    <select data-key="VSCodeTheme">
                        <option value="monokai">Monokai（深色）</option>
                        <option value="molarized light">Molarized Light（浅色）</option>
                        <option value="material">Material（深色）</option>
                        <option value="idea">IDEA（浅色）</option>
                        <option value="eclipse">Eclipse（浅色）</option>
                        <option value="base16-dark">Base16-dark（深色）</option>
                        <option value="cobalt">Cobalt（深色）</option>
                        <option value="dracula">Dracula（深色）</option>
                    </select>
                </div>
                <div class="hoj-row">
                    <span data-i18n="vscode.fontSize">字体大小</span>
                    <select data-key="VSCodeFontSize">
                        <option value="12">12px</option>
                        <option value="14">14px</option>
                        <option value="16">16px</option>
                        <option value="18">18px</option>
                        <option value="20">20px</option>
                    </select>
                </div>
                <div class="hoj-row">
                    <span data-i18n="vscode.tabSize">Tab 长度</span>
                    <select data-key="VSCodeTabSize">
                        <option value="2">2 个空格</option>
                        <option value="4">4 个空格</option>
                        <option value="8">8 个空格</option>
                    </select>
                </div>
                <div class="hoj-row" style="flex-wrap:wrap;gap:6px;">
                    <button id="hoj-vscode-settings-btn" type="button" class="hoj-mini-btn" data-i18n="vscode.openDialog">打开编辑器设置</button>
                </div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.navbar">菜单栏</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row" style="flex-wrap:wrap;gap:6px;">
                    <button id="hoj-navbar-layout-btn" type="button" class="hoj-mini-btn" data-i18n="navbar.config">配置菜单栏布局</button>
                </div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.snippet">片段</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row">
                    <span data-i18n="snippet.hotkey">唤出面板快捷键</span>
                    <input type="text" data-key="SnippetPanelHotkey" readonly style="cursor:pointer;">
                </div>
                <div class="hoj-row" style="flex-wrap:wrap;gap:6px;">
                    <button id="hoj-snippet-manage-btn" type="button" class="hoj-mini-btn" data-i18n="snippet.manage">管理片段</button>
                    <button id="hoj-snippet-open-btn" type="button" class="hoj-mini-btn" data-i18n="snippet.open">打开片段面板</button>
                </div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="better.about">关于</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="about.showVersion">显示版本信息</span><input type="checkbox" data-key="ShowVersion"></div>
                <div class="hoj-row">
                    <span data-i18n="perf.enable">高性能模式</span>
                    <input type="checkbox" data-key="PerfMode">
                </div>
                <div class="hoj-row" style="padding-left:6px;">
                    <span data-i18n="perf.hint" style="font-size:11px;opacity:.6;white-space:normal;line-height:1.5;">关闭弹窗淡出动画与背景模糊，低性能设备上更流畅</span>
                </div>
                <div class="hoj-row hoj-version-row" id="hoj-version-row" title="">
                    <span data-i18n="about.version">版本</span>
                    <span class="hoj-version-text">${VERSION_INFO.name} (${VERSION_INFO.version})</span>
                </div>
            </div>
        </div>

    </div>
</div>

<!-- ==================== Smart HOJ 27 ==================== -->
<div class="hoj-section" data-level="1">
    <button type="button" class="hoj-section-header">
        <i class="hoj-section-arrow el-icon-arrow-down"></i>
        <span class="hoj-section-title" data-i18n="smart.title">Smart HOJ 27 设置 by OIerZhang</span>
    </button>
    <div class="hoj-section-body">
        <div class="hoj-row"><span data-i18n="smart.enable">启用 Smart HOJ</span><input type="checkbox" data-key="Open"></div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.general">通用</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="general.smoothScroll">平滑滚动</span><input type="checkbox" data-key="SmoothScroll"></div>
                <div class="hoj-row"><span data-i18n="general.smoothSwitch">平滑的页面过渡</span><input type="checkbox" data-key="SmoothSwitch"></div>
                <div class="hoj-row"><span data-i18n="general.dark">深色模式</span><input type="checkbox" data-key="DarkMode"></div>
                <div class="hoj-row" id="hoj-mouse-glow-row" style="display:none;"><span data-i18n="general.mouseGlow">鼠标光晕（需要重新加载）</span><input type="checkbox" data-key="MouseGlow"></div>
                <div class="hoj-row"><span data-i18n="general.liquidGlass">液态玻璃 UI</span><input type="checkbox" data-key="LiquidGlassUI"></div>
                <div class="hoj-row"><span data-i18n="general.better404">更好的 404 页面</span><input type="checkbox" data-key="BetterNotFound"></div>
                <div class="hoj-row"><span data-i18n="general.hideNew">隐藏体验新版</span><input type="checkbox" data-key="HideNewHOJ"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.background">背景</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="bg.source">内置背景来源</span>
                    <select data-key="ImageSource">
                        <option value="Source1">Source1</option>
                        <option value="Source2">Source2</option>
                        <option value="Source3">Source3</option>
                        <option value="Source4">Source4</option>
                    </select>
                </div>
                <div class="hoj-row"><span data-i18n="bg.builtin">内置背景</span>
                    <select data-key="BuiltinBackground">
                        <option value="Custom">Custom</option>
                        <option value="Classic">Classic</option>
                        <option value="BigSur">BigSur</option>
                        <option value="Monterey">Monterey</option>
                        <option value="Ventura">Ventura</option>
                        <option value="Sonoma">Sonoma</option>
                        <option value="Sequoia">Sequoia</option>
                        <option value="Tahoe">Tahoe</option>
                        <option value="GoldenGate">GoldenGate</option>
                        <option value="Twilight">Twilight</option>
                        <option value="Sunset">Sunset</option>
                        <option value="Mojave">Mojave</option>
                        <option value="Catalina">Catalina</option>
                    </select>
                </div>
                <div class="hoj-row"><span data-i18n="bg.custom">自定义背景 URL</span><input type="text" data-key="CustomBackground" placeholder="None"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.card">卡片</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="card.bg">卡片背景</span><input type="text" data-key="CardBackground" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="card.blur">卡片模糊</span><input type="text" data-key="CardBlurRadius" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="card.radius">卡片圆角</span><input type="text" data-key="CardRadius" placeholder="Default"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.list">列表</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="list.bg">列表背景</span><input type="text" data-key="ListBackground" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="list.bgGreen">列表背景绿</span><input type="text" data-key="ListBackgroundGreen" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="list.bgHover">列表 hover</span><input type="text" data-key="ListBackgroundHover" placeholder="Default"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.code">代码块</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="code.bg">代码块背景</span><input type="text" data-key="CodeBlockBackground" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="code.radius">代码块圆角</span><input type="text" data-key="CodeBlockRadius" placeholder="Default"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.input">输入框</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="input.bg">输入框背景</span><input type="text" data-key="InputAreaBackground" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="input.radius">输入框圆角</span><input type="text" data-key="InputAreaRadius" placeholder="Default"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.button">按钮</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="button.bg">按钮背景</span><input type="text" data-key="ButtonBackground" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="button.hover">按钮 hover</span><input type="text" data-key="ButtonBackgroundHover" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="button.active">按钮 active</span><input type="text" data-key="ButtonBackgroundActive" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="button.radius">按钮圆角</span><input type="text" data-key="ButtonRadius" placeholder="Default"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.misc">其他</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="misc.tagRadius">Tag 圆角</span><input type="text" data-key="TagRadius" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="misc.tooltipBg">提示框背景</span><input type="text" data-key="TooltipBackground" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="misc.tooltipRadius">提示框圆角</span><input type="text" data-key="TooltipRadius" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="misc.judgeRadius">评测色块圆角</span><input type="text" data-key="JudgeDetailBlockRadius" placeholder="Default"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.text">文字</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="text.dark">深色文字</span><input type="text" data-key="TextDark" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="text.darkDisabled">禁用文字</span><input type="text" data-key="TextDarkDisabled" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="text.light">浅色文字</span><input type="text" data-key="TextLight" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="text.blue">蓝色文字</span><input type="text" data-key="TextBlue" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="text.link">链接颜色</span><input type="text" data-key="TextLink" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="text.select">选中文字背景</span><input type="text" data-key="SelectText" placeholder="Default"></div>
            </div>
        </div>

        <div class="hoj-section collapsed" data-level="2">
            <button type="button" class="hoj-section-header">
                <i class="hoj-section-arrow el-icon-arrow-down"></i>
                <span class="hoj-section-title" data-i18n="smart.font">字体</span>
            </button>
            <div class="hoj-section-body">
                <div class="hoj-row"><span data-i18n="font.memorizing">易于记忆的字体</span><input type="checkbox" data-key="MemorizingFont"></div>
                <div class="hoj-row"><span data-i18n="font.sans">无衬线字体</span><input type="text" data-key="SansFont" placeholder="Default"></div>
                <div class="hoj-row"><span data-i18n="font.mono">等宽字体</span><input type="text" data-key="MonoFont" placeholder="Default"></div>
            </div>
        </div>

    </div>
</div>

</div>

<div class="hoj-panel-footer">
    <label class="hoj-footer-fullscreen">
        <input type="checkbox" id="hoj-fullscreen-toggle">
        <span data-i18n="panel.fullscreen">全屏显示</span>
    </label>
</div>
`;
}

function initVersionCopy(p: HTMLElement): void {
  const row = p.querySelector('#hoj-version-row');
  if (!row) return;

  const textEl = row.querySelector('.hoj-version-text');
  const setTitle = () => row.setAttribute('title', t('about.copyVersionHint'));
  setTitle();
  WebI18n.onChange(() => { if (row.isConnected) setTitle(); });

  row.style.cursor = 'pointer';
  row.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const versionStr = `${VERSION_INFO.name} (${VERSION_INFO.version})`;
    const done = () => {
      NewAlert(t('about.copied', { v: versionStr }), 'success', 1500);
      const oldBg = row.style.background;
      row.style.transition = 'background .15s';
      row.style.background = 'rgba(64, 158, 255, .12)';
      setTimeout(() => { row.style.background = oldBg; }, 300);
    };
    try {
      if (typeof GM_setClipboard === 'function') { GM_setClipboard(versionStr); done(); return; }
      if (navigator.clipboard?.writeText) { navigator.clipboard.writeText(versionStr).then(done).catch(() => fallbackCopy(versionStr, done)); return; }
    } catch {}
    fallbackCopy(versionStr, done);
  });

  function fallbackCopy(str: string, cb: () => void): void {
    const ta = document.createElement('textarea');
    ta.value = str;
    ta.style.cssText = 'position:fixed;left:-9999px;top:0;';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); cb(); }
    catch (err) { NewAlert(t('about.copyFailed'), 'error'); }
    finally { document.body.removeChild(ta); }
  }
}

function bindSettingsEvents(p: HTMLElement, config: Config): void {
  // Generic config binding
  p.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key')! as keyof Config;
    const input = el as HTMLInputElement | HTMLSelectElement;
    if (input.type === 'checkbox') input.checked = !!config[key];
    else input.value = config[key] as string ?? '';
    input.addEventListener('change', () => handleConfigChange(input, key, config));
  });

  // Section header click handlers for accordion toggle
  p.querySelectorAll('.hoj-section-header').forEach(header => {
    header.addEventListener('click', () => {
      const section = header.closest('.hoj-section');
      if (section) section.classList.toggle('collapsed');
    });
  });

  // Specific button handlers
  bindClick(p, '#hoj-close', () => p.classList.remove('open'));
  bindClick(p, '#hoj-import-export-btn', () => openImportExportDialog(config));
  bindClick(p, '#hoj-login-manual', () => import('../features/autoLogin.ts').then(m => m.manualLogin(config)));
  bindClick(p, '#hoj-logout-manual', () => import('../features/autoLogin.ts').then(m => m.clearLoginState()));
  bindClick(p, '#hoj-clear-favorites', async () => {
    const { NewDialog } = await import('../core/api.js');
    const ok = await NewDialog({ title: '@fav.clearConfirm.title', content: '@fav.clearConfirm.body', type: 'warning' });
    if (ok) { import('../features/favorites.ts').then(m => m.clearAllFavorites()); }
  });
  bindClick(p, '#hoj-checkin-do', () => import('../features/checkIn.ts').then(m => m.doCheckIn(config)));
  bindClick(p, '#hoj-checkin-refresh', () => import('../features/checkIn.ts').then(m => m.refreshCheckInStatus()));
  bindClick(p, '#hoj-tag-refresh', () => import('../features/customTag.ts').then(m => m.refreshTag(config)));
  bindClick(p, '#hoj-tag-push', () => import('../features/customTag.ts').then(m => m.pushMyTag(config)));
  bindClick(p, '#hoj-tag-delete', async () => {
    const { NewDialog, NewAlert } = await import('../core/api.js');
    const ok = await NewDialog({
      title: '清除云端标签',
      content: '确定要删除你在云端保存的个人标签吗？',
      type: 'warning'
    });
    if (!ok) return;
    const m = await import('../features/customTag.ts');
    const r = await m.deleteMyTag(config);
    NewAlert(r.success ? r.message : '删除失败：' + r.message, r.success ? 'success' : 'error');
  });
  bindClick(p, '#hoj-navbar-layout-btn', () => openNavbarLayoutDialog(config));
  // 与站点齿轮共用同一个设置弹窗，保证两处入口行为一致
  bindClick(p, '#hoj-vscode-settings-btn', () => {
    import('../features/vscodeEditor.ts').then(m => m.openEditorSettingsDialog());
  });
  bindClick(p, '#hoj-snippet-manage-btn', () => openSnippetManager(config));
  bindClick(p, '#hoj-snippet-open-btn', () => openSnippetPanel(config));

  // Vditor GID row visibility
  const vditorModeSel = p.querySelector('select[data-key="VditorUploadMode"]') as HTMLSelectElement;
  const gidRow = p.querySelector('#hoj-vditor-gid-row') as HTMLElement;
  if (vditorModeSel && gidRow) {
    gidRow.style.display = vditorModeSel.value === 'group' ? 'flex' : 'none';
    vditorModeSel.addEventListener('change', () => {
      gidRow.style.display = vditorModeSel.value === 'group' ? 'flex' : 'none';
    });
  }
}

async function handleConfigChange(input: HTMLInputElement | HTMLSelectElement, key: keyof Config, config: Config): Promise<void> {
  if (input.readOnly) return;
  if (input.type === 'checkbox') config[key] = input.checked;
  else config[key] = input.value;
  saveConfig(config);

  injectCss(config);
  applyBackground(config);
  applySmoothClasses(config);

  if (key === 'Open') {
    if (!config.Open) {
      document.documentElement.classList.remove('hoj-dark-mode', 'hoj-lg-active');
    }
    applySmoothClasses(config);
    injectCss(config);
  }

  if (key === 'ImageSource') {
    const { syncDynamicWallpaperOptions } = await import('../styles/background.js');
    syncDynamicWallpaperOptions(config, settingsPanel);
  }

  if (key === 'hdnoipCFName') {
    const { injectRecommendButton } = await import('../features/recommendations.js');
    const oldBtn = document.getElementById('hoj-rec-btn');
    if (oldBtn) oldBtn.remove();
    if (document.getElementById('pick-one')) setTimeout(injectRecommendButton, 100);
  }

  if (key === 'DarkMode') {
    const glowRow = settingsPanel?.querySelector('#hoj-mouse-glow-row') as HTMLElement;
    if (glowRow) glowRow.style.display = (config.Open && config.DarkMode) ? 'flex' : 'none';
    if (config.Open && config.DarkMode) {
      const { initCardGlow } = await import('../styles/index.js');
      initCardGlow(config);
    }
  }

  if (key === 'CustomRankTag' || key === 'CustomRankTagColor') {
    clearRankTags();
    pushMyTag(config);
    scheduleRankTag();
    if (isUserHomePage()) {
      document.querySelectorAll('.hoj-userhome-tag').forEach(el => el.remove());
      setTimeout(injectUserHomeTag, 100);
    }
  }

  if (key === 'AutoSaveCode' || key === 'AutoSaveCodeInterval') {
    syncAutoSaveCode(config);
  }

  if (key === 'PerfMode') {
    const { setPerfMode } = await import('../core/api.js');
    setPerfMode(!!config.PerfMode);
  }

  if (key === 'ToolsEnabled' || key === 'ToolsKeystroke' || key === 'ToolsPageTime' || key === 'ToolsClock') {
    initAllTools(config);
  }

  /* ---------- VS Code 编辑器 ----------
   * 面板是唯一真源。这里改完 config 后，统一走 syncVSCodeEditor /
   * applyEditorSettingsNow，让 Monaco 立即按新值重绘。 */
  if (key === 'VSCodeEditor') {
    const m = await import('../features/vscodeEditor.ts');
    m.syncVSCodeEditor(config);
  }

  if (key === 'VSCodeTheme' || key === 'VSCodeFontSize' || key === 'VSCodeTabSize') {
    const m = await import('../features/vscodeEditor.ts');
    m.applyEditorSettingsNow(config);
  }

  if (key === 'VditorDiscussionPublish' || key === 'VditorDiscussionEdit' || key === 'VditorGroupCreate') {
    document.querySelectorAll('[data-hoj-disc-intercepted]').forEach(b => delete b.dataset.hojDiscIntercepted);
    document.querySelectorAll('[data-hoj-edit-intercepted]').forEach(a => delete a.dataset.hojEditIntercepted);
    document.querySelectorAll('[data-hoj-create-group-intercepted]').forEach(b => delete b.dataset.hojCreateGroupIntercepted);
    if (config.VditorDiscussionPublish) injectDiscussionInterceptor(config);
    if (config.VditorDiscussionEdit) injectDiscussionEditInterceptor(config);
    if (config.VditorGroupCreate) injectGroupCreateInterceptor(config);
  }

  if (key === 'VditorUploadMode') {
    const gidRow = settingsPanel?.querySelector('#hoj-vditor-gid-row') as HTMLElement;
    if (gidRow) gidRow.style.display = config.VditorUploadMode === 'group' ? 'flex' : 'none';
  }

  if (CONFIG_GROUPS.some(g => g.keys.includes(key))) {
    refreshAllColorPreviews(config);
  }
}

function bindClick(p: HTMLElement, selector: string, handler: () => void): void {
  const el = p.querySelector(selector);
  if (el) el.addEventListener('click', handler);
}


/**
 * 设置面板拖拽（拖动 header）
 */
function enablePanelDrag(panel: HTMLElement): void {
  const handle = panel.querySelector('.hoj-panel-header') as HTMLElement | null;
  if (!handle) return;

  handle.style.cursor = 'move';
  handle.style.userSelect = 'none';
  handle.style.touchAction = 'none';

  let dragging = false;
  let startX = 0, startY = 0;
  let startLeft = 0, startTop = 0;

  const onMouseDown = (e: MouseEvent) => {
    if (panel.classList.contains('hoj-fullscreen')) return;   // 全屏不能拖
    if (e.button !== 0) return;              // 只响应左键
    if ((e.target as HTMLElement).closest('button')) return;   // 点在按钮上不拖
    e.preventDefault();

    dragging = true;
    const rect = panel.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    startLeft = rect.left;
    startTop = rect.top;

    // 从 right 定位切到 left 定位
    panel.style.right = 'auto';
    panel.style.left = rect.left + 'px';
    panel.style.top = rect.top + 'px';

    document.addEventListener('mousemove', onMouseMove, true);
    document.addEventListener('mouseup', onMouseUp, true);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let newLeft = startLeft + dx;
    let newTop = startTop + dy;

    // 边界限制，别拖出视口
    const w = panel.offsetWidth;
    const h = panel.offsetHeight;
    newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - w));
    newTop = Math.max(0, Math.min(newTop, window.innerHeight - h));

    panel.style.left = newLeft + 'px';
    panel.style.top = newTop + 'px';
  };

  const onMouseUp = () => {
    dragging = false;
    document.removeEventListener('mousemove', onMouseMove, true);
    document.removeEventListener('mouseup', onMouseUp, true);
  };

  handle.addEventListener('mousedown', onMouseDown);
}

export function applySettingsPanelFullscreen(force?: boolean): void {
  if (!settingsPanel) return;

  const on = (force === undefined)
    ? !!(_panelConfig as any)?.SettingsFullscreen
    : !!force;

  // 复位拖拽残留
  settingsPanel.style.left = '';
  settingsPanel.style.top = '';
  settingsPanel.style.right = '';
  settingsPanel.style.width = '';

  settingsPanel.classList.toggle('hoj-fullscreen', on);

  // footer checkbox 始终反映「实际视觉状态」
  const t = settingsPanel.querySelector('#hoj-fullscreen-toggle') as HTMLInputElement | null;
  if (t) t.checked = on;
}

/**
 * Open settings panel in fullscreen mode (for mobile)
 */
export function openSettingsPanelFullscreen(): void {
  if (!settingsPanel) settingsPanel = createSettingsPanel(_panelConfig ?? ({} as Config));

  if (!settingsPanel) return;
  
  settingsPanel.style.left = '';
  settingsPanel.style.top = '';
  settingsPanel.style.right = '';
  settingsPanel.style.width = '';

  refreshSettingsPanel();          // 打开前先同步最新配置
  settingsPanel.classList.add('open');
  applySettingsPanelFullscreen(true);

  const header = settingsPanel.querySelector('.hoj-panel-header');
  if (header) header.style.touchAction = 'auto';

  requestAnimationFrame(() => {
    const r = settingsPanel.getBoundingClientRect();
    console.log('[MobileMenu] 全屏面板 rect:', r.width, r.height);
  });
}

/**
 * 把 config 的当前值重新刷进面板里的所有控件。
 *
 * 面板是常驻 DOM，只在创建时赋过一次值；而配置可能被别处改掉
 * （齿轮弹窗、导入、菜单命令、外部脚本…），所以每次打开都要重新同步。
 */
export function refreshSettingsPanel(): void {
  const p = settingsPanel;
  const cfg = _panelConfig;
  if (!p || !cfg) return;

  try {
    p.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key') as keyof Config | null;
      if (!key) return;

      const input = el as HTMLInputElement | HTMLSelectElement;
      const v = (cfg as any)[key];

      if (input.type === 'checkbox') {
        input.checked = !!v;
      } else {
        // select / text / number / password
        const next = v === null || v === undefined ? '' : String(v);
        // 值确实不同才写，避免无谓的 change 触发
        if (input.value !== next) input.value = next;
      }
    });

    // el-select 自定义下拉：同步显示文本与下拉选中态
    try { refreshAllSelects(p); } catch (_) {}

    // 颜色预览：按新配置重算色块
    try { refreshAllColorPreviews(cfg); } catch (_) {}

    // Vditor 团队 ID 行的显隐依赖下拉值
    const vdMode = p.querySelector('select[data-key="VditorUploadMode"]') as HTMLSelectElement | null;
    const gidRow = p.querySelector('#hoj-vditor-gid-row') as HTMLElement | null;
    if (vdMode && gidRow) {
      gidRow.style.display = vdMode.value === 'group' ? 'flex' : 'none';
    }

    // 鼠标光晕行的显隐依赖 Open + DarkMode
    const glowRow = p.querySelector('#hoj-mouse-glow-row') as HTMLElement | null;
    if (glowRow) {
      glowRow.style.display = (cfg.Open && cfg.DarkMode) ? 'flex' : 'none';
    }
  } catch (e) {
    console.warn('[Settings] 刷新面板失败:', e);
  }
}

export function openSettingsPanel(): void {
  if (!settingsPanel) return;
  refreshSettingsPanel();          // 打开前先同步最新配置
  settingsPanel.classList.add('open');
}

export function closeSettingsPanel(): void {
  if (settingsPanel) settingsPanel.classList.remove('open');
}

export function toggleSettingsPanel(): void {
  if (!settingsPanel) return;
  // 即将打开（当前是关闭态）→ 先刷新
  if (!settingsPanel.classList.contains('open')) refreshSettingsPanel();
  settingsPanel.classList.toggle('open');
}

export function getSettingsPanel(): HTMLElement | null {
  return settingsPanel;
}