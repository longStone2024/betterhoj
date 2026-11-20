/**
 * Core API utilities
 * Provides hojApi for HTTP requests and UI primitives (NewAlert, NewDialog)
 */

import { WebI18n, _i18nResolve } from './i18n.js';

// ============================================================
// unsafeWindow reference
// ============================================================
export const unsafeWindow = window as any;

// ============================================================
// Generic API Request
// ============================================================
export interface HojApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  silent?: boolean;
  raw?: boolean;
}

export interface HojApiResponse {
  status: number;
  msg?: string;
  message?: string;
  data?: unknown;
}

export async function hojApi(url: string, opts: HojApiOptions = {}): Promise<unknown> {
  const {
    method = 'GET',
    body = undefined,
    headers = {},
    silent = false,
    raw = false
  } = opts;

  const fullUrl = /^https?:\/\//i.test(url)
    ? url
    : `${window.location.origin}${url}`;

  const token = localStorage.getItem('token') || '';
  const init: RequestInit = {
    method,
    headers: {
      'Authorization': token,
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers
    },
    credentials: 'include'
  };
  if (body !== undefined) init.body = JSON.stringify(body);

  let resp: Response;
  try {
    resp = await fetch(fullUrl, init);
  } catch (e) {
    if (!silent) NewAlert(WebI18n.t('api.networkError', { msg: (e as Error).message }), 'error');
    throw e;
  }

  if (resp.status !== 200) {
    const msg = WebI18n.t('api.httpError', { code: resp.status });
    if (!silent) NewAlert(msg, 'error');
    const err = new Error(msg);
    (err as any).httpStatus = resp.status;
    throw err;
  }

  let data: HojApiResponse;
  try {
    data = await resp.json();
  } catch (e) {
    const msg = WebI18n.t('api.jsonError');
    if (!silent) NewAlert(msg, 'error');
    const err = new Error(msg);
    err.cause = e;
    throw err;
  }

  const bizStatus = data && typeof data.status !== 'undefined' ? data.status : 200;
  if (bizStatus !== 200) {
    const msg = data?.msg || data?.message || WebI18n.t('api.bizError', { code: bizStatus });
    if (!silent) NewAlert(msg, 'error');
    const err = new Error(msg);
    (err as any).bizStatus = bizStatus;
    (err as any).response = data;
    throw err;
  }

  return raw ? data : (data ? data.data : null);
}

// ============================================================
// 高性能模式
// 关闭 Dialog / 通知的淡出动画，并去掉 Dialog mask 的模糊，
// 用于低性能设备或远程桌面等场景。
// ============================================================
let _perfMode = false;

/** 设置高性能模式（由设置面板调用） */
export function setPerfMode(on: boolean): void {
  _perfMode = !!on;
  const root = document.documentElement;
  root.classList.toggle('hoj-perf-mode', _perfMode);
}

/** 当前是否处于高性能模式 */
export function isPerfMode(): boolean {
  return _perfMode;
}

// ============================================================
// Alert System
// ============================================================
type AlertType = 'success' | 'error' | 'warning' | 'info';

