/**
 * Problem Submit Override
 * 接管题目页的「提交评测」按钮，使用 Better HOJ 自己的语言选择与提交接口，
 * 支持比赛题 / 训练题 / 团队题 / 普通题，以及 CF 远程题。
 */

import { hojApi, NewAlert } from '../core/api.js';
import { WebI18n } from '../core/i18n.js';
import { fetchProblemDetail } from './problemContext.js';
import {
  HOJ_ALL_LANGS_GROUPED,
  CF_LANG_GROUPED,
  HOJ_DEFAULT_LANG,
  CF_DEFAULT_LANG,
  readStoredLanguage,
  writeStoredLanguage,
  readStoredCFLanguage,
  writeStoredCFLanguage,
  openLanguagePicker,
  getSelectedLang,
  setSelectedLang,
  getSelectedCFLang,
  setSelectedCFLang,
  getUseCFLang,
  setUseCFLang
} from './language.js';

export interface ProblemSubmitContext {
  cid: number | string;
  tid: number | string | null;
  gid?: string;
  displayPid: string;
}

let _hojInjectingProblem = false;
let _hojLastInjectedUrl = '';
/** 待注入的等待哨兵，避免同一 URL 重复注册等待 */
let _pendingWaitUrl: string | null = null;

/**
 * 容器还没渲染出来时挂起等待，就绪后重新尝试注入。
 * _pendingWaitUrl 保证同一 URL 只注册一次等待。
 */
function _scheduleSubmitOverrideRetry(url: string): void {
  if (_pendingWaitUrl === url) return;
  _pendingWaitUrl = url;
  console.log('[SubmitOverride] 容器未就绪，等待渲染…');

  // 触发条件：语言选择器 与 提交按钮，两者渲染顺序不固定。
  // 用 MutationObserver 同时观察，任一变化都重新检查，齐了才注入。
  const start = Date.now();
  const ready = () =>
    !!document.querySelector('#js-right-header .el-select') ||
    [...document.querySelectorAll('button')].some(b => {
      const txt = (b.textContent || '').trim();
      return txt === '提交评测' || /^submit$/i.test(txt);
    });

  const finish = () => {
    if (_pendingWaitUrl === url) _pendingWaitUrl = null;
    if (window.location.href !== url) return;   // 等待期间已经切题
    // 两个都齐了才真正注入；否则再挂一轮
    const hasSel = !!document.querySelector('#js-right-header .el-select');
    const hasBtn = [...document.querySelectorAll('button')].some(b => {
      const txt = (b.textContent || '').trim();
      return txt === '提交评测' || /^submit$/i.test(txt);
    });
    if (hasSel && hasBtn) void injectProblemSubmitOverride();
    else _scheduleSubmitOverrideRetry(url);
  };

  const obs = new MutationObserver(() => {
    if (!ready()) {
      if (Date.now() - start > 15000) obs.disconnect();
      return;
    }
    obs.disconnect();
    finish();
  });
  obs.observe(document.body, { childList: true, subtree: true });
}

