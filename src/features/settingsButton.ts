/**
 * Settings Button Feature
 * Injects settings buttons into various UI locations (old UI navbar, new UI header, mobile drawer)
 */

import { WebI18n } from '../core/i18n.js';
import { 
  toggleSettingsPanel, 
  openSettingsPanel, 
  closeSettingsPanel, 
  getSettingsPanel, 
  applySettingsPanelFullscreen,
  openSettingsPanelFullscreen
} from '../settings/panel.ts';
import { syncDynamicWallpaperOptions } from '../styles/background.js';
import { closeMobileDrawer } from '../styles/background.js';

let _outsideClickHandler: ((ev: MouseEvent) => void) | null = null;
let _newHeaderButtonInstalled = false;
let _drawerOverlaySyncInstalled = false;
let _oldUISettingsButtonInstalled = false;
let _mobileSettingsButtonInstalled = false;

/**
 * Apply outside click handler to close settings panel when clicking outside
 */
function applyOutsideClickHandler(): void {
  if (_outsideClickHandler) return;

  const settingsPanel = getSettingsPanel();
  if (!settingsPanel) return;

  const willOpen = settingsPanel.classList.contains('open');
  if (!willOpen) return;

  applySettingsPanelFullscreen();

  setTimeout(() => {
    syncDynamicWallpaperOptions(null, settingsPanel);

    _outsideClickHandler = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement;

      // 1. Click inside settings panel -> don't close
      if (settingsPanel.contains(target)) return;

      // 2. Click on trigger button -> let button handle it
      const trigger = document.getElementById('hoj-settings-btn');
      if (trigger && trigger.contains(target)) return;

      // 3. Click inside Dialog (including mask) -> don't close settings panel
      if (target.closest('.hoj-dialog') || target.closest('.hoj-dialog-mask')) return;

      // 4. Click inside el-select dropdown/trigger -> don't close panel
      if (target.closest('.hoj-el-select-dropdown') || target.closest('.hoj-el-select-wrap')) return;

      // 5. Otherwise -> close
      closeSettingsPanel();
    };

    document.addEventListener('mousedown', _outsideClickHandler, true);
  }, 0);
}

function removeOutsideListener(): void {
  if (_outsideClickHandler) {
    document.removeEventListener('mousedown', _outsideClickHandler, true);
    _outsideClickHandler = null;
  }
}

/**
 * Inject settings button into the old UI navbar
 */
export function injectSettingsButton(): boolean {
  const menu = document.querySelector('#header ul.el-menu.el-menu--horizontal, #header ul.el-menu--horizontal');
  if (!menu) return false;

  if (_oldUISettingsButtonInstalled) {
    const existing = document.getElementById('hoj-settings-btn');
    if (existing && menu.contains(existing)) return true;
    _oldUISettingsButtonInstalled = false;
  }

  const existing = document.getElementById('hoj-settings-btn');
  if (existing && menu.contains(existing)) {
    _oldUISettingsButtonInstalled = true;
    return true;
  }

  const li = document.createElement('li');
  li.id = 'hoj-settings-btn';
  li.className = 'el-menu-item';
  li.setAttribute('role', 'menuitem');
  li.setAttribute('tabindex', '0');
  li.innerHTML = '<i class="el-icon-setting"></i>Better HOJ';
  li.style.cursor = 'pointer';
  li.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSettingsPanel();

    // Sync is-active class
    const settingsPanel = getSettingsPanel();
    const opened = settingsPanel && settingsPanel.classList.contains('open');
    li.classList.toggle('is-active', !!opened);
  });
  menu.appendChild(li);
  _oldUISettingsButtonInstalled = true;
  console.log('[OldUI] Better HOJ 设置按钮已注入');
  return true;
}

/**
 * Inject settings button into the new UI header (for /new routes)
 */
