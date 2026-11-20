/**
 * Custom Tag Feature
 * Handles personal rank tag display and cloud sync
 */

import { hojApi, NewAlert, NewDialog } from '../core/api.js';
import { WebI18n } from '../core/i18n.js';
import { saveConfig } from '../core/config.js';
import type { Config } from '../core/config.js';

const HOJTAG_BASE = 'https://hojtag.rkcd.me';

interface TagData {
  name: string;
  color: string;
}

// Use GM_xmlhttpRequest for HOJTag endpoints since they use different paths
async function getCurrentUsername(): Promise<string | null> {
  if (_currentUsername) return _currentUsername;
  
  try {
    const raw = localStorage.getItem('userInfo');
    if (raw) {
      const info = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (info && info.username) {
        _currentUsername = info.username;
        return _currentUsername;
      }
    }
  } catch (e) {}
  
  try {
    const token = localStorage.getItem('token') || '';
    const resp = await fetch(`${window.location.origin}/api/get-user-home-info`, {
      method: 'GET',
      headers: { 'Authorization': token, 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    const data = await resp.json();
    if (data?.status === 200 && data?.data?.username) {
      _currentUsername = data.data.username;
      return _currentUsername;
    }
  } catch (e) {}
  return null;
}

let _currentUsername: string | null = null;

function tagApi(endpoint: string, method: string, body: any): Promise<any> {
  return new Promise((resolve) => {
    // @ts-ignore - GM_xmlhttpRequest is provided by userscript environment
    GM_xmlhttpRequest({
      method,
      url: `${HOJTAG_BASE}${endpoint}`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(body),
      onload: (r: any) => {
        if (r.status === 200) {
          try {
            const data = JSON.parse(r.responseText);
            if (data.success && data.data) return resolve(data.data);
          } catch (e) {}
        }
        console.warn('[Tag] API failed:', r.status, r.responseText);
        resolve(null);
      },
      onerror: () => { console.warn('[Tag] 网络错误'); resolve(null); },
      ontimeout: () => { console.warn('[Tag] 超时'); resolve(null); }
    });
  });
}
/* ============================================================
 * 排行榜 / 用户主页自定义标签
 * ============================================================ */

const CUSTOM_RANK_TAG_CLASS = 'hoj-custom-rank-tag';

const _tagCache = new Map<string, { tagname?: string; tagcolor?: string } | null>();

let _rankTagTimer: number | null = null;
let _userHomeTimer: number | null = null;
let _rankSearchHandler: ((ev: Event) => void) | null = null;
let _rankTagDebounce: number | null = null;

/** 排行榜页面判断（与原版一致：oi-rank / acm-rank / home） */
export function isRankPage(): boolean {
  const p = window.location.pathname;
  return /\/(oi-rank|acm-rank)(\/|$)/.test(p) || /\/home(\/|$)/.test(p);
}

export function isUserHomePage(): boolean {
  const p = window.location.pathname;
  // 支持 /user-home?uid=xxx
  return /^\/(user-home)(\/|$)/.test(p);
}

/** 判断是否为排行榜列表接口 */
export function isRankListApi(url: unknown): boolean {
  return typeof url === 'string' && (
    url.includes('/api/get-rank-list') ||
    url.includes('/api/get-group-rank-list')
  );
}

/** 查询单个用户标签（带缓存） */
export function fetchUserTag(username: string): Promise<any> {
  if (_tagCache.has(username)) {
    return Promise.resolve(_tagCache.get(username));
  }
  return new Promise((resolve) => {
    // @ts-ignore - GM_xmlhttpRequest provided by userscript environment
    GM_xmlhttpRequest({
      method: 'GET',
      url: `${HOJTAG_BASE}/query?username=${encodeURIComponent(username)}`,
      onload: (r: any) => {
        if (r.status === 200) {
          try {
            const data = JSON.parse(r.responseText);
            if (data.success && data.data) {
              _tagCache.set(username, data.data);
              resolve(data.data);
              return;
            }
          } catch (_) {}
        }
        _tagCache.set(username, null);   // 404 或解析失败 → 缓存 null
        resolve(null);
      },
      onerror: () => { _tagCache.set(username, null); resolve(null); },
      ontimeout: () => { _tagCache.set(username, null); resolve(null); }
    });
  });
}

/** 清空缓存（切换用户 / 更新配置时用） */
export function clearTagCache(): void {
  _tagCache.clear();
}

/** 排行榜标签：入口，带轮询等待表格渲染 */
export async function injectRankTag(config: Config): Promise<void> {
  if (!isRankPage()) return;

  // 清旧标签
  document.querySelectorAll('.' + CUSTOM_RANK_TAG_CLASS).forEach(el => el.remove());

  const myTagText = (config.CustomRankTag || '').trim();
  const myName = await getCurrentUsername();

  // 自己和别人都可能没有标签 → 从云端拉一次自己的
  let myRemoteTag = null;
  if (!myTagText && myName) {
    myRemoteTag = await fetchUserTag(myName);
  }
  const myEffectiveTag = myTagText || myRemoteTag?.tagname || '';
  const myEffectiveColor = (config.CustomRankTagColor || myRemoteTag?.tagcolor || '#18BE6A');

  const MAX_TRIES = 40;
  let tries = 0;

  const poll = async () => {
    tries++;
    if (!isRankPage()) return;

    const tables = document.querySelectorAll('.vxe-table, table');
    let rows: HTMLElement[] = [];
    for (const table of tables) {
      const found = [...table.querySelectorAll('tbody tr')] as HTMLElement[];
      if (found.length > rows.length) rows = found;
    }

    if (rows.length === 0) {
      if (tries < MAX_TRIES) _rankTagTimer = window.setTimeout(poll, 250);
      return;
    }

    await doInjectRankTag(rows, myName, myEffectiveTag, myEffectiveColor);
  };

  poll();
}

async function doInjectRankTag(
  rows: HTMLElement[],
  myName: string | null,
  myTagText: string,
  myTagColor: string
): Promise<void> {
  // 先把所有用户名收集起来，去重后并发查询（除自己外）
  const usernames = new Set<string>();
  rows.forEach(row => {
    const a = row.querySelector('a');
    if (a) usernames.add((a.textContent || '').trim());
  });

  // 并发查询他人标签（自己用本机配置，无需查询）
  const others = [...usernames].filter(u => u && u !== myName);
  await Promise.all(others.map(u => fetchUserTag(u)));

  let matched = 0;
  rows.forEach(row => {
    const a = row.querySelector('a');
    if (!a) return;
    const rowName = (a.textContent || '').trim();
    if (!rowName) return;

    // 防重复
    const next = a.nextElementSibling;
    if (next && next.classList.contains(CUSTOM_RANK_TAG_CLASS)) return;

    let tagname = '';
    let tagcolor = '#18BE6A';

    if (myName && rowName === myName) {
      // 本人：用本机配置
      if (!myTagText) return;         // 本机没配置则不显示
      tagname = myTagText;
      tagcolor = (myTagColor || '').trim() || '#18BE6A';
    } else {
      // 他人：用云端数据
      const remote = _tagCache.get(rowName);
      if (!remote || !remote.tagname) return;
      tagname = remote.tagname;
      tagcolor = remote.tagcolor || '#18BE6A';
    }

    // 注入
    const wrapper = document.createElement('span');
    wrapper.className = CUSTOM_RANK_TAG_CLASS;
    wrapper.style.marginLeft = '2px';

    const tagEl = document.createElement('span');
    tagEl.className = 'el-tag el-tag--small el-tag--dark';
    tagEl.style.backgroundColor = tagcolor;
    tagEl.textContent = ' ' + tagname + ' ';

    wrapper.appendChild(tagEl);
    a.insertAdjacentElement('afterend', wrapper);
    matched++;
  });

  console.log(`[HOJTag] 共注入 ${matched} 处标签`);
}

export function clearRankTags(): void {
  if (_rankTagTimer) { clearTimeout(_rankTagTimer); _rankTagTimer = null; }
  document.querySelectorAll('.' + CUSTOM_RANK_TAG_CLASS).forEach(el => el.remove());
}

/* ============================================================
 * 排行榜标签：监听搜索按钮点击后重新注入
 * ============================================================ */
export function startRankTableObserver(): void {
  if (_rankSearchHandler) return;

  _rankSearchHandler = (ev: Event) => {
    // 扩大到：搜索按钮 + 分页控件（上一页/下一页/页码/每页数量）
    const target = ev.target as HTMLElement | null;
    const btn = target?.closest?.(
      'button.search-btn, button.btn-prev, button.btn-next, ' +
      '.el-pager .number, .el-select-dropdown__item'
    );
    if (!btn) return;
    if (!isRankPage()) return;

    // 关键：先同步清掉旧标签，避免翻页瞬间旧标签「粘」在错误行上
    clearRankTags();

    console.log('[RankTag] 检测到搜索/分页操作，准备重新注入');
    // 之后由 injectRankTag 轮询等待新表格渲染
    scheduleRankTag();
  };

  document.addEventListener('click', _rankSearchHandler, true);
  console.log('[RankTag] 已监听搜索按钮与分页控件');
}

export function stopRankTableObserver(): void {
  if (_rankSearchHandler) {
    document.removeEventListener('click', _rankSearchHandler, true);
    _rankSearchHandler = null;
  }
}

/* ============================================================
 * 用户主页 tag 注入（带轮询）
 * ============================================================ */
export async function injectUserHomeTag(config: Config): Promise<void> {
  if (!isUserHomePage()) return;

  // 清掉之前的定时器（防止叠加）
  if (_userHomeTimer) {
    clearTimeout(_userHomeTimer);
    _userHomeTimer = null;
  }

  const MAX_TRIES = 40;   // 40 × 250ms = 10 秒
  let tries = 0;

  const poll = async () => {
    tries++;

    const infoEl = document.querySelector('.user-info');
    const nameEl = infoEl ? infoEl.querySelector('.emphasis') : null;

    console.log(`[UserHome Tag] 轮询 ${tries}: user-info=${!!infoEl}, name=${nameEl ? (nameEl.textContent || '').trim() : 'null'}`);

    // 等两个都出现
    if (!infoEl || !nameEl) {
      if (tries < MAX_TRIES) {
        _userHomeTimer = window.setTimeout(poll, 250);
      } else {
        console.warn('[UserHome Tag] 轮询超时，未找到 .user-info');
      }
      return;
    }

    const username = (nameEl.textContent || '').trim();
    if (!username) {
      if (tries < MAX_TRIES) {
        _userHomeTimer = window.setTimeout(poll, 250);
      }
      return;
    }

    // 页面已有 tag
    if (infoEl.querySelector('.hoj-userhome-tag')) {
      console.log('[UserHome Tag] 已注入过，跳过');
      return;
    }

    const userP = nameEl.closest('p');
    if (!userP) {
      if (tries < MAX_TRIES) {
        _userHomeTimer = window.setTimeout(poll, 250);
      }
      return;
    }

    let tagname = '';
    let tagcolor = '#18BE6A';

    const myName = await getCurrentUsername();
    if (myName && username === myName) {
      tagname = (config.CustomRankTag || '').trim();
      tagcolor = (config.CustomRankTagColor || '').trim() || '#18BE6A';
    } else {
      const remote = await fetchUserTag(username);
      if (remote && remote.tagname) {
        tagname = remote.tagname;
        tagcolor = remote.tagcolor || '#18BE6A';
      }
    }

    if (!tagname) {
      console.log('[UserHome Tag] 无 tag 可注入');
      return;
    }

    // 注入结构
    const wrapper = document.createElement('p');
    wrapper.className = 'hoj-userhome-tag';
    const outerSpan = document.createElement('span');
    const tagEl = document.createElement('span');
    tagEl.className = 'el-tag el-tag--small el-tag--dark';
    tagEl.style.backgroundColor = tagcolor;
    tagEl.textContent = ' ' + tagname + ' ';
    outerSpan.appendChild(tagEl);
    wrapper.appendChild(outerSpan);

    userP.insertAdjacentElement('afterend', wrapper);
    console.log('[UserHome Tag] 已注入:', tagname, '用户:', username);
  };

  poll();
}

/** 清理用户主页 tag */
export function clearUserHomeTags(): void {
  if (_userHomeTimer) {
    clearTimeout(_userHomeTimer);
    _userHomeTimer = null;
  }
  document.querySelectorAll('.hoj-userhome-tag').forEach(el => el.remove());
}

/* ============================================================
 * 排行榜标签调度
 * ============================================================ */
let _rankConfig: Config | null = null;

/** 由入口注入当前配置，供调度器使用 */
export function setRankTagConfig(config: Config): void {
  _rankConfig = config;
}

export function scheduleRankTag(): void {
  if (_rankTagDebounce) clearTimeout(_rankTagDebounce);
  _rankTagDebounce = window.setTimeout(() => {
    _rankTagDebounce = null;
    if (_rankConfig) injectRankTag(_rankConfig);
  }, 500);
}

/**
 * 从云端刷新当前用户标签
 * @param notify 为 true 时把「无标签 / 失败」提示给用户（手动刷新场景）；
 *               启动时静默，避免每次开页都弹窗。
 */
export async function getTagfromRemote(notify = false): Promise<void> {
  let remote: any = null;
  try {
    remote = await updateRankTags();
  } catch (e) {
    console.warn('[RankTag] 拉取云端标签失败:', e);
  }
  if (!remote) {
    if (notify) NewAlert('云端无标签或请求失败', 'warning');
    else console.log('[RankTag] 云端无标签（静默）');
    return;
  }
  console.log('[RankTag] 已刷新：' + remote.tagname);
}

async function updateRankTags(): Promise<any> {
  const username = await getCurrentUsername();
  if (!username) return null;
  return fetchUserTag(username);
}

/* ============================================================
 * 云端标签推送 / 删除
 * ============================================================ */
export function isValidHexColor(c: unknown): boolean {
  return typeof c === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(c.trim());
}

/** 把当前用户的标签推送到云端 */
export async function pushMyTag(config: Config): Promise<void> {
  const tagname = (config.CustomRankTag || '').trim();
  const tagcolor = (config.CustomRankTagColor || '').trim();
  if (!tagname) return;               // 没有标签就不推送
  if (!isValidHexColor(tagcolor)) {
    console.warn('[HOJTag] tagcolor 非法，跳过推送:', tagcolor);
    return;
  }

  const username = await getCurrentUsername();
  if (!username) return;

  return new Promise((resolve) => {
    // @ts-ignore - GM_xmlhttpRequest provided by userscript environment
    GM_xmlhttpRequest({
      method: 'POST',
      url: `${HOJTAG_BASE}/update`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ username, tagname, tagcolor }),
      onload: (r: any) => {
        try {
          const data = JSON.parse(r.responseText);
          if (data.success) {
            console.log('[HOJTag] 云端标签已更新:', data.data);
          } else {
            console.warn('[HOJTag] 更新失败:', data.error);
          }
        } catch (e) {
          console.warn('[HOJTag] 解析失败:', e);
        }
        resolve();
      },
      onerror: () => { console.warn('[HOJTag] 网络错误'); resolve(); },
      ontimeout: () => { console.warn('[HOJTag] 超时'); resolve(); }
    });
  });
}

export async function deleteMyTag(config: Config): Promise<{ success: boolean; message: string }> {
  const username = await getCurrentUsername();
  if (!username) return { success: false, message: '未获取到用户名' };

  return new Promise((resolve) => {
    // @ts-ignore - GM_xmlhttpRequest provided by userscript environment
    GM_xmlhttpRequest({
      method: 'POST',
      url: `${HOJTAG_BASE}/delete`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ username }),
      onload: (r: any) => {
        let ok = false;
        let msg = '';
        try {
          const data = JSON.parse(r.responseText);
          ok = !!data.success;
          msg = data.message || data.error || '';
        } catch (_) {}

        if (r.status === 200 && ok) {
          // 清空本地配置
          config.CustomRankTag = '';
          config.CustomRankTagColor = '#18BE6A';
          saveConfig(config);

          // 清缓存 + 重新注入
          clearTagCache();
          clearRankTags();
          clearUserHomeTags();
          setRankTagConfig(config);
          if (isRankPage()) scheduleRankTag();
          if (isUserHomePage()) injectUserHomeTag(config);

          console.log('[HOJTag] 已删除云端标签:', username);
          resolve({ success: true, message: '已清除标签' });
        } else {
          console.warn('[HOJTag] 删除失败:', r.status, r.responseText);
          resolve({ success: false, message: msg || `HTTP ${r.status}` });
        }
      },
      onerror: () => resolve({ success: false, message: '网络错误' }),
      ontimeout: () => resolve({ success: false, message: '请求超时' })
    });
  });
}

/** 刷新云端标签（重新查询当前用户） */
export async function refreshTag(config: Config): Promise<void> {
  clearTagCache();
  await getTagfromRemote();
  setRankTagConfig(config);
  if (isRankPage()) injectRankTag(config);
  if (isUserHomePage()) injectUserHomeTag(config);
}
