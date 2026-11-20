/**
 * Dark Mode CSS
 * Only injected when config.DarkMode === true
 */

export const HOJ_DARKMODE_CORE_CSS = `

/* ---------- Global Constants ---------- */
:root {
  --hoj-dm-blur: blur(20px) saturate(1.2);
  --hoj-dm-shadow: 0 2px 12px rgba(0,0,0,.45);
}


/* ---------- Global Colors ---------- */
html.hoj-dark-mode body {
  color: var(--hoj-text-dark);
  background-color: var(--hoj-bg-color);
}

/* ---------- General Text Colors ---------- */
*:not(pre, pre *, code, code *, .CodeMirror *, textarea, i, .katex, .katex *, [class*=" el-icon-"], [class^=el-icon-], [class^=example-] pre, .tex-formula, .tex-span), i, .el-submenu__title i[data-v-35116184], .el-submenu__title i[data-v-4a46c6f6], textarea {
  color: var(--hoj-text-dark) !important;
}

html.hoj-dark-mode i,
html.hoj-dark-mode .el-icon-arrow-down,
html.hoj-dark-mode .el-icon-arrow-right,
html.hoj-dark-mode .el-icon-arrow-left,
html.hoj-dark-mode .el-icon-arrow-up {
  color: var(--hoj-text-dark) !important;
}

/* ---------- Image Dimming ---------- */
html.hoj-dark-mode img { filter: brightness(.85); }

/* ---------- Inputs ---------- */
html.hoj-dark-mode :is(
  input.el-input__inner,
  input.vxe-input--inner,
  textarea.el-textarea__inner,
  .el-input__inner,
  .CodeMirror
) {
  background: var(--hoj-input-bg) !important;
  color: var(--hoj-text-dark) !important;
  border-color: rgba(255,255,255,.08) !important;
}

/* ---------- Code Blocks ---------- */
html.hoj-dark-mode :is(
  .markdown-body pre,
  .hljs,
  pre[data-v-1c61011a],
  pre[data-v-dbad109e]
) {
  background: var(--hoj-code-bg) !important;
  color: var(--hoj-text-dark) !important;
}
html.hoj-dark-mode .markdown-body code:not(.markdown-body pre code) {
  background: var(--hoj-code-bg) !important;
  color: var(--hoj-text-dark);
}

/* ---------- Links ---------- */
html.hoj-dark-mode a[href^='http'],
html.hoj-dark-mode a[href^='/'],
html.hoj-dark-mode a.entry {
  color: var(--hoj-text-link) !important;
}

/* ---------- Dividers / Borders ---------- */
html.hoj-dark-mode :is(
  .el-divider,
  .el-divider__text,
  .markdown-body hr
) {
  background-color: rgba(255,255,255,.1) !important;
  border-color: rgba(255,255,255,.1) !important;
  color: var(--hoj-text-dark);
}

/* ---------- Code Highlight (GitHub Dark) ---------- */
html.hoj-dark-mode .hljs-doctag,html.hoj-dark-mode .hljs-keyword,html.hoj-dark-mode .hljs-meta .hljs-keyword,html.hoj-dark-mode .hljs-template-tag,html.hoj-dark-mode .hljs-template-variable,html.hoj-dark-mode .hljs-type,html.hoj-dark-mode .hljs-variable.language_{color:#ff7b72}
html.hoj-dark-mode .hljs-title,html.hoj-dark-mode .hljs-title.class_,html.hoj-dark-mode .hljs-title.class_.inherited__,html.hoj-dark-mode .hljs-title.function_{color:#d2a8ff}
html.hoj-dark-mode .hljs-attr,html.hoj-dark-mode .hljs-attribute,html.hoj-dark-mode .hljs-literal,html.hoj-dark-mode .hljs-meta,html.hoj-dark-mode .hljs-number,html.hoj-dark-mode .hljs-operator,html.hoj-dark-mode .hljs-selector-attr,html.hoj-dark-mode .hljs-selector-class,html.hoj-dark-mode .hljs-selector-id,html.hoj-dark-mode .hljs-variable{color:#79c0ff}
html.hoj-dark-mode .hljs-meta .hljs-string,html.hoj-dark-mode .hljs-regexp,html.hoj-dark-mode .hljs-string{color:#a5d6ff}
html.hoj-dark-mode .hljs-built_in,html.hoj-dark-mode .hljs-symbol{color:#ffa657}
html.hoj-dark-mode .hljs-code,html.hoj-dark-mode .hljs-comment,html.hoj-dark-mode .hljs-formula{color:#8b949e}
html.hoj-dark-mode .hljs-name,html.hoj-dark-mode .hljs-quote,html.hoj-dark-mode .hljs-selector-pseudo,html.hoj-dark-mode .hljs-selector-tag{color:#7ee787}
html.hoj-dark-mode .hljs-subst{color:#c9d1d9}
html.hoj-dark-mode .hljs-section{color:#1f6feb;font-weight:700}
html.hoj-dark-mode .hljs-bullet{color:#f2cc60}
html.hoj-dark-mode .hljs-emphasis{color:#c9d1d9;font-style:italic}
html.hoj-dark-mode .hljs-strong{color:#c9d1d9;font-weight:700}
html.hoj-dark-mode .hljs-addition{color:#aff5b4;background-color:#033a16}
html.hoj-dark-mode .hljs-deletion{color:#ffdcd7;background-color:#67060c}

/* ---------- Mouse Glow Effect ---------- */
/* Make cards positioning context, define glow radius + initial position */
html.hoj-dark-mode :is(
  div.el-card,
  .el-tabs--border-card,
  .el-popover,
  .el-message-box
) {
  --hoj-glow-radius: 200px;
  --hoj-glow-mx: 50%;
  --hoj-glow-my: 50%;
  position: relative;
  isolation: isolate;
}

html.hoj-dark-mode :is(
  img, div.el-card,.category-body[data-v-fce6d0ee], .announcements-container li[data-v-931546ae],.el-tabs--border-card,.el-popover,.el-message-box,.el-message,.el-select-dropdown,.el-dropdown-menu,.el-notification,.m-message,.mobile-nav,.mu-popover,.mu-paper,.el-tabs__header.is-top,.el-tabs__nav-wrap.is-top,.container[data-v-bbe20b80],.container[data-v-13564ee3],.container[data-v-675320b4],.v-note-wrapper,.v-note-help-content,.add-image-link,.popup-dropdown,.op-header.popup-dropdown,.el-upload-dragger,.problem-resize
)::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
  border-radius: inherit;

  background-image:
    radial-gradient(
      circle calc(var(--hoj-glow-radius, 200px) * .32)
        at var(--hoj-glow-mx, 50%) var(--hoj-glow-my, 50%),
      rgba(255, 255, 255, .18) 0%,
      rgba(255, 255, 255, .06) 55%,
      rgba(255, 255, 255, 0) 100%
    ),
    radial-gradient(
      circle var(--hoj-glow-radius, 200px)
        at var(--hoj-glow-mx, 50%) var(--hoj-glow-my, 50%),
      rgba(255, 255, 255, .22) 0%,
      rgba(255, 255, 255, .15) 14%,
      rgba(255, 255, 255, .09) 29%,
      rgba(255, 255, 255, .045) 44%,
      rgba(255, 255, 255, .018) 59%,
      rgba(255, 255, 255, .006) 72%,
      rgba(255, 255, 255, 0) 85%
    );
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity .4s ease;
}

html.hoj-dark-mode .hoj-ripple {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, .35) 0%,
    rgba(255, 255, 255, .18) 30%,
    rgba(255, 255, 255, .06) 60%,
    rgba(255, 255, 255, 0) 85%
  );
  opacity: .9;
  animation: hojRippleExpand 700ms cubic-bezier(.2, .7, .2, 1) forwards;
  z-index: 11;
  mix-blend-mode: screen;
}

@keyframes hojRippleExpand {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: .9;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  html.hoj-dark-mode .hoj-ripple {
    animation-duration: 200ms;
  }
}

/* JS adds .hoj-glow-on to light up */
html.hoj-dark-mode .hoj-glow-on::after {
  opacity: 1 !important;
}

@media (prefers-reduced-motion: reduce) {
  html.hoj-dark-mode :is(
    div.el-card,
    .el-tabs--border-card,
    *[class*="bg-white"],
    .glass-card,
    .el-popover,
    .el-message-box
  )::after {
    transition: none;
  }
}
`;