/**
 * Background management
 * Handles dynamic wallpapers, built-in backgrounds, and custom backgrounds
 */

import { loadConfig } from '../core/config.js';
import type { Config } from '../core/config.js';

// Dynamic wallpaper schedules
const DYNAMIC_WALLPAPERS: Record<string, Array<{ hour: number; min: number; path: string }>> = {
  Mojave: [
    { hour: 0, min: 0, path: 'file/c446f4fc9daa45a18a76bb70583d2acd.png' },
    { hour: 3, min: 0, path: 'file/75c716a6259f454fadb5113de2231df6.png' },
    { hour: 6, min: 0, path: 'file/c0355dd4d9f24a7c9ae15d86d19bd858.png' },
    { hour: 7, min: 30, path: 'file/c5bbf31e96fb483ea14cee6434ef33f5.png' },
    { hour: 9, min: 0, path: 'file/4643de510a614ff09ff41c555c2e0731.png' },
    { hour: 10, min: 30, path: 'file/fb6514b9839e4de0beb118f4657791c7.png' },
    { hour: 12, min: 0, path: 'file/2598082745c642bab9dfa9226c216ec6.png' },
    { hour: 13, min: 30, path: 'file/8116d00e29aa4e268ffa7685ac8794b0.png' },
    { hour: 15, min: 0, path: 'file/e141e7fa980f40f99d5308b1f844d51a.png' },
    { hour: 16, min: 30, path: 'file/3e48ea2dffa4420390011fdbc799c6bc.png' },
    { hour: 17, min: 30, path: 'file/ae0e489f2d894a44a4ddef4f6b751c91.png' },
    { hour: 19, min: 0, path: 'file/8aff674ec1dc4ea7847e02a804c6e153.png' },
    { hour: 20, min: 0, path: 'file/c40c0516fd224e1cb9415af1fcad247f.png' },
    { hour: 21, min: 0, path: 'file/0a86e082d70f488e9b67356b836c1d8d.png' },
    { hour: 22, min: 30, path: 'file/c446f4fc9daa45a18a76bb70583d2acd.png' },
  ],
  Catalina: [
    { hour: 0, min: 0, path: 'img/513736725fb0405fada79c92cc2b0170.png' },
    { hour: 6, min: 0, path: 'file/ac1e623769a94a409b3db8f84b693af5.png' },
    { hour: 9, min: 0, path: 'img/88c83323ea0041008360b9dc68605d3f.png' },
    { hour: 12, min: 0, path: 'img/3763d6a8bc8c41f69bef4f38c242ae59.png' },
    { hour: 15, min: 0, path: 'img/0c7f7e82b6da4627b64ac69509fc834a.png' },
    { hour: 18, min: 0, path: 'img/1701dc40763549a6826626715f32cbbb.png' },
    { hour: 19, min: 30, path: 'file/06a10d43d30f42f68c74872f25b2f264.png' },
    { hour: 21, min: 0, path: 'img/eae9eb8961494e8e8b34a3cd83cad272.png' },
  ]
};

const DYNAMIC_SUPPORTED_SOURCES = ['Source1', 'Source2'];
const DYNAMIC_BASE_URL: Record<string, string> = {
  Source1: 'http://ssf.hdoi.cn/api/public/',
  Source2: 'http://172.16.21.199/api/public/'
};

const SOURCE3_BG_MAP: Record<string, string> = {
  BigSur: 'BigSur.jpg',
  Monterey: 'Monterey.jpg',
  Ventura: 'Classic.jpeg',
  Sonoma: 'Sonoma.jpg',
  Sequoia: 'Sequoia.jpg',
  Tahoe: 'Tahoe.jpg'
};

const SOURCE4_BG_MAP: Record<string, string> = {
  Tahoe: 'cba3fb124a324f52bcda7a2348349412.jpg',
  Sequoia: 'f4527d5db707410c861b335dd920d33f.png',
  Sonoma: '511eb4af7e97491c87e2a381d5ec2f93.jpg',
  Ventura: '1688b284ab9f4188ad4a553ce262506e.jpeg',
  Monterey: '6dd829c1c6544c14be95a230ef12d9a8.jpeg',
  BigSur: '21680da2400544b48772d7420b36813b.jpg'
};

