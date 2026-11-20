/**
 * Resubmit Buttons
 * 在 /status 列表里为「自己的、Submitted Failed 的提交」注入一个重测图标。
 */

import { hojApi, NewAlert } from '../core/api.js';
import { WebI18n } from '../core/i18n.js';

/** 取当前登录用户名（优先 localStorage，回退接口） */
async function getCurrentUsername(): Promise<string | null> {
  try {
    const raw = localStorage.getItem('userInfo');
    if (raw) {
      const info = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (info && info.username) return info.username;
    }
  } catch (_) {}

  try {
    const token = localStorage.getItem('token') || '';
    const resp = await fetch(`${window.location.origin}/api/get-user-home-info`, {
      method: 'GET',
      headers: { 'Authorization': token, 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    const data = await resp.json();
    if (data?.status === 200 && data?.data?.username) return data.data.username;
  } catch (_) {}
  return null;
}

export async function injectResubmitButtons(): Promise<boolean> {
  if (!/^\/status(\/|$)/.test(window.location.pathname)
    && !/^\/group\/[^\/]+\/status(\/|$)/.test(window.location.pathname)) {
    return false;
  }

  /* ---------- 1. 找主表格 ---------- */
  const tables = [...document.querySelectorAll('.vxe-table')];
  let table: Element | null = null;
  for (const t of tables) {
    const titles = [...t.querySelectorAll('thead th .vxe-cell--title')]
      .map(el => (el.textContent || '').trim());
    // 中英双语兼容
    const hasId = titles.some(x => /^(Run\s*ID|运行\s*ID)$/i.test(x));
    const hasSt = titles.some(x => /^(Status|状态)$/i.test(x));
    const hasAu = titles.some(x => /^(Author|作者)$/i.test(x));
    if (hasId && hasSt && hasAu) { table = t; break; }
  }
  if (!table) return false;

  /* ---------- 2. 列索引：中英双语匹配 ---------- */
  const ths = [...table.querySelectorAll('thead th')];
  const matchBy = (patterns: RegExp[]) => ths.findIndex(th => {
    const el = th.querySelector('.vxe-cell--title');
    if (!el) return false;
    const txt = (el.textContent || '').trim();
    return patterns.some(p => p.test(txt));
  });
  const idIdx = matchBy([/^(Run\s*ID|运行\s*ID)$/i, /^ID$/i]);
  const statusIdx = matchBy([/^(Status|状态)$/i]);
  const authorIdx = matchBy([/^(Author|作者)$/i]);
  if (idIdx < 0 || statusIdx < 0 || authorIdx < 0) {
    console.warn('[Resubmit] 无法识别列索引:', { idIdx, statusIdx, authorIdx });
    return false;
  }

  /* ---------- 3. 当前用户 ---------- */
  const me = await getCurrentUsername();
  if (!me) return false;
  const meName = String(me).trim();

  const tbody = table.querySelector('tbody');
  if (!tbody) return false;

  let injected = 0;

  tbody.querySelectorAll('tr.vxe-body--row').forEach(row => {
    const cells = row.querySelectorAll('td.vxe-body--column');
    if (cells.length <= Math.max(idIdx, statusIdx, authorIdx)) return;

    const idCell = cells[idIdx];
    const statusCell = cells[statusIdx];
    const authorCell = cells[authorIdx];

    const submitId = ((idCell.querySelector('.vxe-cell--label') || idCell).textContent || '').trim();
    if (!submitId) return;

    // 状态：Submitted Failed（不区分语言，因为这是 API 原值）
    const statusTxt = (statusCell.textContent || '').replace(/\s+/g, ' ').trim();
    if (!/Submitted\s*Failed/i.test(statusTxt)) return;

    // 作者：优先 a 标签
    const authorTxt = ((authorCell.querySelector('a') || authorCell).textContent || '').trim();
    if (authorTxt !== meName) return;

    /* ---------- 4. 在 .el-tag 内部注入图标 ---------- */
    const tag = statusCell.querySelector('.el-tag');
    if (!tag) return;

    // 站点原生已开启重测（标签内已有刷新图标）→ 跳过
    if (tag.querySelector('i.el-icon-refresh:not([data-hoj-resubmit])')) return;
    // 我们已注入 → 跳过
    if (tag.querySelector('[data-hoj-resubmit]')) return;

    const icon = document.createElement('i');
    icon.setAttribute('data-hoj-resubmit', submitId);
    icon.className = 'el-icon-refresh';
    icon.title = WebI18n.t('resubmit.tooltip');
    icon.style.cursor = 'pointer';
    icon.style.marginRight = '4px';

    icon.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      if (icon.dataset.loading === '1') return;
      icon.dataset.loading = '1';
      const oldCls = icon.className;
      icon.className = 'el-icon-loading';

      try {
        await hojApi(
          `/api/resubmit?submitId=${encodeURIComponent(submitId)}`,
          { silent: true }
        );
        NewAlert('@resubmit.success', 'success', 1500);

        const refreshBtn =
          (document.querySelector('.hidden-xs-only button .el-icon-refresh')?.closest('button') ||
            document.querySelector('.hidden-sm-and-up button .el-icon-refresh')?.closest('button')) as HTMLButtonElement | null;
        if (refreshBtn) refreshBtn.click();
        else setTimeout(() => location.reload(), 500);
      } catch (err: any) {
        NewAlert(
          WebI18n.t('resubmit.failed', { msg: err?.message || String(err) }),
          'error'
        );
        icon.className = oldCls;
      } finally {
        icon.dataset.loading = '0';
      }
    });

    // 插到 el-tag 内部最前面
    tag.insertBefore(icon, tag.firstChild);
    injected++;
  });

  if (injected) console.log(`[Resubmit] 已注入 ${injected} 个重测图标`);
  return injected > 0;
}
