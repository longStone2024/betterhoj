/**
 * Main Entry Point
 * Initializes all features and sets up event listeners
 * Matches reference implementation: DOM/URL change detection
 */

import { WebI18n, t } from './core/i18n.js';
import { loadConfig, saveConfig, Config } from './core/config.js';
import { NewAlert, unsafeWindow, setPerfMode } from './core/api.js';
import { GM_registerMenuCommand, GM_unregisterMenuCommand } from './core/storage.js';
import { createSettingsPanel, openSettingsPanel, toggleSettingsPanel, closeSettingsPanel, getSettingsPanel, applySettingsPanelFullscreen } from './settings/panel.js';
import { injectCss, applySmoothClasses, applyBackground, initCardGlow, removeRowStripe } from './styles/index.js';
import { attemptAutoLogin, checkLoginAndAutoLogin } from './features/autoLogin.js';
import { checkScriptUpdate } from './features/autoUpdate.js';
import { injectCheckInButton } from './features/checkIn.js';
import {
  injectRankTag,
  injectUserHomeTag,
  scheduleRankTag,
  isRankPage,
  isUserHomePage,
  isRankListApi,
  clearTagCache,
  clearRankTags,
  clearUserHomeTags,
  startRankTableObserver,
  stopRankTableObserver,
  getTagfromRemote,
  setRankTagConfig
} from './features/customTag.js';
import { setupFavorites } from './features/favorites.js';
import { injectRecommendButton } from './features/recommendations.js';
import { scheduleApplyNavbarLayout } from './features/navbar.js';
import { openSnippetPanel, registerSnippetHotkeys } from './features/snippets.js';
import { autoRedirect, rewriteAllHojLinks, injectBackToOldBtn } from './features/redirect.js';
import { injectDiscussionInterceptor, injectDiscussionEditInterceptor, injectGroupCreateInterceptor, openEditDiscussionDialog } from './features/vditor.js';
import { injectRunAllTestButton } from './features/testJudge.js';
import { initAllTools, startPageTimeTracker } from './features/tools.js';
import { syncAutoSaveCode, stopAutoSaveCode } from './features/autoSave.js';
import { syncVSCodeEditor } from './features/vscodeEditor.js';
import { injectNewHeaderButton, injectMobileMenuButton, injectSettingsButton } from './features/settingsButton.js';
import { autoFetchProblemInfo, stopProblemButtonWatch } from './features/problemDetail.js';
import {
  injectDiscussionLikeButtons,
  injectNewDiscussionLikeButtons,
  cleanupDiscussionLikeButtons,
  cleanupNewDiscussionLikeButtons,
  isDiscussionDetailPage,
  isNewDiscussionPage
} from './features/discussionLike.js';
import {
  injectDiscussionListEditButtons,
  clearDiscussionListButtons,
  hookDiscussionListResponses,
  setDiscussionEditorOpener
} from './features/discussionList.js';
import { injectProblemSubmitOverride, parseProblemSubmitContext, hookTestJudgeLanguage } from './features/submitOverride.js';
import { injectResubmitButtons } from './features/resubmit.js';
import {
  injectCodeButtonIntoStatus,
  injectForceOption,
  startDiscussionObserver,
  isForceUpdateEnabled,
  getForceFields
} from './features/codeViewer.js';
import { VERSION_INFO } from './version.js';

// ============================================================
// Global config instance
// ============================================================
let config = loadConfig();
let _lastUrl = '';
let _hojLastInjectedUrl = '';
let _favTimer: number | null = null;

// Initialize i18n
WebI18n.start();

// 应用高性能模式（决定 Dialog/通知是否做动画与模糊）
setPerfMode(!!config.PerfMode);

// 让标签调度器知道当前配置
setRankTagConfig(config);
// 让讨论列表模块能打开编辑对话框（避免循环依赖）
setDiscussionEditorOpener((ctx) => {
  openEditDiscussionDialog(config, { gid: ctx.gid, did: String(ctx.did) });
});

/** 重新应用所有依赖配置的样式 */
function reapplyAllStyles(): void {
  injectCss(config);
  applySmoothClasses(config);
  applyBackground(config);
  setRankTagConfig(config);
}

// ============================================================
// Initialization Sequence
// ============================================================

