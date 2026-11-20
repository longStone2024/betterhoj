/**
 * Discussion Like Buttons
 * 接管旧前端讨论详情页与新前端 /new/discussion 的点赞 / 取消点赞按钮，
 * 附带 10 秒冷却进度条。逻辑与原版 betterhoj27.3.7 保持一致。
 */

import { NewAlert } from '../core/api.js';

const HOJ_LIKE_COOLDOWN_MS = 10 * 1000;

let _hojLikeCoolEnd = 0;
let _hojLikeCoolRaf: number | null = null;

let _hojNewLikeCoolEnd = 0;
let _hojNewLikeCoolRaf: number | null = null;
let _hojNewLikeCoolBox: HTMLElement | null = null;

/* ============================================================
 * 页面判断
 * ============================================================ */

export function isDiscussionDetailPage(): boolean {
  const p = window.location.pathname;
  return /^\/discussion-detail\/[^\/?#]+/.test(p) ||
         /^\/group\/[^\/]+\/discussion-detail\/[^\/?#]+/.test(p);
}

export function getDiscussionIdFromUrl(): string | null {
  const p = window.location.pathname;
  let m = p.match(/^\/discussion-detail\/([^\/?#]+)/);
  if (m) return decodeURIComponent(m[1]);
  m = p.match(/^\/group\/[^\/]+\/discussion-detail\/([^\/?#]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

export function isNewDiscussionPage(): boolean {
  return /^\/new\/discussion\/[^\/?#]+/.test(window.location.pathname);
}

export function getNewDiscussionId(): string | null {
  const m = window.location.pathname.match(/^\/new\/discussion\/([^\/?#]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

/* ============================================================
 * 点赞请求（两种前端共用）
 * ============================================================ */

async function requestLike(did: string, toLike: boolean): Promise<{ ok: boolean; reason: string }> {
  try {
    const token = localStorage.getItem('token') || '';
    const url = `${window.location.origin}/api/discussion-like`
      + `?did=${encodeURIComponent(did)}`
      + `&toLike=${toLike ? 'true' : 'false'}`;
    const resp = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': token, 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    let data: any = null;
    try { data = await resp.json(); } catch (_) { data = null; }

    const bizStatus = data && typeof data.status !== 'undefined' ? data.status : 200;
    const ok = resp.ok && bizStatus === 200;
    if (ok) return { ok: true, reason: '' };

    const reason =
      (data && (data.msg || data.message || data.error)) ||
      (resp.status === 401 || bizStatus === 401 ? '请先登录后再操作' : '') ||
      (resp.status === 403 || bizStatus === 403 ? '没有权限执行此操作' : '') ||
      (resp.status === 429 || bizStatus === 429 ? '操作过于频繁，请稍后再试' : '') ||
      (resp.status >= 500 ? '服务器错误，请稍后再试' : '') ||
      (toLike ? '点赞失败' : '取消失败');
    return { ok: false, reason };
  } catch (e) {
    console.error('[DiscussionLike] 请求失败:', e);
    return { ok: false, reason: '网络错误，请稍后重试' };
  }
}

/* ============================================================
 * 旧前端：/discussion-detail/{did}
 * ============================================================ */

export function injectDiscussionLikeButtons(): boolean {
  if (!isDiscussionDetailPage()) return false;

  const did = getDiscussionIdFromUrl();
  if (!did) return false;

  // 已经注入过 → 直接返回
  if (document.getElementById('hoj-like-box')) return true;

  // 找原生按钮，隐藏它们
  const nativeLike = document.querySelector('a.like[data-v-13564ee3], a.like');
  if (!nativeLike) return false;

  const parent = nativeLike.parentElement;
  if (!parent) return false;

  parent.querySelectorAll('a.like').forEach(a => {
    (a as HTMLElement).style.display = 'none';
  });

  /* ---------- 构造我们的按钮 ---------- */
  const box = document.createElement('div');
  box.id = 'hoj-like-box';
  box.className = 'hoj-like-box';
  box.innerHTML = `
        <button type="button" class="hoj-like-btn hoj-like-btn--like">
            <i class="fa fa-thumbs-o-up"></i><span>点赞</span>
        </button>
        <button type="button" class="hoj-like-btn hoj-like-btn--unlike">
            <i class="fa fa-thumbs-down"></i><span>取消点赞</span>
        </button>
        <span class="hoj-like-cooldown" aria-live="polite"></span>
        <span class="hoj-like-progress"><span class="hoj-like-progress-inner"></span></span>
    `;
  // 插到第一个原生 a.like 的位置（保持原视觉顺序）
  const firstLike = parent.querySelector('a.like');
  if (firstLike && firstLike.parentNode === parent) {
    parent.insertBefore(box, firstLike);
  } else {
    parent.appendChild(box);   // 兜底
  }

  const likeBtn = box.querySelector('.hoj-like-btn--like') as HTMLButtonElement;
  const unlikeBtn = box.querySelector('.hoj-like-btn--unlike') as HTMLButtonElement;
  const cdEl = box.querySelector('.hoj-like-cooldown') as HTMLElement;
  const barInner = box.querySelector('.hoj-like-progress-inner') as HTMLElement;

  /* ---------- 冷却控制 ---------- */
  const setButtonsDisabled = (disabled: boolean) => {
    likeBtn.disabled = disabled;
    unlikeBtn.disabled = disabled;
  };

  const endCooldown = () => {
    _hojLikeCoolEnd = 0;
    if (_hojLikeCoolRaf) {
      cancelAnimationFrame(_hojLikeCoolRaf);
      _hojLikeCoolRaf = null;
    }
    box.classList.remove('is-cooldown');
    setButtonsDisabled(false);
    cdEl.textContent = '';
    barInner.style.width = '100%';
  };

  const startCooldown = () => {
    _hojLikeCoolEnd = Date.now() + HOJ_LIKE_COOLDOWN_MS;
    box.classList.add('is-cooldown');
    setButtonsDisabled(true);

    // 进度条动画（重启动画需要 reflow）
    barInner.style.transition = 'none';
    barInner.style.width = '100%';
    void barInner.offsetHeight;
    barInner.style.transition = `width ${HOJ_LIKE_COOLDOWN_MS}ms linear`;
    requestAnimationFrame(() => {
      barInner.style.width = '0%';
    });

    const tick = () => {
      const remain = _hojLikeCoolEnd - Date.now();
      if (remain <= 0) {
        endCooldown();
        return;
      }
      cdEl.textContent = Math.ceil(remain / 1000) + 's';
      _hojLikeCoolRaf = requestAnimationFrame(tick);
    };
    if (_hojLikeCoolRaf) cancelAnimationFrame(_hojLikeCoolRaf);
    _hojLikeCoolRaf = requestAnimationFrame(tick);
  };

  const sendLike = async (toLike: boolean) => {
    if (box.classList.contains('is-cooldown')) return;

    startCooldown();   // 立即进入冷却，防止连点

    const res = await requestLike(did, toLike);
    if (res.ok) {
      NewAlert(toLike ? '点赞成功' : '已取消点赞', 'success', 1500);
      return;
    }
    endCooldown();
    NewAlert(res.reason, 'error', 2500);
  };

  likeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    sendLike(true);
  });

  unlikeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    sendLike(false);
  });

  console.log('[DiscussionLike] 已接管点赞按钮 did=' + did);
  return true;
}

/* 离开页面时清理 */
export function cleanupDiscussionLikeButtons(): void {
  if (_hojLikeCoolRaf) {
    cancelAnimationFrame(_hojLikeCoolRaf);
    _hojLikeCoolRaf = null;
  }
  _hojLikeCoolEnd = 0;
  const box = document.getElementById('hoj-like-box');
  if (box) box.remove();
}

/* ============================================================
 * 新前端：/new/discussion/{did}
 * ============================================================ */

export function injectNewDiscussionLikeButtons(): boolean {
  if (!isNewDiscussionPage()) return false;
  const did = getNewDiscussionId();
  if (!did) return false;

  if (document.getElementById('hoj-new-like-box')) return true;

  // 找到原生点赞按钮：里面有一个 <span> 文本以「点赞」开头
  const allBtns = document.querySelectorAll('button[data-v-cf7f5c93], button');
  let nativeLike: HTMLElement | null = null;
  for (const btn of Array.from(allBtns) as HTMLElement[]) {
    const span = btn.querySelector('span');
    if (!span) continue;
    const txt = (span.textContent || '').trim();
    if (/^点赞(\s|$|\d)/.test(txt)) { nativeLike = btn; break; }
  }
  if (!nativeLike) return false;

  const parent = nativeLike.parentElement;
  if (!parent) return false;

  // 隐藏所有原生的「点赞 ...」按钮（可能有两个：未点赞态 + 已点赞态）
  parent.querySelectorAll('button').forEach(btn => {
    const span = btn.querySelector('span');
    if (span && /^点赞(\s|$|\d)/.test((span.textContent || '').trim())) {
      (btn as HTMLElement).style.display = 'none';
    }
  });

  /* ---------- 构造我们的按钮（文字颜色不同，样式与原生相近） ---------- */
  const box = document.createElement('div');
  box.id = 'hoj-new-like-box';
  box.className = 'hoj-new-like-box';
  box.innerHTML = `
        <button type="button" class="hoj-new-like-btn hoj-new-like-btn--like">
            <svg class="hoj-new-like-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                      d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"></path>
            </svg>
            <span>点赞</span>
        </button>
        <button type="button" class="hoj-new-like-btn hoj-new-like-btn--unlike">
            <svg class="hoj-new-like-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                      d="M10 15V19a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3zm7-13h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"></path>
            </svg>
            <span>取消点赞</span>
        </button>
        <span class="hoj-new-like-cd" aria-live="polite"></span>
        <span class="hoj-new-like-bar"><span class="hoj-new-like-bar-inner"></span></span>
    `;

  // 插到第一个被隐藏的原生按钮位置（保持视觉顺序）
  const firstHidden = (Array.from(parent.querySelectorAll('button')) as HTMLElement[])
    .find(b => b.style.display === 'none');
  if (firstHidden && firstHidden.parentNode === parent) {
    parent.insertBefore(box, firstHidden);
  } else {
    parent.appendChild(box);
  }

  const likeBtn = box.querySelector('.hoj-new-like-btn--like') as HTMLButtonElement;
  const unlikeBtn = box.querySelector('.hoj-new-like-btn--unlike') as HTMLButtonElement;
  const cdEl = box.querySelector('.hoj-new-like-cd') as HTMLElement;
  const barInner = box.querySelector('.hoj-new-like-bar-inner') as HTMLElement;

  /* ---------- 冷却控制（独立于旧前端） ---------- */
  const endCooldown = () => {
    _hojNewLikeCoolEnd = 0;
    if (_hojNewLikeCoolRaf) {
      cancelAnimationFrame(_hojNewLikeCoolRaf);
      _hojNewLikeCoolRaf = null;
    }
    box.classList.remove('is-cooldown');
    likeBtn.disabled = false;
    unlikeBtn.disabled = false;
    cdEl.textContent = '';
    barInner.style.width = '100%';
  };

  const startCooldown = () => {
    _hojNewLikeCoolEnd = Date.now() + HOJ_LIKE_COOLDOWN_MS;
    _hojNewLikeCoolBox = box;
    box.classList.add('is-cooldown');
    likeBtn.disabled = true;
    unlikeBtn.disabled = true;

    barInner.style.transition = 'none';
    barInner.style.width = '100%';
    void barInner.offsetHeight;
    barInner.style.transition = `width ${HOJ_LIKE_COOLDOWN_MS}ms linear`;
    requestAnimationFrame(() => { barInner.style.width = '0%'; });

    const tick = () => {
      const remain = _hojNewLikeCoolEnd - Date.now();
      if (remain <= 0) { endCooldown(); return; }
      cdEl.textContent = Math.ceil(remain / 1000) + 's';
      _hojNewLikeCoolRaf = requestAnimationFrame(tick);
    };
    if (_hojNewLikeCoolRaf) cancelAnimationFrame(_hojNewLikeCoolRaf);
    _hojNewLikeCoolRaf = requestAnimationFrame(tick);
  };

  /* ---------- 请求 ---------- */
  const sendLike = async (toLike: boolean) => {
    if (box.classList.contains('is-cooldown')) return;
    startCooldown();

    const res = await requestLike(did, toLike);
    if (res.ok) {
      NewAlert(toLike ? '点赞成功' : '已取消点赞', 'success', 1500);
      return;
    }
    endCooldown();
    NewAlert(res.reason, 'error', 2500);
  };

  likeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    sendLike(true);
  });
  unlikeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    sendLike(false);
  });

  console.log('[DiscussionLike/new] 已接管 did=' + did);
  return true;
}

export function cleanupNewDiscussionLikeButtons(): void {
  if (_hojNewLikeCoolRaf) {
    cancelAnimationFrame(_hojNewLikeCoolRaf);
    _hojNewLikeCoolRaf = null;
  }
  _hojNewLikeCoolEnd = 0;
  _hojNewLikeCoolBox = null;
  const box = document.getElementById('hoj-new-like-box');
  if (box) box.remove();
}
