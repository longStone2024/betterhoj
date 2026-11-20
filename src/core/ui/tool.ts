/**
 * NewTool: Generic widget container with drag, resize, and persistence
 */

import { GM_getValue, GM_setValue } from '../storage.js';

export interface NewToolOptions {
  id: string;
  title?: string;
  icon?: string;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  left?: number;
  top?: number;
  onClick?: (tool: NewTool) => void;
  onResize?: (bodyEl: HTMLElement, width: number, height: number) => void;
  hideCloseButton?: boolean;
  onClose?: (tool: NewTool) => void;
}

export class NewTool {
  id: string;
  title: string;
  icon: string;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  left: number;
  top: number;
  onClick: ((tool: NewTool) => void) | null;
  onResize: ((bodyEl: HTMLElement, width: number, height: number) => void) | null;
  hideCloseButton: boolean;
  onClose: ((tool: NewTool) => void) | null;

  private _defaultWidth: number;
  private _defaultHeight: number;
  private _defaultLeft: number;
  private _defaultTop: number;

  el: HTMLDivElement;
  headerEl: HTMLDivElement;
  bodyEl: HTMLDivElement;
  handleEl: HTMLDivElement;

  private _dragMoved = false;
  private _cleanup: (() => void) | null = null;

  constructor(opts: NewToolOptions) {
    if (!opts.id) throw new Error('NewTool: id required');
    this.id = opts.id;
    this.title = opts.title || this.id;
    this.icon = opts.icon || '';
    this.width = opts.width || 220;
    this.height = opts.height || 120;
    this.minWidth = opts.minWidth || 140;
    this.minHeight = opts.minHeight || 60;
    this.left = opts.left ?? (window.innerWidth - this.width - 20);
    this.top = opts.top ?? 80;
    this.onClick = opts.onClick || null;
    this.onResize = opts.onResize || null;
    this.hideCloseButton = !!opts.hideCloseButton;
    this.onClose = opts.onClose || null;

    this._defaultWidth = this.width;
    this._defaultHeight = this.height;
    this._defaultLeft = this.left;
    this._defaultTop = this.top;

    this._loadState();
    this._build();
    this._mount();
  }

  _key(k: string): string {
    return `hoj_tool_${this.id}_${k}`;
  }

  _loadState(): void {
    try {
      const raw = GM_getValue(this._key('state'), null);
      if (!raw) return;
      const s = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (typeof s.left === 'number') this.left = s.left;
      if (typeof s.top === 'number') this.top = s.top;
      if (typeof s.width === 'number') this.width = s.width;
      if (typeof s.height === 'number') this.height = s.height;
    } catch (e) {}
  }

  _saveState(): void {
    try {
      GM_setValue(this._key('state'), JSON.stringify({
        left: this.left, top: this.top,
        width: this.width, height: this.height
      }));
    } catch (e) {}
  }

  _build(): void {
    const el = document.createElement('div');
    el.id = `hoj-tool-${this.id}`;
    el.className = 'hoj-tool';
    el.style.left = this.left + 'px';
    el.style.top = this.top + 'px';
    el.style.width = this.width + 'px';
    el.style.height = this.height + 'px';

    const header = document.createElement('div');
    header.className = 'hoj-tool__header';
    header.innerHTML = `
      <span class="hoj-tool__title">${this.icon} ${this.title}</span>
      <span class="hoj-tool__actions">
        <i class="hoj-tool__btn hoj-tool__reset el-icon-refresh-right" title="${this._t('tool.reset')}"></i>
        ${this.hideCloseButton ? '' : `<i class="hoj-tool__btn hoj-tool__close el-icon-close" title="${this._t('tool.close')}"></i>`}
      </span>
    `;
    const body = document.createElement('div');
    body.className = 'hoj-tool__body';
    const handle = document.createElement('div');
    handle.className = 'hoj-tool__resize';
    el.append(header, body, handle);

    this.el = el;
    this.headerEl = header;
    this.bodyEl = body;
    this.handleEl = handle;

    this._bindDrag();
    this._bindResize();
    this._bindClick();
  }

  private _t(key: string): string {
    // Will be replaced by i18n at runtime
    return `@${key}`;
  }