const BG_MAP: Record<string, string> = {
  Classic: '23bb9995eafe4e85972f2695afbc5b31',
  BigSur: '481e1fd621f642a0a300fda663a9d054',
  Monterey: '3ef260075f344ce4b9b64d82b7c04606',
  Ventura: '4bd963a39eb34576b243a81df4d501d5',
  Sonoma: '66db65fa1ac243b288ef5f57a2cbdf74',
  Sequoia: '0df8535fcdab46a08eb27c16f070b264',
  Tahoe: '7d707af0d5fe49c4965828583b5ed20f',
  GoldenGate: '31aa5f0cc0ab41438f65c3f2a5b4c3d0',
  Twilight: '280da21ac62448a8bd82a2b3e1e4b091',
  Sunset: '2e94e3a61cd04ca3a0eb1a3911b847e6'
};

const SOURCE_MAP: Record<string, string> = {
  Source1: 'http://ssf.hdoi.cn/api/public/img',
  Source2: 'http://172.16.21.199/api/public/img',
  Source3: 'https://smart-hoj.is-great.org',
  Source4: 'https://deeplearning.org.cn/api/public/img'
};

let _dynamicWallpaperTimer: number | null = null;

export function isDynamicWallpaper(name: string): boolean {
  return Object.prototype.hasOwnProperty.call(DYNAMIC_WALLPAPERS, name);
}

export function isDynamicAvailable(config: Config): boolean {
  return DYNAMIC_SUPPORTED_SOURCES.includes(config.ImageSource);
}

function getCurrentDynamicPath(name: string): string | null {
  const schedule = DYNAMIC_WALLPAPERS[name];
  if (!schedule || !schedule.length) return null;
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  let current = schedule[schedule.length - 1];
  for (const item of schedule) {
    if (minutes >= item.hour * 60 + item.min) current = item;
    else break;
  }
  return current.path;
}

function getDynamicUrl(config: Config): string | null {
  const base = DYNAMIC_BASE_URL[config.ImageSource];
  const path = getCurrentDynamicPath(config.BuiltinBackground);
  if (!base || !path) return null;
  return `${base}${path}`;
}

function applyDynamicWallpaper(config: Config): void {
  const url = getDynamicUrl(config);
  if (!url) return;
  document.body.style.backgroundImage = `url("${url}")`;
}

export function syncDynamicWallpaperTimer(config: Config): void {
  if (_dynamicWallpaperTimer) {
    clearInterval(_dynamicWallpaperTimer);
    _dynamicWallpaperTimer = null;
  }
  if (!config.Open) return;
  if (!isDynamicWallpaper(config.BuiltinBackground)) return;
  if (!isDynamicAvailable(config)) return;

  _dynamicWallpaperTimer = window.setInterval(() => {
    if (!config.Open) return;
    if (!isDynamicWallpaper(config.BuiltinBackground)) return;
    if (!isDynamicAvailable(config)) return;
    applyDynamicWallpaper(config);
  }, 60 * 1000);
}

export function syncDynamicWallpaperOptions(
  config: Config | null,
  settingsPanel: HTMLElement | null
): void {
  if (!settingsPanel) return;
  // 调用方拿不到 config 引用时（如移动端抽屉），自己读一份当前配置
  if (!config) config = loadConfig();
  const bgSel = settingsPanel.querySelector('select[data-key="BuiltinBackground"]') as HTMLSelectElement;
  const imgSel = settingsPanel.querySelector('select[data-key="ImageSource"]') as HTMLSelectElement;
  if (!bgSel || !imgSel) return;

  const available = DYNAMIC_SUPPORTED_SOURCES.includes(imgSel.value);

  if (!available && isDynamicWallpaper(config.BuiltinBackground)) {
    config.BuiltinBackground = 'Custom';
  }

  const current = config.BuiltinBackground;
  const BUILTIN_BG_BASE_OPTIONS = [
    ['Custom', 'Custom'], ['Classic', 'Classic'], ['BigSur', 'BigSur'],
    ['Monterey', 'Monterey'], ['Ventura', 'Ventura'], ['Sonoma', 'Sonoma'],
    ['Sequoia', 'Sequoia'], ['Tahoe', 'Tahoe'], ['GoldenGate', 'GoldenGate'],
    ['Twilight', 'Twilight'], ['Sunset', 'Sunset']
  ];
  const DYNAMIC_BG_OPTIONS = [
    ['Mojave', 'Mojave（动态壁纸）'],
    ['Catalina', 'Catalina（动态壁纸）']
  ];

  const opts = [...BUILTIN_BG_BASE_OPTIONS];
  if (available) opts.push(...DYNAMIC_BG_OPTIONS);

  bgSel.innerHTML = opts
    .map(([v, label]) => `<option value="${v}">${label}</option>`)
    .join('');
  bgSel.value = current;
  if (bgSel.value !== current) bgSel.value = 'Custom';
}

