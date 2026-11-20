/**
 * Liquid Glass UI CSS
 * Only injected when config.LiquidGlassUI === true
 */

export const HOJ_LIQUIDGLASS_CORE_CSS = `
:root {
  --hoj-lg-blur: blur(10px) saturate(1.35);
  --hoj-lg-shadow:
    0 8px 16px #20268833,
    inset 0px 0px 8px #FFFFFF13,
    inset -3px 3px 3px #FFFFFF0A,
    inset -1px 1px 0px #FFFFFF60,
    inset 1px -1px 0px #FFFFFF30;
}

/* ---------- liquidglass(pseudo=true) ---------- */
html.hoj-lg-active :is(
  div.el-card,
  .el-tabs--border-card,
  *[class*="bg-white"],
  .glass-card,
  .el-popover,
  .el-message-box,
  .el-message,
  .el-select-dropdown,
  .el-dropdown-menu,
  .el-notification,
  .m-message,
  .mobile-nav,
  .mu-popover,
  .mu-paper,
  .discussion-header[data-v-fce6d0ee],
  .el-tabs__header.is-top,
  .el-tabs__nav-wrap.is-top,
  .category-body[data-v-fce6d0ee],
  .container[data-v-bbe20b80],
  .container[data-v-13564ee3],
  .container[data-v-675320b4],
  .v-note-wrapper,
  .v-note-help-content,
  .add-image-link,
  .popup-dropdown,
  .op-header.popup-dropdown,
  .el-upload-dragger,
  .problem-resize,
  .submit-detail,
  .vxe-table[data-v-74461b8a], .vxe-table[data-v-4401646e], .vxe-table[data-v-51e8bf1a], .vxe-table[data-v-7a1f5b36], .vxe-table[data-v-01aa6788], .vxe-table[data-v-113ebaae]
) {
  background: none !important;
  box-shadow: var(--hoj-lg-shadow) !important;
  @layer {
    & {
      position: relative;
    }
  }
}

html.hoj-lg-active :is(
  div.el-card,
  .el-tabs--border-card,
  *[class*="bg-white"],
  .glass-card,
  .el-popover,
  .el-message-box,
  .el-message,
  .el-select-dropdown,
  .el-dropdown-menu,
  .el-dialog,
  .el-notification,
  .m-message,
  .mobile-nav,
  .mu-popover,
  .mu-paper,
  .discussion-header[data-v-fce6d0ee],
  .el-tabs__header.is-top,
  .el-tabs__nav-wrap.is-top,
  .category-body[data-v-fce6d0ee],
  .container[data-v-bbe20b80],
  .container[data-v-13564ee3],
  .container[data-v-675320b4],
  .v-note-wrapper,
  .v-note-help-content,
  .add-image-link,
  .popup-dropdown,
  .op-header.popup-dropdown,
  .el-upload-dragger,
  .problem-resize,
  .submit-detail,
  .vxe-table[data-v-74461b8a], .vxe-table[data-v-4401646e], .vxe-table[data-v-51e8bf1a], .vxe-table[data-v-7a1f5b36], .vxe-table[data-v-01aa6788], .vxe-table[data-v-113ebaae]
)::before {
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  z-index: -1 !important;
  pointer-events: none !important;
  border-radius: inherit !important;
  background: var(--hoj-lg-card-bg) !important;
  backdrop-filter: var(--hoj-lg-blur) !important;
  box-shadow: 0 8px 24px #20268833, inset 0px 0px 10px #FFFFFF1A, inset -3px 3px 4px #FFFFFF10, inset -0.5px 0.5px 0px #FFFFFF60 !important;
}

/* ---------- liquidglass(pseudo=false) ---------- */
html.hoj-lg-active :is(
  .el-tooltip__popper,
  .vxe-table--tooltip-wrapper,
  .vue-tooltip-theme.tooltip .tooltip-inner,
  .echarts > div:nth-child(2):not(.el-loading-mask):not(:empty),
  .el-loading-mask,
  .el-backtop,
  .el-backtop:hover,
  span.rank-tag:not(.no1, .no2, .no3),
  .announcements-container li[data-v-931546ae],
  .el-input.el-pagination__editor.is-in-pagination > .el-input__inner,
  .el-input.el-input--mini.el-input--suffix > .el-input__inner,
  .btn-prev,
  .btn-next,
  .el-pager > .number:not(.active),
  .el-pager > .number.active,
  .el-pager > .el-icon.more.btn-quicknext,
  .el-pager > .el-icon.more.btn-quickprev,
  .dataNav .dataNavNext,
  .dataNav .dataNavPrev,
  .question-intr[data-v-1c61011a],
  .question-intr[data-v-dbad109e],
  .el-progress-bar__outer,
  .problem-resize span:nth-child(2) > button,
  .num-box > span,
  html.hoj-admin .login-container,
  html.hoj-admin #header,
  html.hoj-admin .el-menu:not(.el-menu--inline)
) {
  background: var(--hoj-lg-card-bg) !important;
  backdrop-filter: var(--hoj-lg-blur) !important;
  box-shadow: var(--hoj-lg-shadow) !important;
}

/* Disable old acrylic backdrop-filter */
html.hoj-lg-active .el-button:not(.is-round:not(.el-button--default),
  #js-right-bottom > div > div.el-col.el-col-24.el-col-sm-24.el-col-md-14.el-col-lg-14 > button,
  .el-button--danger, .el-button--warning, .el-button--success,
  .el-button--primary, .el-button--text, .el-button--info) {
  backdrop-filter: none !important;
}

html.hoj-lg-active.hoj-admin .el-tag--dark.el-tag--warning {
  backdrop-filter: blur(0px) saturate(1.35) !important;
}

/* echarts tooltip */
html.hoj-lg-active .echarts > div:nth-child(2):not(.el-loading-mask):not(:empty) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* Loading mask */
html.hoj-lg-active .el-loading-mask::before {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* Tooltip */
html.hoj-lg-active :is(.el-tooltip__popper, .vxe-table--tooltip-wrapper) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* Navbar & Dropdown */
html.hoj-lg-active .el-menu.el-menu--horizontal::before,
html.hoj-lg-active .el-menu.el-menu--popup.el-menu--popup-bottom-start {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* Mobile */
html.hoj-lg-active :is(.mobile-nav, .mu-popover, .mu-paper) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* Back to top */
html.hoj-lg-active :is(.el-backtop, .el-backtop:hover) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* Pagination / Input / Problem Nav / Sidebar Resize */
html.hoj-lg-active :is(
  .el-input.el-pagination__editor.is-in-pagination > .el-input__inner,
  .el-input.el-input--mini.el-input--suffix > .el-input__inner,
  .btn-prev, .btn-next,
  .el-pager > .number:not(.active),
  .el-pager > .number.active,
  .el-pager > .el-icon.more.btn-quicknext,
  .el-pager > .el-icon.more.btn-quickprev,
  .dataNav .dataNavNext,
  .dataNav .dataNavPrev,
  .problem-resize,
  .problem-resize span:nth-child(2) > button
) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* Drawer / Message Box */
html.hoj-lg-active :is(.el-drawer__body, .el-message-box, .el-message) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* Tags / List hover */
html.hoj-lg-active :is(
  .category-item.el-tag[style*="background-color: rgb(255"][style$="255);"],
  .el-tag--plain:not(.active),
  .dataNavListItem.is-active[data-v-5cbe8756],
  .dataNavListItem[data-v-5cbe8756]:hover
) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* Secondary nav / Discussion / Code blocks / Editor / Admin */
html.hoj-lg-active :is(
  .el-tabs__header.is-top,
  .discussion-header[data-v-fce6d0ee],
  .category-body[data-v-fce6d0ee],
  .container[data-v-13564ee3],
  .container[data-v-675320b4],
  .container[data-v-bbe20b80],
  .el-textarea__inner,
  [data-v-6e9809fa] .el-textarea__inner[readonly],
  .vue-tooltip-theme.tooltip .tooltip-inner,
  .markdown-body pre,
  .markdown-body pre ol.pre-numbering,
  .v-note-wrapper,
  .add-image-link,
  .popup-dropdown,
  .v-note-help-content,
  .op-header.popup-dropdown,
  .login-container,
  .el-menu:not(.el-menu--inline),
  .el-upload-dragger
) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}

/* el-dialog keeps stronger saturation (original was saturate(1.6)) */
html.hoj-lg-active .el-dialog {
  backdrop-filter: blur(10px) saturate(1.6) !important;
}

/* Color picker / Date picker / Autocomplete */
html.hoj-lg-active :is(
  .el-color-picker__panel,
  .el-picker-panel,
  .el-autocomplete-suggestion
) {
  backdrop-filter: var(--hoj-lg-blur) !important;
}
`;