  _bindDrag(): void {
    let dragging = false, sx = 0, sy = 0, sl = 0, st = 0;
    const onDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.target instanceof Element && e.target.closest('.hoj-tool__btn')) return;
      e.preventDefault();
      this._dragMoved = false;
      dragging = true;
      sx = e.clientX; sy = e.clientY;
      sl = this.left; st = this.top;
      document.addEventListener('mousemove', onMove, true);
      document.addEventListener('mouseup', onUp, true);
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) this._dragMoved = true;
      this.left = Math.max(0, Math.min(sl + dx, window.innerWidth - this.width));
      this.top = Math.max(0, Math.min(st + dy, window.innerHeight - 40));
      this.el.style.left = this.left + 'px';
      this.el.style.top = this.top + 'px';
    };
    const onUp = () => {
      dragging = false;
      document.removeEventListener('mousemove', onMove, true);
      document.removeEventListener('mouseup', onUp, true);
      this._saveState();
      setTimeout(() => { this._dragMoved = false; }, 0);
    };
    this.headerEl.addEventListener('mousedown', onDown);
  }

  _bindResize(): void {
    let resizing = false, sx = 0, sy = 0, sw = 0, sh = 0;
    const onDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      resizing = true;
      sx = e.clientX; sy = e.clientY;
      sw = this.width; sh = this.height;
      document.addEventListener('mousemove', onMove, true);
      document.addEventListener('mouseup', onUp, true);
    };
    const onMove = (e: MouseEvent) => {
      if (!resizing) return;
      this.width = Math.max(this.minWidth, sw + e.clientX - sx);
      this.height = Math.max(this.minHeight, sh + e.clientY - sy);
      this.el.style.width = this.width + 'px';
      this.el.style.height = this.height + 'px';
      if (this.onResize) this.onResize(this.bodyEl, this.width, this.height);
    };
    const onUp = () => {
      resizing = false;
      document.removeEventListener('mousemove', onMove, true);
      document.removeEventListener('mouseup', onUp, true);
      this._saveState();
    };
    this.handleEl.addEventListener('mousedown', onDown);
  }

  _bindClick(): void {
    this.headerEl.addEventListener('click', (e) => {
      if (e.target instanceof Element && e.target.closest('.hoj-tool__btn')) return;
      if (this._dragMoved) return;
      if (this.onClick) this.onClick(this);
    });
    const resetBtn = this.headerEl.querySelector('.hoj-tool__reset');
    if (resetBtn) resetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.resetPosition();
    });
    const closeBtn = this.headerEl.querySelector('.hoj-tool__close');
    if (closeBtn) closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.hide();
      if (this.onClose) {
        try { this.onClose(this); } catch (err) { console.warn('[NewTool] onClose error:', err); }
      }
    });
  }

  resetPosition(): void {
    this.width = this._defaultWidth;
    this.height = this._defaultHeight;
    this.left = window.innerWidth - this.width - 20;
    this.top = 80;
    this.el.style.left = this.left + 'px';
    this.el.style.top = this.top + 'px';
    this.el.style.width = this.width + 'px';
    this.el.style.height = this.height + 'px';
    this._saveState();
    if (this.onResize) this.onResize(this.bodyEl, this.width, this.height);
  }

  _mount(): void {
    if (!document.body.contains(this.el)) document.body.appendChild(this.el);
  }

  hide(): void {
    if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
  }

  show(): void { this._mount(); }

  destroy(): void {
    if (this._cleanup) this._cleanup();
    if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
  }

  setCleanup(fn: () => void): void {
    this._cleanup = fn;
  }
}

// Inject tool styles once
(function injectToolStyle() {
  if (document.getElementById('hoj-tool-style')) return;
  const style = document.createElement('style');
  style.id = 'hoj-tool-style';
  style.textContent = `
    .hoj-tool {
      position: fixed;
      z-index: 99998;
      display: flex;
      flex-direction: column;
      background: var(--hoj-card-bg, #FFFFFFE0);
      backdrop-filter: blur(var(--hoj-card-blur, 20px)) saturate(1.35);
      -webkit-backdrop-filter: blur(var(--hoj-card-blur, 20px)) saturate(1.35);
      color: var(--hoj-text-dark, #24292E);
      border-radius: var(--hoj-card-radius, 15px);
      box-shadow: 0 2px 12px rgba(0,0,0,.15);
      overflow: hidden;
      font-family: var(--hoj-sans-font, sans-serif);
      font-size: 13px;
    }
    .hoj-tool__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 10px;
      font-size: 13px;
      font-weight: 600;
      cursor: move;
      border-bottom: 1px solid rgba(0,0,0,.06);
      user-select: none;
      touch-action: none;
    }
    .hoj-tool__title { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .hoj-tool__actions { display: flex; gap: 6px; }
    .hoj-tool__btn {
      cursor: pointer;
      opacity: .5;
      transition: opacity .15s;
      font-size: 14px;
    }
    .hoj-tool__btn:hover { opacity: 1; }
    .hoj-tool__body {
      flex: 1;
      overflow: auto;
      padding: 8px 10px;
      font-size: 13px;
      word-break: break-all;
    }
    .hoj-tool__resize {
      position: absolute;
      right: 0; bottom: 0;
      width: 12px; height: 12px;
      cursor: nwse-resize;
      background: linear-gradient(135deg, transparent 50%, rgba(0,0,0,.18) 50%);
      border-bottom-right-radius: inherit;
    }

    html.hoj-dark-mode .hoj-tool { background: #37373FE0; color: #FFFFFF; }
    html.hoj-dark-mode .hoj-tool__header { border-color: rgba(255,255,255,.08); }
  `;
  document.head.appendChild(style);
})();