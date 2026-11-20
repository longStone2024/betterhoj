/**
 * Problem Recommendations Feature
 * Fetches and displays recommended problems based on Codeforces rating
 */

import { NewAlert, openCustomDialog } from '../core/api.js';
import { WebI18n } from '../core/i18n.js';
import type { Config } from '../core/config.js';

interface RecommendProblem {
  problemId: string;
  name: string;
  rating?: number;
  weight?: number;
}

interface HdnoipData {
  recommendations: {
    [key: string]: {
      problems: Array<{
        problem_id?: string;
        id?: string;
        name?: string;
        rating?: number;
        weight?: number;
        link?: string;
      }>;
      target_rating?: number;
      rating_range?: string;
    };
  };
}

const REC_CATEGORY_LABELS: Record<string, string> = {
  basic: '基础算法',
  thinking: '思维构造',
  dp: '动态规划',
  ds: '数据结构',
  graph: '图论算法',
  math: '数学数论',
  string: '字符串'
};

async function fetchHdnoipData(cfName: string): Promise<HdnoipData | null> {
  if (!cfName) return null;
  try {
    const resp = await fetch(
      `https://hdnoip.com/api/ability/student/${encodeURIComponent(cfName)}`,
      { method: 'GET', credentials: 'omit' }
    );
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const json = await resp.json();
    return json?.data || null;
  } catch (e) {
    console.warn('[Hdnoip] 请求失败:', e);
    return null;
  }
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

let recommendBtnInjected = false;

export function injectRecommendButton(config: Config): void {
  if (recommendBtnInjected) return;
  const pickOne = document.getElementById('pick-one');
  if (!pickOne || !config.hdnoipCFName) return;

  // Clone the original button to preserve class / data-v attributes / styles
  const btn = pickOne.cloneNode(true) as HTMLButtonElement;
  btn.id = 'hoj-rec-btn';
  btn.removeAttribute('long');
  btn.style.marginLeft = '8px';

  // Replace text content (preserve <i> icon node)
  const span = btn.querySelector('span');
  if (span) {
    span.childNodes.forEach(n => {
      if (n.nodeType === Node.TEXT_NODE) {
        n.textContent = ' 题目推荐 ';
      }
    });
  }

  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (btn.dataset.loading === '1') return;

    btn.dataset.loading = '1';
    const oldHtml = span ? span.innerHTML : '';
    if (span) span.innerHTML = '<i class="fa fa-spinner fa-spin"></i> 加载中...';

    try {
      await openRecommendDialog(config.hdnoipCFName);
    } catch (err) {
      console.error('[RecDialog] 出错:', err);
      NewAlert('打开推荐列表失败', 'error');
    } finally {
      btn.dataset.loading = '0';
      if (span) span.innerHTML = oldHtml;
    }
  });

  pickOne.insertAdjacentElement('afterend', btn);
  recommendBtnInjected = true;
  console.log('[RecDialog] 题目推荐按钮已注入');
}

export async function openRecommendDialog(cfName: string): Promise<void> {
  if (!cfName) {
    NewAlert('请先在 Better HOJ 设置中填写 Codeforces 用户名', 'warning');
    return;
  }

  // 1) Fetch data
  const data = await fetchHdnoipData(cfName);
  const recs = data?.recommendations;
  if (!recs || typeof recs !== 'object') {
    NewAlert('未获取到推荐数据，请检查 CF 用户名', 'error');
    return;
  }

  // 2) Only keep categories with problems, in fixed order
  const cats = Object.keys(REC_CATEGORY_LABELS).filter(k =>
    recs[k] && Array.isArray(recs[k].problems) && recs[k].problems.length > 0
  );
  if (!cats.length) {
    NewAlert('暂无推荐题目', 'warning');
    return;
  }

  // 3) Build container
  const wrap = document.createElement('div');
  wrap.className = 'hoj-rec-dialog';
  wrap.innerHTML = `
    <div class="hoj-rec-meta">
        <span>CF 用户名：<b>${escapeHtml(cfName)}</b></span>
        <span style="opacity:.6;margin-left:10px;">共 ${cats.length} 个分类</span>
    </div>
    <div class="hoj-rec-tabs" role="tablist"></div>
    <div class="hoj-rec-content" role="tabpanel"></div>
  `;
  const tabsEl = wrap.querySelector('.hoj-rec-tabs')!;
  const contentEl = wrap.querySelector('.hoj-rec-content')!;

  // 4) Render a category
  const renderCategory = (cat: string) => {
    const catInfo = recs[cat];
    const problems = catInfo.problems || [];
    const target = catInfo.target_rating ?? '-';
    const range = catInfo.rating_range || '';

    contentEl.innerHTML = `
      <div class="hoj-rec-meta">
          <span>目标难度 <b>${escapeHtml(String(target))}</b></span>
          ${range ? `<span style="opacity:.6;margin-left:10px;">推荐区间 ${escapeHtml(range)}</span>` : ''}
          <span style="opacity:.6;margin-left:10px;">${problems.length} 道</span>
      </div>
      <ul class="hoj-rec-list">
          ${problems.map(p => {
            const pId = escapeHtml(p.problem_id || p.id || '');
            const pName = escapeHtml(p.name || pId);
            const rawId = String(p.problem_id || p.id || '').trim();
            const link = rawId ? `/problem/CF-${encodeURIComponent(rawId)}` : '#';
            const rating = p.rating ?? '';
            const weight = typeof p.weight === 'number' ? p.weight.toFixed(3) : '';
            return `<li class="hoj-rec-item">
                    <a href="${link}" target="_blank" rel="noopener" class="hoj-rec-link">
                        <span class="hoj-rec-id">${pId}</span>
                        <span class="hoj-rec-name">${pName}</span>
                        <span class="hoj-rec-rating">CF ${rating}</span>
                        ${weight ? `<span class="hoj-rec-weight">w=${weight}</span>` : ''}
                    </a>
                </li>`;
          }).join('')}
      </ul>
    `;
  };

  // 5) Create tabs
  cats.forEach((cat, i) => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'hoj-rec-tab' + (i === 0 ? ' active' : '');
    tab.dataset.cat = cat;
    tab.setAttribute('role', 'tab');
    tab.textContent = `${REC_CATEGORY_LABELS[cat]} (${recs[cat].problems.length})`;
    tab.addEventListener('click', () => {
      tabsEl.querySelectorAll('.hoj-rec-tab')
        .forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderCategory(cat);
    });
    tabsEl.appendChild(tab);
  });

  renderCategory(cats[0]);

  // 6) Show dialog
  openCustomDialog({
    title: `题目推荐 · ${cfName}`,
    bodyEl: wrap,
    width: '640px',
    maxHeight: '80vh'
  });
}