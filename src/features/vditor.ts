/**
 * Vditor Integration Feature
 * Matches reference implementation exactly
 */

import { NewAlert, NewDialog, openCustomDialog, hojApi } from '../core/api.js';
import { WebI18n } from '../core/i18n.js';
import { escapeHtml } from '../core/utils.js';
import type { Config } from '../core/config.js';

const VDITOR_CDN = 'https://unpkg.com/vditor@3.10.4';
let _vditorLoading: Promise<any> | null = null;

function _pageWindow(): Window {
  // @ts-ignore - unsafeWindow provided by userscript environment
  return (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
}

function getVditorTheme(config: Config): { editorTheme: 'classic' | 'dark'; contentTheme: 'light' | 'dark'; hljsStyle: string } {
  const useDark = !!config.Open && !!config.DarkMode;
  return {
    editorTheme: useDark ? 'dark' : 'classic',
    contentTheme: useDark ? 'dark' : 'light',
    hljsStyle: useDark ? 'github-dark' : 'github'
  };
}

function ensureVditor(): Promise<any> {
  const w = _pageWindow();

  if (w.Vditor) return Promise.resolve(w.Vditor);
  if (_vditorLoading) return _vditorLoading;

  _vditorLoading = new Promise((resolve, reject) => {
    if (!document.getElementById('hoj-vditor-css')) {
      const link = document.createElement('link');
      link.id = 'hoj-vditor-css';
      link.rel = 'stylesheet';
      link.href = `${VDITOR_CDN}/dist/index.css`;
      (document.head || document.documentElement).appendChild(link);
    }

    const s = document.createElement('script');
    s.src = `${VDITOR_CDN}/dist/index.min.js`;
    s.async = true;
    s.onload = () => {
      if (w.Vditor) {
        console.log('[Vditor] 已加载:', typeof w.Vditor);
        resolve(w.Vditor);
      } else {
        reject(new Error('Vditor 未挂载到 unsafeWindow'));
      }
    };
    s.onerror = () => reject(new Error('Vditor 脚本加载失败'));
    (document.head || document.documentElement).appendChild(s);
  });

  return _vditorLoading;
}

async function fetchDiscussionCategories(gid?: string | number): Promise<any[]> {
  try {
    const token = localStorage.getItem('token') || '';
    let url = `${window.location.origin}/api/discussion-category`;
    if (gid !== undefined && gid !== null && String(gid) !== '') {
      url += `?gid=${encodeURIComponent(String(gid))}`;
    }
    const resp = await fetch(url, {
      headers: { 'Authorization': token },
      credentials: 'include'
    });
    const data = await resp.json();
    return Array.isArray(data?.data) ? data.data : [];
  } catch (e) {
    console.warn('[Discussion] 获取分类失败:', e);
    return [];
  }
}

function getVditorUploadConfig(config: Config): { mode: string; gid: string; valid: boolean } | null {
  const mode = config.VditorUploadMode || 'disabled';
  if (mode === 'disabled') return null;
  const gid = mode === 'group' ? String(config.VditorUploadGid || '').trim() : '';
  return { mode, gid, valid: mode !== 'group' || !!gid };
}

async function uploadVditorAttachment(file: File, kind: 'image' | 'file', gid: string): Promise<{ link: string }> {
  const token = localStorage.getItem('token') || '';
  const url = kind === 'image'
    ? `${window.location.origin}/api/file/upload-md-img`
    : `${window.location.origin}/api/file/upload-md-file`;

  const fd = new FormData();
  fd.append(kind === 'image' ? 'image' : 'file', file);
  if (gid) fd.append('gid', gid);

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': token },
    credentials: 'include',
    body: fd
  });

  if (resp.status !== 200) throw new Error(`HTTP ${resp.status}`);

  const data = await resp.json().catch(() => null);
  if (!data) throw new Error(WebI18n.t('api.jsonError'));
  if (data.status !== 200) throw new Error(data.msg || `Status ${data.status}`);
  if (!data.data || !data.data.link) throw new Error(WebI18n.t('vditor.uploadNoLink'));
  return data.data;
}

const VDITOR_ICON_IMAGE = '<svg viewBox="0 0 32 32"><path fill="currentColor" d="M27 5H5a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 2v12.59l-6.29-6.3-6.3 6.3-3.41-3.41L5 22.18V7h22zM10 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>';
const VDITOR_ICON_FILE = '<svg viewBox="0 0 32 32"><path fill="currentColor" d="M20 4H8a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10l-6-6zm-1 7V6l5 5h-5zM12 15h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h5v2h-5v-2z"/></svg>';

function makeVditorUploadToolbarItem(getEditor: () => any, kind: 'image' | 'file', config: Config): any {
  const isImage = kind === 'image';
  return {
    name: isImage ? 'hoj-upload-image' : 'hoj-upload-file',
    tip: WebI18n.t(isImage ? 'vditor.uploadImage' : 'vditor.uploadFile'),
    className: '',
    icon: isImage ? VDITOR_ICON_IMAGE : VDITOR_ICON_FILE,
    click: () => {
      const cfg = getVditorUploadConfig(config);
      if (!cfg) { NewAlert('@vditor.uploadDisabled', 'warning'); return; }
      if (!cfg.valid) { NewAlert('@vditor.uploadNoGid', 'warning'); return; }

      const input = document.createElement('input');
      input.type = 'file';
      if (isImage) input.accept = 'image/*';
      input.style.display = 'none';

      input.addEventListener('change', async () => {
        const f = input.files && input.files[0];
        if (!f) return;
        try {
          const res = await uploadVditorAttachment(f, kind, cfg.gid);
          const ed = getEditor();
          if (!ed || typeof ed.insertValue !== 'function') return;
          const name = (f.name || '').replace(/[\[\]]/g, '_');
          const md = isImage
            ? `![${name}](${res.link})`
            : `[${name}](${res.link})`;
          ed.insertValue(md, true);
        } catch (e) {
          console.warn('[Vditor Upload] 失败:', e);
          NewAlert(WebI18n.t('vditor.uploadFailed', { msg: e.message || String(e) }), 'error');
        } finally {
          input.remove();
        }
      });

      document.body.appendChild(input);
      input.click();
    }
  };
}

