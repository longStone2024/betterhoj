/**
 * Favorites Feature
 * Matches reference implementation exactly
 */

import { NewAlert } from '../core/api.js';
import { WebI18n } from '../core/i18n.js';
import type { Config } from '../core/config.js';
import { GM_getValue, GM_setValue } from '../core/storage.js';
import { parseProblemContext } from './problemContext.js';

interface Favorite {
  problemId: string;
  title: string;
  href: string;
  addedAt: number;
}

const FAVORITES_KEY = 'hoj_problem_favorites';

export function getFavorites(): Favorite[] {
  try {
    const raw = GM_getValue(FAVORITES_KEY, '[]');
    const arr = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return Array.isArray(arr) ? arr : [];
  } catch (e) { return []; }
}

export function saveFavorites(list: Favorite[]): void {
  try { GM_setValue(FAVORITES_KEY, JSON.stringify(list)); } catch (e) {}
}

function isFavorite(problemId: string): boolean {
  return getFavorites().some(f => f.problemId === problemId);
}

function addFavorite(problemId: string, title: string, href: string): void {
  const list = getFavorites();
  if (list.some(f => f.problemId === problemId)) return;
  list.push({ problemId, title, href, addedAt: Date.now() });
  saveFavorites(list);
}

function removeFavorite(problemId: string): void {
  saveFavorites(getFavorites().filter(f => f.problemId !== problemId));
}

function toggleFavorite(problemId: string, title: string, href: string): boolean {
  if (isFavorite(problemId)) { removeFavorite(problemId); return false; }
  addFavorite(problemId, title, href);
  return true;
}

function escapeHtml(s: string): string {
  const div = document.createElement('div');
  div.textContent = String(s ?? '');
  return div.innerHTML;
}

/** 找到题目列表表格（通过表头关键字判断，避免依赖 tid 号） */
function getProblemListTable(): HTMLTableElement | null {
  const tables = document.querySelectorAll('.vxe-table');
  for (const t of tables) {
    const titles = Array.from(t.querySelectorAll('thead th .vxe-cell--title'))
      .map(h => h.textContent.trim());
    if (titles.includes('题目ID') && titles.includes('题目') && titles.includes('难度')) {
      return t as HTMLTableElement;
    }
  }
  return null;
}

/** 通过表头文字找到列索引（返回 0-based，找不到返回 -1） */
function findColumnIndexByTitle(table: HTMLTableElement, titleText: string): number {
  const ths = Array.from(table.querySelectorAll('thead th'));
  return ths.findIndex(th => {
    const t = th.querySelector('.vxe-cell--title');
    return t && t.textContent.trim() === titleText;
  });
}

/** 往表格每一行注入星标收藏按钮（放在第一列） */
export function injectFavoriteButtonsIntoTable(table: HTMLTableElement): void {
  if (!table) return;

  const ths = Array.from(table.querySelectorAll('thead th'));
  let idColIdx = -1, titleColIdx = -1;
  ths.forEach((th, i) => {
    const t = th.querySelector('.vxe-cell--title');
    if (!t) return;
    const txt = t.textContent.trim();
    if (txt === '题目ID') idColIdx = i;
    else if (txt === '题目') titleColIdx = i;
  });
  if (idColIdx === -1 || titleColIdx === -1) return;

  const firstColIdx = 0;

  table.querySelectorAll('tbody tr.vxe-body--row').forEach(row => {
    const tds = Array.from(row.querySelectorAll('td.vxe-body--column'));
    if (tds.length <= Math.max(idColIdx, titleColIdx, firstColIdx)) return;

    const idTd = tds[idColIdx];
    const titleTd = tds[titleColIdx];
    const firstTd = tds[firstColIdx];

    const idEl = idTd.querySelector('.vxe-cell--label');
    const titleEl = titleTd.querySelector('.title-a');
    if (!idEl || !titleEl) return;

    const problemId = idEl.textContent.trim();
    const title = titleEl.textContent.trim();
    const href = titleEl.getAttribute('href') || `/problem/${problemId}`;

    let btn = firstTd.querySelector('.hoj-fav-btn') as HTMLElement | null;

    if (!btn) {
      btn = document.createElement('i');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        // 从 dataset 读取当前值，而不是闭包
        const curId = btn!.dataset.problemId!;
        const curTitle = btn!.dataset.title || curId;
        const curHref = btn!.dataset.href || `/problem/${curId}`;
        const nowFav = toggleFavorite(curId, curTitle, curHref);

        // 同步所有同 problemId 的按钮（列表行 + 其他位置）
        document.querySelectorAll('.hoj-fav-btn').forEach(el => {
          if (el.dataset.problemId === curId) {
            el.className = `hoj-fav-btn ${nowFav ? 'el-icon-star-on is-fav' : 'el-icon-star-off'}`;
            el.title = nowFav ? '取消收藏' : '收藏';
          }
        });

        NewAlert((nowFav ? '已收藏：' : '已取消收藏：') + curId,
          nowFav ? 'success' : 'info');
        renderFavoritePanel();
      });

      const cellDiv = firstTd.querySelector('.vxe-cell') || firstTd;
      cellDiv.style.display = 'flex';
      cellDiv.style.alignItems = 'center';
      cellDiv.style.justifyContent = 'center';
      cellDiv.appendChild(btn);
    }

    //  关键修复：无论按钮是否已存在，都同步它与当前行
    const fav = isFavorite(problemId);
    btn.dataset.problemId = problemId;
    btn.dataset.title = title;
    btn.dataset.href = href;
    btn.className = `hoj-fav-btn ${fav ? 'el-icon-star-on is-fav' : 'el-icon-star-off'}`;
    btn.title = fav ? '取消收藏' : '收藏';
  });
}

