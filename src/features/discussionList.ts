/**
 * Discussion List Edit / Delete Buttons
 * 接管旧前端讨论列表：为「自己的帖子」注入编辑与删除按钮，
 * 并优先复用页面自身的讨论列表接口响应。
 */

import { hojApi, NewAlert, NewDialog } from '../core/api.js';
import { WebI18n } from '../core/i18n.js';
import type { Config } from '../core/config.js';

/* ============================================================
 * 讨论列表响应缓存：优先使用页面自身请求的响应
 * ============================================================ */
let _discListCache: { params: Record<string, string>; data: any; ts: number; source: string } | null = null;
let _discListFetching = false;

const _DISC_LIST_URL_RE = /\/api\/(?:group\/)?get-discussion-list(?:\?|#|$)/;
const _DISC_LIST_PARAM_WHITELIST = ['keyword', 'cid', 'currentPage', 'limit', 'pid', 'onlyMine', 'gid'];

function _isDiscussionListUrl(url: unknown): boolean {
  return typeof url === 'string' && _DISC_LIST_URL_RE.test(url);
}

function _paramsFromUrl(url: string): Record<string, string> {
  try {
    const u = new URL(url, window.location.origin);
    const o: Record<string, string> = {};
    u.searchParams.forEach((v, k) => { o[k] = v; });
    return o;
  } catch (_) { return {}; }
}

function _discListParamsMatch(a: Record<string, string> | null | undefined, b: Record<string, string> | null | undefined): boolean {
  for (const k of _DISC_LIST_PARAM_WHITELIST) {
    if (String(a?.[k] ?? '') !== String(b?.[k] ?? '')) return false;
  }
  return true;
}

function _recordDiscussionList(url: string, json: any, source: string): void {
  if (!json || typeof json !== 'object') return;
  _discListCache = {
    params: _paramsFromUrl(url),
    data: json,
    ts: Date.now(),
    source
  };
  console.log('[DiscussionList] 缓存响应', _discListCache.params, '←', source);
}

/**
 * 监听页面自身的讨论列表请求（fetch + XHR），把响应缓存下来。
 * 只挂载一次。
 */
export function hookDiscussionListResponses(): void {
  if ((hookDiscussionListResponses as any)._done) return;
  (hookDiscussionListResponses as any)._done = true;

  /* ---------- 1) 页面 fetch ---------- */
  try {
    const prevFetch = window.fetch;
    window.fetch = function (input: any, init?: any) {
      const url = typeof input === 'string' ? input : (input && input.url) || '';
      const p = prevFetch.call(this, input, init);
      if (_isDiscussionListUrl(url)) {
        p.then((resp: Response) => {
          try {
            resp.clone().json()
              .then((j: any) => _recordDiscussionList(url, j, 'page-fetch'))
              .catch(() => {});
          } catch (_) {}
        }).catch(() => {});
      }
      return p;
    } as typeof window.fetch;
  } catch (e) {
    console.warn('[DiscussionList] hook fetch 失败:', e);
  }

  /* ---------- 2) 页面 XHR ---------- */
  try {
    const XHR = window.XMLHttpRequest;
    if (XHR && XHR.prototype) {
      const _open = XHR.prototype.open;
      const _send = XHR.prototype.send;

      XHR.prototype.open = function (this: any, method: string, url: string, ...rest: any[]) {
        this._hojDiscUrl = url;
        return (_open as any).call(this, method, url, ...rest);
      } as any;

      XHR.prototype.send = function (this: any, body?: any) {
        if (_isDiscussionListUrl(this._hojDiscUrl)) {
          this.addEventListener('load', () => {
            try {
              const j = JSON.parse(this.responseText);
              _recordDiscussionList(this._hojDiscUrl, j, 'page-xhr');
            } catch (_) {}
          }, { once: true });
        }
        return (_send as any).call(this, body);
      } as any;
    }
  } catch (e) {
    console.warn('[DiscussionList] hook XHR 失败:', e);
  }

  console.log('[DiscussionList] 响应监听已挂载');
}

/* ============================================================
 * 注入编辑 / 删除按钮
 * ============================================================ */

export async function injectDiscussionListEditButtons(config: Config): Promise<boolean> {
  if (!config.VditorDiscussionEdit) return false;

  const path = window.location.pathname;
  let gid: string | null = null;
  if (/^\/discussion\/?$/.test(path)) {
    gid = null;
  } else {
    const m = path.match(/^\/group\/([^\/]+)\/discussion\/?$/);
    if (!m) return false;
    gid = m[1];
  }

  /* ---------- 卡片已全处理过 → 跳过 ---------- */
  const allCards = [...document.querySelectorAll('.title-article > .el-card.list-card')];
  if (!allCards.length) return false;
  const allDone = allCards.every(c =>
    c.querySelector('.hoj-list-edit-btn') &&
    c.querySelector('.hoj-list-del-btn') &&
    [...c.querySelectorAll('.title-msg .el-dropdown')]
      .filter(dd => dd.querySelector('.el-icon-more'))
      .every(dd => dd.classList.contains('hoj-dropdown-replaced'))
  );
  if (allDone) return true;

  /* ---------- 1. 期望参数 ---------- */
  const sp = new URLSearchParams(window.location.search);
  const wantParams: Record<string, string> = {
    keyword: sp.get('keyword') ?? '',
    cid: sp.get('cid') ?? '',
    currentPage: sp.get('currentPage') ?? '1',
    limit: sp.get('limit') ?? '10',
    pid: sp.get('pid') ?? '',
    onlyMine: sp.get('onlyMine') ?? 'false'
  };
  if (gid !== null) wantParams.gid = gid;

  /* ---------- 2. 优先读页面自身请求的缓存 ---------- */
  let listData: any = null;

  if (_discListCache && _discListParamsMatch(_discListCache.params, wantParams)) {
    listData = (_discListCache as any).data?.data;
  } else if (!_discListFetching) {
    /* ---------- 3. 兜底：主动请求一次（带并发锁） ---------- */
    _discListFetching = true;
    try {
      const qs = new URLSearchParams(wantParams).toString();
      const urlPath = gid !== null
        ? `/api/group/get-discussion-list?${qs}`
        : `/api/get-discussion-list?${qs}`;
      const data = await hojApi(urlPath, { silent: true });
      // 记录成与页面响应一致的结构
      _recordDiscussionList(
        `${window.location.origin}${urlPath}`,
        { status: 200, data, msg: 'success' },
        'self'
      );
      listData = data;
    } catch (e) {
      console.warn('[DiscussionList] 主动请求失败:', e);
    } finally {
      _discListFetching = false;
    }
  } else {
    // 已有请求在飞 → 等下一轮 MutationObserver
    return false;
  }

  const records = Array.isArray(listData?.records) ? listData.records : [];
  if (!records.length) return false;

  /* ---------- 4. 按 API 顺序一一匹配 ---------- */

  const cardInfo = (card: Element) => {
    const titleEl = card.querySelector('.article-hlink > a');
    const descEl = card.querySelector('.article-hlink2 > p');
    const authorEl = card.querySelector('.title-msg .pl');
    return {
      title: titleEl ? (titleEl.textContent || '').trim() : '',
      description: descEl ? (descEl.textContent || '').trim() : '',
      author: authorEl ? (authorEl.textContent || '').trim() : ''
    };
  };
  const usedCards = new Set<Element>();
  const matches: Array<{ record: any; card: Element }> = [];

  for (const record of records) {
    for (const card of allCards) {
      if (usedCards.has(card)) continue;
      const info = cardInfo(card);
      if (info.title === (record.title || '')
        && info.description === (record.description || '')
        && info.author === (record.author || '')) {
        usedCards.add(card);
        matches.push({ record, card });
        break;
      }
    }
  }
  if (!matches.length) return false;

  /* ---------- 5. 给「自己的帖子」注入编辑 / 删除 ---------- */
  let injected = 0;

  for (const { record, card } of matches) {
    // content 为 null 视为「不是自己的/不可编辑」
    if (record.content === null || record.content === undefined) continue;

    const titleMsg = card.querySelector('.title-msg');
    if (!titleMsg) continue;

    /* ---------- 5.1 编辑按钮 ---------- */
    if (!card.querySelector('.hoj-list-edit-btn')) {
      const editBtn = document.createElement('a');
      editBtn.className = 'hoj-list-edit-btn';
      editBtn.setAttribute('href', 'javascript:void(0)');
      editBtn.innerHTML = '<i class="el-icon-edit-outline"></i><span></span>';
      const editSpan = editBtn.querySelector('span');
      if (editSpan) editSpan.textContent = WebI18n.t('discussion.edit');
      editBtn.title = WebI18n.t('discussion.edit');
      editBtn.dataset.did = String(record.id);

      editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // 传 gid 供编辑对话框决定端点和 body 字段
        openDiscussionEditor({ did: record.id, gid: gid ?? undefined });
      });

      titleMsg.appendChild(editBtn);
    }

    /* ---------- 5.2 删除按钮：隐藏三点下拉，在旁边插入独立删除按钮 ---------- */

    /* 1) 无论如何，先把该卡片上所有「更多」下拉隐藏掉（幂等） */
    card.querySelectorAll('.title-msg .el-dropdown').forEach(dd => {
      if (dd.querySelector('.el-icon-more')) {
        // 用 class 隐藏（配合 CSS !important），Vue 恢复 inline style 也无效
        dd.classList.add('hoj-dropdown-replaced');
      }
    });

    /* 2) 若还没插入删除按钮，则插入 */
    const existingDel = card.querySelector(`.hoj-list-del-btn[data-did="${record.id}"]`);
    if (!existingDel) {
      const delBtn = document.createElement('a');
      delBtn.className = 'hoj-list-del-btn';
      delBtn.setAttribute('href', 'javascript:void(0)');
      delBtn.dataset.did = String(record.id);
      delBtn.innerHTML = '<i class="el-icon-delete"></i><span></span>';
      const delSpan = delBtn.querySelector('span');
      if (delSpan) delSpan.textContent = WebI18n.t('discussion.delete');
      delBtn.title = WebI18n.t('discussion.delete');

      delBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const ok = await NewDialog({
          title: '@discussion.deleteConfirmTitle',
          content: '@discussion.deleteConfirmBody',
          type: 'warning'
        });
        if (!ok) return;

        const qs = new URLSearchParams({ did: String(record.id) });
        if (gid !== null) qs.set('gid', gid);
        const url = gid
          ? `/api/group/discussion?${qs.toString()}`
          : `/api/discussion?${qs.toString()}`;

        try {
          await hojApi(url, { method: 'DELETE' });
          NewAlert('@discussion.deleteSuccess', 'success', 1800);

          const cardEl = delBtn.closest('.title-article') as HTMLElement | null;
          if (cardEl) {
            cardEl.style.transition = 'opacity .25s';
            cardEl.style.opacity = '0';
            setTimeout(() => cardEl.remove(), 260);
          }
        } catch (err) {
          console.warn('[Discussion List] 删除失败:', err);
        }
      });

      // 优先插在「更多」下拉之前（DOM 里就在同一层，样式一致）
      const anchor =
        card.querySelector('.title-msg .el-dropdown.hidden-xs-only') ||
        card.querySelector('.title-msg .el-dropdown') ||
        card.querySelector('.title-msg');
      if (anchor && anchor.parentNode) {
        anchor.insertAdjacentElement('beforebegin', delBtn);
      }
    }

    injected++;
  }

  console.log(
    `[Discussion List] ${gid ? `group=${gid} ` : ''}` +
    `匹配 ${matches.length} 张卡片，注入 ${injected} 处按钮`
  );
  return injected > 0;
}

export function clearDiscussionListButtons(): void {
  document.querySelectorAll('.hoj-list-edit-btn, .hoj-list-del-btn').forEach(el => el.remove());
  // 同时清掉占位标记，让下一次 tryInject 能重新评估
  document.querySelectorAll('[data-hoj-disc-intercepted]').forEach(b => {
    delete (b as HTMLElement).dataset.hojDiscIntercepted;
  });
}

/* ============================================================
 * 编辑对话框（由入口注入，避免循环依赖）
 * ============================================================ */
type EditorOpener = (ctx: { did: string | number; gid?: string }) => void;

let _openEditor: EditorOpener | null = null;

export function setDiscussionEditorOpener(fn: EditorOpener): void {
  _openEditor = fn;
}

function openDiscussionEditor(ctx: { did: string | number; gid?: string }): void {
  if (_openEditor) {
    _openEditor(ctx);
  } else {
    console.warn('[DiscussionList] 编辑对话框未注册');
  }
}