export function applyBackground(config: Config): void {
  const body = document.body;
  if (!body) return;
  if (!config.Open) {
    body.style.backgroundImage = 'none';
    return;
  }
  if (config.CustomBackground && config.CustomBackground !== 'None') {
    body.style.backgroundImage = `url("${config.CustomBackground}")`;
    return;
  }
  if (config.BuiltinBackground === 'Custom') {
    body.style.backgroundImage = 'none';
    return;
  }

  // Dynamic wallpaper
  if (isDynamicWallpaper(config.BuiltinBackground) && isDynamicAvailable(config)) {
    applyDynamicWallpaper(config);
    syncDynamicWallpaperTimer(config);
    return;
  }

  // Clear timer
  if (_dynamicWallpaperTimer) {
    clearInterval(_dynamicWallpaperTimer);
    _dynamicWallpaperTimer = null;
  }

  // Source3, Source4 use custom mappings
  if (config.ImageSource === 'Source4') {
    const file = SOURCE4_BG_MAP[config.BuiltinBackground];
    body.style.backgroundImage = file
      ? `url("${SOURCE_MAP.Source4}/${file}")`
      : 'none';
    return;
  }
  if (config.ImageSource === 'Source3') {
    const file = SOURCE3_BG_MAP[config.BuiltinBackground];
    if (file) {
      body.style.backgroundImage = `url("https://smart-hoj.is-great.org/backgrounds/${file}")`;
    } else {
      body.style.backgroundImage = 'none';
    }
    return;
  }

  // Other sources
  const prefix = SOURCE_MAP[config.ImageSource] || SOURCE_MAP.Source1;
  const file = BG_MAP[config.BuiltinBackground] || BG_MAP.Classic;
  const ext = config.BuiltinBackground === 'Classic' ? '.jpeg' : '.jpg';
  body.style.backgroundImage = prefix && file ? `url("${prefix}/${file}${ext}")` : 'none';
}

export function removeRowStripe(): void {
  document.querySelectorAll('.vxe-body--row.row--stripe').forEach(el => {
    el.classList.remove('row--stripe');
  });
}