function getRightColumn(): HTMLElement | null {
  const table = getProblemListTable();
  if (!table) return null;
  const row = table.closest('.el-row');
  if (!row) return null;
  // 优先精确 md-6 / lg-6，其次取最后一个 el-col
  return row.querySelector(':scope > .el-col:last-child') as HTMLElement | null;
}

export function renderFavoritePanel(): void {
  if (!getProblemListTable()) return;

  let panel = document.getElementById('hoj-favorites-panel');

  const rightCol = getRightColumn();
  if (!rightCol) return;

  if (!panel || panel.parentElement !== rightCol) {
    if (panel) panel.remove();
    panel = document.createElement('div');
    panel.id = 'hoj-favorites-panel';
    panel.className = 'el-card is-always-shadow';
    panel.style.marginBottom = '10px';
    rightCol.insertBefore(panel, rightCol.firstChild);
  }

  const favorites = getFavorites().sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));

  panel.innerHTML = `
    <div class="el-card__header">
      <div style="text-align:center;">
        <span class="taglist-title" data-v-83ac00a2=""> 我的收藏 (${favorites.length})</span>
      </div>
    </div>
    <div class="el-card__body">
      ${favorites.length === 0
        ? '<div style="text-align:center;color:#999;padding:10px 0;font-size:13px;">暂无收藏题目</div>'
        : `<ul class="hoj-fav-list">
              ${favorites.map(f => `
                  <li class="hoj-fav-item" data-id="${escapeHtml(f.problemId)}">
                      <a href="${escapeHtml(f.href)}" class="hoj-fav-link" title="${escapeHtml(f.title)}">
                          <span class="hoj-fav-id">${escapeHtml(f.problemId)}</span>
                          <span class="hoj-fav-title">${escapeHtml(f.title)}</span>
                      </a>
                      <i class="el-icon-close hoj-fav-remove" title="移除"></i>
                  </li>
              `).join('')}
            </ul>`
      }
    </div>
  `;

  // 绑定移除
  panel.querySelectorAll('.hoj-fav-remove').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const li = el.closest('.hoj-fav-item');
      const id = li?.dataset.id;
      if (!id) return;
      removeFavorite(id);
      const star = document.querySelector(`.hoj-fav-btn[data-problem-id="${id}"]`);
      if (star) { star.className = 'hoj-fav-btn el-icon-star-off'; star.title = '收藏'; }
      renderFavoritePanel();
    });
  });
}

export function updateFavoriteDetailButton(): void {
  const btn = document.getElementById('hoj-fav-detail-btn');
  if (!btn) return;
  // 模块化后 problemDetail 的状态不再挂在 window 上，这里统一从 URL 解析，
  // 与 addFavoriteButtonToDetail 使用同一个 key。
  const ctx = parseProblemContext();
  const problemId = ctx?.type === 'contest' ? ctx.displayId : ctx?.problemId || '';
  if (!problemId) return;
  const fav = isFavorite(String(problemId));
  btn.innerHTML = `<i class="${fav ? 'el-icon-star-on' : 'el-icon-star-off'}"></i> ${fav ? '已收藏' : '收藏'}`;
  btn.style.color = fav ? '#F7BA2A' : '';
}

/** 详情页：在 .question-intr 内注入收藏按钮 */
export function addFavoriteButtonToDetail(): void {
  const c = document.querySelector('.question-intr');
  if (!c) return;

  // 只在题目详情页生效：路径包含 /problem/ 且不是题目列表
  if (!/\/problem\/[^\/?#]+/.test(window.location.pathname)) return;
  // 若列表页也有 .question-intr（不会），用表格判断排除
  if (getProblemListTable()) return;

  // 用外部 problemId（如 A002 / CF-207A1）作为收藏 key，跟列表页保持一致
  const ctx = parseProblemContext();
  const problemId = ctx?.type === 'contest' ? ctx.displayId : ctx?.problemId || '';
  if (!problemId) return;

  // 已注入则只更新状态
  let btn = document.getElementById('hoj-fav-detail-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'hoj-fav-detail-btn';
    btn.type = 'button';
    btn.className = 'el-button el-button--primary is-plain bhoj-mini-button';
    btn.style.cssText = 'padding:5px 10px;margin-left:8px;cursor:pointer;';

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const title = document.querySelector('.panel-title > span[data-v-1c61011a]')
        ?.textContent?.trim() || String(problemId);
      const href = window.location.href;
      const nowFav = toggleFavorite(String(problemId), title, href);
      updateFavoriteDetailButton();
      NewAlert(nowFav ? '已收藏：' + problemId : '已取消收藏：' + problemId,
        nowFav ? 'success' : 'info');
    });

    c.appendChild(btn);
  }
  updateFavoriteDetailButton();
}

export function clearAllFavorites(): void {
  saveFavorites([]);
  // 更新所有已注入的星标按钮
  document.querySelectorAll('.hoj-fav-btn').forEach(btn => {
    btn.className = 'hoj-fav-btn el-icon-star-off';
    btn.title = '收藏';
  });
  // 刷新右侧收藏面板
  renderFavoritePanel();
  // 刷新详情页按钮
  updateFavoriteDetailButton();
  NewAlert('已清空所有收藏', 'warning');
}

/** 入口：根据页面情况调用 */
export function setupFavorites(): void {
  const table = getProblemListTable();
  if (!table)
  {
    console.log("Not Found Table");
    return;
  }
  console.log("Found Table");
  injectFavoriteButtonsIntoTable(table);
  renderFavoritePanel();
}