export function NewAlert(message: string, type: AlertType = 'success', duration = 2500): () => void {
  let container = document.getElementById('hoj-alert-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'hoj-alert-container';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 2147483640;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  const msg = document.createElement('div');
  msg.className = `m-message m-message--${type}`;
  msg.style.cssText = [
    'pointer-events: auto',
    'min-width: 220px',
    'max-width: 360px',
    _perfMode ? 'animation: none' : 'animation: hojAlertIn .25s ease-out'
  ].join(';');
  msg.innerHTML = `
    <div class="m-message-content">
      <div class="m-message--description"></div>
    </div>
    <div class="m-message--control">
      <i class="m-message--close el-icon-close" style="cursor:pointer;"></i>
    </div>
  `;
  msg.querySelector('.m-message--description')!.textContent = _i18nResolve(message);

  let closed = false;
  const remove = () => {
    if (closed) return;
    closed = true;
    if (_perfMode) {
      // 高性能模式：直接移除，不做淡出
      msg.remove();
      return;
    }
    msg.style.animation = 'hojAlertOut .2s ease-in forwards';
    setTimeout(() => msg.remove(), 300);
  };
  msg.querySelector('.m-message--close')!.addEventListener('click', remove);

  container.appendChild(msg);

  if (duration > 0) setTimeout(remove, duration);

  return remove;
}

// Inject alert styles once
(function injectAlertStyle() {
  if (document.getElementById('hoj-alert-style')) return;
  const style = document.createElement('style');
  style.id = 'hoj-alert-style';
  style.textContent = `
    @keyframes hojAlertIn {
      from { opacity: 0; transform: translateX(20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes hojAlertOut {
      from { opacity: 1; transform: translateX(0); }
      to   { opacity: 0; transform: translateX(20px); }
    }

    #hoj-alert-container .m-message {
      display: flex;
      align-items: center;
      padding: 10px 14px;
      border-radius: 8px;
      background: #FFFFFF;
      box-shadow: 0 2px 12px rgba(0,0,0,.15);
      font-size: 13px;
      color: #24292E !important;
      font-family: var(--hoj-sans-font, "Noto Sans SC", sans-serif);
    }
    #hoj-alert-container .m-message--description {
      color: inherit !important;
      line-height: 1.4;
      word-break: break-all;
    }
    #hoj-alert-container .m-message--control {
      margin-left: 10px;
      opacity: .5;
    }
    #hoj-alert-container .m-message--control:hover { opacity: 1; }
    #hoj-alert-container .m-message--control i { color: inherit !important; }

    #hoj-alert-container .m-message--success { border-left: 3px solid #19BE6B; }
    #hoj-alert-container .m-message--error   { border-left: 3px solid #ED4014; }
    #hoj-alert-container .m-message--warning { border-left: 3px solid #FF9900; }
    #hoj-alert-container .m-message--info    { border-left: 3px solid #2DB7F5; }

    html.hoj-dark-mode #hoj-alert-container .m-message {
      background: #37373FE0 !important;
      color: #FFFFFF !important;
      box-shadow: 0 2px 12px rgba(0,0,0,.45);
    }

    html.hoj-lg-active:not(.hoj-dark-mode) #hoj-alert-container .m-message {
      background: rgba(255, 255, 255, .65) !important;
      backdrop-filter: blur(20px) saturate(1.5) !important;
      -webkit-backdrop-filter: blur(20px) saturate(1.5) !important;
      color: #24292E !important;
    }

    html.hoj-lg-active.hoj-dark-mode #hoj-alert-container .m-message {
      background: rgba(55, 55, 63, .75) !important;
      backdrop-filter: blur(20px) saturate(1.5) !important;
      -webkit-backdrop-filter: blur(20px) saturate(1.5) !important;
      color: #FFFFFF !important;
    }
  `;
  document.head.appendChild(style);
})();

// ============================================================
// Scroll Lock
// ============================================================
let _scrollLockCount = 0;
let _scrollLockPrev: { bodyOverflow: string; bodyPaddingRight: string; htmlOverflow: string } | null = null;

export function lockPageScroll(): void {
  _scrollLockCount++;
  if (_scrollLockCount !== 1) return;

  const body = document.body;
  const html = document.documentElement;

  _scrollLockPrev = {
    bodyOverflow: body.style.overflow,
    bodyPaddingRight: body.style.paddingRight,
    htmlOverflow: html.style.overflow
  };

  const sbw = window.innerWidth - html.clientWidth;
  if (sbw > 0) {
    const cur = parseFloat(getComputedStyle(body).paddingRight) || 0;
    body.style.paddingRight = `${cur + sbw}px`;
  }

  body.style.overflow = 'hidden';
  html.style.overflow = 'hidden';
  document.documentElement.classList.add('hoj-scroll-locked');
}

export function unlockPageScroll(): void {
  if (_scrollLockCount === 0) return;
  _scrollLockCount--;
  if (_scrollLockCount !== 0) return;

  const body = document.body;
  const html = document.documentElement;

  if (_scrollLockPrev) {
    body.style.overflow = _scrollLockPrev.bodyOverflow || '';
    body.style.paddingRight = _scrollLockPrev.bodyPaddingRight || '';
    html.style.overflow = _scrollLockPrev.htmlOverflow || '';
    _scrollLockPrev = null;
  } else {
    body.style.overflow = '';
    body.style.paddingRight = '';
    html.style.overflow = '';
  }

  document.documentElement.classList.remove('hoj-scroll-locked');
}

// ============================================================
// Dialog System
// ============================================================
export interface DialogOptions {
  title?: string;
  content?: string;
  html?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  type?: AlertType;
  closeOnMask?: boolean;
  onConfirm?: () => Promise<boolean> | boolean;
}

export function NewDialog(opts: DialogOptions = {}): Promise<boolean> {
  const raw = {
    title: '@dialog.tip',
    content: '',
    html: '',
    confirmText: '@dialog.confirm',
    cancelText: '@dialog.cancel',
    showCancel: true,
    type: '',
    closeOnMask: true,
    onConfirm: null,
    ...opts
  };

  const title = _i18nResolve(raw.title);
  const content = _i18nResolve(raw.content);
  const html = raw.html;
  const confirmText = _i18nResolve(raw.confirmText);
  const cancelText = _i18nResolve(raw.cancelText);
  const showCancel = !!raw.showCancel;
  const type = raw.type;
  const closeOnMask = raw.closeOnMask !== false;
  const onConfirm = raw.onConfirm;

  return new Promise((resolve) => {
    const mask = document.createElement('div');
    mask.className = 'hoj-dialog-mask';
    mask.style.zIndex = '2147483600';

    const dialog = document.createElement('div');
    dialog.className = 'hoj-dialog';
    if (type) dialog.classList.add(`hoj-dialog--${type}`);

    const header = document.createElement('div');
    header.className = 'hoj-dialog__header';
    header.textContent = title;

    const closeBtn = document.createElement('i');
    closeBtn.className = 'hoj-dialog__close el-icon-close';
    closeBtn.style.zIndex = '2';
    closeBtn.addEventListener('click', () => close(false));
    header.appendChild(closeBtn);

    const body = document.createElement('div');
    body.className = 'hoj-dialog__body';
    if (html) body.innerHTML = html;
    else body.textContent = content;

    const footer = document.createElement('div');
    footer.className = 'hoj-dialog__footer';

    if (showCancel) {
      const cancelBtn = document.createElement('button');
      cancelBtn.type = 'button';
      cancelBtn.className = 'hoj-dialog__btn hoj-dialog__btn--cancel';
      cancelBtn.textContent = cancelText;
      cancelBtn.addEventListener('click', () => close(false));
      footer.appendChild(cancelBtn);
    }

    const confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.className = 'hoj-dialog__btn hoj-dialog__btn--confirm';
    confirmBtn.textContent = confirmText;
    confirmBtn.addEventListener('click', async () => {
      if (typeof onConfirm === 'function') {
        try {
          const ret = await onConfirm();
          if (ret === false) return;
        } catch (e) {
          console.error('[NewDialog] onConfirm error:', e);
        }
      }
      close(true);
    });
    footer.appendChild(confirmBtn);

    dialog.append(header, body, footer);
    mask.appendChild(dialog);
    document.body.appendChild(mask);

    let closed = false;
    function close(result: boolean) {
      if (closed) return;
      closed = true;
      // 高性能模式：跳过淡出，立即移除
      if (_perfMode) {
        mask.remove();
        resolve(result);
        return;
      }
      mask.style.animation = 'hojDialogMaskOut .18s ease-in forwards';
      dialog.style.animation = 'hojDialogOut .18s ease-in forwards';
      setTimeout(() => {
        mask.remove();
        resolve(result);
      }, 180);
    }

    if (closeOnMask) {
      mask.addEventListener('click', (e) => {
        if (e.target === mask) close(false);
      });
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', onKey);
        close(false);
      }
    };
    document.addEventListener('keydown', onKey);

    setTimeout(() => confirmBtn.focus(), 50);
  });
}