export function initCardGlow(config: Config): void {
  if (!config.Open) return;
  if (!config.DarkMode) return;
  if (!config.MouseGlow) return;
  if (initCardGlow._installed) return;
  initCardGlow._installed = true;

  // Need loadBaseFonts - we'll call it from styles/index.ts
  const SELECTOR = 'img, div.el-card,.container,.category-body[data-v-fce6d0ee],.el-tabs--border-card, .announcements-container li[data-v-931546ae],.el-popover,.el-message-box,.el-message,.el-select-dropdown,.el-dropdown-menu,.el-notification,.m-message,.mobile-nav,.mu-popover,.mu-paper,.el-tabs__header.is-top,.el-tabs__nav-wrap.is-top,.container[data-v-bbe20b80],.container[data-v-13564ee3],.container[data-v-675320b4],.v-note-wrapper,.v-note-help-content,.add-image-link,.popup-dropdown,.op-header.popup-dropdown,.el-upload-dragger,.problem-resize';
  const EASE = 0.22;
  const SNAP = 0.05;

  const states = new WeakMap();

  function apply(el: HTMLElement, s: { cx: number; cy: number }): void {
    el.style.setProperty('--hoj-glow-mx', s.cx.toFixed(3) + '%');
    el.style.setProperty('--hoj-glow-my', s.cy.toFixed(3) + '%');
  }

  function tick(el: HTMLElement): void {
    const s = states.get(el);
    if (!s) return;
    s.cx += (s.tx - s.cx) * EASE;
    s.cy += (s.ty - s.cy) * EASE;
    if (Math.abs(s.tx - s.cx) < SNAP && Math.abs(s.ty - s.cy) < SNAP) {
      s.cx = s.tx; s.cy = s.ty;
      apply(el, s);
      s.raf = null;
      return;
    }
    apply(el, s);
    s.raf = requestAnimationFrame(() => tick(el));
  }

  function play(el: HTMLElement): void {
    const s = states.get(el);
    if (!s || s.raf !== null) return;
    s.raf = requestAnimationFrame(() => tick(el));
  }

  function findHost(clientX: number, clientY: number): HTMLElement | null {
    if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) return null;
    if (clientX < 0 || clientY < 0 ||
        clientX > window.innerWidth || clientY > window.innerHeight) return null;

    const stack = document.elementsFromPoint(clientX, clientY);
    for (const el of stack) {
      if (el instanceof HTMLElement && el.matches && el.matches(SELECTOR)) return el;
    }
    return null;
  }

  let _lastHost: HTMLElement | null = null;

  document.addEventListener('pointermove', (e: PointerEvent) => {
    const host = findHost(e.clientX, e.clientY);

    if (host !== _lastHost) {
      document.querySelectorAll('.hoj-glow-on').forEach(el => {
        if (el === host) return;
        if (el instanceof HTMLElement && host instanceof HTMLElement && el.contains(host)) {
          // ancestor - skip
        } else {
          el.classList.remove('hoj-glow-on');
          const s = states.get(el as HTMLElement);
          if (s) s.hovering = false;
        }
      });
      _lastHost = host;
    }

    if (!host) return;

    const r = host.getBoundingClientRect();
    if (!r.width || !r.height) return;

    const x = (e.clientX - r.left) / r.width  * 100;
    const y = (e.clientY - r.top)  / r.height * 100;

    let s = states.get(host);
    if (!s) {
      s = { cx: x, cy: y, tx: x, ty: y, raf: null, hovering: false };
      states.set(host, s);
    }
    if (!s.hovering) {
      s.cx = s.tx = x;
      s.cy = s.ty = y;
      apply(host, s);
      s.hovering = true;
      host.classList.add('hoj-glow-on');
    } else {
      s.tx = x; s.ty = y;
      play(host);
    }
  }, { passive: true });

  // Click ripple
  document.addEventListener('pointerdown', (e: PointerEvent) => {
    const host = findHost(e.clientX, e.clientY);
    if (!host) return;

    const cs = getComputedStyle(host);
    if (cs.position === 'static') host.style.position = 'relative';

    const r = host.getBoundingClientRect();
    if (!r.width || !r.height) return;

    const x = (e.clientX - r.left);
    const y = (e.clientY - r.top);

    const dx = Math.max(x, r.width  - x);
    const dy = Math.max(y, r.height - y);
    const maxR = Math.hypot(dx, dy);
    const diameter = maxR * 2;

    const ripple = document.createElement('span');
    ripple.className = 'hoj-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top  = y + 'px';
    ripple.style.width  = diameter + 'px';
    ripple.style.height = diameter + 'px';

    host.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }, { passive: true });

  document.addEventListener('pointerout', (e: PointerEvent) => {
    const host = findHost(e.clientX, e.clientY);
    if (!host) {
      document.querySelectorAll('.hoj-glow-on').forEach(el => {
        el.classList.remove('hoj-glow-on');
        const s = states.get(el as HTMLElement);
        if (s) s.hovering = false;
      });
      return;
    }
    document.querySelectorAll('.hoj-glow-on').forEach(el => {
      if (el instanceof HTMLElement && el !== host && !el.contains(host) && !host.contains(el)) {
        el.classList.remove('hoj-glow-on');
        const s = states.get(el);
        if (s) s.hovering = false;
      }
    });
  }, { passive: true });
}

/**
 * Close mobile drawer (mu-drawer) and overlays
 */
export function closeMobileDrawer(): void {
  // 1. Try Vue normal path (optional, best if works)
  document.querySelectorAll('.mu-overlay').forEach(overlay => {
    ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend'].forEach(type => {
      try {
        const ev = type.startsWith('touch')
          ? new TouchEvent(type, { bubbles: true, cancelable: true })
          : new MouseEvent(type, { bubbles: true, cancelable: true, view: window });
        overlay.dispatchEvent(ev);
      } catch (_) {}
    });
  });

  // 2. Unconditional forced hide (multiple retries to prevent Vue from overriding back)
  const hideAll = () => {
    // Drawers may be multiple; also clear possible internal open/close marks
    document.querySelectorAll('.mu-drawer').forEach(d => {
      d.classList.remove('is-open');
    });

    // Overlays may be multiple; handle together
    document.querySelectorAll('.mu-overlay').forEach(o => {
      o.dataset.hojHidden = '1';
      o.style.display = 'none';
      o.style.pointerEvents = 'none';
      o.style.opacity = '0';
    });
  };

  // Execute immediately + retry at multiple time points to cover Vue's async rendering
  hideAll();
  [16, 50, 120, 300, 600].forEach(t => setTimeout(hideAll, t));
}

/**
 * Open settings panel in fullscreen mode
 * 实际实现位于 settings/panel.ts，这里做转发，避免循环依赖。
 */
export { openSettingsPanelFullscreen } from '../settings/panel.js';