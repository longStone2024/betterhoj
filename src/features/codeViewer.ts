/**
 * Submission Code Viewer
 * 在提交详情页注入「查看代码」按钮，从 hojcode 远程拉取代码并用 highlight.js 渲染。
 * 同时提供讨论页的 ForceUpdate 选项。
 */

import { NewAlert } from '../core/api.js';
import { copyToClipboard } from '../core/utils.js';
import { waitForSelector } from './tools.js';


/**
 * 读取页面 window 上的全局对象。
 * highlight.js 由 @require 注入到**页面** window，沙箱里的 window 可能读不到，
 * 因此两处都查一次。
 */
function _pageGlobal(name: string): any {
  // @ts-ignore - unsafeWindow 由 userscript 环境提供
  const pw = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : null;
  if (pw && (pw as any)[name]) return (pw as any)[name];
  return (window as any)[name];
}

/* ============================================================
 * 语言映射
 * ============================================================ */
export function mapToHljsLang(language: string | null | undefined): string {
  if (!language) return '';

  // 1. 归一化：小写、去空白、去特殊符号
  let s = String(language).toLowerCase().trim();

  // 2. 剥离常见后缀/修饰词
  s = s.replace(/\s*with\s*o2\b/g, '')      // "With O2"
    .replace(/\s*\bo2\b/g, '')              // 单独的 O2
    .replace(/\s*\d+(\.\d+)*\s*$/g, '')     // 尾部的版本号 1.8.0_241 / 20 / 17 ...
    .replace(/[_\-]+/g, '')
    .replace(/\s+/g, '');

  // 3. 匹配
  const table: Record<string, string> = {
    // C / C++
    'c': 'c',
    'cpp': 'cpp', 'c++': 'cpp', 'cxx': 'cpp', 'cc': 'cpp',
    'gnug++': 'cpp', 'gnuc++': 'cpp', 'gnugcc': 'cpp', 'gcc': 'cpp',
    'c++20': 'cpp', 'c++17': 'cpp', 'c++14': 'cpp', 'c++11': 'cpp',
    // Python 系
    'python': 'python', 'python3': 'python', 'python2': 'python',
    'py3': 'python', 'py2': 'python', 'pypy': 'python', 'pypy3': 'python', 'pypy2': 'python',
    // Java
    'java': 'java', 'java18': 'java', 'javajdk': 'java',
    // JavaScript
    'javascript': 'javascript', 'js': 'javascript',
    'javascriptnode': 'javascript', 'javascriptv8': 'javascript',
    'node': 'javascript', 'nodejs': 'javascript',
    // Go
    'go': 'go', 'golang': 'go',
    // Rust
    'rust': 'rust', 'rs': 'rust',
    // C#
    'c#': 'csharp', 'csharp': 'csharp',
    // 其它
    'kotlin': 'kotlin', 'swift': 'swift',
    'php': 'php', 'ruby': 'ruby', 'perl': 'perl',
    'lua': 'lua', 'r': 'r', 'scala': 'scala',
    'pascal': 'pascal', 'delphi': 'pascal',
    'bash': 'bash', 'shell': 'bash', 'sh': 'bash',
    'sql': 'sql', 'json': 'json', 'xml': 'xml', 'html': 'xml',
    'css': 'css', 'markdown': 'markdown', 'md': 'markdown',
    'plaintext': 'plaintext', 'text': 'plaintext'
  };

  if (table[s]) return table[s];

  // 4. 兜底：包含关系匹配
  if (s.includes('python') || s.includes('pypy')) return 'python';
  if (s.includes('c++') || s.includes('cpp') || s.includes('g++')) return 'cpp';
  if (s.includes('java') && !s.includes('javascript')) return 'java';
  if (s.includes('javascript') || s.includes('node')) return 'javascript';
  if (s.includes('golang') || s === 'go') return 'go';
  if (s.includes('rust')) return 'rust';
  if (s.includes('csharp') || s.includes('c#')) return 'csharp';

  return '';   // 未知语言 → 让调用方走 highlightAuto
}

/* ============================================================
 * 代码块构造
 * ============================================================ */
export function buildCodeBlockHtml(code: string, language: string | null): HTMLElement {
  const w = document.createElement('div');
  w.className = 'el-col el-col-24';
  w.style.marginTop = '13px';

  const b = document.createElement('div');
  b.className = 'markdown-body submission-detail';

  const pre = document.createElement('pre');
  pre.style.borderLeft = '3px solid rgb(25, 190, 107)';

  const c = document.createElement('code');
  c.textContent = code;

  const lang = mapToHljsLang(language);
  if (lang) c.className = `hljs language-${lang}`;
  else c.className = 'hljs';

  // 用刚加载的 highlight.js 渲染
  const hljs = _pageGlobal('hljs');
  try {
    if (typeof hljs !== 'undefined') {
      if (lang && hljs.getLanguage(lang)) {
        c.innerHTML = hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
      } else {
        const r = hljs.highlightAuto(code);
        c.innerHTML = r.value;
        if (r.language) c.classList.add(`language-${r.language}`);
      }
    }
  } catch (e) {
    console.warn('[CodeBlock] hljs 高亮失败:', e);
    c.textContent = code;   // 回退到纯文本
  }

  // 复制按钮
  const i = document.createElement('i');
  i.title = 'copy';
  i.className = 'el-icon-document-copy code-copy';
  i.textContent = ' COPY';
  i.style.cursor = 'pointer';
  i.addEventListener('click', () => copyToClipboard(code));

  pre.append(c, i);
  b.appendChild(pre);
  w.appendChild(b);
  return w;
}