async function initialize(): Promise<void> {
  console.log('[BetterHOJ] Initializing v' + VERSION_INFO.version);

  // Apply CSS and classes
  reapplyAllStyles();

  // Initialize features
  initCardGlow(config);
  syncAutoSaveCode(config);
  initAllTools(config);
  startPageTimeTracker();
  registerSnippetHotkeys(config);

  // Check for script updates
  await checkScriptUpdate();

  // Try auto login
  await attemptAutoLogin(config);

  // Site-internal link rewriting
  autoRedirect(config);
  rewriteAllHojLinks(config);
  new MutationObserver(() => rewriteAllHojLinks(config))
    .observe(document.body, { childList: true, subtree: true });

  // Settings panel
  createSettingsPanel(config);

  // Navbar buttons
  injectNewHeaderButton();
  injectMobileMenuButton();
  injectSettingsButton();

  // Register menu commands
  registerMenuCommands();

  // Global hotkeys
  setupGlobalHotkeys();

  // API hooks
  hookDiscussionListResponses();
  hookTestJudgeLanguage();
  hookRankListApi();

  // 神秘的条纹表格
  removeRowStripe();
  new MutationObserver(removeRowStripe).observe(document.body, { childList: true, subtree: true });

  // 题目收藏：注入星标 + 收藏面板
  scheduleFavSetup();
  new MutationObserver(scheduleFavSetup).observe(document.body, { childList: true, subtree: true });

  // 讨论页 ForceUpdate
  startDiscussionObserver();

  // Start injection cycle
  tryInject();

  // DOM observer for dynamic content
  new MutationObserver(tryInject).observe(document.documentElement, { childList: true, subtree: true });

  // 返回旧前端按钮
  injectBackToOldBtn();
  new MutationObserver(() => injectBackToOldBtn())
    .observe(document.body, { childList: true, subtree: true });

  // 题库页出现 #pick-one 后注入推荐按钮
  new MutationObserver(() => {
    if (document.getElementById('pick-one')) injectRecommendButton(config);
  }).observe(document.body, { childList: true, subtree: true });

  // 菜单栏布局：初次 + 兜底轮询
  scheduleApplyNavbarLayout(300);
  setInterval(() => scheduleApplyNavbarLayout(0), 3000);

  // 拉取云端标签
  getTagfromRemote();

  // URL change detection (matches reference: 1000ms polling)
  // 注意：这里只负责「触发」，去重交给 onUrlChange 内部的守卫，
  // 否则 _lastUrl 会被提前更新，导致 onUrlChange 直接被 return 掉。
  setInterval(onUrlChange, 1000);

  // Initial URL change check
  onUrlChange();

  console.log('[BetterHOJ] Initialization complete');
}

// ============================================================
// Core Injection Function (called on every DOM change)
// ============================================================

function tryInject(): void {
  // Navbar buttons
  injectNewHeaderButton();    // New UI header
  injectMobileMenuButton();   // Mobile drawer
  injectSettingsButton();     // Old UI navbar

  // Page-specific buttons
  injectCheckInButton(config);
  injectDiscussionLikeButtons();
  injectNewDiscussionLikeButtons();

  // Vditor interceptors
  if (config.VditorDiscussionPublish) injectDiscussionInterceptor(config);
  if (config.VditorDiscussionEdit) injectDiscussionEditInterceptor(config);
  if (config.VditorGroupCreate) injectGroupCreateInterceptor(config);

  // 全部自测
  injectRunAllTestButton();

  // Discussion list buttons
  injectDiscussionListEditButtons(config);
  injectResubmitButtons();

  // 讨论页 ForceUpdate
  injectForceOption();

  // VS Code 风格编辑器（题目页，开关控制，内部幂等）
  syncVSCodeEditor(config);
}

// ============================================================
// URL Change Handler (matches reference onUrlChange)
// ============================================================

