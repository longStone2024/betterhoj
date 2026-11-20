/**
 * Settings Panel CSS
 */

export const HOJ_SETTING_CSS = `

/* ============================================================
 * 1. Container & Open/Close
 * ============================================================ */
#hoj-settings-panel {
    position: fixed;
    top: 70px;
    right: 20px;
    width: 380px;
    max-width: calc(100vw - 40px);
    max-height: 80vh;
    z-index: 2147482000;

    display: none;
    flex-direction: column;
    overflow: hidden;

    background: #FFFFFF;
    border-radius: var(--hoj-card-radius, 15px);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .2);

    font-family: var(--hoj-sans-font, sans-serif);
    font-size: 13px;
    color: #24292E;
}

#hoj-settings-panel.open {
    display: flex;
}


/* ============================================================
 * 2. Three-section Layout
 * ============================================================ */

/* ---------- 2.1 Header ---------- */
#hoj-settings-panel .hoj-panel-header {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(0, 0, 0, .08);
    background: rgba(0, 0, 0, .02);
    cursor: move;
    user-select: none;
}

#hoj-settings-panel .hoj-panel-title {
    flex: 1 1 auto;
    min-width: 0;
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* ---------- 2.2 Body (only scrollable area) ---------- */
#hoj-settings-panel .hoj-panel-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px 12px 14px;
    font-size: 12px;
}

/* ---------- 2.3 Footer (fixed) ---------- */
#hoj-settings-panel .hoj-panel-footer {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding: 8px 14px;
    border-top: 1px solid rgba(0, 0, 0, .06);
    background: rgba(0, 0, 0, .015);
    font-size: 12px;
}

#hoj-settings-panel .hoj-footer-fullscreen {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    user-select: none;
    opacity: .85;
    transition: opacity .15s;
}
#hoj-settings-panel .hoj-footer-fullscreen:hover {
    opacity: 1;
}


/* ============================================================
 * 3. Collapsible Sections
 * ============================================================ */
#hoj-settings-panel .hoj-section {
    margin: 0 0 8px;
    border-radius: 8px;
    background: rgba(0, 0, 0, .025);
    border: 1px solid rgba(0, 0, 0, .06);
    overflow: hidden;
}

#hoj-settings-panel .hoj-section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 12px;
    background: transparent;
    border: 0;
    cursor: pointer;
    color: inherit;
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    text-align: left;
    letter-spacing: .3px;
    user-select: none;
    transition: background .15s;
}
#hoj-settings-panel .hoj-section-header:hover {
    background: rgba(64, 158, 255, .08);
}

#hoj-settings-panel .hoj-section-arrow {
    flex-shrink: 0;
    font-size: 12px;
    opacity: .55;
    transition: transform .2s;
}
#hoj-settings-panel .hoj-section.collapsed .hoj-section-arrow {
    transform: rotate(-90deg);
}

#hoj-settings-panel .hoj-section-title {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

#hoj-settings-panel .hoj-section-body {
    padding: 6px 10px 10px;
}
#hoj-settings-panel .hoj-section.collapsed > .hoj-section-body {
    display: none;
}

/* ---------- Level 1 sections (emphasized) ---------- */
#hoj-settings-panel .hoj-section[data-level="1"] > .hoj-section-header {
    padding: 9px 12px;
    font-size: 13px;
    color: #409EFF;
    background: rgba(64, 158, 255, .07);
}
#hoj-settings-panel .hoj-section[data-level="1"] > .hoj-section-header:hover {
    background: rgba(64, 158, 255, .14);
}

/* ---------- Level 2 sections (compact) ---------- */
#hoj-settings-panel .hoj-section[data-level="2"] {
    margin: 0 0 2px;
    background: transparent;
    border: 0;
    border-radius: 0;
    overflow: visible;
}
#hoj-settings-panel .hoj-section[data-level="2"] > .hoj-section-header {
    padding: 6px 8px;
    font-size: 12px;
    color: inherit;
    opacity: .9;
    background: transparent;
    border-radius: 5px;
}
#hoj-settings-panel .hoj-section[data-level="2"] > .hoj-section-header:hover {
    background: rgba(64, 158, 255, .07);
    opacity: 1;
}
#hoj-settings-panel .hoj-section[data-level="2"] > .hoj-section-body {
    padding: 2px 4px 4px 20px;
}
/* Level 2 inside level 2 - no extra indent */
#hoj-settings-panel .hoj-section[data-level="2"] .hoj-section[data-level="2"] > .hoj-section-body {
    padding-left: 0;
}


/* ============================================================
 * 4. Rows & Controls
 * ============================================================ */
#hoj-settings-panel .hoj-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin: 2px 0;
    padding: 4px 6px;
    border-radius: 5px;
    font-size: 12px;
    line-height: 1.4;
    transition: background .12s;
}
#hoj-settings-panel .hoj-row:hover {
    background: rgba(0, 0, 0, .025);
}
#hoj-settings-panel .hoj-row > span:first-child {
    flex: 1 1 auto;
    min-width: 0;
    opacity: .88;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
/* Row with multiple buttons -> left align */
#hoj-settings-panel .hoj-row[style*="flex-wrap"] {
    justify-content: flex-start;
}

/* ---------- Input Controls ---------- */
#hoj-settings-panel input[type="text"],
#hoj-settings-panel input[type="password"],
#hoj-settings-panel input[type="number"],
#hoj-settings-panel select {
    width: 130px;
    max-width: 130px;
    box-sizing: border-box;
    padding: 3px 6px;
    font-family: inherit;
    font-size: 12px;
    color: inherit;
    border: 1px solid rgba(0, 0, 0, .12);
    border-radius: 4px;
    background: #fff;
    outline: none;
    transition: border-color .15s;
}
#hoj-settings-panel input[type="text"]:focus,
#hoj-settings-panel input[type="password"]:focus,
#hoj-settings-panel input[type="number"]:focus,
#hoj-settings-panel select:focus {
    border-color: #409EFF;
}


/* ============================================================
 * 5. Buttons
 * ============================================================ */

/* ---------- Generic Buttons ---------- */
#hoj-settings-panel button {
    font-family: inherit;
    cursor: pointer;
    color: inherit;
    transition: background .15s, border-color .15s, color .15s;
}
#hoj-settings-panel button:not(.hoj-section-header):not(.hoj-mini-btn):not(.hoj-navbar-arrows button) {
    padding: 4px 10px;
    font-size: 12px;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 4px;
    background: transparent;
}
#hoj-settings-panel button:not(.hoj-section-header):not(.hoj-mini-btn):not(.hoj-navbar-arrows button):hover {
    background: rgba(0, 0, 0, .06);
}

/* ---------- Mini Buttons ---------- */
#hoj-settings-panel .hoj-mini-btn {
    padding: 3px 10px;
    font-size: 12px;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 4px;
    background: transparent;
}
#hoj-settings-panel .hoj-mini-btn:hover {
    background: rgba(0, 0, 0, .06);
    border-color: #409EFF;
    color: #409EFF;
}

/* ---------- Header Buttons ---------- */
#hoj-settings-panel .hoj-panel-header #hoj-import-export-btn,
#hoj-settings-panel .hoj-panel-header #hoj-close {
    padding: 3px 10px;
    font-size: 11px;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 4px;
    background: transparent;
}
#hoj-settings-panel .hoj-panel-header #hoj-import-export-btn:hover,
#hoj-settings-panel .hoj-panel-header #hoj-close:hover {
    background: rgba(64, 158, 255, .08);
    border-color: #409EFF;
    color: #409EFF;
}


/* ============================================================
 * 6. Color Preview
 * ============================================================ */
#hoj-settings-panel .hoj-input-with-preview {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 130px;
    flex-shrink: 0;
}
#hoj-settings-panel .hoj-input-with-preview > input {
    width: 100%;
    padding-right: 24px;
    box-sizing: border-box;
}
#hoj-settings-panel .hoj-color-preview {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    width: 14px;
    height: 14px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, .15);
    background-clip: padding-box;
    pointer-events: none;
    flex-shrink: 0;
    box-sizing: border-box;
}


/* ============================================================
 * 7. Switches (checkbox restyle)
 * ============================================================ */
#hoj-settings-panel input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    position: relative;
    flex-shrink: 0;
    width: 46px;
    height: 26px;
    margin: 0;
    padding: 0;
    border: 1px solid rgba(0, 0, 0, .08);
    border-radius: 13px;
    background: rgba(120, 120, 128, .18);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, .06);
    outline: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    transition: background .22s ease, border-color .22s ease, box-shadow .22s ease;
}
#hoj-settings-panel input[type="checkbox"]::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #FFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .25), 0 1px 1px rgba(0, 0, 0, .1);
    transform: translateY(-50%);
    transition: left .22s cubic-bezier(.25, .1, .25, 1), background .22s;
}
#hoj-settings-panel input[type="checkbox"]:hover {
    background: rgba(120, 120, 128, .26);
}
#hoj-settings-panel input[type="checkbox"]:checked {
    background: #34C759;
    border-color: #34C759;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, .08);
}
#hoj-settings-panel input[type="checkbox"]:checked::before {
    left: calc(100% - 22px);
}
#hoj-settings-panel input[type="checkbox"]:checked:hover {
    background: #2EB84F;
    border-color: #2EB84F;
}
#hoj-settings-panel input[type="checkbox"]:focus-visible {
    box-shadow: 0 0 0 3px rgba(52, 199, 89, .3);
}
#hoj-settings-panel input[type="checkbox"]:disabled {
    opacity: .45;
    cursor: not-allowed;
}

/* Mobile / Fullscreen switches slightly larger */
#hoj-settings-panel.hoj-fullscreen input[type="checkbox"] {
    width: 50px;
    height: 28px;
    border-radius: 14px;
}
#hoj-settings-panel.hoj-fullscreen input[type="checkbox"]::before {
    width: 22px;
    height: 22px;
}
#hoj-settings-panel.hoj-fullscreen input[type="checkbox"]:checked::before {
    left: calc(100% - 24px);
}


/* ============================================================
 * 8. Fullscreen (desktop + mobile shared rules)
 * ============================================================ */
#hoj-settings-panel.hoj-fullscreen {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: auto !important;
    bottom: auto !important;
    width: 100vw !important;
    min-width: 100vw !important;
    max-width: 100vw !important;
    height: 100vh !important;
    min-height: 100vh !important;
    max-height: 100vh !important;
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
    transform: none !important;
    border-radius: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
    z-index: 2147482100 !important;
}

/* Fullscreen: header not draggable, buttons larger */
#hoj-settings-panel.hoj-fullscreen .hoj-panel-header {
    padding: 14px 16px;
    cursor: default;
    touch-action: auto;
}
#hoj-settings-panel.hoj-fullscreen .hoj-panel-title {
    font-size: 16px;
}
#hoj-settings-panel.hoj-fullscreen .hoj-panel-header #hoj-close,
#hoj-settings-panel.hoj-fullscreen .hoj-panel-header #hoj-import-export-btn {
    min-width: 56px;
    min-height: 32px;
    padding: 6px 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    position: relative;
    z-index: 10;
}

/* Fullscreen: body larger font, better line height */
#hoj-settings-panel.hoj-fullscreen .hoj-panel-body {
    padding: 14px 18px 20px;
    font-size: 13px;
}
#hoj-settings-panel.hoj-fullscreen .hoj-row {
    min-height: 44px;
    padding: 8px 10px;
    gap: 12px;
    font-size: 13px;
    box-sizing: border-box;
}
#hoj-settings-panel.hoj-fullscreen .hoj-row > span:first-child {
    line-height: 1.3;
}
#hoj-settings-panel.hoj-fullscreen .hoj-section-header {
    padding: 10px 14px;
    font-size: 14px;
}
#hoj-settings-panel.hoj-fullscreen .hoj-section[data-level="1"] > .hoj-section-header {
    font-size: 15px;
}
#hoj-settings-panel.hoj-fullscreen input[type="text"],
#hoj-settings-panel.hoj-fullscreen input[type="password"],
#hoj-settings-panel.hoj-fullscreen input[type="number"],
#hoj-settings-panel.hoj-fullscreen select {
    width: 140px;
    max-width: 140px;
}
#hoj-settings-panel.hoj-fullscreen .hoj-mini-btn {
    padding: 6px 14px;
    font-size: 13px;
}
#hoj-settings-panel.hoj-fullscreen .hoj-panel-footer {
    padding: 12px 18px;
    font-size: 13px;
}


/* ============================================================
 * 9. Responsive (narrow)
 * ============================================================ */
@media (max-width: 480px) {
    #hoj-settings-panel {
        right: 10px;
        max-width: calc(100vw - 20px);
    }
}

/* ============ Favorites ============ */
.hoj-fav-btn {
    cursor: pointer;
    padding-left: 5px;
    font-size: 14px;
    color: #999;
    transition: color 0.2s, transform 0.2s;
    vertical-align: middle;
    flex-shrink: 0;
}
.hoj-fav-btn:hover {
    color: #F7BA2A;
    transform: scale(1.2);
}
.hoj-fav-btn.is-fav {
    color: #F7BA2A;
}

#hoj-favorites-panel .taglist-title {
    font-weight: 600;
    color: var(--hoj-text-dark);
}
.hoj-fav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 320px;
    overflow-y: auto;
}
.hoj-fav-item {
    display: flex;
    align-items: center;
    padding: 6px 8px;
    border-radius: 6px;
    transition: background 0.2s;
    gap: 4px;
}
.hoj-fav-item:hover {
    background: var(--hoj-list-bg-hover);
}
.hoj-fav-link {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: baseline;
    gap: 6px;
    text-decoration: none !important;
}
.hoj-fav-link::before { display: none !important; }
.hoj-fav-id {
    font-weight: 600;
    color: var(--hoj-text-blue);
    flex-shrink: 0;
    font-size: 12px;
}
.hoj-fav-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--hoj-text-dark);
    font-size: 12px;
}
.hoj-fav-remove {
    cursor: pointer;
    color: #999;
    padding: 2px 4px;
    opacity: 0;
    transition: opacity 0.2s, color 0.2s;
    flex-shrink: 0;
    font-size: 12px;
}
.hoj-fav-item:hover .hoj-fav-remove { opacity: 1; }
.hoj-fav-remove:hover { color: #F56C6C; }

/* ============ NewTool Common Widget ============ */
.hoj-tool {
  position: fixed;
  z-index: 99998;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border-radius: var(--hoj-card-radius, 15px);
  box-shadow: 0 2px 12px rgba(0,0,0,.15);
  overflow: hidden;
  font-family: var(--hoj-sans-font, sans-serif);
  color: #24292E;
  font-size: 13px;
}
.hoj-tool__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: move;
  border-bottom: 1px solid rgba(0,0,0,.06);
  user-select: none;
  touch-action: none;
}
.hoj-tool__title { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hoj-tool__actions { display: flex; gap: 6px; }
.hoj-tool__btn {
  cursor: pointer;
  opacity: .5;
  transition: opacity .15s;
  font-size: 14px;
}
.hoj-tool__btn:hover { opacity: 1; }
.hoj-tool__body {
  flex: 1;
  overflow: auto;
  padding: 8px 10px;
  font-size: 13px;
  word-break: break-all;
}
.hoj-tool__resize {
  position: absolute;
  right: 0; bottom: 0;
  width: 12px; height: 12px;
  cursor: nwse-resize;
  background: linear-gradient(135deg, transparent 50%, rgba(0,0,0,.18) 50%);
  border-bottom-right-radius: inherit;
}

/* Keystroke Display */
.hoj-key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;

  background: var(--hoj-card-bg, #FFFFFFE0);
  color: var(--hoj-text-dark, #24292E);
  border: 1px solid rgba(0, 0, 0, .08);
  backdrop-filter: blur(var(--hoj-card-blur, 20px)) saturate(1.35);
  -webkit-backdrop-filter: blur(var(--hoj-card-blur, 20px)) saturate(1.35);

  box-shadow: 0 1px 3px rgba(0, 0, 0, .08);
  opacity: 0;
  transform: translateX(20px);
  transition: opacity .3s, transform .3s;
}

.hoj-key--in  {
  opacity: 1;
  transform: translateX(0);
}

.hoj-key--out {
  opacity: 0;
  transform: translateY(-10px) scale(.8);
}

html.hoj-dark-mode .hoj-key {
  border-color: rgba(255, 255, 255, .08);
}

html.hoj-dark-mode .hoj-tool { background: #37373FE0; color: #FFFFFF; }
html.hoj-dark-mode .hoj-tool__header { border-color: rgba(255,255,255,.08); }

/* ============ Recommendation Dialog ============ */
.hoj-rec-dialog {
    font-size: 13px;
    color: var(--hoj-text-dark, #24292e);
}
.hoj-rec-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, .06);
    margin-bottom: 10px;
}
.hoj-rec-tab {
    padding: 5px 12px;
    border: 1px solid rgba(0, 0, 0, .1);
    background: var(--hoj-button-bg, #ffffffb0);
    color: var(--hoj-text-dark, #24292e);
    border-radius: var(--hoj-button-radius, 6px);
    cursor: pointer;
    font-size: 12px;
    font-family: inherit;
    transition: background .15s, color .15s, border-color .15s;
}
.hoj-rec-tab:hover { background: var(--hoj-button-bg-hover, #ffffffd0); }
.hoj-rec-tab.active {
    background: #409EFF;
    color: #fff;
    border-color: #409EFF;
}
.hoj-rec-meta {
    font-size: 12px;
    color: var(--hoj-text-dark, #24292e);
    opacity: .8;
    margin-bottom: 8px;
}
.hoj-rec-list {
    list-style: none;
    padding: 0;
    margin: 0;
}
.hoj-rec-item {
    padding: 6px 10px;
    border-radius: var(--hoj-button-radius, 6px);
    transition: background .15s;
}
.hoj-rec-item:hover { background: var(--hoj-list-bg-hover, rgba(0,0,0,.04)); }
.hoj-rec-link {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none !important;
    color: inherit;
    font-size: 13px;
}
.hoj-rec-link::before { display: none !important; }
.hoj-rec-id {
    font-weight: 600;
    color: var(--hoj-text-blue, #0b459b);
    min-width: 68px;
    flex-shrink: 0;
}
.hoj-rec-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--hoj-text-dark, #24292e);
}
.hoj-rec-rating {
    font-size: 12px;
    color: #e6a23c;
    flex-shrink: 0;
}
.hoj-rec-weight {
    font-size: 11px;
    color: #909399;
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
}

html.hoj-dark-mode .hoj-rec-tab { border-color: rgba(255, 255, 255, .08); }
html.hoj-dark-mode .hoj-rec-tabs { border-bottom-color: rgba(255, 255, 255, .08); }

/* ============ Navbar Layout Config ============ */
.hoj-navbar-layout {
    font-size: 13px;
    color: var(--hoj-text-dark, #24292e);
}
.hoj-navbar-hint {
    font-size: 12px;
    opacity: .65;
    margin-bottom: 10px;
}
.hoj-navbar-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.hoj-navbar-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-radius: var(--hoj-button-radius, 6px);
    background: var(--hoj-list-bg-hover, rgba(0, 0, 0, .03));
    border: 1px solid transparent;
    cursor: grab;
    user-select: none;
    transition: background .15s, border-color .15s;
}
.hoj-navbar-item:active { cursor: grabbing; }
.hoj-navbar-item:hover { background: var(--hoj-list-bg-hover, rgba(0, 0, 0, .06)); }
.hoj-navbar-item.hoj-navbar-dragging { opacity: .4; }
.hoj-navbar-item.hoj-navbar-drop-before { border-top: 2px solid #409EFF; }
.hoj-navbar-item.hoj-navbar-drop-after  { border-bottom: 2px solid #409EFF; }
.hoj-navbar-drag {
    cursor: grab;
    opacity: .4;
    font-size: 14px;
    letter-spacing: -2px;
    line-height: 1;
}
.hoj-navbar-check { display: inline-flex; align-items: center; }
.hoj-navbar-check input { cursor: pointer; width: 14px; height: 14px; }
.hoj-navbar-label {
    flex: 1; min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.hoj-navbar-arrows { display: inline-flex; gap: 2px; }
.hoj-navbar-arrows button {
    width: 22px; height: 22px;
    padding: 0;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 4px;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font-size: 10px;
    line-height: 1;
}
.hoj-navbar-arrows button:hover:not(:disabled) {
    background: var(--hoj-button-bg-hover, rgba(0, 0, 0, .06));
}
.hoj-navbar-arrows button:disabled { opacity: .3; cursor: not-allowed; }
.hoj-navbar-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, .06);
}
.hoj-navbar-footer button {
    padding: 5px 12px;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: var(--hoj-button-radius, 6px);
    background: var(--hoj-button-bg, transparent);
    color: inherit;
    cursor: pointer;
    font-size: 12px;
}
.hoj-navbar-footer button:hover {
    background: var(--hoj-button-bg-hover, rgba(0, 0, 0, .06));
}
html.hoj-dark-mode .hoj-navbar-arrows button,
html.hoj-dark-mode .hoj-navbar-footer button {
    border-color: rgba(255, 255, 255, .1);
}

/* ============ Snippet Panel ============ */
.hoj-snippet-panel { font-size: 13px; color: var(--hoj-text-dark, #24292e); }
.hoj-snippet-cats {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, .06);
    margin-bottom: 8px;
}
.hoj-snippet-cat {
    padding: 4px 12px;
    border: 1px solid rgba(0, 0, 0, .1);
    background: var(--hoj-button-bg, #ffffffb0);
    color: var(--hoj-text-dark, #24292e);
    border-radius: var(--hoj-button-radius, 6px);
    cursor: pointer;
    font-size: 12px;
    font-family: inherit;
    transition: background .12s, color .12s, border-color .12s;
}
.hoj-snippet-cat:hover { background: var(--hoj-button-bg-hover, #ffffffd0); }
.hoj-snippet-cat.active {
    background: #409EFF;
    color: #fff;
    border-color: #409EFF;
}

.hoj-snippet-tip {
    font-size: 11px;
    opacity: .55;
    margin-right: auto;
}
.hoj-snippet-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, .06);
}

html.hoj-dark-mode .hoj-snippet-cat { border-color: rgba(255, 255, 255, .1); }
html.hoj-dark-mode .hoj-snippet-cats { border-bottom-color: rgba(255, 255, 255, .08); }
.hoj-snippet-list { list-style: none; padding: 0; margin: 0; max-height: 50vh; overflow-y: auto; }
.hoj-snippet-item {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 10px; border-radius: 6px; cursor: pointer;
    transition: background .12s;
}
.hoj-snippet-item:hover, .hoj-snippet-item.active {
    background: var(--hoj-list-bg-hover, rgba(64,158,255,.08));
}
.hoj-snippet-item-main { flex: 1; min-width: 0; }
.hoj-snippet-item-name { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hoj-snippet-item-desc {
    font-size: 12px; opacity: .6; margin-top: 2px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.hoj-snippet-item-hotkey {
    font-size: 11px; padding: 2px 6px; border-radius: 4px;
    background: rgba(64,158,255,.1); color: #409EFF; flex-shrink: 0;
    font-variant-numeric: tabular-nums;
}
.hoj-snippet-empty { text-align: center; padding: 20px 0; opacity: .5; }
.hoj-snippet-footer {
    display: flex; justify-content: flex-end; gap: 8px;
    margin-top: 10px; padding-top: 10px;
    border-top: 1px solid rgba(0,0,0,.06);
}

/* ============ Snippet Manager ============ */
.hoj-snippet-mgr { font-size: 13px; color: var(--hoj-text-dark, #24292e); }
.hoj-snippet-mgr-list {
    max-height: 220px; overflow-y: auto;
    border: 1px solid rgba(0,0,0,.08); border-radius: 6px; padding: 4px;
}
.hoj-snippet-mgr-item {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 8px; border-radius: 4px; cursor: pointer;
}
.hoj-snippet-mgr-item:hover { background: rgba(0,0,0,.04); }
.hoj-snippet-mgr-item.active { background: rgba(64,158,255,.1); }
.hoj-snippet-mgr-item-main { flex: 1; min-width: 0; }
.hoj-snippet-mgr-item-name { font-weight: 600; }
.hoj-snippet-mgr-item-desc { font-size: 11px; opacity: .6; margin-top: 1px; }
.hoj-snippet-mgr-item-right { display: flex; align-items: center; gap: 6px; }
.hoj-snippet-mgr-item-hotkey {
    font-size: 11px; padding: 1px 5px; border-radius: 3px;
    background: rgba(64,158,255,.1); color: #409EFF;
}
.hoj-snippet-mgr-del {
    border: 0; background: transparent; cursor: pointer;
    color: #999; font-size: 16px; line-height: 1; padding: 0 4px;
}
.hoj-snippet-mgr-del:hover { color: #F56C6C; }
.hoj-snippet-mgr-empty { text-align: center; padding: 20px 0; opacity: .5; }
.hoj-snippet-mgr-actions { margin-top: 8px; display: flex; justify-content: flex-end; }
.hoj-snippet-mgr-editor {
    margin-top: 12px; padding-top: 12px;
    border-top: 1px solid rgba(0,0,0,.06);
}
.hoj-snippet-field { margin-bottom: 10px; }
.hoj-snippet-field > label { display: block; font-size: 12px; opacity: .7; margin-bottom: 4px; }
.hoj-snippet-input, .hoj-snippet-textarea {
    width: 100%; box-sizing: border-box;
    padding: 6px 10px; font-family: inherit; font-size: 13px;
    border: 1px solid rgba(0,0,0,.12); border-radius: 6px;
    background: var(--hoj-input-bg, #fff); color: inherit; outline: none;
    resize: vertical;
}
.hoj-snippet-input:focus, .hoj-snippet-textarea:focus { border-color: #409EFF; }
.hoj-snippet-textarea {
    font-family: var(--hoj-mono-font, monospace); font-size: 12px; min-height: 100px;
}
.hoj-snippet-hotkey-input { cursor: pointer; }
.hoj-snippet-editor-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 10px; }
.hoj-snippet-btn {
    padding: 5px 12px; cursor: pointer; font-size: 12px; font-family: inherit;
    border: 1px solid rgba(0,0,0,.1); border-radius: var(--hoj-button-radius, 6px);
    background: var(--hoj-button-bg, transparent); color: inherit;
}
.hoj-snippet-btn:hover { background: var(--hoj-button-bg-hover, rgba(0,0,0,.06)); }
.hoj-snippet-btn--primary { background: #409EFF; color: #fff; border-color: #409EFF; }
.hoj-snippet-btn--primary:hover { background: #66B1FF; }

/* ============ Import / Export ============ */
.hoj-ie-panel { font-size: 13px; color: var(--hoj-text-dark, #24292e); }
.hoj-ie-tabs {
    display: flex;
    gap: 4px;
    border-bottom: 1px solid rgba(0, 0, 0, .08);
    margin-bottom: 12px;
}
.hoj-ie-tab {
    padding: 6px 16px;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font-size: 13px;
    font-family: inherit;
    border-bottom: 2px solid transparent;
    opacity: .6;
}
.hoj-ie-tab.active {
    opacity: 1;
    border-bottom-color: #409EFF;
    color: #409EFF;
    font-weight: 600;
}
.hoj-ie-hint {
    font-size: 12px;
    opacity: .65;
    line-height: 1.6;
    margin-bottom: 12px;
}
.hoj-ie-presets {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed rgba(0, 0, 0, .08);
}
.hoj-ie-preset {
    padding: 3px 10px;
    border: 1px solid rgba(0, 0, 0, .1);
    background: var(--hoj-button-bg, transparent);
    color: inherit;
    cursor: pointer;
    font-size: 12px;
    font-family: inherit;
    border-radius: var(--hoj-button-radius, 6px);
}
.hoj-ie-preset.active {
    background: #409EFF;
    border-color: #409EFF;
    color: #fff;
}
.hoj-ie-list {
    max-height: 45vh;
    overflow-y: auto;
    border: 1px solid rgba(0, 0, 0, .08);
    border-radius: 6px;
    padding: 4px;
}
.hoj-ie-group { margin-bottom: 2px; }
.hoj-ie-group-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    user-select: none;
    background: rgba(0, 0, 0, .02);
}
.hoj-ie-group-header:hover { background: rgba(0, 0, 0, .05); }
.hoj-ie-group-check input { cursor: pointer; }
.hoj-ie-group-name { flex: 1; }
.hoj-ie-group-count { font-size: 11px; opacity: .55; font-weight: normal; }
.hoj-ie-group-toggle { font-size: 11px; opacity: .5; width: 14px; text-align: center; }
.hoj-ie-items { padding: 2px 0 2px 28px; }
.hoj-ie-items.collapsed { display: none; }
.hoj-ie-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 3px 6px;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
}
.hoj-ie-item:hover { background: rgba(64, 158, 255, .06); }
.hoj-ie-item input[type="checkbox"] { cursor: pointer; flex-shrink: 0; }
.hoj-ie-item-name { flex-shrink: 0; min-width: 130px; color: inherit; }
.hoj-ie-item-value {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    opacity: .55;
    font-family: var(--hoj-mono-font, monospace);
    font-size: 11px;
}
.hoj-ie-item-value--new { color: #67C23A; opacity: .85; }
.hoj-ie-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, .06);
}
.hoj-ie-status { text-align: center; padding: 20px 0; }
.hoj-ie-filename {
    font-size: 12px;
    opacity: .65;
    margin-bottom: 10px;
}
.hoj-ie-version {
    margin-bottom: 10px;
    padding: 6px 10px;
    border-radius: 4px;
    background: rgba(0, 0, 0, .03);
}
.hoj-ie-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}
.hoj-ie-actions .hoj-snippet-btn--primary {
    min-width: 120px;
}
.hoj-ie-toprow {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}
.hoj-ie-back {
    flex-shrink: 0;
    padding: 3px 10px;
    border: 1px solid rgba(0, 0, 0, .1);
    background: var(--hoj-button-bg, transparent);
    color: inherit;
    font-size: 12px;
    font-family: inherit;
    border-radius: var(--hoj-button-radius, 6px);
    cursor: pointer;
    transition: background .15s, border-color .15s;
}
.hoj-ie-back:hover {
    background: var(--hoj-button-bg-hover, rgba(0, 0, 0, .06));
    border-color: #409EFF;
    color: #409EFF;
}
.hoj-ie-note {
    font-size: 11px;
    padding: 6px 10px;
    margin: 4px 0;
    border-radius: 4px;
    background: rgba(64, 158, 255, .08);
    color: #409EFF;
    line-height: 1.5;
}

/* ============ Discussion Like Button ============ */
.hoj-like-box {
    position: absolute;
    top: 25px;
    right: 68px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 4px;
    margin-left: 4px;
}

.hoj-like-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 5px 14px;
    border: 0;
    border-radius: 6px;
    font-size: 13px;
    font-family: inherit;
    font-weight: 500;
    color: #FFFFFF;
    cursor: pointer;
    user-select: none;
    transition: filter .15s ease, transform .1s ease, opacity .15s ease;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
}
.hoj-like-btn i {
    color: #FFFFFF !important;
    font-size: 13px;
}
.hoj-like-btn:hover:not(:disabled) {
    filter: brightness(1.08);
    transform: translateY(-1px);
}
.hoj-like-btn:active:not(:disabled) {
    transform: translateY(0);
    filter: brightness(.96);
}
.hoj-like-btn:disabled {
    cursor: not-allowed;
    opacity: .55;
    transform: none;
    filter: none;
}

.hoj-like-btn--like   { background: #2D8CF0; }
.hoj-like-btn--unlike { background: #ED4014; }

.hoj-like-cooldown {
    font-size: 12px;
    color: #909399;
    min-width: 22px;
    font-variant-numeric: tabular-nums;
    user-select: none;
}

.hoj-like-progress {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: rgba(0, 0, 0, .06);
    border-radius: 1px;
    overflow: hidden;
    pointer-events: none;
    opacity: 0;
    transition: opacity .2s;
}
.hoj-like-box.is-cooldown .hoj-like-progress {
    opacity: 1;
}
.hoj-like-progress-inner {
    display: block;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, #2D8CF0, #ED4014);
    border-radius: inherit;
}

/* ============ /new Discussion Like ============ */
.hoj-new-like-box {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 3px;
}

.hoj-new-like-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border: 1px solid rgba(0, 0, 0, .05);
    border-radius: 12px;
    background: transparent;
    font-family: inherit;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .2px;
    cursor: pointer;
    user-select: none;
    transition: background .15s, opacity .15s, transform .1s;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
}
.hoj-new-like-btn:hover:not(:disabled) { background: rgba(0, 0, 0, .05); }
.hoj-new-like-btn:active:not(:disabled) { transform: scale(.95); }
.hoj-new-like-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; }

.hoj-new-like-icon {
    width: 14px;
    height: 14px;
    stroke-width: 2.5;
    color: inherit;
}

.hoj-new-like-btn--like   { color: #007AFF; border-color: rgba(0, 122, 255, .18); }
.hoj-new-like-btn--unlike { color: #FF3B30; border-color: rgba(255, 59, 48, .18); }

.hoj-new-like-cd {
    font-size: 11px;
    color: #86868B;
    min-width: 22px;
    font-variant-numeric: tabular-nums;
    user-select: none;
}

.hoj-new-like-bar {
    position: absolute;
    left: 0; right: 0; bottom: 0;
    height: 2px;
    background: rgba(0, 0, 0, .06);
    border-radius: 1px;
    overflow: hidden;
    pointer-events: none;
    opacity: 0;
    transition: opacity .2s;
}
.hoj-new-like-box.is-cooldown .hoj-new-like-bar { opacity: 1; }
.hoj-new-like-bar-inner {
    display: block;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, #007AFF, #FF3B30);
    border-radius: inherit;
}

#hoj-settings-panel .hoj-lang-select {
    padding: 2px 4px;
    font-size: 11px;
    font-family: inherit;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 4px;
    background: transparent;
    color: inherit;
    cursor: pointer;
    margin-left: auto;
    margin-right: 6px;
}

/* ============ Discussion Form ============ */
.hoj-disc-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
    font-size: 13px;
    color: var(--hoj-text-dark, #24292e);
}

.hoj-disc-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.hoj-disc-field > label {
    font-size: 13px;
    font-weight: 600;
    opacity: .85;
}

.hoj-disc-category,
.hoj-disc-title,
.hoj-disc-desc,
.hoj-disc-pid,
.hoj-disc-adv-role{
    width: 100%;
    box-sizing: border-box;
    padding: 8px 12px;
    font-family: inherit;
    font-size: 14px;
    color: inherit;
    background: var(--hoj-input-bg, #fff);
    border: 1px solid rgba(0, 0, 0, .12);
    border-radius: 6px;
    outline: none;
    transition: border-color .15s ease;
}
.hoj-disc-category:focus,
.hoj-disc-title:focus {
    border-color: #409EFF;
}

.hoj-disc-editor {
    min-height: 380px;
}

.hoj-disc-footer {
    bottom: 0;
    z-index: 2;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 12px 0 0;
    margin-top: 4px;
    border-top: 1px solid rgba(0, 0, 0, .06);
}

/* ============ Discussion Advanced ============ */
.hoj-disc-advanced {
    border: 1px solid rgba(0, 0, 0, .08);
    border-radius: 6px;
    overflow: hidden;
}
html.hoj-dark-mode .hoj-disc-advanced {
    border-color: rgba(255, 255, 255, .1);
}

.hoj-disc-advanced-toggle {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background: rgba(0, 0, 0, .02);
    border: 0;
    cursor: pointer;
    color: inherit;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    text-align: left;
    transition: background .15s ease;
}
html.hoj-dark-mode .hoj-disc-advanced-toggle {
    background: rgba(255, 255, 255, .04);
}
.hoj-disc-advanced-toggle:hover {
    background: rgba(64, 158, 255, .08);
}
.hoj-disc-advanced-toggle i {
    font-size: 12px;
    opacity: .6;
    transition: transform .2s ease;
}
.hoj-disc-advanced-toggle.is-open i {
    transform: rotate(180deg);
}

.hoj-disc-advanced-body {
    padding: 12px;
    border-top: 1px solid rgba(0, 0, 0, .06);
}
html.hoj-dark-mode .hoj-disc-advanced-body {
    border-top-color: rgba(255, 255, 255, .08);
}

.hoj-disc-advanced-hint {
    font-size: 12px;
    opacity: .65;
    margin-bottom: 10px;
    line-height: 1.5;
}

.hoj-disc-adv-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 10px 14px;
}
.hoj-disc-adv-grid .hoj-disc-field > label {
    font-size: 12px;
    font-weight: 500;
    opacity: .75;
}
.hoj-disc-adv-grid input[type="number"] {
    width: 100%;
    box-sizing: border-box;
    padding: 6px 10px;
    font-family: inherit;
    font-size: 13px;
    color: inherit;
    background: var(--hoj-input-bg, #fff);
    border: 1px solid rgba(0, 0, 0, .12);
    border-radius: 6px;
    outline: none;
}
.hoj-disc-adv-grid input[type="number"]:focus {
    border-color: #409EFF;
}

.hoj-disc-adv-field--check {
    justify-content: flex-end;
}
.hoj-disc-adv-check-wrap {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding-top: 22px;
}
.hoj-disc-adv-check-wrap input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
}
.hoj-disc-adv-label-top {
    font-size: 13px;
}

.hoj-dialog--fullscreen .hoj-disc-field--editor {
    flex: 1 1 auto;
    min-height: 0;
}

html.hoj-dark-mode .hoj-disc-category,
html.hoj-dark-mode .hoj-disc-title {
    border-color: rgba(255, 255, 255, .12);
}
html.hoj-dark-mode .hoj-disc-footer {
    border-top-color: rgba(255, 255, 255, .08);
}
html.hoj-dark-mode #hoj-settings-panel .hoj-lang-select {
    border-color: rgba(255, 255, 255, .15);
    background: rgba(255, 255, 255, .04);
}

/* ============ Group Auth Radio ============ */
.hoj-group-auth-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 4px;
}
.hoj-group-auth-option {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 6px;
    cursor: pointer;
    transition: border-color .15s, background .15s, color .15s;
    --auth-color: #909399;
}
.hoj-group-auth-option:hover {
    border-color: var(--auth-color);
    background: color-mix(in srgb, var(--auth-color) 6%, transparent);
}
.hoj-group-auth-option input[type="radio"] {
    width: 16px;
    height: 16px;
    margin: 0;
    cursor: pointer;
    flex-shrink: 0;
    accent-color: var(--auth-color);
}
.hoj-group-auth-option:has(input:checked) {
    border-color: var(--auth-color);
    background: color-mix(in srgb, var(--auth-color) 10%, transparent);
}
.hoj-group-auth-option:has(input:checked) .hoj-group-auth-title {
    color: var(--auth-color);
}
.hoj-group-auth-option[data-auth="1"] { --auth-color: #67c23a; }
.hoj-group-auth-option[data-auth="2"] { --auth-color: #e6a23c; }
.hoj-group-auth-option[data-auth="3"] { --auth-color: #f56c6c; }

.hoj-group-auth-text {
    display: flex;
    flex-direction: column;
    line-height: 1.3;
}
.hoj-group-auth-title {
    font-weight: 600;
    font-size: 13px;
    transition: color .15s;
}
.hoj-group-auth-desc {
    font-size: 12px;
    opacity: .65;
    margin-top: 2px;
}

html.hoj-dark-mode .hoj-group-auth-option {
    border-color: rgba(255, 255, 255, .1);
}

/* ============ Visibility Toggle ============ */
.hoj-group-visible-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 8px 0;
    user-select: none;
}
.hoj-group-visible-label {
    font-size: 13px;
    font-weight: 600;
    color: #909399;
    transition: color .2s;
    cursor: pointer;
}
.hoj-group-visible-label.is-active[data-side="public"] {
    color: #67c23a;
}
.hoj-group-visible-label.is-active[data-side="hidden"] {
    color: #f56c6c;
}

.hoj-group-visible-switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 26px;
    border-radius: 13px;
    background: #67c23a;
    cursor: pointer;
    transition: background .22s ease;
    flex-shrink: 0;
    border: 1px solid rgba(0, 0, 0, .06);
}
.hoj-group-visible-switch::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #FFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .25);
    transform: translateY(-50%);
    transition: left .22s cubic-bezier(.25, .1, .25, 1);
}
.hoj-group-visible-switch.is-hidden {
    background: #f56c6c;
}
.hoj-group-visible-switch.is-hidden::before {
    left: calc(100% - 22px);
}
html.hoj-dark-mode .hoj-group-visible-switch {
    border-color: rgba(255, 255, 255, .1);
}

.hoj-group-visible-hint {
    text-align: center;
    font-size: 12px;
    opacity: .6;
    margin-top: 2px;
}

.hoj-disc-field--editor-bottom {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

/* ============ Discussion List Inline Edit ============ */
.hoj-list-edit-btn {
    float: right;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    font-size: 12px;
    font-family: inherit;
    color: #409EFF;
    background: rgba(64, 158, 255, .08);
    border: 1px solid rgba(64, 158, 255, .25);
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none !important;
    transition: background .15s, border-color .15s, color .15s;
    user-select: none;
    margin-left: 8px;
}
.hoj-list-edit-btn::before { display: none !important; }
.hoj-list-edit-btn:hover {
    background: rgba(64, 158, 255, .18);
    border-color: #409EFF;
    color: #409EFF;
}
.hoj-list-edit-btn i {
    font-size: 12px;
    color: inherit !important;
}

/* ============ Discussion List Delete ============ */
.hoj-list-del-btn {
    float: right;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    font-size: 12px;
    font-family: inherit;
    color: #F56C6C;
    background: rgba(245, 108, 108, .08);
    border: 1px solid rgba(245, 108, 108, .25);
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none !important;
    transition: background .15s, border-color .15s, color .15s;
    user-select: none;
    margin-left: 8px;
}
.hoj-list-del-btn::before { display: none !important; }
.hoj-list-del-btn:hover {
    background: rgba(245, 108, 108, .18);
    border-color: #F56C6C;
    color: #F56C6C;
}
.hoj-list-del-btn i {
    font-size: 12px;
    color: inherit !important;
}
html.hoj-dark-mode .hoj-list-del-btn {
    color: #F78989;
    background: rgba(245, 108, 108, .15);
    border-color: rgba(245, 108, 108, .35);
}
html.hoj-dark-mode .hoj-list-edit-btn {
    color: #66B1FF;
    background: rgba(64, 158, 255, .15);
    border-color: rgba(64, 158, 255, .35);
}

/* ============ All Test (TestJudge) ============ */
.hoj-tj-wrap {
    font-size: 13px;
    color: var(--hoj-text-dark, #24292e);
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.hoj-tj-summary {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 12px;
    background: var(--hoj-card-bg, #fff);
    border: 1px solid rgba(0, 0, 0, .06);
    border-radius: 6px;
}
html.hoj-dark-mode .hoj-tj-summary {
    border-color: rgba(255, 255, 255, .08);
}
.hoj-tj-summary-text {
    font-weight: 600;
}

.hoj-tj-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.hoj-tj-row {
    border: 1px solid rgba(0, 0, 0, .06);
    border-radius: 6px;
    overflow: hidden;
}
html.hoj-dark-mode .hoj-tj-row {
    border-color: rgba(255, 255, 255, .08);
}

.hoj-tj-row-head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    cursor: pointer;
    background: rgba(0, 0, 0, .015);
    user-select: none;
}
.hoj-tj-row-head:hover {
    background: rgba(64, 158, 255, .07);
}
html.hoj-dark-mode .hoj-tj-row-head {
    background: rgba(255, 255, 255, .03);
}

.hoj-tj-idx {
    font-weight: 700;
    min-width: 32px;
    color: #409EFF;
}
.hoj-tj-status {
    font-weight: 600;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid transparent;
}
.hoj-tj-status.submitting {
    color: #409EFF;
    border-color: rgba(64, 158, 255, .35);
    background: rgba(64, 158, 255, .06);
}
.hoj-tj-status.running {
    color: #E6A23C;
    border-color: rgba(230, 162, 60, .35);
    background: rgba(230, 162, 60, .06);
}
.hoj-tj-status.pass {
    color: #19BE6B;
    border-color: rgba(25, 190, 107, .45);
    background: rgba(25, 190, 107, .10);
}
.hoj-tj-status.fail {
    color: #ED4014;
    border-color: rgba(237, 64, 20, .45);
    background: rgba(237, 64, 20, .10);
}
.hoj-tj-status.error {
    color: #F56C6C;
    border-color: rgba(245, 108, 108, .45);
    background: rgba(245, 108, 108, .10);
}
.hoj-tj-row[data-state="pass"] .hoj-tj-idx { color: #19BE6B; }
.hoj-tj-row[data-state="fail"] .hoj-tj-idx { color: #ED4014; }
.hoj-tj-row[data-state="fail"] .hoj-tj-meta { color: #ED4014; }
.hoj-tj-row[data-state="pass"] .hoj-tj-meta { color: #19BE6B; }
.hoj-tj-meta {
    font-size: 12px;
    opacity: .7;
    margin-left: auto;
    font-variant-numeric: tabular-nums;
}

.hoj-tj-row-body {
    padding: 10px 12px;
    border-top: 1px dashed rgba(0, 0, 0, .08);
    display: flex;
    flex-direction: column;
    gap: 8px;
}
html.hoj-dark-mode .hoj-tj-row-body {
    border-top-color: rgba(255, 255, 255, .08);
}
.hoj-tj-block-title {
    font-size: 12px;
    font-weight: 600;
    opacity: .75;
    margin-bottom: 4px;
}
.hoj-tj-pre {
    margin: 0;
    padding: 8px 10px;
    font-family: var(--hoj-mono-font, monospace);
    font-size: 12px;
    line-height: 1.5;
    background: rgba(0, 0, 0, .03);
    border-radius: 4px;
    max-height: 200px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-all;
}
html.hoj-dark-mode .hoj-tj-pre {
    background: rgba(255, 255, 255, .04);
}
.hoj-tj-pre--err {
    color: #ED4014;
    background: rgba(237, 64, 20, .06);
}
.title-msg .el-dropdown.hoj-dropdown-replaced {
    display: none !important;
}

/* Dark mode for settings panel */
html.hoj-dark-mode #hoj-settings-panel .hoj-panel-header {
    background: rgba(255, 255, 255, .04);
    border-bottom-color: rgba(255, 255, 255, .08);
}
html.hoj-dark-mode #hoj-settings-panel .hoj-panel-footer {
    background: rgba(255, 255, 255, .03);
    border-top-color: rgba(255, 255, 255, .08);
}
html.hoj-dark-mode #hoj-settings-panel .hoj-section {
    background: rgba(255, 255, 255, .03);
    border-color: rgba(255, 255, 255, .07);
}
html.hoj-dark-mode #hoj-settings-panel .hoj-section[data-level="1"] > .hoj-section-header {
    background: rgba(64, 158, 255, .14);
    color: #66B1FF;
}
html.hoj-dark-mode #hoj-settings-panel .hoj-row:hover {
    background: rgba(255, 255, 255, .04);
}
html.hoj-dark-mode #hoj-settings-panel input[type="text"],
html.hoj-dark-mode #hoj-settings-panel input[type="password"],
html.hoj-dark-mode #hoj-settings-panel input[type="number"],
html.hoj-dark-mode #hoj-settings-panel select {
    border-color: rgba(255, 255, 255, .12);
}
html.hoj-dark-mode #hoj-settings-panel .hoj-mini-btn,
html.hoj-dark-mode #hoj-settings-panel button:not(.hoj-section-header):not(.hoj-mini-btn),
html.hoj-dark-mode #hoj-settings-panel .hoj-panel-header #hoj-import-export-btn,
html.hoj-dark-mode #hoj-settings-panel .hoj-panel-header #hoj-close {
    border-color: rgba(255, 255, 255, .12);
}
html.hoj-dark-mode #hoj-settings-panel .hoj-color-preview {
    border-color: rgba(255, 255, 255, .25);
}
html.hoj-dark-mode #hoj-settings-panel input[type="checkbox"] {
    background: rgba(120, 120, 128, .38);
    border-color: rgba(255, 255, 255, .1);
}
html.hoj-dark-mode #hoj-settings-panel input[type="checkbox"]::before {
    background: #F2F2F7;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .5);
}
html.hoj-dark-mode #hoj-settings-panel input[type="checkbox"]:checked {
    background: #30D158;
    border-color: #30D158;
}
html.hoj-dark-mode .hoj-new-like-btn {
    border-color: rgba(255, 255, 255, .1);
}
html.hoj-dark-mode .hoj-new-like-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, .06);
}
html.hoj-dark-mode .hoj-new-like-cd { color: #A0A0A5; }
html.hoj-dark-mode .hoj-new-like-bar { background: rgba(255, 255, 255, .08); }

html.hoj-dark-mode .hoj-snippet-mgr-list,
html.hoj-dark-mode .hoj-snippet-input,
html.hoj-dark-mode .hoj-snippet-textarea,
html.hoj-dark-mode .hoj-snippet-search-input { border-color: rgba(255,255,255,.1); }
html.hoj-dark-mode .hoj-snippet-mgr-item:hover { background: rgba(255,255,255,.06); }
html.hoj-dark-mode .hoj-like-cooldown {
    color: #A0A0A5;
}
html.hoj-dark-mode .hoj-like-progress {
    background: rgba(255, 255, 255, .08);
}
html.hoj-dark-mode .hoj-ie-note {
    background: rgba(64, 158, 255, .15);
}

html.hoj-dark-mode .hoj-ie-back { border-color: rgba(255, 255, 255, .12); }
html.hoj-dark-mode .hoj-ie-tabs { border-bottom-color: rgba(255, 255, 255, .08); }
html.hoj-dark-mode .hoj-ie-preset { border-color: rgba(255, 255, 255, .1); }
html.hoj-dark-mode .hoj-ie-list { border-color: rgba(255, 255, 255, .1); }
html.hoj-dark-mode .hoj-ie-footer { border-top-color: rgba(255, 255, 255, .08); }
html.hoj-dark-mode .hoj-ie-group-header { background: rgba(255, 255, 255, .04); }
html.hoj-dark-mode .hoj-ie-group-header:hover { background: rgba(255, 255, 255, .07); }
html.hoj-dark-mode .hoj-ie-version { background: rgba(255, 255, 255, .04); }

/* ============ hoj-el-select ============ */
.hoj-el-select-wrap {
    display: inline-block;
    width: 130px;
    max-width: 130px;
    vertical-align: middle;
}
.hoj-el-select-wrap .el-select {
    width: 100%;
}
.hoj-el-select-wrap .el-input__inner {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0 26px 0 10px;
    cursor: pointer;
    box-sizing: border-box;
    font-size: 12px;
    font-family: inherit;
    border-radius: 4px;
}

#hoj-settings-panel.hoj-fullscreen .hoj-el-select-wrap,
#hoj-settings-panel.hoj-fullscreen .hoj-el-select-wrap .el-select {
    width: 140px;
    max-width: 140px;
}

.hoj-el-select-dropdown {
    max-height: 260px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, .18);
    border-radius: 6px;
}
.hoj-el-select-dropdown .el-scrollbar {
    max-height: 260px;
    overflow-y: auto;
}
.hoj-el-select-dropdown .el-select-dropdown__item {
    padding: 0 12px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

html.hoj-dark-mode .hoj-el-select-dropdown {
    background: #2E2E36;
    border-color: rgba(255, 255, 255, .08);
}
html.hoj-dark-mode .hoj-el-select-dropdown .el-select-dropdown__item {
    color: rgba(255, 255, 255, .85);
}
html.hoj-dark-mode .hoj-el-select-dropdown .el-select-dropdown__item.hover,
html.hoj-dark-mode .hoj-el-select-dropdown .el-select-dropdown__item:hover {
    background: rgba(64, 158, 255, .18);
}
html.hoj-dark-mode .hoj-el-select-dropdown .el-select-dropdown__item.selected {
    color: #66B1FF;
    font-weight: 600;
}

/* ============ About · Version Row ============ */
#hoj-settings-panel .hoj-version-row {
    user-select: none;
}
#hoj-settings-panel .hoj-version-row:hover {
    background: rgba(64, 158, 255, .06) !important;
}
#hoj-settings-panel .hoj-version-row .hoj-version-text {
    opacity: .65;
    transition: opacity .15s, color .15s;
}
#hoj-settings-panel .hoj-version-row:hover .hoj-version-text {
    opacity: 1;
    color: #409EFF;
}

/* ============ Language Trigger ============ */
#hoj-lang-trigger {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-left: 6px;
    width: 170px;
    font-size: 12px;
    font-family: inherit;
    vertical-align: middle;
}
#hoj-lang-trigger .hoj-lang-trigger__label {
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* ============ Language Picker Dialog ============ */
.hoj-lang-picker {
    font-size: 13px;
    color: var(--hoj-text-dark, #24292e);
}
.hoj-lang-picker__group {
    margin-bottom: 12px;
}
.hoj-lang-picker__group:last-child {
    margin-bottom: 0;
}
.hoj-lang-picker__title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .5px;
    text-transform: uppercase;
    color: #909399;
    padding-bottom: 6px;
    margin-bottom: 6px;
    border-bottom: 1px solid rgba(0, 0, 0, .06);
}
html.hoj-dark-mode .hoj-lang-picker__title {
    color: rgba(255, 255, 255, .55);
    border-bottom-color: rgba(255, 255, 255, .08);
}

.hoj-lang-picker__items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}
.hoj-lang-picker__item {
    padding: 4px 12px;
    font-size: 12px;
    font-family: inherit;
    border: 1px solid rgba(0, 0, 0, .12);
    background: transparent;
    color: inherit;
    border-radius: 4px;
    cursor: pointer;
    transition: background .12s, border-color .12s, color .12s;
}
.hoj-lang-picker__item:hover {
    background: rgba(64, 158, 255, .08);
    border-color: #409EFF;
    color: #409EFF;
}
.hoj-lang-picker__item.is-selected {
    background: #409EFF;
    border-color: #409EFF;
    color: #fff;
    font-weight: 600;
}
html.hoj-dark-mode .hoj-lang-picker__item {
    border-color: rgba(255, 255, 255, .12);
}
html.hoj-dark-mode .hoj-lang-picker__item:hover {
    background: rgba(64, 158, 255, .18);
}
html.hoj-dark-mode .hoj-lang-picker__item.is-selected {
    background: #409EFF;
    border-color: #409EFF;
    color: #fff;
}
`;