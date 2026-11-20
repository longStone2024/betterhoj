/**
 * Auto Login Feature
 */

import { hojApi, NewAlert } from '../core/api.js';
import { WebI18n } from '../core/i18n.js';
import type { Config } from '../core/config.js';

export async function attemptAutoLogin(config: Config): Promise<void> {
  const username = config.DefaultUsername;
  const password = config.DefaultPassword;
  if (!config.AutoLogin || !username || !password) return;

  try {
    // First check if already logged in
    const resp = await fetch(`${window.location.origin}/api/get-user-home-info`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    const data = await resp.json();

    if (data?.status === 200) {
      console.log('[AutoLogin] 已登录，跳过自动登录');
      return;
    }

    console.log('[AutoLogin] 登录状态已失效，尝试自动登录…');
    const ok = await doLogin(username, password);
    if (ok) {
      console.log('[AutoLogin] 自动登录成功');
      NewAlert(WebI18n.t('login.autoSuccess'), 'success');
      location.reload();
    } else {
      console.warn('[AutoLogin] 自动登录失败');
      NewAlert(WebI18n.t('login.autoFailed'), 'error');
    }
  } catch (e) {
    console.error('[AutoLogin] 检查登录状态出错:', e);
  }
}

async function doLogin(username: string, password: string): Promise<boolean> {
  try {
    const resp = await fetch(`${window.location.origin}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });

    const authHeader = resp.headers.get('Authorization');
    const data = await resp.json();
    const userInfo = data?.data;
    if (!authHeader) {
      console.warn('[AutoLogin] 响应头中没有 Authorization');
      return false;
    }

    const token = authHeader;

    let ok = resp.ok;
    try {
      if (data && data.status && data.status !== 200) ok = false;
    } catch { /* ignore */ }

    if (!ok) {
      console.warn('[AutoLogin] 登录失败，状态码:', resp.status);
      return false;
    }

    localStorage.setItem('token', token);
    if (userInfo !== undefined && userInfo !== null) {
      try {
        localStorage.setItem('userInfo', typeof userInfo === 'string' ? userInfo : JSON.stringify(userInfo));
      } catch (e) {
        console.warn('[AutoLogin] 写入 userInfo 失败:', e);
      }
    }
    console.log('[AutoLogin] token 已写入 localStorage');
    return true;
  } catch (e) {
    console.error('[AutoLogin] 登录请求失败:', e);
    return false;
  }
}

export async function manualLogin(config: Config): Promise<void> {
  if (!config.DefaultUsername || !config.DefaultPassword) {
    NewAlert(WebI18n.t('login.manualLogging'), 'info');
    return;
  }
  const ok = await doLogin(config.DefaultUsername, config.DefaultPassword);
  if (ok) {
    NewAlert(WebI18n.t('login.autoSuccess'), 'success');
    location.reload();
  } else {
    NewAlert(WebI18n.t('login.autoFailed'), 'error');
  }
}

export function clearLoginState(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
  NewAlert(WebI18n.t('login.cleared'), 'success');
}
/** 兼容原版命名：检查登录状态并按需自动登录 */
export const checkLoginAndAutoLogin = attemptAutoLogin;