// Inject dialog styles once
(function injectDialogStyle() {
  if (document.getElementById('hoj-dialog-style')) return;
  const style = document.createElement('style');
  style.id = 'hoj-dialog-style';
  style.textContent = `
    @keyframes hojDialogMaskIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes hojDialogMaskOut { from { opacity: 1; } to { opacity: 0; } }
    @keyframes hojDialogIn { from { opacity: 0; transform: translateY(12px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
    @keyframes hojDialogOut { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(12px) scale(.98); } }

    .hoj-dialog-mask {
      position: fixed; inset: 0; z-index: 2147483600 !important;
      background: rgba(0, 0, 0, .35);
      backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px);
      display: flex; align-items: center; justify-content: center;
      animation: hojDialogMaskIn .2s ease-out;
    }

    .hoj-dialog {
      min-width: 320px; max-width: 520px; max-height: 80vh; overflow: hidden;
      display: flex; flex-direction: column;
      border-radius: var(--hoj-card-radius, 12px);
      background: #FFFFFF; box-shadow: 0 8px 24px rgba(0,0,0,.2);
      font-family: var(--hoj-sans-font, "Noto Sans SC", sans-serif);
      color: #24292E; animation: hojDialogIn .25s cubic-bezier(.2,.8,.2,1);
    }

    html.hoj-dark-mode .hoj-dialog { background: #37373FE0; color: #FFFFFF; }
    html.hoj-dark-mode .hoj-dialog__header,
    html.hoj-dark-mode .hoj-dialog__footer { border-color: rgba(255, 255, 255, .08); }

    html.hoj-lg-active:not(.hoj-dark-mode) .hoj-dialog {
      background: rgba(255, 255, 255, .65);
      backdrop-filter: blur(20px) saturate(1.5);
      -webkit-backdrop-filter: blur(20px) saturate(1.5);
      box-shadow: var(--hoj-lg-shadow, 0 8px 24px rgba(0,0,0,.2));
    }

    html.hoj-lg-active.hoj-dark-mode .hoj-dialog {
      background: rgba(55, 55, 63, .75);
      backdrop-filter: blur(20px) saturate(1.5);
      -webkit-backdrop-filter: blur(20px) saturate(1.5);
      box-shadow: var(--hoj-lg-shadow, 0 8px 24px rgba(0,0,0,.2));
    }

    .hoj-dialog__header {
      display: flex; align-items: center; padding: 14px 18px 10px;
      font-size: 15px; font-weight: 600; z-index: 1;
      border-bottom: 1px solid rgba(0, 0, 0, .06);
    }
    .hoj-dialog__close { margin-left: auto; cursor: pointer; opacity: .5; font-size: 16px; transition: opacity .15s; }
    .hoj-dialog__close:hover { opacity: 1; }

    .hoj-dialog__body { padding: 16px 18px; font-size: 13px; line-height: 1.6; overflow-y: auto; word-break: break-all; white-space: pre-wrap; }

    .hoj-dialog__footer { display: flex; justify-content: flex-end; gap: 8px; padding: 10px 18px 14px; border-top: 1px solid rgba(0, 0, 0, .06); }

    .hoj-dialog__btn { padding: 6px 14px; border-radius: 6px; border: 1px solid rgba(0, 0, 0, .1); cursor: pointer; font-size: 13px; font-family: inherit; transition: background .15s, border-color .15s, color .15s; }
    .hoj-dialog__btn--cancel { background: transparent; color: #24292E; }
    .hoj-dialog__btn--cancel:hover { background: rgba(0, 0, 0, .06); }
    .hoj-dialog__btn--confirm { background: #409EFF; color: #FFFFFF; border-color: #409EFF; }
    .hoj-dialog__btn--confirm:hover { background: #66B1FF; }

    html.hoj-dark-mode .hoj-dialog__btn--cancel { color: #FFFFFF; border-color: rgba(255, 255, 255, .1); }
    html.hoj-dark-mode .hoj-dialog__btn--cancel:hover { background: rgba(255, 255, 255, .08); }

    .hoj-dialog--success { border: 3px solid #19BE6B; }
    .hoj-dialog--error   { border: 3px solid #ED4014; }
    .hoj-dialog--warning { border: 3px solid #FF9900; }
    .hoj-dialog--info    { border: 3px solid #2DB7F5; }

    .hoj-dialog.hoj-dialog--fullscreen {
      position: fixed !important; inset: 0 !important; width: 100vw !important;
      min-width: 100vw !important; max-width: 100vw !important;
      height: 100vh !important; min-height: 100vh !important; max-height: 100vh !important;
      margin: 0 !important; padding: 0 !important; box-sizing: border-box !important;
      border-radius: 0 !important; transform: none !important; animation: none !important;
      display: flex !important; flex-direction: column !important; overflow: hidden !important; box-shadow: none !important;
    }
    .hoj-dialog.hoj-dialog--fullscreen > .hoj-dialog__header { flex: 0 0 auto; padding: 14px 18px; font-size: 16px; border-radius: 0; }
    .hoj-dialog.hoj-dialog--fullscreen > .hoj-dialog__body { flex: 1 1 auto; min-height: 0; max-height: none !important; padding: 16px 18px; border-radius: 0; overflow-y: auto; }
    html.hoj-dark-mode .hoj-dialog.hoj-dialog--fullscreen { background: var(--hoj-card-bg, #37373FE0); }

    /* ---------- 高性能模式 ----------
     * html.hoj-perf-mode 由 setPerfMode() 切换：
     *   - 去掉 Dialog / mask 的进出动画（避免逐帧合成）
     *   - 去掉 mask 的背景模糊（backdrop-filter 是最贵的属性之一）
     */
    html.hoj-perf-mode .hoj-dialog-mask {
      animation: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
    html.hoj-perf-mode .hoj-dialog {
      animation: none !important;
      /* 液态玻璃下 dialog 本身也有 20px 模糊，一并去掉 */
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
    /* 去掉模糊后需要不透明背景，否则会透出背后的内容 */
    html.hoj-perf-mode.hoj-lg-active:not(.hoj-dark-mode) .hoj-dialog {
      background: #FFFFFF !important;
    }
    html.hoj-perf-mode.hoj-lg-active.hoj-dark-mode .hoj-dialog {
      background: #37373F !important;
    }
    html.hoj-perf-mode .hoj-dialog__btn,
    html.hoj-perf-mode .hoj-dialog__close {
      transition: none !important;
    }

    @media (max-width: 767px) {
      .hoj-dialog-mask { align-items: stretch; justify-content: stretch; }
      .hoj-dialog { width: 100vw !important; max-width: 100vw !important; min-width: 0 !important; height: 100vh !important; max-height: 100vh !important; border-radius: 0 !important; box-shadow: none !important; }
      .hoj-dialog__header { padding: 14px 16px 12px; font-size: 16px; }
      .hoj-dialog__body { padding: 16px 16px; font-size: 14px; flex: 1 1 auto; min-height: 0; }
      .hoj-dialog__footer { padding: 12px 16px 16px; }
      .hoj-dialog__btn { padding: 8px 18px; font-size: 14px; }
      .hoj-dialog__close { font-size: 20px; padding: 4px; }
    }
  `;
  document.head.appendChild(style);
})();

