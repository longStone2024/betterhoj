/**
 * Problem Detail Features
 * Handles injection of CPH button, download button, jump buttons, favorite button, copy buttons
 * on problem detail pages
 */

import { NewAlert } from '../core/api.js';
import { WebI18n } from '../core/i18n.js';
import type { Config } from '../core/config.js';
import { fetchProblemDetail, parseProblemContext, parseExamples } from './problemContext.js';
import { sendToCPH, buildCPHData } from './cph.ts';
import { addFavoriteButtonToDetail } from './favorites.ts';
import { waitForSelector } from './tools.ts';
import { copyToClipboard } from '../core/utils.js';

// Constants
const BUTTON_CPH_ID = 'import-to-cph-btn';
const BUTTON_DOWNLOAD_ID = 'download-testcase-btn';
const COPY_BUTTON_CLASS = 'custom-copy-btn';

// Global state
let currentProblemData: any = null;
let currentProblemId: string | null = null;
let currentProblemCode: string | null = null;
let autoFetchProblemInfoLastKey: string | null = null;

function getJumpUrls(problemCode: string): Array<{ name: string; id: string; url: string }> {
  const urls: Array<{ name: string; id: string; url: string }> = [];
  if (!problemCode) return urls;

  // CF-207A1 → contest=207, index=A1
  let m = problemCode.match(/^CF-(\d+)(.+)$/i);
  if (m) {
    const contest = m[1];
    const index = m[2];
    urls.push({
      name: 'Codeforces',
      id: 'hoj-jump-cf',
      url: `https://codeforces.com/problemset/problem/${contest}/${index}`
    });
    urls.push({
      name: '洛谷',
      id: 'hoj-jump-lg-cf',
      url: `https://www.luogu.com.cn/problem/CF${contest}${index}`
    });
    return urls;
  }

  // AC-abc123_1 → prefix=abc, number=123, index=1
  m = problemCode.match(/^AC-(abc|arc|agc)(\d+)_(.+)$/i);
  if (m) {
    const prefix = m[1].toLowerCase();
    const num = m[2];
    const idx = m[3];
    const contest = `${prefix}${num}`;
    urls.push({
      name: 'AtCoder',
      id: 'hoj-jump-atcoder',
      url: `https://atcoder.jp/contests/${contest}/tasks/${contest}_${idx}`
    });
    urls.push({
      name: '洛谷',
      id: 'hoj-jump-lg-atcoder',
      url: `https://www.luogu.com.cn/problem/AT_${contest}_${idx}`
    });
    return urls;
  }

  // LIBRE-100 → LibreOJ
  m = problemCode.match(/^LIBRE-(\d+)$/i);
  if (m) {
    urls.push({
      name: 'LibreOJ',
      id: 'hoj-jump-libreoj',
      url: `https://loj.ac/p/${m[1]}`
    });
    return urls;
  }

  return urls;
}

function addImportButton(): void {
  if (document.getElementById('import-to-cph-btn')) return;
  const c = document.querySelector('.question-intr'); if (!c) return;
  const btn = document.createElement('button');
  btn.id = 'import-to-cph-btn';
  btn.className = 'el-button el-button--primary is-plain bhoj-mini-button';
  btn.textContent = '导入到 CPH';
  btn.style.cssText = 'padding:5px 10px;margin-left:8px;cursor:pointer;';
  btn.addEventListener('click', async () => {
    if (!currentProblemData) return NewAlert('题目信息尚未加载', 'warning');
    const r = await sendToCPH(currentProblemData, 27121);
    NewAlert(r.success ? '题目已成功导入到 CPH！' : '导入失败：' + r.message,
             r.success ? 'success' : 'error');
  });
  c.appendChild(btn);
}

function removeImportButton(): void {
  const btn = document.getElementById('import-to-cph-btn');
  if (btn) btn.remove();
}

function addDownloadButton(): void {
  if (document.getElementById('download-testcase-btn')) return;
  const c = document.querySelector('.question-intr'); if (!c) return;
  const btn = document.createElement('button');
  btn.id = 'download-testcase-btn';
  btn.className = 'el-button el-button--primary is-plain bhoj-mini-button';
  btn.textContent = '下载数据';
  btn.style.cssText = 'padding:5px 10px;margin-left:8px;cursor:pointer;';
  btn.addEventListener('click', async () => {
    const ctx = parseProblemContext();
    const problemId = ctx?.problemId || '';
    if (!problemId) return NewAlert('题目 ID 尚未获取', 'warning');
    
    const token = localStorage.getItem('token') || '';
    try {
      const resp = await fetch(`${window.location.origin}/api/file/download-testcase?pid=${encodeURIComponent(problemId)}`, {
        headers: { 'Authorization': token },
        credentials: 'include'
      });
      if (resp.status === 200) {
        const blob = await resp.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `${problemId}-testcase.zip`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        NewAlert(`下载失败，状态码：${resp.status}`, 'error');
      }
    } catch (e) {
      NewAlert('下载请求出错', 'error');
    }
  });
  c.appendChild(btn);
}

function removeDownloadButton(): void {
  const btn = document.getElementById('download-testcase-btn');
  if (btn) btn.remove();
}

function clearJumpButtons(): void {
  ['hoj-jump-cf', 'hoj-jump-lg-cf', 'hoj-jump-atcoder', 'hoj-jump-lg-atcoder', 'hoj-jump-libreoj']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });
}