/* ============================================================
 * 远程代码拉取
 * ============================================================ */
function fetchRemoteSubmissionData(id: string): Promise<any> {
  return new Promise((resolve) => {
    // @ts-ignore - GM_xmlhttpRequest provided by userscript environment
    GM_xmlhttpRequest({
      method: 'GET',
      url: `https://hojcode.rkcd.me/${id}`,
      onload: (r: any) => {
        if (r.status === 200) {
          try { resolve(JSON.parse(r.responseText)?.data || null); }
          catch { resolve(null); }
        } else resolve(null);
      },
      onerror: () => resolve(null)
    });
  });
}

function findInjectionTarget(): Element | null {
  const row = document.querySelector('.el-row.is-justify-space-around.el-row--flex');
  if (row) return row;
  const cols = document.querySelectorAll('.el-col.el-col-24');
  return cols.length ? (cols[cols.length - 1].parentElement || cols[cols.length - 1]) : null;
}

/** 已挂起等待的 URL，避免重复注册 waitForSelector */
let _pendingCodeBtnUrl: string | null = null;

/**
 * 等 #status 渲染完成后再注入「查看代码」按钮。
 */
function _scheduleCodeButtonRetry(): void {
  const url = window.location.href;
  if (_pendingCodeBtnUrl === url) return;
  _pendingCodeBtnUrl = url;
  console.log('[CodeViewer] #status 未就绪，等待渲染…');
  waitForSelector('#status', () => {
    if (_pendingCodeBtnUrl === url) _pendingCodeBtnUrl = null;
    if (window.location.href !== url) return;   // 等待期间已切页
    void injectCodeButtonIntoStatus();
  }, 15000);
}

/* ============================================================
 * 注入「查看代码」按钮
 * ============================================================ */
export async function injectCodeButtonIntoStatus(): Promise<void> {
  const m = window.location.pathname.match(/\/submission-detail\/([^\/?#]+)/);
  if (!m) return;
  const submitId = m[1];

  if (document.getElementById('hoj-show-code-btn')) return;

  const statusEl = document.getElementById('status');
  if (!statusEl) {
    // 不再依赖固定延时：#status 晚到就用 waitForSelector 轮询。
    // 同一 URL 只注册一次等待，避免 MutationObserver/轮询反复挂监听。
    _scheduleCodeButtonRetry();
    return;
  }

  const inTarget = document.querySelector('.markdown-body.submission-detail');
  if (inTarget) return;

  const btn = document.createElement('button');
  btn.id = 'hoj-show-code-btn';
  btn.type = 'button';
  btn.className = 'el-button el-button--primary is-plain bhoj-mini-button';
  btn.textContent = '查看代码';
  btn.style.cssText = 'margin-left:10px;padding:4px 10px;cursor:pointer;vertical-align:middle;';

  let remoteData: any;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!remoteData?.code) {
      NewAlert('远程无代码', 'error');
      return;
    }
    injectCodeBlockToBottom(remoteData.code, remoteData.language || null);
    btn.style.cssText = 'margin-left:10px;padding:4px 10px;cursor:pointer;vertical-align:middle;display:none;';
    NewAlert('代码获取成功', 'success');
  });

  const content = statusEl.querySelector('.el-alert__content');
  const target = content || statusEl;
  target.appendChild(btn);

  remoteData = await fetchRemoteSubmissionData(submitId);
}

export function injectCodeBlockToBottom(code: string, language: string | null): void {
  const target = findInjectionTarget();
  if (!target) return;

  // 清理错位旧块
  document.querySelectorAll('.markdown-body.submission-detail').forEach(b => {
    if (!target.contains(b)) {
      const wrap = b.closest('.el-col.el-col-24');
      (wrap && wrap.querySelector('.markdown-body.submission-detail')) ? wrap.remove() : b.remove();
    }
  });

  // 已有目标块 → 只更新内容 + 重新高亮
  const inTarget = target.querySelector('.markdown-body.submission-detail');
  if (inTarget) {
    const c = inTarget.querySelector('pre code') as HTMLElement | null;
    if (c) {
      const lang = mapToHljsLang(language);
      c.className = 'hljs' + (lang ? ` language-${lang}` : '');
      const hljs = _pageGlobal('hljs');
      try {
        if (typeof hljs !== 'undefined' && lang && hljs.getLanguage(lang)) {
          c.innerHTML = hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
        } else if (typeof hljs !== 'undefined') {
          const r = hljs.highlightAuto(code);
          c.innerHTML = r.value;
          if (r.language) c.classList.add(`language-${r.language}`);
        } else {
          c.textContent = code;
        }
      } catch (e) {
        c.textContent = code;
      }
      return;
    }
  }

  target.appendChild(buildCodeBlockHtml(code, language));
}

