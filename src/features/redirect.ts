/**
 * Auto Redirect Feature
 * Matches reference implementation exactly
 */

import type { Config } from '../core/config.js';

const KNOWN_HOJ_HOSTS = [
  'ssf.hdoi.cn',
  'deeplearning.org.cn',
  'oi.cnuschool.org.cn',
  '172.16.21.199'
];

function isKnownHojHost(host: string): boolean {
  const pureHost = host.split(':')[0];
  return KNOWN_HOJ_HOSTS.includes(pureHost);
}

export function autoRedirect(config: Config): void {
  const target = (config.AutoRedirectHost || '').trim();
  if (!target || !config.EnableRedirect) return;

  const currentHost = window.location.hostname;
  const pureTarget = target.split(':')[0];

  // 已经处于目标 host，不跳转（避免死循环）
  if (currentHost === pureTarget) return;

  // 只在已知 HOJ 域名之间跳转，避免意外影响其它站点
  if (!isKnownHojHost(currentHost)) return;

  const protocol = (config.AutoRedirectProtocol || '').trim() || window.location.protocol.replace(':', '');
  const newUrl = `${protocol}://${target}${window.location.pathname}${window.location.search}${window.location.hash}`;

  console.log(`[AutoRedirect] ${window.location.host} → ${pureTarget}`);
  // 用 replace 避免污染历史记录
  window.location.replace(newUrl);
}

/**
 * Inject "Back to Old UI" button in new frontend
 */
export function injectBackToOldBtn(): boolean {
  const path = window.location.pathname;

  // 只在 /new 路径下注入
  if (!path.startsWith('/new')) {
    // 离开 /new 时清掉旧按钮
    const old = document.getElementById('hoj-back-old-btn');
    if (old) old.remove();
    return false;
  }

  // 已存在则跳过
  if (document.getElementById('hoj-back-old-btn')) return true;

  // 定位新前端的左侧 nav（Vue scope）
  const nav = document.querySelector('nav[data-v-7b0404d0]')
    || document.querySelector('nav[data-v-9dacc850]');
  if (!nav) return false;

  // 找到已有导航按钮里的第一个，用它作为模板
  const firstGear = nav.querySelector('button.gear-item');
  if (!firstGear) return false;
  const container = firstGear.parentElement;

  // 复用样式，只换图标 + 文字
  const btn = document.createElement('button');
  btn.id = 'hoj-back-old-btn';
  btn.className = firstGear.className;
  btn.style.color = '#86868B';   // 保持非激活的灰色
  btn.innerHTML = `
    <span class="w-4 h-4 shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </span>
    <span class="truncate">返回旧前端</span>
  `;
  btn.addEventListener('click', () => {
    window.location.href = '/home';
  });

  container.appendChild(btn);
  console.log('[BackOld] 已注入返回旧前端按钮');
  return true;
}

/**
 * 把单个链接改写为目标 HOJ 域名（协议相对 / 绝对 URL），其余原样返回
 */
export function rewriteHojUrl(href: string, config: Config): string {
  const target = (config.AutoRedirectHost || '').trim();
  if (!target) return href;
  const pureTarget = target.split(':')[0];

  try {
    // 协议相对：//ssf.hdoi.cn/xxx
    if (href.startsWith('//')) {
      const u = new URL(window.location.protocol + href);
      if (!isKnownHojHost(u.hostname)) return href;
      if (u.hostname === pureTarget) return href;
      u.hostname = pureTarget;
      return u.toString();
    }

    // 绝对 URL：http://... / https://...
    if (/^https?:\/\//i.test(href)) {
      const u = new URL(href);
      if (!isKnownHojHost(u.hostname)) return href;
      if (u.hostname === pureTarget) return href;
      u.hostname = pureTarget;
      return u.toString();
    }

    // 其它（相对路径、mailto、javascript 等）不动
    return href;
  } catch {
    return href;
  }
}

/**
 * 遍历页面上所有 <a href>，把指向已知 HOJ 域名的链接改写为目标域名
 */
export function rewriteAllHojLinks(config: Config): void {
  if (!config.AutoRedirectHost) return;
  const anchors = document.querySelectorAll('a[href]');
  let changed = 0;
  anchors.forEach(a => {
    // 已经处理过且没变化，跳过
    const original = a.getAttribute('href');
    if (!original) return;
    const rewritten = rewriteHojUrl(original, config);
    if (rewritten !== original) {
      a.setAttribute('href', rewritten);
      changed++;
    }
  });
  if (changed > 0) {
    console.log(`[AutoRedirect] 已改写 ${changed} 个链接`);
  }
}

export { isKnownHojHost };