function addJumpButtons(): void {
  if (!currentProblemCode) return;

  const c = document.querySelector('.question-intr');
  if (!c) return;

  const urls = getJumpUrls(currentProblemCode);
  if (!urls.length) return;

  urls.forEach(({ name, id, url }) => {
    if (document.getElementById(id)) return;
    const btn = document.createElement('button');
    btn.id = id;
    btn.type = 'button';
    btn.className = 'el-button el-button--primary is-plain bhoj-mini-button';
    btn.textContent = name;
    btn.style.cssText = 'padding:5px 10px;margin-left:8px;cursor:pointer;';
    btn.addEventListener('click', () => window.open(url, '_blank'));
    c.appendChild(btn);
  });
}

function escapeHtml(s: string): string {
  const div = document.createElement('div');
  div.textContent = String(s ?? '');
  return div.innerHTML;
}

function addCopyButtons(data: any): void {
  const p = data?.data?.problem || data?.data?.problems?.[0];
  if (!p) return;
  const map = [['题目描述','description'],['输入描述','input'],['输出描述','output'],['提示','hint']];
  document.querySelectorAll('.question-intr p.title, #problem-content p.title').forEach(tEl => {
    const txt = tEl.textContent.trim();
    const hit = map.find(([t]) => t === txt); if (!hit) return;
    // 已经存在就不要重建（MutationObserver 会反复调用），避免闪烁
    let btn = tEl.querySelector(`.${COPY_BUTTON_CLASS}`);
    if (btn) return;
    btn = document.createElement('a');
    btn.className = `copy ${COPY_BUTTON_CLASS}`;
    btn.style.cssText = 'cursor:pointer;margin-left:8px;';
    btn.title = '复制内容';
    btn.innerHTML = '<i class="el-icon-document-copy"></i>';
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      copyText(p[hit[1]] || '').then(() => { btn.style.color = '#67C23A'; setTimeout(() => btn.style.color = '', 1000); });
    });
    tEl.appendChild(btn);
  });
}

async function copyText(t: string): Promise<void> {
  NewAlert("复制成功", 'success');
  return copyToClipboard(t);
}

export async function autoFetchProblemInfo(config: Config): Promise<void> {
  const ctx = parseProblemContext();
  if (!ctx) return;
  console.log(ctx);

  // 用 URL 作为去重 key，避免重复请求同一道题
  const key = ctx.type === 'contest'
    ? `contest:${ctx.cid}/${ctx.displayId}`
    : `problem:${ctx.problemId}`;
  if (autoFetchProblemInfoLastKey === key) return;
  autoFetchProblemInfoLastKey = key;

  // 切换题目时先清理旧状态与按钮
  clearJumpButtons();
  removeImportButton();
  removeDownloadButton();
  currentProblemData = null;
  currentProblemId = null;
  currentProblemCode = null;

  try {
    const d = await fetchProblemDetail();
    console.log('[SmartHOJ] autoFetchProblemInfo 结果:', d);

    const p = d?.data?.problem || d?.data?.problems?.[0] || null;
    if (p?.id) currentProblemId = p.id;
    if (p?.problemId) currentProblemCode = p.problemId;

    const cph = buildCPHData(d, config);
    if (cph) currentProblemData = cph;

    const isGroup = !!ctx.gid;
    _problemButtonsPlan = {
      hasCPH: !!cph,
      hasDownload: isGroup,
      copyData: d
    };

    // 等容器就绪后再注入；Vue 路由切换时容器会被重建，靠 MutationObserver 补注入
    const inject = () => {
      if (autoFetchProblemInfoLastKey !== key) return;   // 已切到别的题，放弃
      injectProblemButtons();
    };

    waitForSelector('.question-intr', inject, 15000);
    watchProblemContainer(inject);
  } catch (e) {
    console.error('[SmartHOJ] 自动获取题目失败:', e);
  }
}

/* ============================================================
 * 按钮注入：等容器就绪 + 容器重建后补注入
 * ============================================================ */

/** 当前题需要注入哪些按钮（由 autoFetchProblemInfo 填充） */
let _problemButtonsPlan: {
  hasCPH: boolean;
  hasDownload: boolean;
  copyData: any;
} | null = null;

let _containerObserver: MutationObserver | null = null;

/**
 * 幂等注入：容器不在就跳过，已在就补齐缺失的按钮。
 * 可被 waitForSelector / MutationObserver 反复调用。
 */
export function injectProblemButtons(): boolean {
  const plan = _problemButtonsPlan;
  if (!plan) return false;

  const container = document.querySelector('.question-intr');
  if (!container) return false;

  if (plan.hasCPH && currentProblemData) addImportButton();
  if (plan.hasDownload) addDownloadButton();
  if (plan.copyData) addCopyButtons(plan.copyData);
  addJumpButtons();
  addFavoriteButtonToDetail();

  return true;
}

/**
 * 监听容器重建：Vue 切题会重建 .question-intr，
 * 旧的按钮跟着一起消失，这里在重建后补注入。
 */
function watchProblemContainer(inject: () => void): void {
  if (_containerObserver) _containerObserver.disconnect();

  let timer: number | null = null;
  let injecting = false;   // 防止自己追加按钮又把观察器触发一遍

  _containerObserver = new MutationObserver(() => {
    if (injecting) return;
    if (timer) return;
    // 合并同一批 DOM 变动，避免每插一个节点就跑一次全量查询
    timer = window.setTimeout(() => {
      timer = null;
      if (!document.querySelector('.question-intr')) return;   // 容器还没出来
      injecting = true;
      try { inject(); }
      finally {
        // 等本轮 DOM 变更派发完再解锁
        window.setTimeout(() => { injecting = false; }, 0);
      }
    }, 50);
  });
  _containerObserver.observe(document.body, { childList: true, subtree: true });
}

/** 离开题目页时停掉监听并清理计划 */
export function stopProblemButtonWatch(): void {
  if (_containerObserver) {
    _containerObserver.disconnect();
    _containerObserver = null;
  }
  _problemButtonsPlan = null;
}