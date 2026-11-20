/**
 * Auto Update Feature
 * Checks for script updates from remote server
 */

import { NewDialog, unsafeWindow } from '../core/api.js';
import { WebI18n } from '../core/i18n.js';
import { VERSION_INFO } from '../version.js';

function cmpVersion(a: string, b: string): number {
  const pa = String(a).split('.').map(n => parseInt(n, 10) || 0);
  const pb = String(b).split('.').map(n => parseInt(n, 10) || 0);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const va = pa[i] ?? 0;
    const vb = pb[i] ?? 0;
    if (va !== vb) return va < vb ? -1 : 1;
  }
  return 0;
}

export async function checkScriptUpdate(): Promise<void> {
  const LOCAL = VERSION_INFO;
  try {
    const resp = await fetch('https://betterhoj.rkcd.me/latest', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!resp.ok) {
      console.warn('[Update] 获取远程版本失败:', resp.status);
      return;
    }
    const remote = await resp.json();
    if (!remote || !remote.version) return;

    // Version unchanged -> skip
    if (cmpVersion(remote.version, LOCAL.version) <= 0) {
      console.log('[Update] 当前已是最新版本:', LOCAL.version);
      return;
    }

    // Calculate count diff
    const countDiff = Math.abs((remote.count ?? 0) - (LOCAL.count ?? 0));

    // Determine dialog type based on diff
    const dialogType = countDiff < 3 ? 'warning' : 'error';

    // Build changelog HTML
    let changelogHtml = '';
    if (Array.isArray(remote.changelog) && remote.changelog.length) {
      changelogHtml = '<ul style="margin:8px 0 0 18px;padding:0;">'
        + remote.changelog.map(item => `<li>${item}</li>`).join('')
        + '</ul>';
    }

    const html = `
      <div>${WebI18n.t('update.current')}：<b>${LOCAL.version}</b>（${LOCAL.name}）</div>
      <div>${WebI18n.t('update.latest')}：<b>${remote.version}</b>（${remote.name}）</div>
      <div>${WebI18n.t('update.date')}：${remote.date || '-'}</div>
      <div>${WebI18n.t('update.changelog')}：</div>
      ${changelogHtml || `<div>${WebI18n.t('update.noChangelog')}</div>`}
      <div style="color:...">
          ${countDiff < 3
            ? WebI18n.t('update.normal')
            : WebI18n.t('update.urgent')}
      </div>
    `;

    const ok = await NewDialog({
      title: '@update.available',
      html,
      type: dialogType,
      confirmText: '@update.gotoDownload',
      cancelText: '@update.later',
      closeOnMask: false
    });

    if (ok && remote.downloadUrl) {
      console.log('[Update] 跳转到下载页面:', remote.downloadUrl);
      unsafeWindow.open(remote.downloadUrl, '_blank');
    }
  } catch (e) {
    console.warn('[Update] 检查更新出错:', e);
  }
}