const _TEST_JUDGE_URL_RE = /\/api\/submit-problem-test-judge(?:\?|#|$)/;

/* ============================================================
 * URL 解析
 * ============================================================ */
export function parseProblemSubmitContext(): ProblemSubmitContext | null {
  const p = window.location.pathname;

  // 比赛题：/contest/{cid}/problem/{displayPid}
  let m = p.match(/^\/contest\/([^\/]+)\/problem\/([^\/?#]+)/);
  if (m) {
    const cid = Number(m[1]);
    return {
      cid: Number.isNaN(cid) ? m[1] : cid,
      tid: null,
      displayPid: decodeURIComponent(m[2])
    };
  }

  // 训练题：/training/{tid}/problem/{displayPid}
  m = p.match(/^\/training\/([^\/]+)\/problem\/([^\/?#]+)/);
  if (m) {
    const tid = Number(m[1]);
    return {
      cid: 0,
      tid: Number.isNaN(tid) ? m[1] : tid,
      displayPid: decodeURIComponent(m[2])
    };
  }

  // 团队题：/group/{gid}/problem/{displayPid}/...
  m = p.match(/^\/group\/([^\/]+)\/problem\/([^\/?#]+)/);
  if (m) {
    return {
      cid: 0,
      tid: null,
      gid: m[1],
      displayPid: decodeURIComponent(m[2])
    };
  }

  // 普通题：/problem/{displayPid}
  m = p.match(/^\/problem\/([^\/?#]+)/);
  if (m) {
    return { cid: 0, tid: null, displayPid: decodeURIComponent(m[1]) };
  }

  return null;
}

/** 读取 CodeMirror 实例 */
function _findCodeMirror(): any {
  const el = document.querySelector('.CodeMirror') as any;
  if (el && el.CodeMirror) return el.CodeMirror;
  // CodeMirror 挂在页面 window 上
  // @ts-ignore
  const pw = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
  const cm = (pw as any).CodeMirror;
  if (cm && cm.editors && cm.editors.length) return cm.editors[0];
  return null;
}

/* ============================================================
 * 主注入逻辑
 * ============================================================ */
export async function injectProblemSubmitOverride(): Promise<boolean> {
  const ctx = parseProblemSubmitContext();
  if (!ctx) return false;
  const { cid, tid, gid, displayPid } = ctx;

  const currentUrl = window.location.href;
  if (_hojLastInjectedUrl === currentUrl) return true;
  if (_hojInjectingProblem) return false;
  _hojInjectingProblem = true;

  try {
    /* ---------- 1. 拉详情 ---------- */
    let detail: { isRemote: boolean; problemId: string };
    try {
      const d: any = await fetchProblemDetail();
      const p = d?.data?.problem || d?.data?.problems?.[0];
      if (!p) return false;
      detail = {
        isRemote: !!p.isRemote,
        problemId: String(p.problemId || displayPid)
      };
    } catch (e) {
      console.warn('[SubmitOverride] 获取详情失败:', e);
      return false;
    }

    /* ---------- 2. 决定是否注入 ---------- */
    const isCFRemote = detail.isRemote && /^CF-/i.test(detail.problemId);
    setUseCFLang(isCFRemote);

    // 远程题但不是 CF- 前缀 → 完全不注入
    if (detail.isRemote && !isCFRemote) {
      _hojLastInjectedUrl = currentUrl;
      console.log('[SubmitOverride] isRemote=true 且非 CF 题，跳过注入');
      return false;
    }

    const langGroups = isCFRemote ? CF_LANG_GROUPED : HOJ_ALL_LANGS_GROUPED;

    /* ---------- 3. 等 DOM 就绪 ---------- */
    // 不再依赖固定延时：容器晚到就挂起等待（见 _scheduleSubmitOverrideRetry），
    // 就绪后重走一遍；_hojLastInjectedUrl 保证最终只注入一次。
    const langSelect = document.querySelector('#js-right-header .el-select') as HTMLElement | null;
    const findSubmitBtn = () => ([...document.querySelectorAll('button')] as HTMLButtonElement[]).find(b => {
      const txt = (b.textContent || '').trim();
      return txt === '提交评测' || /^submit$/i.test(txt);
    });
    const submitBtn = findSubmitBtn();
    if (!langSelect || !submitBtn) {
      _scheduleSubmitOverrideRetry(currentUrl);
      return false;
    }

    /* ---------- 4. 注入语言触发器 ---------- */
    if (!document.getElementById('hoj-lang-trigger')) {
      langSelect.style.display = 'none';

      if (isCFRemote) {
        if (!getSelectedCFLang()) {
          setSelectedCFLang(readStoredCFLanguage() || CF_DEFAULT_LANG);
          writeStoredCFLanguage(getSelectedCFLang()!);
        }
      } else {
        if (!getSelectedLang()) {
          setSelectedLang(readStoredLanguage() || HOJ_DEFAULT_LANG);
          writeStoredLanguage(getSelectedLang()!);
        }
      }

      const trigger = document.createElement('button');
      trigger.id = 'hoj-lang-trigger';
      trigger.type = 'button';
      trigger.className = 'el-button el-button--default el-button--small';
      trigger.dataset.mode = isCFRemote ? 'cf' : 'hoj';
      trigger.innerHTML = `<i class="el-icon-arrow-down"></i><span class="hoj-lang-trigger__label"></span>`;
      const labelEl = trigger.querySelector('.hoj-lang-trigger__label');
      if (labelEl) {
        labelEl.textContent = isCFRemote
          ? (getSelectedCFLang() || CF_DEFAULT_LANG)
          : (getSelectedLang() || HOJ_DEFAULT_LANG);
      }

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openLanguagePicker(langGroups, isCFRemote);
      });

      langSelect.parentElement?.appendChild(trigger);
    }

    /* ---------- 5. 覆盖提交按钮 ---------- */
    if (submitBtn.dataset.hojSubmitOverridden !== '1') {
      submitBtn.dataset.hojSubmitOverridden = '1';

      submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const code = (_findCodeMirror() || { getValue: () => '' }).getValue().trim();
        if (!code) return NewAlert('@submit.noCode', 'warning');

        const language = isCFRemote
          ? (getSelectedCFLang() || CF_DEFAULT_LANG)
          : (getSelectedLang() || HOJ_DEFAULT_LANG);

        const origHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML =
          '<i class="el-icon-loading"></i><span> ' +
          WebI18n.t('submit.submitting') + '</span>';

        try {
          const resp: any = await hojApi('/api/submit-problem-judge', {
            method: 'POST',
            body: {
              pid: displayPid,
              language: language,
              code: code,
              cid: cid,
              tid: tid,
              gid: gid,
              isRemote: isCFRemote
            }
          });

          NewAlert('@submit.success', 'success', 1500);

          let submitId: any = null;
          if (typeof resp === 'string') submitId = resp;
          else if (resp && typeof resp === 'object') {
            submitId = resp.submitId || resp.id
              || (resp.data && (resp.data.submitId || resp.data.id))
              || null;
          }

          setTimeout(() => {
            if (submitId) window.location.href = `/submission-detail/${submitId}`;
            else window.location.href = '/status';
          }, 800);

        } catch (err: any) {
          console.warn('[SubmitOverride] 提交失败:', err);
          NewAlert(WebI18n.t('submit.failed', { msg: err?.message || String(err) }), 'error');
          submitBtn.disabled = false;
          submitBtn.innerHTML = origHtml;
        }
      }, true);
    }

    _pendingWaitUrl = null;
    _hojLastInjectedUrl = currentUrl;
    console.log(
      `[SubmitOverride] 已接管 ${displayPid}` +
      `（${isCFRemote ? 'CF 远程' : '普通'}，cid=${cid}, tid=${tid}，` +
      `语言=${isCFRemote ? getSelectedCFLang() : getSelectedLang()}）`
    );
    return true;

  } finally {
    _hojInjectingProblem = false;
  }
}

/* ============================================================
 * 拦截 submit-problem-test-judge：强制 language 与用户选择一致
 * ============================================================ */
export function hookTestJudgeLanguage(): void {
  if ((hookTestJudgeLanguage as any)._done) return;
  (hookTestJudgeLanguage as any)._done = true;

  try {
    const prevFetch = window.fetch;
    window.fetch = function (input: any, init?: any) {
      const url = typeof input === 'string' ? input : (input && input.url) || '';
      if (_TEST_JUDGE_URL_RE.test(url)) {
        const nativeLang = _hojReadNativeLang();
        const want = getUseCFLang()
          ? (getSelectedCFLang() || CF_DEFAULT_LANG)
          : (getSelectedLang() || HOJ_DEFAULT_LANG);

        if (init && typeof init.body === 'string') {
          try {
            const body = JSON.parse(init.body);
            body.language = want;
            init = { ...init, body: JSON.stringify(body) };
          } catch (_) {}
        }
        void nativeLang;
      }
      return prevFetch.call(this, input, init);
    } as typeof window.fetch;
  } catch (e) {
    console.warn('[TestJudgeLang] hook fetch 失败:', e);
  }

  console.log('[TestJudgeLang] 语言拦截已挂载');
}

export function _hojReadNativeLang(): string | null {
  const sel = document.querySelector('#js-right-header .el-select .el-select-dropdown__item.selected');
  if (sel) return (sel.textContent || '').trim();
  const input = document.querySelector('#js-right-header .el-select .el-input__inner') as HTMLInputElement | null;
  return input && input.value ? input.value.trim() : null;
}