function buildVditorToolbar(getEditor: () => any, config: Config): any[] {
  const base = [
    'headings', 'bold', 'italic', 'strike', 'link', '|',
    'list', 'ordered-list', 'check', 'outdent', 'indent', '|',
    'quote', 'line', 'code', 'inline-code', '|',
    'table', '|',
    'undo', 'redo', '|',
    'edit-mode', 'both', 'preview', 'fullscreen'
  ];

  const cfg = getVditorUploadConfig(config);
  if (!cfg) return base;

  const items: any[] = [];
  base.forEach(item => {
    items.push(item);
    if (item === 'redo') {
      items.push(makeVditorUploadToolbarItem(getEditor, 'image', config));
      items.push(makeVditorUploadToolbarItem(getEditor, 'file', config));
      items.push('|');
    }
  });
  return items;
}

function parseDiscussionEditContext(): { gid?: string; did: string } | null {
  const path = window.location.pathname;
  let m = path.match(/^\/group\/([^\/]+)\/discussion-detail\/([^\/?#]+)/);
  if (m) return { gid: m[1], did: m[2] };
  m = path.match(/^\/discussion-detail\/([^\/?#]+)/);
  if (m) return { gid: undefined, did: m[1] };
  return null;
}

async function fetchDiscussionDetail(did: string): Promise<any> {
  try {
    const token = localStorage.getItem('token') || '';
    const url = `${window.location.origin}/api/get-discussion-detail?did=${encodeURIComponent(did)}`;
    const resp = await fetch(url, {
      headers: { 'Authorization': token },
      credentials: 'include'
    });
    const data = await resp.json();
    return data?.data || null;
  } catch (e) {
    console.warn('[Discussion] 获取详情失败:', e);
    return null;
  }
}

export async function openNewDiscussionDialog(config: Config, opts: { gid?: string | number; pid?: string } = {}): Promise<void> {
  const { gid } = opts;
  let pid = opts.pid;

  /* ---------- 1. 加载 Vditor ---------- */
  let Vditor: any;
  try {
    Vditor = await ensureVditor();
  } catch (e) {
    console.error('[Discussion] Vditor 加载失败:', e);
    NewAlert('@discussion.loadEditorFailed', 'error');
    return;
  }

  /* ---------- 2. 拉分类 ---------- */
  const categories = await fetchDiscussionCategories(gid);
  if (!categories.length) {
    NewAlert('@discussion.loadCategoriesFailed', 'error');
    return;
  }

  /* ---------- 3. 构建表单 ---------- */
  const wrap = document.createElement('div');
  wrap.className = 'hoj-disc-form';

  /* 标题（必填） */
  const titleField = document.createElement('div');
  titleField.className = 'hoj-disc-field';
  const titleLabel = document.createElement('label');
  titleLabel.innerHTML = `${WebI18n.t('discussion.title')} <span style="color:#F56C6C;">*</span>`;
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.className = 'hoj-disc-title';
  titleInput.placeholder = WebI18n.t('discussion.titlePlaceholder');
  titleInput.maxLength = 200;
  titleField.append(titleLabel, titleInput);

  /* 简介（必填） */
  const descField = document.createElement('div');
  descField.className = 'hoj-disc-field';
  const descLabel = document.createElement('label');
  descLabel.innerHTML = `${WebI18n.t('discussion.description')} <span style="color:#F56C6C;">*</span>`;
  const descInput = document.createElement('input');
  descInput.type = 'text';
  descInput.className = 'hoj-disc-desc';
  descInput.placeholder = WebI18n.t('discussion.descriptionPlaceholder');
  descInput.maxLength = 200;
  descField.append(descLabel, descInput);

  /* 分类 */
  const catField = document.createElement('div');
  catField.className = 'hoj-disc-field';
  const catLabel = document.createElement('label');
  catLabel.textContent = WebI18n.t('discussion.category');
  const catSel = document.createElement('select');
  catSel.className = 'hoj-disc-category';
  categories.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.name;
    catSel.appendChild(opt);
  });
  catField.append(catLabel, catSel);

  /* ---------- 绑定题目（可选） ---------- */
  const pidField = document.createElement('div');
  pidField.className = 'hoj-disc-field';
  const pidLabel = document.createElement('label');
  pidLabel.innerHTML = `${WebI18n.t('discussion.bindProblem')}<span class="hoj-field-optional">(optional)</span>`;
  const pidInput = document.createElement('input');
  pidInput.type = 'text';
  pidInput.className = 'hoj-disc-pid';
  pidInput.placeholder = WebI18n.t('discussion.bindProblemPlaceholder');
  pidInput.maxLength = 100;
  pidField.append(pidLabel, pidInput);

  //  若 URL 形如 /discussion/{pid}，自动填充
  if (!pid) {
    const m = window.location.pathname.match(/^\/discussion\/([^\/?#]+)/);
    if (m) pid = decodeURIComponent(m[1]);
  }
  if (pid) pidInput.value = pid;

  /* 正文 */
  const contentField = document.createElement('div');
  contentField.className = 'hoj-disc-field hoj-disc-field--editor';
  const contentLabel = document.createElement('label');
  contentLabel.textContent = WebI18n.t('discussion.content');
  const editorHost = document.createElement('div');
  editorHost.className = 'hoj-disc-editor';
  contentField.append(contentLabel, editorHost);

  /* ---------- 高级选项（折叠） ---------- */
  const advSection = document.createElement('div');
  advSection.className = 'hoj-disc-advanced';
  advSection.innerHTML = `
  <button type="button" class="hoj-disc-advanced-toggle">
      <i class="el-icon-arrow-down"></i>
      <span class="hoj-disc-advanced-title"></span>
  </button>
  <div class="hoj-disc-advanced-body" style="display:none;">
      <div class="hoj-disc-advanced-hint"></div>
      <div class="hoj-disc-adv-grid">
          <div class="hoj-disc-field">
              <label class="hoj-disc-adv-label-role"></label>
              <select class="hoj-disc-adv-role">
                  <option value="user"></option>
                  <option value="admin"></option>
                  <option value="root"></option>
              </select>
          </div>
          <div class="hoj-disc-field">
              <label class="hoj-disc-adv-label-views"></label>
              <input type="number" class="hoj-disc-adv-viewNum" min="0" value="0">
          </div>
          <div class="hoj-disc-field">
              <label class="hoj-disc-adv-label-likes"></label>
              <input type="number" class="hoj-disc-adv-likeNum" min="0" value="0">
          </div>
          <div class="hoj-disc-field">
              <label class="hoj-disc-adv-label-comments"></label>
              <input type="number" class="hoj-disc-adv-commentNum" min="0" value="0">
          </div>
          <div class="hoj-disc-field hoj-disc-adv-field--check">
              <label class="hoj-disc-adv-check-wrap">
                  <input type="checkbox" class="hoj-disc-adv-topPriority">
                  <span class="hoj-disc-adv-label-top"></span>
              </label>
          </div>
      </div>
  </div>
`;
  advSection.querySelector('.hoj-disc-advanced-title')!.textContent = WebI18n.t('discussion.advanced');
  advSection.querySelector('.hoj-disc-advanced-hint')!.textContent  = WebI18n.t('discussion.advancedHint');
  advSection.querySelector('.hoj-disc-adv-label-role')!.textContent = WebI18n.t('discussion.role');
  advSection.querySelector('.hoj-disc-adv-label-views')!.textContent = WebI18n.t('discussion.viewNum');
  advSection.querySelector('.hoj-disc-adv-label-likes')!.textContent = WebI18n.t('discussion.likeNum');
  advSection.querySelector('.hoj-disc-adv-label-comments')!.textContent = WebI18n.t('discussion.commentNum');
  advSection.querySelector('.hoj-disc-adv-label-top')!.textContent  = WebI18n.t('discussion.topPriority');
  advSection.querySelector('.hoj-disc-adv-role option[value="user"]')!.textContent  = WebI18n.t('discussion.roleUser');
  advSection.querySelector('.hoj-disc-adv-role option[value="admin"]')!.textContent = WebI18n.t('discussion.roleAdmin');
  advSection.querySelector('.hoj-disc-adv-role option[value="root"]')!.textContent  = WebI18n.t('discussion.roleRoot');

  const advToggle = advSection.querySelector('.hoj-disc-advanced-toggle')!;
  const advBody   = advSection.querySelector('.hoj-disc-advanced-body')!;
  advToggle.addEventListener('click', () => {
    const open = advBody.style.display !== 'none';
    advBody.style.display = open ? 'none' : 'block';
    advToggle.classList.toggle('is-open', !open);
  });

  /* footer */
  const footer = document.createElement('div');
  footer.className = 'hoj-disc-footer';
  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.className = 'hoj-snippet-btn';
  cancelBtn.textContent = WebI18n.t('dialog.cancel');
  const submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.className = 'hoj-snippet-btn hoj-snippet-btn--primary';
  submitBtn.textContent = WebI18n.t('discussion.publish');
  footer.append(cancelBtn, submitBtn);

  /* 组装：标题 → 简介 → 分类 → 绑定题目 → 正文 → 高级 → footer */
  wrap.append(titleField, descField, catField, pidField, contentField, advSection, footer);

  /* ---------- 4. 打开对话框 ---------- */
  let editor: any = null;
  let destroyed = false;

  const closeDialog = openCustomDialog({
    title: WebI18n.t('discussion.new'),
    bodyEl: wrap,
    width: '760px',
    maxHeight: '85vh',
    fullscreen: true,
    onClose: () => {
      destroyed = true;
      if (editor) {
        try { editor.destroy(); } catch (_) {}
        editor = null;
      }
    }
  });

  cancelBtn.addEventListener('click', () => closeDialog());

  /* ---------- 5. 初始化 Vditor ---------- */
  const getEditor = () => editor;
  requestAnimationFrame(() => {
    if (destroyed) return;
    try {
      editor = new Vditor(editorHost, {
        cdn: VDITOR_CDN,
        height: 380,
        width: '100%',
        theme: getVditorTheme(config).editorTheme,
        icon: 'ant',
        mode: 'ir',
        value: '',
        placeholder: WebI18n.t('discussion.contentPlaceholder'),
        tab: '  ',
        counter: { enable: true, type: 'markdown' },
        cache: { enable: false },
        preview: {
          theme: { current: 'light', path: `${VDITOR_CDN}/dist/css/content-theme` },
          hljs: { style: 'github', lineNumber: true },
          math: { engine: 'KaTeX', inlineDigit: true },
          markdown: { toc: true }
        },
        toolbar: buildVditorToolbar(getEditor, config)
      });
    } catch (e) {
      console.error('[Discussion] Vditor 初始化失败:', e);
      NewAlert('@discussion.initEditorFailed', 'error');
    }
  });

  /* ---------- 6. 提交 ---------- */
  submitBtn.addEventListener('click', async () => {
    if (!editor) return NewAlert('@discussion.editorNotReady', 'warning');

    const categoryId  = Number(catSel.value);
    const title       = titleInput.value.trim();
    const description = descInput.value.trim();
    const content     = editor.getValue().trim();
    const pidText     = pidInput.value.trim();

    if (!categoryId)   return NewAlert('@discussion.categoryRequired', 'warning');
    if (!title)        return NewAlert('@discussion.titleRequired', 'warning');
    if (!description)  return NewAlert('@discussion.descriptionRequired', 'warning');
    if (!content)      return NewAlert('@discussion.contentRequired', 'warning');

    const role        = advSection.querySelector('.hoj-disc-adv-role')!.value || 'user';
    const viewNum     = Math.max(0, Number((advSection.querySelector('.hoj-disc-adv-viewNum') as HTMLInputElement).value) || 0);
    const likeNum     = Math.max(0, Number((advSection.querySelector('.hoj-disc-adv-likeNum') as HTMLInputElement).value) || 0);
    const commentNum  = Math.max(0, Number((advSection.querySelector('.hoj-disc-adv-commentNum') as HTMLInputElement).value) || 0);
    const topPriority = (advSection.querySelector('.hoj-disc-adv-topPriority') as HTMLInputElement).checked;

    submitBtn.disabled = true;
    const oldText = submitBtn.textContent;
    submitBtn.textContent = WebI18n.t('discussion.publishing');

    /* ---------- 构造请求 ---------- */
    const payload: any = {
      categoryId,
      title,
      description,
      content,
      role,
      viewNum,
      likeNum,
      commentNum,
      topPriority
    };
    //  pid：仅当有值时携带；类型为字符串
    if (pidText) payload.pid = String(pidText);
    // 团队场景附加 gid（数字优先）
    if (gid !== undefined && gid !== null && String(gid).trim() !== '') {
      const n = Number(gid);
      payload.gid = Number.isNaN(n) ? gid : n;
    }

    const url = (payload.gid !== undefined)
      ? '/api/group/discussion'
      : '/api/discussion';

    try {
      await hojApi(url, { method: 'POST', body: payload });

      NewAlert('@discussion.publishSuccess', 'success', 2000);
      closeDialog();
      setTimeout(() => location.reload(), 800);
    } catch (e) {
      // hojApi 已经 Alert 过；只需恢复按钮
      submitBtn.disabled = false;
      submitBtn.textContent = oldText;
    }
  });
}

export async function openEditDiscussionDialog(config: Config, ctx: { gid?: string; did: string }): Promise<void> {
  const { gid, did } = ctx;

  /* 1. 拉详情 */
  const detail = await fetchDiscussionDetail(did);
  if (!detail) {
    NewAlert('@discussion.loadDetailFailed', 'error');
    return;
  }

  /* 2. 拉分类 */
  let categories = await fetchDiscussionCategories(gid);
  if (!categories.length && gid) categories = await fetchDiscussionCategories();
  if (!categories.length) {
    NewAlert('@discussion.loadCategoriesFailed', 'error');
    return;
  }

  /* 3. 加载 Vditor */
  let VditorCtor: any;
  try { VditorCtor = await ensureVditor(); }
  catch (e) {
    console.error('[Discussion] Vditor 加载失败:', e);
    NewAlert('@discussion.loadEditorFailed', 'error');
    return;
  }

  /* 4. 构建表单 */
  const wrap = document.createElement('div');
  wrap.className = 'hoj-disc-form';

  // 分类
  const catField = document.createElement('div');
  catField.className = 'hoj-disc-field';
  const catLabel = document.createElement('label');
  catLabel.textContent = WebI18n.t('discussion.category');
  const catSel = document.createElement('select');
  catSel.className = 'hoj-disc-category';
  categories.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.name;
    if (Number(c.id) === Number(detail.categoryId)) opt.selected = true;
    catSel.appendChild(opt);
  });
  catField.append(catLabel, catSel);

  // 标题
  const titleField = document.createElement('div');
  titleField.className = 'hoj-disc-field';
  const titleLabel = document.createElement('label');
  titleLabel.innerHTML = `${WebI18n.t('discussion.title')} <span style="color:#F56C6C;">*</span>`;
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.className = 'hoj-disc-title';
  titleInput.placeholder = WebI18n.t('discussion.titlePlaceholder');
  titleInput.maxLength = 200;
  titleInput.value = detail.title || '';
  titleField.append(titleLabel, titleInput);

  // 简介
  const descField = document.createElement('div');
  descField.className = 'hoj-disc-field';
  const descLabel = document.createElement('label');
  descLabel.innerHTML = `${WebI18n.t('discussion.description')} <span style="color:#F56C6C;">*</span>`;
  const descInput = document.createElement('input');
  descInput.type = 'text';
  descInput.className = 'hoj-disc-desc';
  descInput.placeholder = WebI18n.t('discussion.descriptionPlaceholder');
  descInput.maxLength = 200;
  descInput.value = detail.description || '';
  descField.append(descLabel, descInput);

  // 内容
  const contentField = document.createElement('div');
  contentField.className = 'hoj-disc-field hoj-disc-field--editor';
  const contentLabel = document.createElement('label');
  contentLabel.textContent = WebI18n.t('discussion.content');
  const editorHost = document.createElement('div');
  editorHost.className = 'hoj-disc-editor';
  contentField.append(contentLabel, editorHost);

  // 高级选项（含 ForceUpdate）
  const advSection = document.createElement('div');
  advSection.className = 'hoj-disc-advanced';
  advSection.innerHTML = `
  <button type="button" class="hoj-disc-advanced-toggle">
      <i class="el-icon-arrow-down"></i>
      <span class="hoj-disc-advanced-title"></span>
  </button>
  <div class="hoj-disc-advanced-body" style="display:none;">
      <div class="hoj-disc-advanced-hint"></div>
      <div class="hoj-disc-adv-grid">
          <div class="hoj-disc-field">
              <label class="hoj-disc-adv-label-role"></label>
              <select class="hoj-disc-adv-role">
                  <option value="user"></option>
                  <option value="admin"></option>
                  <option value="root"></option>
              </select>
          </div>
          <div class="hoj-disc-field">
              <label class="hoj-disc-adv-label-views"></label>
              <input type="number" class="hoj-disc-adv-viewNum" min="0" value="0">
          </div>
          <div class="hoj-disc-field">
              <label class="hoj-disc-adv-label-likes"></label>
              <input type="number" class="hoj-disc-adv-likeNum" min="0" value="0">
          </div>
          <div class="hoj-disc-field">
              <label class="hoj-disc-adv-label-comments"></label>
              <input type="number" class="hoj-disc-adv-commentNum" min="0" value="0">
          </div>
          <div class="hoj-disc-field hoj-disc-adv-field--check">
              <label class="hoj-disc-adv-check-wrap">
                  <input type="checkbox" class="hoj-disc-adv-topPriority">
                  <span class="hoj-disc-adv-label-top"></span>
              </label>
          </div>
          <div class="hoj-disc-field hoj-disc-adv-field--check">
              <label class="hoj-disc-adv-check-wrap" title="">
                  <input type="checkbox" class="hoj-disc-adv-forceUpdate">
                  <span class="hoj-disc-adv-label-forceUpdate"></span>
              </label>
          </div>
      </div>
  </div>
`;

  // i18n
  advSection.querySelector('.hoj-disc-advanced-title')!.textContent = WebI18n.t('discussion.advanced');
  advSection.querySelector('.hoj-disc-advanced-hint')!.textContent  = WebI18n.t('discussion.advancedHint');
  advSection.querySelector('.hoj-disc-adv-label-role')!.textContent = WebI18n.t('discussion.role');
  advSection.querySelector('.hoj-disc-adv-label-views')!.textContent= WebI18n.t('discussion.viewNum');
  advSection.querySelector('.hoj-disc-adv-label-likes')!.textContent= WebI18n.t('discussion.likeNum');
  advSection.querySelector('.hoj-disc-adv-label-comments')!.textContent = WebI18n.t('discussion.commentNum');
  advSection.querySelector('.hoj-disc-adv-label-top')!.textContent  = WebI18n.t('discussion.topPriority');
  advSection.querySelector('.hoj-disc-adv-label-forceUpdate')!.textContent = WebI18n.t('discussion.forceUpdate');
  advSection.querySelector('.hoj-disc-adv-role option[value="user"]')!.textContent  = WebI18n.t('discussion.roleUser');
  advSection.querySelector('.hoj-disc-adv-role option[value="admin"]')!.textContent = WebI18n.t('discussion.roleAdmin');
  advSection.querySelector('.hoj-disc-adv-role option[value="root"]')!.textContent  = WebI18n.t('discussion.roleRoot');

  // 预填高级选项
  advSection.querySelector('.hoj-disc-adv-role')!.value       = detail.role || 'user';
  advSection.querySelector('.hoj-disc-adv-viewNum')!.value    = detail.viewNum ?? 0;
  advSection.querySelector('.hoj-disc-adv-likeNum')!.value    = detail.likeNum ?? 0;
  advSection.querySelector('.hoj-disc-adv-commentNum')!.value = detail.commentNum ?? 0;
  (advSection.querySelector('.hoj-disc-adv-topPriority') as HTMLInputElement).checked = !!detail.topPriority;
  advSection.querySelector('.hoj-disc-adv-forceUpdate')!.parentElement!.title = WebI18n.t('discussion.forceUpdateHint');

  // 折叠
  const advToggle = advSection.querySelector('.hoj-disc-advanced-toggle')!;
  const advBody   = advSection.querySelector('.hoj-disc-advanced-body')!;
  advToggle.addEventListener('click', () => {
    const open = advBody.style.display !== 'none';
    advBody.style.display = open ? 'none' : 'block';
    advToggle.classList.toggle('is-open', !open);
  });

  // 底部
  const footer = document.createElement('div');
  footer.className = 'hoj-disc-footer';
  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.className = 'hoj-snippet-btn';
  cancelBtn.textContent = WebI18n.t('dialog.cancel');
  const submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.className = 'hoj-snippet-btn hoj-snippet-btn--primary';
  submitBtn.textContent = WebI18n.t('discussion.save');
  footer.append(cancelBtn, submitBtn);

  wrap.append(titleField, descField, catField, contentField, advSection, footer);

  /* 5. 打开对话框 */
  let editor: any = null;
  let destroyed = false;

  const closeDialog = openCustomDialog({
    title: WebI18n.t('discussion.edit'),
    bodyEl: wrap,
    width: '760px',
    maxHeight: '85vh',
    fullscreen: true,
    onClose: () => {
      destroyed = true;
      if (editor) {
        try { editor.destroy(); } catch (_) {}
        editor = null;
      }
    }
  });

  cancelBtn.addEventListener('click', () => closeDialog());

  /* 6. 初始化 Vditor */
  const getEditor = () => editor;
  requestAnimationFrame(() => {
    if (destroyed) return;
    try {
      editor = new VditorCtor(editorHost, {
        cdn: VDITOR_CDN,
        height: '100%',
        width: '100%',
        theme: getVditorTheme(config).editorTheme,
        icon: 'ant',
        mode: 'ir',
        value: detail.content || '',
        placeholder: WebI18n.t('discussion.contentPlaceholder'),
        tab: '  ',
        counter: { enable: true, type: 'markdown' },
        cache: { enable: false },
        preview: {
          theme: { current: 'light', path: `${VDITOR_CDN}/dist/css/content-theme` },
          hljs: { style: 'github', lineNumber: true },
          math: { engine: 'KaTeX', inlineDigit: true },
          markdown: { toc: true }
        },
        toolbar: buildVditorToolbar(getEditor, config)
      });
    } catch (e) {
      console.error('[Discussion] Vditor 初始化失败:', e);
      NewAlert('@discussion.initEditorFailed', 'error');
    }
  });

  /* 7. 提交 */
  submitBtn.addEventListener('click', async () => {
    if (!editor) return NewAlert('@discussion.editorNotReady', 'warning');

    const categoryId  = Number(catSel.value);
    const title       = titleInput.value.trim();
    const description = descInput.value.trim();
    const content     = editor.getValue().trim();

    if (!categoryId)  return NewAlert('@discussion.categoryRequired', 'warning');
    if (!title)       return NewAlert('@discussion.titleRequired', 'warning');
    if (!description) return NewAlert('@discussion.descriptionRequired', 'warning');
    if (!content)     return NewAlert('@discussion.contentRequired', 'warning');

    const role        = advSection.querySelector('.hoj-disc-adv-role')!.value || 'user';
    const viewNum     = Math.max(0, Number((advSection.querySelector('.hoj-disc-adv-viewNum') as HTMLInputElement).value) || 0);
    const likeNum     = Math.max(0, Number((advSection.querySelector('.hoj-disc-adv-likeNum') as HTMLInputElement).value) || 0);
    const commentNum  = Math.max(0, Number((advSection.querySelector('.hoj-disc-adv-commentNum') as HTMLInputElement).value) || 0);
    const topPriority = (advSection.querySelector('.hoj-disc-adv-topPriority') as HTMLInputElement).checked;
    const forceUpdate = (advSection.querySelector('.hoj-disc-adv-forceUpdate') as HTMLInputElement).checked;

    submitBtn.disabled = true;
    const oldText = submitBtn.textContent;
    submitBtn.textContent = WebI18n.t('discussion.saving');

    try {
      /* ---- 请求体 ---- */
      const payload: any = {
        id: Number(did),   //  编辑：用 id = did
        categoryId,
        title,
        description,
        content,
        role,
        viewNum,
        likeNum,
        commentNum,
        topPriority,
        status: 0
      };

      /* ---- 端点 ---- */
      let url = `${window.location.origin}/api/discussion`;
      if (gid) {
        url = `${window.location.origin}/api/group/discussion`;
        const n = Number(gid);
        payload.gid = Number.isNaN(n) ? gid : n;
      }

      /* ---- 方法：PUT 优先，forceUpdate 时 POST ---- */
      const method = forceUpdate ? 'POST' : 'PUT';

      const token = localStorage.getItem('token') || '';
      const resp = await fetch(url, {
        method,
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      const data = await resp.json().catch(() => null);

      const ok = data && (data.status === undefined || data.status === 200);
      if (ok) {
        NewAlert('@discussion.saveSuccess', 'success', 2000);
        closeDialog();
        setTimeout(() => location.reload(), 800);
      } else {
        const msg = data?.msg || data?.message || 'Unknown error';
        NewAlert(WebI18n.t('discussion.saveFailed', { msg }), 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = oldText;
      }
    } catch (e) {
      console.error('[Discussion] 保存失败:', e);
      NewAlert(WebI18n.t('discussion.saveFailed', { msg: (e as Error).message }), 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = oldText;
    }
  });
}

export async function openGroupCreateDialog(config: Config): Promise<void> {
  const _t = WebI18n.t.bind(WebI18n);

  /* ---- 加载 Vditor ---- */
  let VditorCtor: any;
  try { VditorCtor = await ensureVditor(); }
  catch (e) {
    console.error('[Group] Vditor 加载失败:', e);
    NewAlert('@discussion.loadEditorFailed', 'error');
    return;
  }

  /* ---- 表单结构 ---- */
  const wrap = document.createElement('div');
  wrap.className = 'hoj-disc-form';

  /* ---------- 1. 名称（必填，≤25） ---------- */
  const nameField = document.createElement('div');
  nameField.className = 'hoj-disc-field';
  nameField.innerHTML = `<label>${escapeHtml(_t('group.name'))} <span style="color:#F56C6C;">*</span></label>`;
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.className = 'hoj-disc-title';
  nameInput.placeholder = _t('group.namePlaceholder');
  nameInput.maxLength = 25;
  nameField.appendChild(nameInput);

  /* ---------- 2. 简称（可选，≤10） ---------- */
  const shortField = document.createElement('div');
  shortField.className = 'hoj-disc-field';
  shortField.innerHTML = `<label>${escapeHtml(_t('group.shortName'))}<span class="hoj-field-optional">(optional)</span></label>`;
  const shortInput = document.createElement('input');
  shortInput.type = 'text';
  shortInput.className = 'hoj-disc-title';
  shortInput.placeholder = _t('group.shortNamePlaceholder');
  shortInput.maxLength = 10;
  shortField.appendChild(shortInput);

  /* ---------- 3. 简介（可选，≤50） ---------- */
  const briefField = document.createElement('div');
  briefField.className = 'hoj-disc-field';
  briefField.innerHTML = `<label>${escapeHtml(_t('group.brief'))}<span class="hoj-field-optional">(optional)</span></label>`;
  const briefInput = document.createElement('input');
  briefInput.type = 'text';
  briefInput.className = 'hoj-disc-desc';
  briefInput.placeholder = _t('group.briefPlaceholder');
  briefInput.maxLength = 50;
  briefField.appendChild(briefInput);

  /* ---------- 4. 加入权限（带颜色） ---------- */
  const authField = document.createElement('div');
  authField.className = 'hoj-disc-field';
  authField.innerHTML = `
        <label>${escapeHtml(_t('group.auth'))}</label>
        <div class="hoj-group-auth-group">
            <label class="hoj-group-auth-option" data-auth="1">
                <input type="radio" name="hoj-group-auth" value="1" checked>
                <span class="hoj-group-auth-text">
                    <span class="hoj-group-auth-title"></span>
                    <span class="hoj-group-auth-desc"></span>
                </span>
            </label>
            <label class="hoj-group-auth-option" data-auth="2">
                <input type="radio" name="hoj-group-auth" value="2">
                <span class="hoj-group-auth-text">
                    <span class="hoj-group-auth-title"></span>
                    <span class="hoj-group-auth-desc"></span>
                </span>
            </label>
            <label class="hoj-group-auth-option" data-auth="3">
                <input type="radio" name="hoj-group-auth" value="3">
                <span class="hoj-group-auth-text">
                    <span class="hoj-group-auth-title"></span>
                    <span class="hoj-group-auth-desc"></span>
                </span>
            </label>
        </div>
    `;
  const authOptions = authField.querySelectorAll('.hoj-group-auth-option');
  const setText = (el: Element | null, txt: string) => { if (el) el.textContent = txt; };
  setText(authOptions[0].querySelector('.hoj-group-auth-title'), _t('group.auth.public'));
  setText(authOptions[0].querySelector('.hoj-group-auth-desc'), _t('group.auth.publicTip'));
  setText(authOptions[1].querySelector('.hoj-group-auth-title'), _t('group.auth.protected'));
  setText(authOptions[1].querySelector('.hoj-group-auth-desc'), _t('group.auth.protectedTip'));
  setText(authOptions[2].querySelector('.hoj-group-auth-title'), _t('group.auth.private'));
  setText(authOptions[2].querySelector('.hoj-group-auth-desc'), _t('group.auth.privateTip'));

  /* ---------- 5. 邀请码（仅私有显示） ---------- */
  const codeField = document.createElement('div');
  codeField.className = 'hoj-disc-field';
  codeField.style.display = 'none';
  codeField.innerHTML = `<label>${escapeHtml(_t('group.code'))}<span class="hoj-field-optional">(optional)</span></label>`;
  const codeInput = document.createElement('input');
  codeInput.type = 'text';
  codeInput.className = 'hoj-disc-title';
  codeInput.placeholder = _t('group.codePlaceholder');
  codeInput.maxLength = 64;
  codeField.appendChild(codeInput);

  // auth 变化 → 切换 code 显隐
  authField.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.name !== 'hoj-group-auth') return;
    codeField.style.display = target.value === '3' ? '' : 'none';
  });

  /* ---------- 6. 可见性（左公开 · 右隐藏） ---------- */
  const visibleField = document.createElement('div');
  visibleField.className = 'hoj-disc-field';
  visibleField.innerHTML = `
        <label>${escapeHtml(_t('group.visible'))}</label>
        <div class="hoj-group-visible-row">
            <span class="hoj-group-visible-label is-active" data-side="public"></span>
            <div class="hoj-group-visible-switch" role="switch" aria-checked="true" tabindex="0"></div>
            <span class="hoj-group-visible-label" data-side="hidden"></span>
        </div>
        <div class="hoj-group-visible-hint"></div>
    `;
  const labelPublic = visibleField.querySelector('[data-side="public"]') as HTMLElement;
  const labelHidden = visibleField.querySelector('[data-side="hidden"]') as HTMLElement;
  const switchEl = visibleField.querySelector('.hoj-group-visible-switch') as HTMLElement;
  const visibleHint = visibleField.querySelector('.hoj-group-visible-hint') as HTMLElement;
  labelPublic.textContent = _t('group.visiblePublic');
  labelHidden.textContent = _t('group.visibleHidden');
  visibleHint.textContent = _t('group.visibleHint');

  // 状态：true = 公开可见
  let visible = true;

  const renderVisible = () => {
    labelPublic.classList.toggle('is-active', visible);
    labelHidden.classList.toggle('is-active', !visible);
    switchEl.classList.toggle('is-hidden', !visible);
    switchEl.setAttribute('aria-checked', String(visible));
    visibleHint.textContent = visible ? _t('group.visibleHintPublic') : _t('group.visibleHintHidden');
  };

  const toggleVisible = () => { visible = !visible; renderVisible(); };

  switchEl.addEventListener('click', toggleVisible);
  labelPublic.addEventListener('click', () => { if (!visible) toggleVisible(); });
  labelHidden.addEventListener('click', () => { if (visible) toggleVisible(); });
  switchEl.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleVisible(); }
  });

  renderVisible();   // 初始：公开

  /* ---------- 7. 团队介绍（Vditor，置底） ---------- */
  const descField = document.createElement('div');
  descField.className = 'hoj-disc-field hoj-disc-field--editor hoj-disc-field--editor-bottom';
  descField.innerHTML = `<label>${escapeHtml(_t('group.description'))} <span style="color:#F56C6C;">*</span></label>`;
  const editorHost = document.createElement('div');
  editorHost.className = 'hoj-disc-editor';
  descField.appendChild(editorHost);

  /* ---------- 底部 ---------- */
  const footer = document.createElement('div');
  footer.className = 'hoj-disc-footer';
  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.className = 'hoj-snippet-btn';
  cancelBtn.textContent = _t('dialog.cancel');
  const submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.className = 'hoj-snippet-btn hoj-snippet-btn--primary';
  submitBtn.textContent = _t('group.create');
  footer.append(cancelBtn, submitBtn);

  /* ---------- 按新顺序组装 ---------- */
  //  名称 → 简称 → 简介 → 权限 → 邀请码 → 可见性 → 团队介绍(Vditor) → footer
  wrap.append(nameField, shortField, briefField, authField, codeField, visibleField, descField, footer);

  /* ---------- 打开 Dialog ---------- */
  let editor: any = null;
  let destroyed = false;

  const closeDialog = openCustomDialog({
    title: _t('group.createTitle'),
    bodyEl: wrap,
    width: '760px',
    maxHeight: '85vh',
    fullscreen: true,
    onClose: () => {
      destroyed = true;
      if (editor) {
        try { editor.destroy(); } catch (_) {}
        editor = null;
      }
    }
  });

  cancelBtn.addEventListener('click', () => closeDialog());

  /* ---------- 初始化 Vditor ---------- */
  const getEditor = () => editor;
  requestAnimationFrame(() => {
    if (destroyed) return;
    try {
      editor = new VditorCtor(editorHost, {
        cdn: VDITOR_CDN,
        height: '100%',
        width: '100%',
        theme: getVditorTheme(config).editorTheme,
        icon: 'ant',
        mode: 'ir',
        value: '',
        placeholder: _t('group.descriptionPlaceholder'),
        tab: '  ',
        counter: { enable: true, type: 'markdown' },
        cache: { enable: false },
        preview: {
          theme: { current: 'light', path: `${VDITOR_CDN}/dist/css/content-theme` },
          hljs: { style: 'github', lineNumber: true },
          math: { engine: 'KaTeX', inlineDigit: true },
          markdown: { toc: true }
        },
        toolbar: buildVditorToolbar(getEditor, config)
      });
    } catch (e) {
      console.error('[Group] Vditor 初始化失败:', e);
      NewAlert('@discussion.initEditorFailed', 'error');
    }
  });

  /* ---------- 提交 ---------- */
  submitBtn.addEventListener('click', async () => {
    if (!editor) return NewAlert('@discussion.editorNotReady', 'warning');

    const name = nameInput.value.trim();
    const shortName = shortInput.value.trim();
    const brief = briefInput.value.trim();
    const description = editor.getValue().trim();
    const authEl = authField.querySelector('input[name="hoj-group-auth"]:checked') as HTMLInputElement | null;
    const auth = authEl ? Number(authEl.value) : 1;
    const code = auth === 3 ? codeInput.value.trim() : '';
    const visibleVal = visible;   // 当前 toggle 状态

    /* 校验 */
    if (!name) return NewAlert('@group.nameRequired', 'warning');
    if (name.length > 25) return NewAlert('@group.nameTooLong', 'warning');
    if (shortName.length > 10) return NewAlert('@group.shortNameTooLong', 'warning');
    if (brief.length > 50) return NewAlert('@group.briefTooLong', 'warning');
    if (!description) return NewAlert('@group.descriptionRequired', 'warning');

    submitBtn.disabled = true;
    const oldText = submitBtn.textContent;
    submitBtn.textContent = _t('group.creating');

    try {
      await hojApi('/api/group', {
        method: 'POST',
        body: { name, shortName, brief, description, auth, code, visible: visibleVal }
      });

      NewAlert('@group.createSuccess', 'success', 2000);
      closeDialog();
      setTimeout(() => location.reload(), 800);
    } catch (e) {
      submitBtn.disabled = false;
      submitBtn.textContent = oldText;
    }
  });
}

export function injectDiscussionInterceptor(config: Config): boolean {
  if (!config.VditorDiscussionPublish) return false;
  const path = window.location.pathname;

  // 1) 普通讨论列表
  const isTopLevel = /^\/discussion(\/|$)/.test(path);
  // 2) 团队讨论列表
  const groupMatch = path.match(/^\/group\/([^\/]+)\/discussion(\/|$)/);
  const isGroup = !!groupMatch;

  if (!isTopLevel && !isGroup) return false;

  const gid = isGroup ? groupMatch![1] : undefined;

  // 找按钮（两种形态）
  //   普通：<button class="el-button--primary">... 发布一个讨论~</button>
  //   团队：<button class="el-button--primary el-button--small"><i class="el-icon-plus"></i> 创建</button>
  const btn = ([...document.querySelectorAll('button.el-button--primary')] as HTMLButtonElement[]).find(b => {
    const t = (b.textContent || '').trim();
    return /发布一个讨论|发布讨论|创建|new discussion|create discussion|create/i.test(t);
  });
  if (!btn) return false;

  // 用 gid 区分不同来源（避免同一按钮被重复绑定而拿错 gid）
  const marker = gid ? `group:${gid}` : 'top';
  if (btn.dataset.hojDiscIntercepted === marker) return true;
  btn.dataset.hojDiscIntercepted = marker;

  // capture 阶段拦截，阻止站点自身弹窗
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    void openNewDiscussionDialog(config, { gid });
  }, true);

  console.log(`[Discussion] 已接管「发布 / 创建」按钮 (${gid ? 'group ' + gid : 'top level'})`);
  return true;
}

export function injectDiscussionEditInterceptor(config: Config): boolean {
  if (!config.VditorDiscussionEdit) return false;

  const ctx = parseDiscussionEditContext();
  if (!ctx) return false;

  // 找“编辑”链接
  const editLink = ([...document.querySelectorAll('a')] as HTMLElement[]).find(a => {
    const t = (a.textContent || '').trim();
    if (!/编辑|edit/i.test(t)) return false;
    // 优先带 el-icon-edit-outline 的
    return !!a.querySelector('.el-icon-edit-outline') || /^编辑$|^edit$/i.test(t);
  });
  if (!editLink) return false;

  if (editLink.dataset.hojEditIntercepted === '1') return true;
  editLink.dataset.hojEditIntercepted = '1';

  editLink.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    void openEditDiscussionDialog(config, ctx);
  }, true);

  console.log('[Discussion] 已接管「编辑」按钮', ctx);
  return true;
}

export function injectGroupCreateInterceptor(config: Config): boolean {
  if (!config.VditorGroupCreate) return false;
  // 只在顶层 /group 生效（团队详情页 /group/{gid} 不拦）
  if (!/^\/group\/?$/.test(window.location.pathname)) return false;

  // 找按钮：文本匹配
  const btns = document.querySelectorAll('button.el-button--primary');
  let target: HTMLButtonElement | null = null;
  for (const b of Array.from(btns) as HTMLButtonElement[]) {
    const t = (b.textContent || '').trim();
    if (/创建团队|create\s+group|new\s+group/i.test(t)) { target = b; break; }
  }
  if (!target) return false;

  if (target.dataset.hojCreateGroupIntercepted === '1') return true;
  target.dataset.hojCreateGroupIntercepted = '1';

  target.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    void openGroupCreateDialog(config);
  }, true);

  console.log('[Group] 已接管「创建团队」按钮');
  return true;
}