export function injectNewHeaderButton(): boolean {
  const path = window.location.pathname;

  // Only on new UI routes
  if (!path.startsWith('/new')) {
    const old = document.getElementById('hoj-new-settings-btn');
    if (old) old.remove();
    return false;
  }

  if (document.getElementById('hoj-new-settings-btn')) return true;

  // Find new UI nav
  const nav = document.querySelector('nav[data-v-7b0404d0]') || document.querySelector('nav[data-v-9dacc850]');
  if (!nav) return false;

  // Use existing gear-item as template
  const firstGear = nav.querySelector('button.gear-item');
  if (!firstGear) return false;
  const container = firstGear.parentElement;
  if (!container) return false;

  const btn = document.createElement('button');
  btn.id = 'hoj-new-settings-btn';
  btn.className = firstGear.className;
  btn.style.color = '#86868B';
  btn.innerHTML = `
    <span class="w-4 h-4 shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82-.33l-.06-.06a2 2 0 0 1-2.83-2.83l-.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l-.06-.06a2 2 0 0 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33-1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    </span>
    <span class="truncate">Better HOJ</span>
  `;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSettingsPanel();

    // Sync active state
    const settingsPanel = getSettingsPanel();
    const opened = settingsPanel && settingsPanel.classList.contains('open');
    btn.classList.toggle('animate-active-breath', !!opened);
    btn.style.color = opened ? '#007AFF' : '#86868B';
    btn.style.fontWeight = opened ? 'bold' : '';
  });

  container.appendChild(btn);
  console.log('[NewHeader] Better HOJ 按钮已注入');
  return true;
}

/**
 * Inject settings button into mobile drawer
 */
export function injectMobileMenuButton(): boolean {
  const drawer = document.querySelector('.mu-drawer');
  if (!drawer) return false;   // Not mobile, return

  // Already injected
  if (drawer.querySelector('#hoj-mobile-settings-btn')) return true;

  const list = drawer.querySelector('ul.mu-list');
  if (!list) return false;

  const li = document.createElement('li');
  li.id = 'hoj-mobile-settings-btn';
  li.className = 'hoj-mobile-menu-item';

  li.innerHTML = `
  <a class="mu-item-wrapper">
      <div class="mu-item">
          <div class="mu-ripple-wrapper"></div>
          <div class="mu-item-action">
              <i class="mu-icon el-icon-setting"
                 style="user-select:none;font-size:24px;width:24px;height:24px;"></i>
          </div>
          <div class="mu-item-title">Better HOJ</div>
      </div>
  </a>
`;
  li.querySelector('.mu-item-wrapper')!.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeMobileDrawer();               // Close mobile drawer
    openSettingsPanelFullscreen();     // Open settings in fullscreen
  });

  list.appendChild(li);
  console.log('[MobileMenu] Better HOJ 入口已注入');
  return true;
}

/**
 * Install drawer overlay sync for mobile
 */
export function installDrawerOverlaySync(): void {
  if (_drawerOverlaySyncInstalled) return;
  _drawerOverlaySyncInstalled = true;

  const restoreOverlayIfNeeded = () => {
    const drawers = document.querySelectorAll('.mu-drawer');
    const overlays = document.querySelectorAll('.mu-overlay');
    if (!drawers.length || !overlays.length) return;

    const anyOpen = [...drawers].some(d => d.classList.contains('is-open'));
    if (!anyOpen) return;

    overlays.forEach(o => {
      if (o.dataset.hojHidden === '1') {
        o.style.display = '';
        o.style.pointerEvents = '';
        o.style.opacity = '';
        delete o.dataset.hojHidden;
      }
    });
  };

  new MutationObserver(restoreOverlayIfNeeded).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style']
  });
}

/**
 * Setup settings button injection based on current URL
 */
export function setupSettingsButton(): void {
  // Try to inject all three button types
  injectSettingsButton();      // Old UI navbar
  injectNewHeaderButton();     // New UI header (for /new routes)
  injectMobileMenuButton();    // Mobile drawer

  // Install drawer overlay sync for mobile
  installDrawerOverlaySync();

  // Watch for URL changes to inject/remove buttons as needed
  let lastPath = window.location.pathname;
  const observer = new MutationObserver(() => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      injectNewHeaderButton();
      injectSettingsButton();
      injectMobileMenuButton();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Force keep references to prevent tree-shaking
  (window as any).__betterhoj_button_refs = {
    injectSettingsButton,
    injectNewHeaderButton,
    injectMobileMenuButton,
  };
}

/**
 * Manually trigger settings panel open (for menu commands, hotkeys, etc.)
 */
export function triggerSettingsPanel(): void {
  openSettingsPanel();
  applyOutsideClickHandler();
}