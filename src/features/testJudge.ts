/**
 * Test Judge (全部自测)
 * 在「在线自测」抽屉里注入「全部自测」tab，逐个跑完所有样例并展示结果。
 * 与原版 betterhoj27.3.7 的 runAllTestJudge 一致。
 */

import { NewAlert, openCustomDialog } from '../core/api.js';
import { WebI18n } from '../core/i18n.js';
import { fetchProblemDetail, parseExamples } from './problemContext.js';
import {
  getSelectedLang,
  getSelectedCFLang,
  readStoredCFLanguage,
  readStoredLanguage,
  HOJ_DEFAULT_LANG,
  CF_DEFAULT_LANG
} from './language.js';

/* ============================================================
 * 语言归一化
 * ============================================================ */
const LANG_CANONICAL = [
  'C++', 'C++ With O2', 'C++ 17', 'C++ 17 With O2',
  'C++ 20', 'C++ 20 With O2', 'C', 'C With O2',
  'Python3', 'Python2', 'Java', 'Golang', 'C#', 'PHP',
  'PyPy2', 'PyPy3', 'JavaScript Node', 'JavaScript V8',
  'Ruby', 'Rust'
];

const LANG_NORMALIZE_RULES: Array<{ canonical: string; match: RegExp }> = [
  { canonical: 'C++ 20 With O2', match: /c\+\+\s*20\s*with\s*o2/i },
  { canonical: 'C++ 17 With O2', match: /c\+\+\s*17\s*with\s*o2/i },
  { canonical: 'C++ With O2', match: /^c\+\+\s*with\s*o2/i },
  { canonical: 'C++ 20', match: /c\+\+\s*20/i },
  { canonical: 'C++ 17', match: /c\+\+\s*17/i },
  { canonical: 'C++', match: /^c\+\+\s*$/i },
  { canonical: 'C With O2', match: /^c\s+with\s*o2/i },
  { canonical: 'C', match: /^c\s*$/i },
  { canonical: 'PyPy3', match: /^pypy\s*3/i },
  { canonical: 'PyPy2', match: /^pypy\s*2/i },
  { canonical: 'Python3', match: /^python\s*3|^py3/i },
  { canonical: 'Python2', match: /^python\s*2|^py2/i },
  { canonical: 'Golang', match: /^go(lang)?\s*$/i },
  { canonical: 'Java', match: /^java\s*$/i },
  { canonical: 'C#', match: /^c#|csharp/i },
  { canonical: 'PHP', match: /^php/i },
  { canonical: 'JavaScript Node', match: /javascript.*node|node.*js/i },
  { canonical: 'JavaScript V8', match: /javascript|v8/i },
  { canonical: 'Ruby', match: /^ruby/i },
  { canonical: 'Rust', match: /^rust/i }
];

/* 规范语言名 → CodeMirror MIME */
const LANG_TO_MODE: Record<string, string> = {
  'C++': 'text/x-c++src',
  'C++ With O2': 'text/x-c++src',
  'C++ 17': 'text/x-c++src',
  'C++ 17 With O2': 'text/x-c++src',
  'C++ 20': 'text/x-c++src',
  'C++ 20 With O2': 'text/x-c++src',
  'C': 'text/x-csrc',
  'C With O2': 'text/x-csrc',
  'Python3': 'text/x-python',
  'Python2': 'text/x-python',
  'PyPy3': 'text/x-python',
  'PyPy2': 'text/x-python',
  'Java': 'text/x-java',
  'Golang': 'text/x-go',
  'C#': 'text/x-csharp',
  'PHP': 'text/x-php',
  'JavaScript Node': 'text/javascript',
  'JavaScript V8': 'text/javascript',
  'Ruby': 'text/x-ruby',
  'Rust': 'text/x-rustsrc'
};

/** 将任意语言名归一化到规范之一；无法识别回退 C++ */
export function normalizeLanguage(lang: string | null | undefined): string {
  if (!lang) return 'C++';
  const s = String(lang).trim();
  if (!s) return 'C++';
  if (LANG_CANONICAL.includes(s)) return s;
  for (const { canonical, match } of LANG_NORMALIZE_RULES) {
    if (match.test(s)) return canonical;
  }
  return 'C++';
}

export function getTestJudgeMode(lang: string): string {
  const canonical = normalizeLanguage(lang);
  if (LANG_TO_MODE[canonical]) return LANG_TO_MODE[canonical];

  // CF 语言兜底
  const s = String(lang || '').toLowerCase();
  if (/^gnu\s*g\+\+|^clang\+\+|visual\s*c\+\+/.test(s)) return 'text/x-c++src';
  if (/^c#/.test(s)) return 'text/x-csharp';
  if (/^d\s|^dmd/.test(s)) return 'text/x-d';
  if (/^go\s/.test(s)) return 'text/x-go';
  if (/^haskell/.test(s)) return 'text/x-haskell';
  if (/^java\s/.test(s)) return 'text/x-java';
  if (/^kotlin/.test(s)) return 'text/x-kotlin';
  if (/^ocaml/.test(s)) return 'text/x-ocaml';
  if (/^delphi|^free\s*pascal|^pascal/.test(s)) return 'text/x-pascal';
  if (/^perl/.test(s)) return 'text/x-perl';
  if (/^php/.test(s)) return 'text/x-php';
  if (/^python\s*2/.test(s)) return 'text/x-python';
  if (/^python\s*3/.test(s)) return 'text/x-python';
  if (/^pypy\s*2/.test(s)) return 'text/x-python';
  if (/^pypy\s*3/.test(s)) return 'text/x-python';
  if (/^ruby/.test(s)) return 'text/x-ruby';
  if (/^rust/.test(s)) return 'text/x-rustsrc';
  if (/^scala/.test(s)) return 'text/x-scala';
  if (/^javascript/.test(s)) return 'text/javascript';
  if (/^node/.test(s)) return 'text/javascript';

  return 'text/x-c++src';
}

/** 当前题是否用 CF 语言（基于触发器上打的标记） */
function _hojCurrentIsCFLang(): boolean {
  const t = document.getElementById('hoj-lang-trigger');
  return !!t && t.dataset.mode === 'cf';
}

/** 取当前题的「用户选中语言」 */
function _hojCurrentSelectedLang(): string {
  if (_hojCurrentIsCFLang()) {
    return getSelectedCFLang() || readStoredCFLanguage() || CF_DEFAULT_LANG;
  }
  return getSelectedLang() || readStoredLanguage() || HOJ_DEFAULT_LANG;
}

/* ============================================================
 * 工具
 * ============================================================ */
function _sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

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

function _getCurrentLanguage(): string | null {
  const langSelect = document.querySelector('#js-right-header .el-select') as any;
  return langSelect?.value || null;
}

function _hojSyncNativeSelect(lang: string): void {
  const nativeSelect = document.querySelector('#js-right-header .el-select') as any;
  if (!nativeSelect) return;
  for (const opt of (nativeSelect.options || [])) {
    if (opt.value === lang || normalizeLanguage(opt.value) === lang) {
      nativeSelect.value = opt.value;
      nativeSelect.dispatchEvent(new Event('change'));
      nativeSelect.dispatchEvent(new Event('input'));
      break;
    }
  }
}

function _extractTestJudgeKey(resp: any): string | null {
  if (!resp) return null;
  const d = resp.data;
  if (typeof d === 'string') return d;
  if (d && typeof d === 'object') {
    return d.testJudgeKey || d.key || d.testJudgeId || null;
  }
  return resp.testJudgeKey || resp.key || null;
}

async function _submitOneTest(payload: any): Promise<any> {
  const token = localStorage.getItem('token') || '';
  const resp = await fetch(`${window.location.origin}/api/submit-problem-test-judge`, {
    method: 'POST',
    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload)
  });
  return resp.json();
}

async function _pollTestResult(key: string, signal?: AbortSignal): Promise<any> {
  const token = localStorage.getItem('token') || '';
  const maxAttempts = 150;   // 约 2 分钟（含 800ms 间隔）
  for (let i = 0; i < maxAttempts; i++) {
    if (signal && signal.aborted) throw new Error('ABORTED');
    await _sleep(800);
    const r = await fetch(
      `${window.location.origin}/api/get-test-judge-result?testJudgeKey=${encodeURIComponent(key)}`,
      { headers: { 'Authorization': token }, credentials: 'include' }
    );
    const data = await r.json();
    if (!data || data.status !== 200) continue;
    const st = data.data && data.data.status;
    // 5=待定 6=编译中 7=评测中 —— 继续等
    if (st === 5 || st === 6 || st === 7) continue;
    if (st === undefined) continue;
    return data.data;
  }
  throw new Error('POLL_TIMEOUT');
}

const TEST_JUDGE_COOLDOWN = 3000;   // 每 3 秒最多 1 次提交
let _lastTestJudgeSubmitAt = 0;

/** 冷却感知的提交：自动等待 + 403 限流重试 */
async function _rateLimitedSubmit(payload: any, controller: AbortController): Promise<any> {
  let attempt = 0;
  while (attempt < 20) {
    attempt++;
    if (controller.signal.aborted) throw new Error('ABORTED');

    // —— 冷却 ——
    const since = Date.now() - _lastTestJudgeSubmitAt;
    if (since < TEST_JUDGE_COOLDOWN) {
      await _sleep(TEST_JUDGE_COOLDOWN - since);
    }
    if (controller.signal.aborted) throw new Error('ABORTED');
    _lastTestJudgeSubmitAt = Date.now();

    // —— 提交 ——
    let resp: any;
    try {
      resp = await _submitOneTest(payload);
    } catch (e) {
      await _sleep(1000);
      continue;
    }

    // —— 限流检测 ——
    const msg = resp?.msg || '';
    const limited =
      resp?.status === 403 ||
      /过于频繁|太频繁|too\s*frequent|rate\s*limit/i.test(msg);
    if (limited) {
      // 等下一个 3 秒周期再试
      await _sleep(TEST_JUDGE_COOLDOWN);
      continue;
    }

    return resp;
  }
  throw new Error('RATE_LIMITED');
}

/** 展开第一个 fail/error 行并滚动到可见 */
function expandFirstFailure(rows: HTMLElement[]): void {
  let firstBadRow: HTMLElement | null = null;
  for (const r of rows) {
    const st = r.querySelector('.hoj-tj-status');
    if (st && (st.classList.contains('fail') || st.classList.contains('error'))) {
      firstBadRow = r;
      break;
    }
  }
  if (!firstBadRow) return;

  const body = firstBadRow.querySelector('.hoj-tj-row-body') as HTMLElement | null;
  if (body) body.style.display = '';

  try {
    firstBadRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (_) {
    firstBadRow.scrollIntoView();
  }
}

type SetStatusFn = (row: HTMLElement, text: string, cls: string) => void;

/**
 * 结束一整轮测试
 */
function finalizeTestRun(opts: {
  rows: HTMLElement[];
  currentIdx: number;
  reason: 'user-stop' | 'compile-error';
  setStatus: SetStatusFn;
  total: number;
  pass: number;
}): void {
  const { rows, currentIdx, reason, setStatus, total, pass } = opts;

  // 1) 剩余未处理的行标记为 Skipped
  for (let k = currentIdx; k < rows.length; k++) {
    const r = rows[k];
    const st = r.querySelector('.hoj-tj-status');
    if (st && (st.classList.contains('pass')
      || st.classList.contains('fail')
      || st.classList.contains('error'))) {
      continue;
    }
    setStatus(r, WebI18n.t('testjudge.skipped'), 'skipped');
  }

  // 2) 展开第一个失败用例
  expandFirstFailure(rows);

  // 3) Alert
  const alertKey = reason === 'compile-error'
    ? 'testjudge.alertCompileError'
    : 'testjudge.alertStopped';
  const details = WebI18n.t('testjudge.alertDetail', {
    pass, total, done: currentIdx
  });
  NewAlert(
    WebI18n.t(alertKey) + ' — ' + details,
    reason === 'compile-error' ? 'error' : 'warning',
    3500
  );
}

/* ============================================================
 * 主流程
 * ============================================================ */
export async function runAllTestJudge(): Promise<void> {
  /* ---------- 前置校验 ---------- */
  const cm = _findCodeMirror();
  if (!cm) return NewAlert('@testjudge.noEditor', 'warning');

  const code = (cm.getValue() || '').trim();
  if (!code) return NewAlert('@testjudge.noCode', 'warning');

  /* ---------- 语言与远程判题标志 ---------- */
  const isCFLang = _hojCurrentIsCFLang();
  const rawLang = _hojCurrentSelectedLang();
  const language = isCFLang ? rawLang : normalizeLanguage(rawLang);
  const mode = getTestJudgeMode(language);
  const isRemoteJudge = isCFLang;

  /* ---------- 同步到原生 select ---------- */
  if (!isCFLang && document.getElementById('hoj-lang-trigger')) {
    try {
      const nativeLang = _getCurrentLanguage();
      if (nativeLang !== language) {
        console.log('[TestJudge] 同步语言到原生 select：', nativeLang, '→', language);
        _hojSyncNativeSelect(language);
        const input = document.querySelector('#js-right-header .el-select .el-input__inner') as HTMLInputElement | null;
        if (input && input.value !== language) {
          input.value = language;
          try {
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
          } catch (_) {}
        }
      }
    } catch (e) {
      console.warn('[TestJudge] 同步语言失败:', e);
    }
  }

  /* ---------- 拉题目详情 ---------- */
  let detail: any;
  try {
    detail = await fetchProblemDetail();
  } catch (e) {
    console.warn('[TestJudge] 获取题目失败:', e);
    return NewAlert('@testjudge.noProblem', 'warning');
  }
  const p = detail?.data?.problem || detail?.data?.problems?.[0];
  if (!p) return NewAlert('@testjudge.noProblem', 'warning');

  const pid = p.id;
  if (!pid) return NewAlert('@testjudge.noProblem', 'warning');

  /* ---------- 样例 ---------- */
  const samples = parseExamples(p.examples || '')
    .map((t, i) => ({ input: t.input, output: t.output, id: i }));
  if (!samples.length) return NewAlert('@testjudge.noSamples', 'warning');

  /* ---------- 构建 UI ---------- */
  const wrap = document.createElement('div');
  wrap.className = 'hoj-tj-wrap';

  const summaryBar = document.createElement('div');
  summaryBar.className = 'hoj-tj-summary';
  const summaryText = document.createElement('div');
  summaryText.className = 'hoj-tj-summary-text';
  const stopBtn = document.createElement('button');
  stopBtn.type = 'button';
  stopBtn.className = 'hoj-snippet-btn';
  stopBtn.textContent = WebI18n.t('testjudge.cancel');
  summaryBar.append(summaryText, stopBtn);
  wrap.appendChild(summaryBar);

  const list = document.createElement('div');
  list.className = 'hoj-tj-list';
  wrap.appendChild(list);

  const rows: HTMLElement[] = samples.map((s, i) => {
    const row = document.createElement('div');
    row.className = 'hoj-tj-row';
    row.dataset.idx = String(i);
    row.innerHTML = `
            <div class="hoj-tj-row-head">
                <span class="hoj-tj-idx">#${i + 1}</span>
                <span class="hoj-tj-status"></span>
                <span class="hoj-tj-meta"></span>
            </div>
            <div class="hoj-tj-row-body" style="display:none;">
                <div class="hoj-tj-block">
                    <div class="hoj-tj-block-title"></div>
                    <pre class="hoj-tj-pre"></pre>
                </div>
                <div class="hoj-tj-block">
                    <div class="hoj-tj-block-title"></div>
                    <pre class="hoj-tj-pre"></pre>
                </div>
                <div class="hoj-tj-block">
                    <div class="hoj-tj-block-title"></div>
                    <pre class="hoj-tj-pre"></pre>
                </div>
                <div class="hoj-tj-block hoj-tj-stderr-block" style="display:none;">
                    <div class="hoj-tj-block-title"></div>
                    <pre class="hoj-tj-pre hoj-tj-pre--err"></pre>
                </div>
            </div>
        `;

    const titles = row.querySelectorAll('.hoj-tj-block-title');
    titles[0].textContent = WebI18n.t('testjudge.input');
    titles[1].textContent = WebI18n.t('testjudge.expected');
    titles[2].textContent = WebI18n.t('testjudge.actual');
    titles[3].textContent = WebI18n.t('testjudge.stderr');

    (row.querySelector('.hoj-tj-row-head') as HTMLElement).addEventListener('click', () => {
      const b = row.querySelector('.hoj-tj-row-body') as HTMLElement;
      b.style.display = b.style.display === 'none' ? '' : 'none';
    });

    const pres = row.querySelectorAll('.hoj-tj-pre');
    pres[0].textContent = s.input ?? '';
    pres[1].textContent = s.output ?? '';

    list.appendChild(row);
    return row;
  });

  /* ---------- 状态辅助 ---------- */
  const setStatus: SetStatusFn = (row, text, cls) => {
    const el = row.querySelector('.hoj-tj-status') as HTMLElement;
    el.textContent = text;
    el.className = 'hoj-tj-status ' + (cls || '');
    if (cls && /^(pass|fail|error|running|submitting|skipped)$/.test(cls)) {
      row.dataset.state = cls;
    } else {
      delete row.dataset.state;
    }
  };
  const setMeta = (row: HTMLElement, text: string) => {
    (row.querySelector('.hoj-tj-meta') as HTMLElement).textContent = text || '';
  };
  const setActual = (row: HTMLElement, text: string) => {
    row.querySelectorAll('.hoj-tj-pre')[2].textContent = text ?? '';
  };
  const setStderr = (row: HTMLElement, text: string) => {
    const blk = row.querySelector('.hoj-tj-stderr-block') as HTMLElement;
    if (!text) { blk.style.display = 'none'; return; }
    blk.style.display = '';
    (row.querySelector('.hoj-tj-pre--err') as HTMLElement).textContent = text;
  };

  rows.forEach(row => setStatus(row, WebI18n.t('testjudge.submitting'), 'submitting'));

  let completed = 0, passCount = 0;
  const updateSummary = () => {
    summaryText.textContent =
      WebI18n.t('testjudge.progress', { done: completed, total: samples.length })
      + ' · '
      + WebI18n.t('testjudge.summary', { pass: passCount, total: samples.length });
  };
  updateSummary();

  /* ---------- 中止控制 ---------- */
  const controller = new AbortController();
  let _stopped = false;
  let _ceHappened = false;
  let _nextIdx = 0;

  stopBtn.addEventListener('click', () => {
    if (_stopped) return;
    _stopped = true;
    stopBtn.disabled = true;
    controller.abort();
  });

  openCustomDialog({
    title: WebI18n.t('testjudge.runAll'),
    bodyEl: wrap,
    width: '820px',
    maxHeight: '85vh',
    fullscreen: true,
    onClose: () => controller.abort()
  });

  _lastTestJudgeSubmitAt = 0;

  /* ---------- 主循环 ---------- */
  try {
    for (let i = 0; i < samples.length; i++) {
      _nextIdx = i;

      if (controller.signal.aborted) break;

      const row = rows[i];
      const s = samples[i];

      setStatus(row, WebI18n.t('testjudge.runningOne'), 'running');

      try {
        const resp: any = await _rateLimitedSubmit({
          pid,
          language,
          code,
          type: 'public',
          userInput: s.input ?? '',
          expectedOutput: s.output ?? '',
          mode,
          isRemoteJudge
        }, controller);

        let result: any = null;
        const st = resp?.data?.status;
        if (st !== undefined && st !== 5 && st !== 6 && st !== 7) {
          result = resp.data;
        } else {
          const key = _extractTestJudgeKey(resp);
          if (!key) throw new Error(resp?.msg || 'No testJudgeKey');
          result = await _pollTestResult(key, controller.signal);
        }

        const rstatus = result?.status;
        const JUDGE_STATUS = (window as any).JUDGE_STATUS;
        const rname = (typeof JUDGE_STATUS !== 'undefined'
          && JUDGE_STATUS[String(rstatus)]?.name) || String(rstatus);

        const isAC = Number(rstatus) === 0;
        const isCE = Number(rstatus) === -2;

        setStatus(row,
          isAC ? WebI18n.t('testjudge.pass') : WebI18n.t('testjudge.fail'),
          isAC ? 'pass' : 'fail');
        setMeta(row,
          `${WebI18n.t('testjudge.time')}: ${result?.time ?? '-'}ms · `
          + `${WebI18n.t('testjudge.memory')}: ${result?.memory ?? '-'}KB · `
          + rname);
        setActual(row, result?.userOutput ?? '');
        setStderr(row, result?.stderr || '');

        if (isAC) passCount++;

        completed++;
        updateSummary();

        if (isCE) {
          _ceHappened = true;
          _nextIdx = i + 1;
          break;
        }
      } catch (e: any) {
        if (e?.message === 'ABORTED' || controller.signal.aborted) {
          break;
        }
        setStatus(row, WebI18n.t('testjudge.error'), 'error');
        setMeta(row, e.message || String(e));
        completed++;
        updateSummary();
      }
    }
  } finally {
    if (_stopped || _ceHappened) {
      completed = Math.max(completed, _nextIdx);
      updateSummary();
      finalizeTestRun({
        rows,
        currentIdx: _nextIdx,
        reason: _ceHappened ? 'compile-error' : 'user-stop',
        setStatus,
        total: samples.length,
        pass: passCount
      });
    } else {
      expandFirstFailure(rows);
    }
  }
}

/* ============================================================
 * 注入「全部自测」按钮
 * ============================================================ */
export function injectRunAllTestButton(): boolean {
  if (document.getElementById('hoj-tj-all-btn')) return true;

  const path = window.location.pathname;
  const isNormal = /^\/problem\/[^\/?#]+/.test(path);
  const isContest = /^\/contest\/[^\/]+\/problem\/[^\/?#]+/.test(path);
  const isGroup = /^\/group\/[^\/]+\/problem\/[^\/?#]+/.test(path);
  if (!isNormal && !isContest && !isGroup) return false;

  /* ---- 关键：只在「自测抽屉」里注入 ---- */
  const drawerBody = document.querySelector('.el-drawer__body');
  if (!drawerBody) return false;   // 抽屉还没挂载，等 MutationObserver 下次

  const nav = drawerBody.querySelector('.el-tabs__nav.is-top');
  if (!nav) return false;

  /* ---- 找「运行自测」tab：优先 #tab-2，其次文本匹配 ---- */
  let runTestTab: Element | null = drawerBody.querySelector('#tab-2');
  if (!runTestTab) {
    for (const item of drawerBody.querySelectorAll('.el-tabs__item')) {
      const txt = (item.textContent || '').trim();
      if (txt.includes('运行自测') || txt.includes('在线自测')
        || /run\s*test/i.test(txt)) {
        runTestTab = item;
        break;
      }
    }
  }
  if (!runTestTab) return false;

  /* ---- 构造 tab 项 ---- */
  const tabItem = document.createElement('div');
  tabItem.id = 'hoj-tj-all-btn';
  tabItem.className = 'el-tabs__item is-top hoj-tj-tab';
  tabItem.setAttribute('role', 'tab');
  tabItem.setAttribute('tabindex', '0');
  (tabItem as HTMLElement).style.cursor = 'pointer';
  tabItem.innerHTML = `
        <span data-v-6e9809fa class="tj-btn el-tag el-tag--warning el-tag--plain" style="cursor:pointer;">
            <i class="el-icon-video-play"></i> <span></span>
        </span>
    `;
  const label = tabItem.querySelector('.tj-btn > span');
  if (label) label.textContent = WebI18n.t('testjudge.runAll');

  tabItem.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    runAllTestJudge();
  });

  // 插到「运行自测」后面
  runTestTab.insertAdjacentElement('afterend', tabItem);

  console.log('[TestJudge] 已注入「全部自测」到自测抽屉 tab 栏');
  return true;
}

/** 兼容旧调用名 */
export const injectTestJudgeButton = injectRunAllTestButton;
export const runAllTests = runAllTestJudge;