export function removeInjectedCodeBlock(): void {
  const target = findInjectionTarget();
  if (!target) return;
  target.querySelectorAll('.markdown-body.submission-detail').forEach(b => {
    const wrap = b.closest('.el-col.el-col-24');
    (wrap && wrap.querySelector('.markdown-body.submission-detail') && wrap.children.length === 1)
      ? wrap.remove()
      : b.remove();
  });
}

/* ============================================================
 * 讨论页 ForceUpdate 选项
 * ============================================================ */
const FORCE_UPDATE_CHECKBOX_ID = 'hoj-force-update-checkbox';
const FORCE_FIELDS_CONTAINER_ID = 'hoj-force-update-fields';

let forceUpdate = false;

function getForceFields(): Record<string, any> {
  const read = (id: string) => (document.getElementById(id) as HTMLInputElement | null)?.value?.trim();
  const out: Record<string, any> = {};
  const role = read('force-role-input');
  if (role) out.role = role;
  const viewNum = read('force-viewNum-input');
  if (viewNum) out.viewNum = Number(viewNum);
  const likeNum = read('force-likeNum-input');
  if (likeNum) out.likeNum = Number(likeNum);
  const commentNum = read('force-commentNum-input');
  if (commentNum) out.commentNum = Number(commentNum);
  return out;
}

export function syncForceCheckbox(): void {
  const cb = document.getElementById(FORCE_UPDATE_CHECKBOX_ID) as HTMLInputElement | null;
  if (cb) cb.checked = forceUpdate;
  const c = document.getElementById(FORCE_FIELDS_CONTAINER_ID);
  if (c) c.style.display = forceUpdate ? 'block' : 'none';
}

export function injectForceOption(): boolean {
  if (!window.location.pathname.endsWith('/discussion')) return false;
  const f = document.querySelector('.el-dialog__footer .dialog-footer');
  if (!f) return false;
  if (document.getElementById(FORCE_UPDATE_CHECKBOX_ID)) return true;

  const lb = document.createElement('label');
  lb.style.cssText = 'margin-right:15px;display:inline-flex;align-items:center;cursor:pointer;';
  lb.title = '启用 ForceUpdate';

  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.id = FORCE_UPDATE_CHECKBOX_ID;
  cb.style.marginRight = '5px';
  cb.checked = forceUpdate;
  cb.addEventListener('change', (e) => {
    forceUpdate = (e.target as HTMLInputElement).checked;
    try { (window as any).__forceDiscussionUpdate__ = forceUpdate; } catch (_) {}
    syncForceCheckbox();
  });

  const sp = document.createElement('span');
  sp.textContent = 'ForceUpdate';
  lb.append(cb, sp);
  f.insertBefore(lb, f.firstChild);

  const fc = document.createElement('div');
  fc.id = FORCE_FIELDS_CONTAINER_ID;
  fc.style.cssText = `display:${forceUpdate ? 'block' : 'none'};margin-top:10px;text-align:left;`;
  fc.innerHTML = `
            <div style="display:inline-block;margin-right:10px;"><label style="display:block;font-size:12px;">role</label><input id="force-role-input" type="text" placeholder="user/admin/root" style="width:100px;padding:4px;"></div>
            <div style="display:inline-block;margin-right:10px;"><label style="display:block;font-size:12px;">viewNum</label><input id="force-viewNum-input" type="number" placeholder="0" style="width:80px;padding:4px;"></div>
            <div style="display:inline-block;margin-right:10px;"><label style="display:block;font-size:12px;">likeNum</label><input id="force-likeNum-input" type="number" placeholder="0" style="width:80px;padding:4px;"></div>
            <div style="display:inline-block;margin-right:10px;"><label style="display:block;font-size:12px;">commentNum</label><input id="force-commentNum-input" type="number" placeholder="0" style="width:80px;padding:4px;"></div>`;
  f.insertBefore(fc, lb.nextSibling);
  return true;
}

/** 监听讨论弹窗的打开，注入 ForceUpdate */
export function startDiscussionObserver(): void {
  new MutationObserver(() => {
    if (window.location.pathname.endsWith('/discussion') &&
      document.querySelector('.el-dialog__footer .dialog-footer')) {
      injectForceOption();
    }
  }).observe(document.body, { childList: true, subtree: true });
}

/** 是否启用了 ForceUpdate（供 fetch hook 使用） */
export function isForceUpdateEnabled(): boolean { return forceUpdate; }
export { getForceFields };