function onUrlChange(): void {
  if (window.location.href === _lastUrl) return;
  _lastUrl = window.location.href;

  const isProblemPage =
    /^\/problem[\/:][^\/?#]+/.test(window.location.pathname) ||
    /^\/training\/[^\/]+\/problem\/[^\/?#]+/.test(window.location.pathname) ||
    /^\/contest\/[^\/]+\/problem\/[^\/?#]+/.test(window.location.pathname) ||
    /^\/group\/[^\/]+\/problem\/[^\/?#]+/.test(window.location.pathname);

  if (isProblemPage) {
    // 立即开始拉题目；DOM 就绪交给 waitForSelector 轮询
    void autoFetchProblemInfo(config);
    // Recommendations button on problem list page
    if (document.getElementById('pick-one')) {
      setTimeout(injectRecommendButton, 1200);
    }
    setTimeout(() => syncAutoSaveCode(config), 1200);
  } else {
    const old = document.getElementById('hoj-recommendations-panel');
    if (old) old.remove();
    stopAutoSaveCode();
    // 离开题目页 → 停掉容器观察器，避免在别的页面上空转
    stopProblemButtonWatch();
  }

  // Problem page: submit override
  // 不再用固定延时：容器未就绪时 injectProblemSubmitOverride 内部会 waitForSelector
  if (isProblemPage) {
    void injectProblemSubmitOverride();
  } else {
    // Reset marker when leaving problem page
    _hojLastInjectedUrl = '';
  }

  // Submission detail page
  // 同理，#status 未就绪时 injectCodeButtonIntoStatus 内部会 waitForSelector
  if (/\/submission-detail\/[^\/?#]+/.test(window.location.pathname)) {
    void injectCodeButtonIntoStatus();
  }

  // Discussion list pages
  if (/^\/discussion(\/|$|\?)/.test(window.location.pathname) ||
      /^\/group\/[^\/]+\/discussion(\/|$)/.test(window.location.pathname)) {
    clearDiscussionListButtons();
  }

  // Rank page
  if (isRankPage()) {
    clearTagCache();
    scheduleRankTag();
    startRankTableObserver();
  } else if (isUserHomePage()) {
    clearTagCache();
    clearUserHomeTags();
    setTimeout(() => injectUserHomeTag(config), 500);
  } else {
    clearRankTags();
    stopRankTableObserver();
  }

  // Discussion detail pages
  if (!isDiscussionDetailPage()) {
    cleanupDiscussionLikeButtons();
  }
  if (!isNewDiscussionPage()) {
    cleanupNewDiscussionLikeButtons();
  }

  // Navbar layout
  scheduleApplyNavbarLayout(100);

  // Inject "Back to Old UI" button in new frontend
  injectBackToOldBtn();
}

// ============================================================
// Helper Functions
// ============================================================

function scheduleFavSetup(): void {
  if (_favTimer) return;
  _favTimer = window.setTimeout(() => {
    _favTimer = null;
    setupFavorites();
  }, 400);
}

/**
 * 排行榜列表接口完成后重新注入标签
 */
function hookRankListApi(): void {
  try {
    const prevFetch = window.fetch;
    window.fetch = function (input: any, init?: any) {
      const url = typeof input === 'string' ? input : (input && input.url) || '';
      if (isRankListApi(url)) {
        return prevFetch.call(this, input, init).then((resp: Response) => {
          // 数据已返回，等 Vue 完成 DOM 渲染后再注入
          setTimeout(() => {
            if (isRankPage()) {
              console.log('[RankTag] 排行榜接口已完成，重新注入');
              scheduleRankTag();
            }
          }, 150);
          return resp;
        });
      }
      return prevFetch.call(this, input, init);
    } as typeof window.fetch;
  } catch (e) {
    console.warn('[RankTag] hook fetch 失败:', e);
  }
}

// ============================================================
// Menu Commands
// ============================================================

let _menuCommandIds: Array<string | number> = [];

function _unregisterMenuCommands(): void {
  // @ts-ignore - GM_unregisterMenuCommand provided by userscript
  if (typeof GM_unregisterMenuCommand === 'function') {
    _menuCommandIds.forEach(id => {
      try { GM_unregisterMenuCommand(id); } catch (_) {}
    });
  }
  _menuCommandIds = [];
}

function _addMenuCommand(label: string, fn: () => void): void {
  // @ts-ignore - GM_registerMenuCommand provided by userscript
  if (typeof GM_registerMenuCommand !== 'function') return;
  // @ts-ignore
  const id = GM_registerMenuCommand(label, fn);
  if (id !== undefined && id !== null) _menuCommandIds.push(id);
}

function registerMenuCommands(): void {
  _unregisterMenuCommands();

  _addMenuCommand(t('menu.openSettings'), () => {
    (window as any).__BETTER_HOJ__?.openSettings?.();
  });
  _addMenuCommand(t('menu.toggleDarkMode'), () => {
    config.DarkMode = !config.DarkMode;
    saveConfig(config);
    reapplyAllStyles();
    NewAlert(config.DarkMode ? t('menu.darkOn') : t('menu.darkOff'), 'success');
  });
  _addMenuCommand(t('menu.toggleSmartHoj'), () => {
    config.Open = !config.Open;
    saveConfig(config);
    reapplyAllStyles();
    NewAlert(config.Open ? t('menu.smartOn') : t('menu.smartOff'), 'success');
  });
  _addMenuCommand(t('menu.openSnippetPanel'), () => openSnippetPanel(config));
  _addMenuCommand(t('menu.manageSnippets'), () => {
    import('./features/snippets.js').then(m => m.openSnippetManager(config));
  });
  _addMenuCommand(t('menu.importExport'), () => {
    import('./settings/importExport.js').then(m => m.openImportExportDialog(config));
  });
  _addMenuCommand(t('menu.togglePanelFullscreen'), () => {
    const panel = getSettingsPanel();
    const fsToggle = panel?.querySelector('#hoj-fullscreen-toggle') as HTMLInputElement | null;
    if (fsToggle) {
      fsToggle.checked = !fsToggle.checked;
      fsToggle.dispatchEvent(new Event('change'));
    }
  });
}

// ============================================================
// Global Hotkeys
// ============================================================

function setupGlobalHotkeys(): void {
  document.addEventListener('keydown', (e) => {
    // Esc → 关闭设置面板
    if (e.key === 'Escape') {
      closeSettingsPanel();
      return;
    }

    // Ctrl+Alt+S -> Open snippet panel (configurable)
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 's') {
      e.preventDefault();
      openSnippetPanel(config);
    }

    // Ctrl+Shift+B -> Toggle settings panel
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      toggleSettingsPanel();
    }
  });
}

// ============================================================
// Export for debugging
// ============================================================

// @ts-ignore
window.__BETTER_HOJ__ = {
  config: () => config,
  reload: reapplyAllStyles,
  openSettings: () => {
    const p = getSettingsPanel();
    if (p) p.classList.add('open');
  },
  VERSION_INFO
};

// Start initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
