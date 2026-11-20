/**
 * Core CSS styles for Smart HOJ
 * This is the main CSS template that gets CSS variables injected
 */

export const CORE_CSS = `
/* ============ Global Background ============ */
body {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-color: var(--hoj-bg-color) !important;
}

/* ============ Main Container ============ */
div#oj-content { height: 100%; }
div#oj-content:not(:has(.problem-body)) { margin: 35px 7% 0 7%; padding: 0; }

/* ============ Cards ============ */
div.el-card, .el-tabs--border-card, *[class*="bg-white"], .glass-card {
  border: 0;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  background: none;
  border-radius: var(--hoj-card-radius);
}
div.el-card::before, .el-tabs--border-card::before, *[class*="bg-white"]::before, .glass-card::before {
  content: "";
  position: absolute;
  pointer-events: none;
  z-index: -1;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1.35);
  border-radius: inherit;
}
@layer hoj-fallback {
  div.el-card, .el-tabs--border-card, .glass-card, *[class*="bg-white"] {
    position: relative;
  }
}

/* ============ iframe ============ */
iframe {
  border-radius: var(--hoj-card-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 0;
}
iframe[src="https://oi-wiki.org/"] { height: 100%; }

/* ============ echarts tooltip ============ */
.echarts > div:nth-child(2):not(.el-loading-mask):not(:empty) {
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  color: var(--hoj-text-dark) !important;
  border-radius: var(--hoj-card-radius);
  padding: 5px 8px !important;
}

/* ============ Global Font ============ */
*:not(pre, pre *, code, code *, .CodeMirror *, textarea, i, .katex, .katex *, [class*=" el-icon-"], [class^="el-icon-"], [class^="example-"] pre, .tex-formula, .tex-span) {
  font-family: var(--hoj-sans-font) !important;
}
pre, pre *, code, code *, .CodeMirror *, textarea, [class^="example-"] pre {
  font-family: var(--hoj-mono-font) !important;
}

/* ============ Links ============ */
a[href^='http'], a[href^='/'] { color: var(--hoj-text-link) !important; }
a[href^='http']:hover, a[href^='/']:hover, a.entry:hover { color: var(--hoj-text-link) !important; }

/* ============ Underline Animation ============ */
a[href^='http'], a[href^='/'], a.entry {
  position: relative;
  border: 0 !important;
}
a[href^='http']::before, a[href^='/']::before, a.entry::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  right: 50%;
  height: 1px;
  background-color: var(--hoj-text-blue);
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}
a[href^='http']:hover, a[href^='/']:hover, a.entry:hover {
  border: 0 !important;
  text-decoration: none;
}
a[href^='http']:hover::before, a[href^='/']:hover::before, a.entry:hover::before {
  left: 0; right: 0;
}

/* ============ Loading Mask ============ */
.el-loading-mask {
  background: transparent;
}
.el-loading-mask::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  background: transparent;
  backdrop-filter: blur(var(--hoj-card-blur));
}

/* ============ Table Borders ============ */
.vxe-table.border--default .vxe-body--column, .vxe-table.border--default .vxe-footer--column,
.vxe-table.border--default .vxe-header--column, .vxe-table.border--inner .vxe-body--column,
.vxe-table.border--inner .vxe-footer--column, .vxe-table.border--inner .vxe-header--column {
  background-image: linear-gradient(#E8EAEC80, #E8EAEC80);
  background-size: 100% 1px;
}

/* ============ Tooltip ============ */
.el-tooltip__popper div.popper__arrow, .el-tooltip__popper .vxe-table--tooltip-arrow,
.vxe-table--tooltip-wrapper div.popper__arrow, .vxe-table--tooltip-wrapper .vxe-table--tooltip-arrow {
  display: none !important;
}
.el-tooltip__popper, .vxe-table--tooltip-wrapper {
  background: var(--hoj-tooltip-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  color: var(--hoj-text-dark) !important;
  border: none !important;
  border-radius: var(--hoj-tooltip-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

/* ============ Scrollbar ============ */
::-webkit-scrollbar { background: transparent; width: 8px; height: 8px; box-shadow: none; }
::-webkit-scrollbar-thumb {
  background: var(--hoj-scrollbar-bg); border-radius: 8px;
  border: 2px solid transparent; background-clip: padding-box;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--hoj-scrollbar-bg-hover); border-radius: 8px;
  border: 2px solid transparent; background-clip: padding-box;
}
::-webkit-scrollbar-corner { background: transparent; }

/* ============ Text Selection ============ */
::selection { background: var(--hoj-select-text); }

/* ============ Smooth Scroll ============ */
html.hoj-smooth-scroll, html.hoj-smooth-scroll body { scroll-behavior: smooth; }

/* ============ Smooth Page Transition ============ */
@view-transition { navigation: auto; }
html.hoj-smooth-switch::view-transition-group(*) {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}

/* ============ Navbar ============ */
div#header[data-v-35116184], div#header[data-v-4a46c6f6] {
  background: transparent;
  box-shadow: none;
}
.el-menu.el-menu--horizontal {
  margin: 15px 7% 10px 7%;
  background: none !important;
  border: 0;
  border-radius: var(--hoj-card-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  position: relative;
}
.el-menu.el-menu--horizontal::before {
  content: "";
  position: absolute;
  pointer-events: none;
  z-index: -1;
  inset: 0;
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  border-radius: inherit;
}
.el-menu .el-menu-item[data-v-35116184]:hover, .el-menu .el-menu-item i[data-v-35116184]:hover,
.el-menu--horizontal .el-menu .el-menu-item[data-v-35116184]:hover,
.el-submenu[data-v-35116184] .el-submenu__title:hover,
.el-submenu.is-active[data-v-35116184], .el-menu .el-menu-item.is-active[data-v-35116184],
.el-menu .el-menu-item.is-active i[data-v-35116184],
.el-menu.el-menu--popup.el-menu--popup-bottom-start li,
.el-menu .el-menu-item[data-v-4a46c6f6]:hover, .el-menu .el-menu-item i[data-v-4a46c6f6]:hover,
.el-menu--horizontal .el-menu .el-menu-item[data-v-4a46c6f6]:hover,
.el-submenu[data-v-4a46c6f6] .el-submenu__title:hover,
.el-submenu.is-active[data-v-4a46c6f6], .el-menu .el-menu-item.is-active[data-v-4a46c6f6],
.el-menu .el-menu-item.is-active i[data-v-4a46c6f6],
.el-menu.el-menu--popup.el-menu--popup-bottom-start li, .el-submenu .el-submenu__title:hover i[data-v-35116184] {
  background: 0 !important;
}
.el-menu .el-menu-item[data-v-35116184] i, .el-menu .el-menu-item[data-v-4a46c6f6] i {
  background: 0 !important;
}
.el-menu.el-menu--popup.el-menu--popup-bottom-start {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  border-radius: var(--hoj-card-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  margin-top: 0;
}
.el-menu--horizontal, .el-zoom-in-top-enter-active, .el-zoom-in-top-leave-active {
  border-radius: var(--hoj-card-radius);
}

/* Navbar underline animation */
.el-menu-item[data-v-35116184]:not(.is-active), .el-menu-item[data-v-4a46c6f6]:not(.is-active) {
  position: relative;
  border: 0 !important;
}
.el-menu-item[data-v-35116184]:not(.is-active)::before,
.el-menu-item[data-v-4a46c6f6]:not(.is-active)::before {
  content: '';
  position: absolute; bottom: 0; left: 50%; right: 50%; height: 2px;
  background-color: #409EFF;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.el-menu-item[data-v-35116184]:not(.is-active):hover,
.el-menu-item[data-v-4a46c6f6]:not(.is-active):hover { border: 0 !important; }
.el-menu-item[data-v-35116184]:not(.is-active):hover::before,
.el-menu-item[data-v-4a46c6f6]:not(.is-active):hover::before { left: 0; right: 0; }
.el-menu--horizontal > * > .el-dropdown-link { color: var(--hoj-text-blue) !important; }
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover { color: var(--hoj-text-blue); }
.el-tabs__item { transition: color 0.2s ease-out; }
.mobile-nav, .mu-popover { background: var(--hoj-card-bg); backdrop-filter: blur(var(--hoj-card-blur)); color: var(--hoj-text-dark); }
.mu-paper { background: var(--hoj-card-bg); backdrop-filter: blur(var(--hoj-card-blur)); }
.mu-appbar { background: none; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.mu-paper { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.mu-popover { border-radius: var(--hoj-card-radius); box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }

/* ============ Home ============ */
.panel-title { color: var(--hoj-text-dark); }
img.el-image__inner { border-radius: var(--hoj-card-radius); }
.el-carousel__item { border-radius: var(--hoj-card-radius); display: flex; justify-content: center; align-items: center; }
.vxe-table.border--inner .vxe-table--header-wrapper,
.vxe-table.border--none .vxe-table--header-wrapper,
.vxe-table--body-wrapper.body--wrapper,
.vxe-table .vxe-body--row.row--stripe,
.vxe-table--header-wrapper.body--wrapper,
.vxe-table.border--default .vxe-table--header-wrapper,
.vxe-table.border--full .vxe-table--header-wrapper,
.vxe-table.border--outer .vxe-table--header-wrapper { background: 0 !important; }
.vxe-table[data-v-74461b8a], .vxe-table[data-v-4401646e], .vxe-table[data-v-51e8bf1a], .vxe-table[data-v-7a1f5b36], .vxe-table[data-v-01aa6788], .vxe-table[data-v-113ebaae] {
  border: none !important;
  background: var(--hoj-list-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  border-radius: var(--hoj-card-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
span.rank-tag { border-radius: var(--hoj-tag-radius); }
span.rank-tag:not(.no1, .no2, .no3) {
  background: var(--hoj-button-bg);
  color: var(--hoj-text-dark);
}
span.cite { display: none !important; }
.announcements-container li[data-v-931546ae] {
  background: var(--hoj-card-bg); border: 0;
  border-radius: var(--hoj-card-radius);
}
canvas { background: transparent; }
[data-v-35116184] .el-dialog, [data-v-4a46c6f6] .el-dialog {
  border-radius: var(--hoj-card-radius);
}
.el-backtop {
  z-index: 1501; border-radius: 50%;
  background: var(--hoj-button-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
}
.el-backtop:hover { background: var(--hoj-button-bg-hover) !important; backdrop-filter: blur(var(--hoj-card-blur)); }

/* ============ Problem Page ============ */
input.vxe-input--inner {
  border: 0 !important;
  background: var(--hoj-input-bg) !important;
  border-radius: var(--hoj-input-radius);
}
.el-collapse-item__header, .el-collapse { border: 0; border-radius: var(--hoj-button-radius); }
.el-collapse-item__header { padding-left: 10px; }
button#pick-one { border-radius: var(--hoj-button-radius); border: 0; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.el-pagination__total { color: var(--hoj-text-light); }
.el-pagination__jump { color: var(--hoj-text-light); }
.el-input.el-pagination__editor.is-in-pagination > .el-input__inner {
  border: 0;
  background: var(--hoj-input-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-input-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.btn-prev, .btn-next {
  border: 0;
  background: var(--hoj-button-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-button-radius) !important;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.btn-prev .el-icon.el-icon-arrow-left, .btn-next .el-icon.el-icon-arrow-right { color: var(--hoj-text-dark); }
.btn-prev[disabled] .el-icon.el-icon-arrow-left, .btn-next[disabled] .el-icon.el-icon-arrow-right { color: var(--hoj-text-dark-disabled); }
.el-pager > .number:not(.active), .el-pager > .el-icon.more.btn-quicknext,
.el-pager > .el-icon.more.btn-quickprev, .el-pager > .el-icon.more.btn-quicknext:hover,
.el-pager > .el-icon.more.btn-quickprev:hover {
  border: 0;
  background: var(--hoj-button-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-button-radius) !important;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  color: var(--hoj-text-dark) !important;
}
.el-pager > .number.active {
  border: 0;
  background: var(--hoj-button-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-button-radius) !important;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-input.el-input--mini.el-input--suffix > .el-input__inner {
  border: 0;
  background: var(--hoj-button-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-button-radius) !important;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-select__caret.el-input__icon.el-icon-arrow-up { color: var(--hoj-text-dark); }
.el-tabs.el-tabs--top.el-tabs--border-card > .el-tabs__header.is-top,
.el-tabs__nav-wrap.is-top { background: 0 !important; border: 0 !important; backdrop-filter: none !important; }
.el-tabs--border-card > .el-tabs__header .el-tabs__item { border-radius: var(--hoj-card-radius); margin: 0 !important; }
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  background: var(--hoj-card-bg); border: 0;
}
.dataNav .dataNavNext, .dataNav .dataNavPrev {
  background: var(--hoj-button-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
}
.dataNav .dataNavNext:hover i, .dataNav .dataNavPrev:hover i {
  color: var(--hoj-button-bg-active); font-weight: 800;
}
.question-intr[data-v-1c61011a], .question-intr[data-v-dbad109e] {
  background: var(--hoj-card-bg) !important;
  border: 0;
  border-radius: var(--hoj-card-radius);
}
.markdown-body img { background: none !important; }
.el-progress-bar__outer {
  background: var(--hoj-card-bg);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1) inset;
}
.filter-item { border-radius: var(--hoj-button-radius); }
.el-tag--plain, .el-tag:not([class*="oi-"]) {
  border: 0;
  margin-bottom: 3px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-tag--dark { border: 0; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.el-popover {
  backdrop-filter: blur(var(--hoj-card-blur));
  border: 0;
  background: var(--hoj-card-bg) !important;
  border-radius: var(--hoj-card-radius);
}
.el-popper .popper__arrow { display: none; }
pre[data-v-1c61011a], pre[data-v-dbad109e], .markdown-body code:not(.markdown-body pre code) {
  background: var(--hoj-code-bg) !important;
  border: 0 !important;
  border-radius: var(--hoj-code-radius);
}
.el-button:not(.is-round:not(.el-button--default), #js-right-bottom > div > div.el-col.el-col-24.el-col-sm-24.el-col-md-14.el-col-lg-14 > button, .el-button--danger, .el-button--warning, .el-button--success, .el-button--primary, .el-button--text, .el-button--info) {
  background: var(--hoj-button-bg);
  border-radius: var(--hoj-button-radius);
}
.el-button.is-round { border-radius: 100px !important; }
button.right-fold, button.left-fold { border-radius: 50% !important; }
#submit-code.el-card.submit-detail.is-always-shadow { margin-left: 10px; }
.CodeMirror { filter: opacity(0.6); border-radius: var(--hoj-code-radius); }
.el-drawer { background: none; }
.el-drawer__body {
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border: 0 !important;
}
.is-light { background: var(--hoj-card-bg) !important; }
.el-input__count { background: transparent !important; }
.el-message-box {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border: 0;
  border-radius: var(--hoj-card-radius);
}
.el-tag.el-tag--medium { border: 0; }
#js-right-bottom > div > div.el-col.el-col-24.el-col-sm-24.el-col-md-10.el-col-lg-10 { margin-top: 1px !important; }
#js-right-bottom > div > div.el-col.el-col-24.el-col-sm-24.el-col-md-10.el-col-lg-10 div > div.el-alert {
  border-radius: var(--hoj-card-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  margin-bottom: 5px;
}
#js-right-bottom > div > div.el-col.el-col-24.el-col-sm-24.el-col-md-10.el-col-lg-10 div > div.el-alert div > p { margin-top: 0; }
#js-right-bottom > div > div.el-col.el-col-24.el-col-sm-24.el-col-md-10.el-col-lg-10:has(> div:nth-child(2):last-child) { display: inline-flex; }
#js-right-bottom > div > div.el-col.el-col-24.el-col-sm-24.el-col-md-10.el-col-lg-10:has(> div:nth-child(2):last-child) > div { margin-right: 10px; }
#js-right-bottom > div > div.el-col.el-col-24.el-col-sm-24.el-col-md-10.el-col-lg-10:has(> div:nth-child(2):last-child) div > div:not(.el-alert--warning) > .el-alert__content { display: none; }
.problem-resize {
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border-radius: 100px;
  width: 6px !important;
  margin-left: 2px;
  margin-right: 2px;
}
.problem-resize span:first-child { opacity: 0; }
.problem-resize span:nth-child(2) > button {
  background: var(--hoj-button-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
}
#problem-left-ProblemDetails { }
@media screen and (max-width: 992px) { #problem-left-ProblemDetails { width: 100% !important; } }
.body[data-v-12264e86] { background: none; }
footer[data-v-12264e86] { background: none; }
footer[data-v-12264e86]:hover { background: var(--hoj-card-bg); }
.el-button--primary.is-plain {
  background: var(--hoj-button-bg) !important;
  border: none;
}
.el-button--primary.is-plain:hover { background: var(--hoj-button-bg-hover) !important; border: none; }
.el-message {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border: 0;
  border-radius: var(--hoj-card-radius);
}

/* ============ Training ============ */
.category-item.el-tag {
  border: 0;
  border-radius: var(--hoj-button-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.category-item.el-tag[style*="background-color: rgb(255"][style$="255);"],
.el-tag--plain:not(.active) {
  background: var(--hoj-button-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
}
.row--hover { background: var(--hoj-list-bg-hover) !important; }
#problem-footer[data-v-5cbe8756] { margin: 0; margin-top: 10px; }
.dataNav .dataNavList .dataNavListItem[data-v-5cbe8756] { color: var(--hoj-text-dark); }
.dataNavListItem.is-active[data-v-5cbe8756], .dataNavListItem[data-v-5cbe8756]:hover {
  background: var(--hoj-button-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  background-image: none !important;
}
.el-tabs__header.is-top {
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
  border: 0;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-tabs__nav-wrap.is-top:after { display: none; }

/* ============ Contest ============ */
.el-tabs__nav-wrap.is-top:not(.el-tabs__header.is-top:has(&)) {
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
}
.el-tabs__nav-wrap.is-top:not(.el-tabs__header.is-top:has(&)) .el-tabs__item:not(.is-disabled) { color: var(--hoj-text-dark); }
.el-tabs__nav-wrap.is-top:not(.el-tabs__header.is-top:has(&)) .el-tabs__item.is-disabled { color: var(--hoj-text-dark-disabled); }
.el-slider__runway { height: 10px; border-radius: 5px; }
.el-slider__runway > .el-slider__bar { border-radius: 5px; }
.el-slider__runway > .el-slider__button-wrapper > .el-tooltip.el-slider__button { background: 0 !important; border: 0; }
.el-slider__button-wrapper { width: 40px; height: 40px; }
.el-tag[class*="oi-"] { border: 0; border-radius: var(--hoj-button-radius); box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.num-box > span { border-radius: var(--hoj-button-radius); background: var(--hoj-button-bg); backdrop-filter: blur(var(--hoj-card-blur)); }
.el-input-group__append { border: none; background: none; }
.el-input-group__append button {
  margin-top: 0 !important; margin-bottom: 0 !important; border: none;
  border-radius: 0 var(--hoj-input-radius) var(--hoj-input-radius) 0 !important;
}
a.emphasis[data-v-3296db8c], a.emphasis[data-v-41904bfc] { color: var(--hoj-text-dark) !important; }

/* ============ Status/Judging ============ */
.el-alert[data-v-7a1f5b36] {
  border-radius: var(--hoj-card-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-tooltip__popper.is-dark { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.vxe-table.border--default.show--head.t--animat.t--stripe[data-v-7a1f5b36] {
  padding: 0 !important; border: 0;
  border-radius: var(--hoj-card-radius) !important;
  margin-top: 13px;
}
.el-tooltip.test-detail-item[data-v-2f48b1c2] {
  background: var(--hoj-card-bg);
  border-radius: var(--hoj-judge-radius);
  border-width: 0 0 0 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.own-submit-row { background: var(--hoj-list-bg-green) !important; }

/* ============ Ranking ============ */
.el-card[data-v-74461b8a], .el-card[data-v-4401646e], .el-card[data-v-113ebaae] { margin-bottom: 10px; }
.el-select-dropdown {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border: 0;
  border-radius: var(--hoj-card-radius);
}
.vxe-table .vxe-table--body-wrapper, .vxe-table .vxe-table--footer-wrapper { background: transparent !important; }
.vxe-table[data-v-74461b8a], .vxe-table[data-v-4401646e], .vxe-table[data-v-51e8bf1a], .vxe-table[data-v-7a1f5b36], .vxe-table[data-v-01aa6788], .vxe-table[data-v-113ebaae] {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
}
.vue-avatar--wrapper, .user-avatar { transition: transform 0.25s ease-out !important; }
.vue-avatar--wrapper:hover, .user-avatar:hover { transform: scale(1.1); }
.el-select-dropdown > .el-scrollbar > .el-scrollbar__bar.is-horizontal,
.el-select-dropdown > .el-scrollbar > .el-scrollbar__bar.is-vertical { display: none; }
.el-select-dropdown__item.hover { background: transparent; }

/* ============ Discussion ============ */
.discussion-header[data-v-fce6d0ee] {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.category-body[data-v-fce6d0ee] {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.category-item[data-v-fce6d0ee]:hover {
  background: var(--hoj-list-bg-hover) !important;
  border-radius: var(--hoj-button-radius);
}
.el-button--primary, .el-button--danger { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); border-radius: var(--hoj-button-radius); }
.title-msg, .title-article .title-msg span a.c999[data-v-13564ee3] { color: var(--hoj-text-dark) !important; }
.container[data-v-13564ee3], .container[data-v-675320b4] {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
  border: 0;
}
.title-article[data-v-13564ee3], .body-article[data-v-13564ee3] { background: transparent; }
.container[data-v-bbe20b80] {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
  border: 0;
}
.el-textarea__inner, [data-v-6e9809fa] .el-textarea__inner[readonly] {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border: 0;
  border-radius: var(--hoj-input-radius);
}
.loading-text > a { background: 0 !important; color: var(--hoj-text-dark) !important; }
.btn-more:hover { background: 0 !important; color: #007EA8 !important; }
span[title="Super Administrator"], span[title="Administrator"] { border-radius: var(--hoj-tag-radius); box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }

/* ============ Team ============ */
.el-input .el-input__count .el-input__count-inner { background: 0; }
.el-input-group__append, .el-input-group__prepend {
  background: var(--hoj-input-bg);
  border: 0;
}
.el-input-group__append { border-radius: var(--hoj-input-radius); }
.el-input-group__prepend { border-radius: var(--hoj-input-radius); }
[data-v-bada3258] .el-card { border-radius: var(--hoj-card-radius) !important; }
.el-col.el-col-17[data-v-bada3258] { padding-left: 5px !important; }
.el-button--mini, .el-button--small { border-radius: var(--hoj-button-radius); box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); border: 0; }
span[data-v-bada3258] { margin-right: 5px; }
.el-dialog {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1.6);
  border-radius: var(--hoj-card-radius) !important;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.el-dialog.is-fullscreen { margin: 40px; width: calc(100% - 80px); }
.description-body { background: 0 !important; }
.el-card[data-v-3433c614] { background: transparent; }
.list-card { border-radius: var(--hoj-card-radius) !important; }
.el-pager li.active { color: var(--hoj-text-light); }
.btn-prev, .btn-next { border-radius: var(--hoj-button-radius); }

/* ============ Message Center ============ */
.el-tabs.el-tabs--left.el-tabs--border-card { margin-right: 0; }
.el-tabs__header.is-left { background: transparent; border: 0 !important; }
.el-tabs__item.is-left.is-active#tab-DiscussMsg,
.el-tabs__item.is-left.is-active#tab-ReplyMsg,
.el-tabs__item.is-left.is-active#tab-LikeMsg,
.el-tabs__item.is-left.is-active#tab-SysMsg,
.el-tabs__item.is-left.is-active#tab-MineMsg { border-radius: var(--hoj-card-radius); }
.msg-title[data-v-fe517e4e] { border-radius: var(--hoj-card-radius); margin-bottom: 10px; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.el-notification, .m-message {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border: 0;
  border-radius: var(--hoj-card-radius);
}

/* ============ Profile ============ */
.el-dropdown-menu {
  border: 0;
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
}
.el-dropdown-menu__item:hover {
  background: var(--hoj-list-bg-hover) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
}
.el-dropdown-menu__item--divided::before { display: none; }
rect[style*="rgb(218"] { fill: rgba(27, 31, 35, 0.1) !important; }
svg.vch__wrapper .vch__days__labels__wrapper text.vch__day__label[data-v-a9cfea66],
svg.vch__wrapper .vch__legend__wrapper text[data-v-a9cfea66],
svg.vch__wrapper .vch__months__labels__wrapper text.vch__month__label[data-v-a9cfea66] { fill: var(--hoj-text-dark); }
.vue-tooltip-theme .tooltip-arrow { display: none; }
.vue-tooltip-theme.tooltip .tooltip-inner {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border-radius: var(--hoj-tooltip-radius);
  color: var(--hoj-text-dark);
}
.vue-tooltip-theme.tooltip .tooltip-inner b { color: inherit; }
.signature-body { background: transparent !important; }
.el-tabs__nav.is-top, .el-tabs__item.is-top { border: 0 !important; }
.markdown-body table tr { background: var(--hoj-list-bg) !important; }
.markdown-body[data-v-e762da3c] pre, .markdown-body[data-v-6696830f] pre, .hljs { background: 0 !important; }
.markdown-body pre {
  background: var(--hoj-code-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-code-radius) !important;
  border: 0;
}
.markdown-body pre ol.pre-numbering { background: var(--hoj-code-bg); backdrop-filter: blur(var(--hoj-card-blur)); }
.markdown-body pre i.code-copy { border: 0; border-radius: var(--hoj-button-radius) !important; }
.markdown-body blockquote { background: none; color: var(--hoj-text-dark); border-left-color: #EEE; }
.markdown-body hr { height: 0.1em; }
.markdown-body h2 { border-radius: 0; padding: 0; padding-bottom: .3em; line-height: 1.2; border-bottom: 1px solid #EEE; color: var(--hoj-text-dark); background: none; }
.el-collapse-item__header, .el-card.level-card.is-always-shadow, .el-divider__text.is-center { background: transparent; }
.problem-btn > .el-button--small { box-shadow: none; border: 0; margin: 1px; }
.level-card[data-v-424f832f] { width: calc(55% - .5em); }

/* ============ Settings ============ */
input.el-input__inner, input.vxe-input--inner {
  border: 0;
  background: var(--hoj-input-bg) !important;
  border-radius: var(--hoj-input-radius);
}
input.el-input__inner[disabled], input.vxe-input--inner[disabled] { filter: grayscale(1); }
.el-form-item { margin: 20px; }
[data-v-cab6b016] .el-collapse-item__header { background: transparent; }
.el-collapse-item__wrap { background: transparent; }
[data-v-9109eaf2] .upload-container, .el-upload, .el-upload-dragger { border: 0 !important; }
.el-upload-dragger {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
}

/* ============ Markdown Editor ============ */
.v-note-wrapper, [data-v-6e9809fa] .el-textarea__inner[readonly] {
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius);
}
.v-note-op, .content-input-wrapper, .auto-textarea-wrapper.content-input,
pre.auto-textarea-block, .auto-textarea-input.no-border.no-resize,
.v-show-content.scroll-style.scroll-style-border-radius {
  background: transparent !important;
  backdrop-filter: none !important;
}
.add-image-link-wrapper, .v-show-content-html { background: transparent !important; }
.add-image-link {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  left: 34% !important;
  width: auto !important;
  border-radius: var(--hoj-card-radius) !important;
}
.popup-dropdown {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius) !important;
  border: 0 !important;
}
.dropdown-item { background: var(--hoj-list-bg-hover) !important; }
.op-icon, .op-icon.selected { background: none !important; }
.v-note-help-content { background: var(--hoj-card-bg); backdrop-filter: blur(var(--hoj-card-blur)); border-radius: var(--hoj-card-radius); }
.v-note-help-wrapper .v-note-help-content .v-note-help-show { background: 0; }
.add-image-link-wrapper .add-image-link .input-wrapper[data-v-548e2160] { border: 0; }
.add-image-link-wrapper .add-image-link .input-wrapper input[data-v-548e2160] {
  background: var(--hoj-card-bg);
  border-radius: var(--hoj-card-radius);
  width: 100%;
  margin-left: 0;
  padding: 0 8px;
}
.op-btn { border-radius: var(--hoj-button-radius) !important; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.op-btn.cancel { background: var(--hoj-button-bg); }
.op-header.popup-dropdown {
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius) !important;
}

/* ============ Code Highlight (GitHub Light) ============ */
.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#d73a49}
.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#6f42c1}
.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#005cc5}
.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#032f62}
.hljs-built_in,.hljs-symbol{color:#e36209}
.hljs-code,.hljs-comment,.hljs-formula{color:#6a737d}
.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#22863a}
.hljs-subst{color:#24292e}
.hljs-section{color:#005cc5;font-weight:700}
.hljs-bullet{color:#735c0f}
.hljs-emphasis{color:#24292e;font-style:italic}
.hljs-strong{color:#24292e;font-weight:700}
.hljs-addition{color:#22863a;background-color:#f0fff4}
.hljs-deletion{color:#b31d28;background-color:#ffeef0}

/* ============ Introduction ============ */
.container .content pre[data-v-69fec1be] {
  background: var(--hoj-code-bg);
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-code-radius);
}

/* ============ Admin ============ */
#admin-content, .admin-container, .breadcrumb-container[data-v-07a5bb4c] { background: 0 !important; }
.login-container {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1) !important;
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  border-radius: var(--hoj-card-radius) !important;
  border: none !important;
}
#header {
  background: 0 !important;
}
.el-menu:not(.el-menu--inline) {
  background: var(--hoj-card-bg) !important;
  backdrop-filter: blur(var(--hoj-card-blur));
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 0;
}
.el-menu--inline { background: 0; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.el-menu-item:hover, .el-submenu__title:hover, .el-menu-item.is-active { background: var(--hoj-list-bg-hover) !important; }
.el-menu .el-menu-item:hover i[data-v-35116184], .el-menu .el-submenu__title i[data-v-35116184] {
  background: 0!important;
}
.el-button.el-button--primary.is-plain:hover {
  color: black !important;
}

/* ============ Copy Markdown Button ============ */
.el-button--primary.is-plain {
  background: var(--hoj-button-bg) !important;
  border: none;
}
.el-button--primary.is-plain:hover {
  background: var(--hoj-button-bg-hover) !important;
  border: none;
  color: var(--hoj-text-dark);
}

/* ============ Color Picker ============ */
.el-color-picker__panel {
  border: 0;
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  border-radius: var(--hoj-card-radius);
}

/* ============ Date Picker ============ */
.el-picker-panel {
  border: 0;
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  border-radius: var(--hoj-card-radius);
}
.el-picker-panel__footer {
  background: 0;
}

/* ============ Autocomplete ============ */
.el-autocomplete-suggestion {
  border: 0;
  background: var(--hoj-card-bg);
  backdrop-filter: blur(var(--hoj-card-blur)) saturate(1);
  border-radius: var(--hoj-card-radius);
}
.el-autocomplete-suggestion li.highlighted,
.el-autocomplete-suggestion li:hover {
  background: var(--hoj-list-bg-hover);
}

/* ============ Checkbox ============ */
.el-checkbox__inner {
  border: 0;
  background: var(--hoj-button-bg);
  border-radius: 4px;
}

/* ============ BetterHOJ Settings Panel ============ */
#hoj-settings-panel {
  background: var(--hoj-card-bg, #FFFFFFE0) !important;
  backdrop-filter: blur(var(--hoj-card-blur, 20px)) saturate(1.35);
  -webkit-backdrop-filter: blur(var(--hoj-card-blur, 20px)) saturate(1.35);
  color: var(--hoj-text-dark, #24292E);
}
.hoj-tool {
  background: var(--hoj-card-bg, #FFFFFFE0) !important;
  backdrop-filter: blur(var(--hoj-card-blur, 20px)) saturate(1.35);
  -webkit-backdrop-filter: blur(var(--hoj-card-blur, 20px)) saturate(1.35);
  color: var(--hoj-text-dark, #24292E);
}
#hoj-alert-container .m-message {
  background: #FFFFFFE0;
  backdrop-filter: blur(10px) saturate(1.35);
}
.hoj-dialog {
  background: #FFFFFFE0;
  backdrop-filter: blur(10px) saturate(1.35);
  -webkit-backdrop-filter: blur(10px) saturate(1.35);
}
#hoj-settings-panel input[type="text"],
#hoj-settings-panel input[type="password"],
#hoj-settings-panel input[type="number"],
#hoj-settings-panel select {
  background: var(--hoj-input-bg, #fff) !important;
}

/* ---------- Generic Buttons ---------- */
#hoj-settings-panel button:not(.hoj-section-header):not(.hoj-mini-btn):not(.hoj-navbar-arrows button) {
  border-radius: var(--hoj-button-radius, 4px)!important;
  background: var(--hoj-button-bg, transparent)!important;
}
#hoj-settings-panel button:not(.hoj-section-header):not(.hoj-mini-btn):not(.hoj-navbar-arrows button):hover {
  background: var(--hoj-button-bg-hover, rgba(0, 0, 0, .06))!important;
}

/* ---------- Mini Buttons ---------- */
#hoj-settings-panel .hoj-mini-btn {
  background: var(--hoj-button-bg, transparent)!important;
}
`;