// ============================================================
// Custom Dialog (DOM-based body)
// ============================================================
export interface CustomDialogOptions {
  title?: string;
  bodyEl: HTMLElement;
  width?: string;
  maxHeight?: string;
  fullscreen?: boolean;
  onClose?: () => void;
}

export function openCustomDialog(opts: CustomDialogOptions): () => void {
  const { title = '提示', bodyEl, width = '600px', maxHeight = '80vh', fullscreen = false, onClose = null } = opts;
  if (!bodyEl) return () => {};

  const isMobile = window.innerWidth < 768;
  const useFullscreen = fullscreen === true || isMobile;

  const mask = document.createElement('div');
  mask.className = 'hoj-dialog-mask';
  mask.style.zIndex = '2147483600';

  const dialog = document.createElement('div');
  dialog.className = 'hoj-dialog';
  if (useFullscreen) dialog.classList.add('hoj-dialog--fullscreen');

  if (!useFullscreen) {
    if (width) dialog.style.width = width;
    dialog.style.maxWidth = 'calc(100vw - 40px)';
  }

  const header = document.createElement('div');
  header.className = 'hoj-dialog__header';
  header.textContent = _i18nResolve(title);

  const closeBtn = document.createElement('i');
  closeBtn.className = 'hoj-dialog__close el-icon-close';
  closeBtn.style.cssText = 'cursor: pointer; padding: 6px; margin: -6px 0 0 auto;';
  closeBtn.addEventListener('click', () => close());
  header.appendChild(closeBtn);

  const body = document.createElement('div');
  body.className = 'hoj-dialog__body';
  if (!useFullscreen && maxHeight) body.style.maxHeight = maxHeight;
  body.style.overflowY = 'auto';
  body.style.whiteSpace = 'normal';
  body.appendChild(bodyEl);

  dialog.append(header, body);
  mask.appendChild(dialog);
  document.body.appendChild(mask);
  lockPageScroll();

  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    document.removeEventListener('keydown', onKey);

    const finish = () => {
      mask.remove();
      unlockPageScroll();
      if (typeof onClose === 'function') {
        try { onClose(); } catch (e) { console.warn('[CustomDialog] onClose error:', e); }
      }
    };

    // 高性能模式：跳过淡出，立即清理
    if (_perfMode) {
      finish();
      return;
    }

    mask.style.animation = 'hojDialogMaskOut .18s ease-in forwards';
    dialog.style.animation = 'hojDialogOut .18s ease-in forwards';
    setTimeout(finish, 180);
  };

  mask.addEventListener('click', (e) => { if (e.target === mask) close(); });

  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);

  return close;
}