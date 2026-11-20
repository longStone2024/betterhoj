/**
 * Daily Check-in Feature
 */

import { hojApi, NewAlert, NewDialog } from '../core/api.js';
import { WebI18n } from '../core/i18n.js';
import type { Config } from '../core/config.js';

const HOJTAG_BASE = 'https://hojtag.rkcd.me';

const CHECKIN_KEYS = {
  date: 'hoj_checkin_lastCheckInDate',
  luck: 'hoj_checkin_checkInFortuneLuck',
  result: 'hoj_checkin_checkInFortuneResult',
  username: 'hoj_checkin_username'
};

const LUCK_COLOR: Record<string, string> = {
  '大吉': '#FF4D4F',
  '中吉': '#FA8C16',
  '小吉': '#FADB14',
  '吉': '#52C41A',
  '半吉': '#13C2C2',
  '平': '#909399'
};

function getTodayDateStr(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

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

function checkInRemote(username: string): Promise<any> {
  return new Promise((resolve) => {
    // @ts-ignore - GM_xmlhttpRequest is provided by userscript environment
    GM_xmlhttpRequest({
      method: 'POST',
      url: `${HOJTAG_BASE}/checkin`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ username }),
      onload: (r: any) => {
        if (r.status === 200) {
          try {
            const data = JSON.parse(r.responseText);
            if (data.success && data.data) return resolve(data.data);
          } catch (e) {}
        }
        console.warn('[CheckIn] 签到失败:', r.status, r.responseText);
        resolve(null);
      },
      onerror: () => { console.warn('[CheckIn] 网络错误'); resolve(null); },
      ontimeout: () => { console.warn('[CheckIn] 超时'); resolve(null); }
    });
  });
}

function queryCheckInRemote(username: string): Promise<any> {
  return new Promise((resolve) => {
    // @ts-ignore - GM_xmlhttpRequest is provided by userscript environment
    GM_xmlhttpRequest({
      method: 'GET',
      url: `${HOJTAG_BASE}/checkin?username=${encodeURIComponent(username)}`,
      onload: (r: any) => {
        if (r.status === 200) {
          try {
            const data = JSON.parse(r.responseText);
            if (data.success && data.data) return resolve(data.data);
          } catch (e) {}
        }
        resolve(null);
      },
      onerror: () => resolve(null),
      ontimeout: () => resolve(null)
    });
  });
}

export async function checkCheckInStatus(): Promise<{ checked: boolean; luck?: string; result?: string }> {
  try {
    const username = await getCurrentUsername();
    if (!username) return { checked: false };
    
    const data = await queryCheckInRemote(username);
    if (data) {
      const lastDate = localStorage.getItem(CHECKIN_KEYS.date);
      const today = getTodayDateStr();
      return { checked: lastDate === today, luck: data.checkInFortuneLuck, result: data.checkInFortuneResult };
    }
  } catch (e) {
    console.warn('[CheckIn] Failed to query status:', e);
  }
  return { checked: false };
}

export async function doCheckIn(config: Config, showPopup = true): Promise<void> {
  if (!config.CheckInEnabled) {
    NewAlert(WebI18n.t('checkin.disabled'), 'warning');
    return;
  }

  try {
    const username = await getCurrentUsername();
    if (!username) {
      NewAlert(WebI18n.t('checkin.queryFailed'), 'error');
      return;
    }
    
    const data = await checkInRemote(username);
    if (data) {
      const today = getTodayDateStr();
      localStorage.setItem(CHECKIN_KEYS.date, today);
      localStorage.setItem(CHECKIN_KEYS.luck, data.checkInFortuneLuck || '');
      localStorage.setItem(CHECKIN_KEYS.result, data.checkInFortuneResult || '');

      if (showPopup && config.CheckInAutoPopup) {
        await showCheckInResult(data.checkInFortuneLuck, data.checkInFortuneResult);
      }
    }
  } catch (e) {
    NewAlert(WebI18n.t('checkin.failed'), 'error');
  }
}

export async function showCheckInResult(luck?: string, result?: string): Promise<void> {
  const title = luck ? WebI18n.t('checkin.resultTitle') : WebI18n.t('checkin.alreadyTitle');
  const html = `
    <div style="text-align:center;padding:10px;">
      <div style="font-size:24px;margin-bottom:8px;">${luck || ''}</div>
      <div style="color:${luck && LUCK_COLOR[luck] ? LUCK_COLOR[luck] : '#666'};font-weight:600;margin-bottom:8px;">${luck || ''}</div>
      <div style="font-size:13px;opacity:.8;">${result || ''}</div>
    </div>
  `;

  await NewDialog({
    title: '@' + (luck ? 'checkin.resultTitle' : 'checkin.alreadyTitle'),
    html,
    type: 'success',
    confirmText: '@checkin.acceptGoodLuck',
    showCancel: false
  });
}

export async function refreshCheckInStatus(): Promise<void> {
  const status = await checkCheckInStatus();
  const luckEl = document.getElementById('hoj-checkin-luck');
  if (luckEl) {
    if (status.checked && status.luck) {
      luckEl.textContent = `${status.luck} —— ${status.result}`;
      luckEl.style.color = LUCK_COLOR[status.luck] || '';
    } else {
      luckEl.textContent = WebI18n.t('checkin.notChecked');
      luckEl.style.color = '';
    }
  }
}

/**
 * Inject check-in button into old UI navbar
 */
export function injectCheckInButton(config: Config): boolean {
  if (!config.CheckInEnabled) return false;

  const menu = document.querySelector('#header ul.el-menu.el-menu--horizontal, #header ul.el-menu--horizontal');
  if (!menu) return false;
  if (document.getElementById('hoj-checkin-btn')) return true;

  const li = document.createElement('li');
  li.id = 'hoj-checkin-btn';
  li.className = 'el-menu-item';
  li.setAttribute('role', 'menuitem');
  li.setAttribute('tabindex', '0');
  li.style.cursor = 'pointer';

  li.dataset.checkedState = 'no';

  const renderText = () => {
    const done = li.dataset.checkedState === 'yes';
    const icon = done ? 'el-icon-check' : 'el-icon-magic-stick';
    const textKey = done ? 'checkin.btnDone' : 'checkin.btn';

    li.innerHTML = `<i class="${icon}"></i>${WebI18n.t(textKey)}`;
    li.title = WebI18n.t('checkin.btnTitle');
    li.style.color = done ? '#909399' : '';
    li.style.fontWeight = done ? 'normal' : '';
  };

  renderText();

  // Language change: refresh text in place
  const offI18n = WebI18n.onChange(() => {
    if (!li.isConnected) { offI18n(); return; }
    renderText();
  });

  // Status sync
  const refreshStyle = async () => {
    if (!config.CheckInEnabled) return;
    const st = await checkCheckInStatus();
    if (!st) return;
    li.dataset.checkedState = st.checked ? 'yes' : 'no';
    renderText();
  };

  li.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!config.CheckInEnabled) return NewAlert('@checkin.disabled', 'warning');

    const st = await checkCheckInStatus();
    if (!st) return NewAlert('@checkin.queryFailed', 'error');

    if (st.checked) {
      await showCheckInResult(st.luck, st.result);
      return;
    }

    await doCheckIn(config);
    refreshStyle();
  });

  menu.appendChild(li);

  // Initial status refresh
  refreshStyle();
  return true;
}