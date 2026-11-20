/**
 * Color Preview for Settings Panel
 * Shows color preview swatches next to color input fields
 */

import { isColorValue } from '../core/utils.js';
import { buildVars } from '../styles/index.js';
import type { Config } from '../core/config.js';

const COLOR_PREVIEW_KEYS = [
  'CardBackground', 'ListBackground', 'ListBackgroundGreen', 'ListBackgroundHover',
  'CodeBlockBackground', 'InputAreaBackground',
  'ButtonBackground', 'ButtonBackgroundHover', 'ButtonBackgroundActive',
  'TooltipBackground',
  'TextDark', 'TextDarkDisabled', 'TextLight', 'TextBlue', 'TextLink',
  'SelectText'
] as const;

type ColorKey = typeof COLOR_PREVIEW_KEYS[number];

const COLOR_KEY_TO_VAR: Record<ColorKey, string> = {
  CardBackground: '--hoj-card-bg',
  ListBackground: '--hoj-list-bg',
  ListBackgroundGreen: '--hoj-list-bg-green',
  ListBackgroundHover: '--hoj-list-bg-hover',
  CodeBlockBackground: '--hoj-code-bg',
  InputAreaBackground: '--hoj-input-bg',
  ButtonBackground: '--hoj-button-bg',
  ButtonBackgroundHover: '--hoj-button-bg-hover',
  ButtonBackgroundActive: '--hoj-button-bg-active',
  TooltipBackground: '--hoj-tooltip-bg',
  TextDark: '--hoj-text-dark',
  TextDarkDisabled: '--hoj-text-dark-disabled',
  TextLight: '--hoj-text-light',
  TextBlue: '--hoj-text-blue',
  TextLink: '--hoj-text-link',
  SelectText: '--hoj-select-text'
};

function getDefaultColorFor(key: ColorKey, config: Config): string {
  const varName = COLOR_KEY_TO_VAR[key];
  if (!varName) return '';
  try {
    const temp = { ...config, [key]: 'Default' };
    const vars = buildVars(temp);
    return (vars[varName] || '').trim();
  } catch (e) {
    console.warn('[ColorPreview] Failed to compute default color:', e);
    return '';
  }
}

export function attachColorPreviews(panel: HTMLElement, config: Config): void {
  COLOR_PREVIEW_KEYS.forEach(key => {
    const input = panel.querySelector(`[data-key="${key}"]`) as HTMLInputElement;
    if (!input) return;
    if (input.parentElement?.classList.contains('hoj-input-with-preview')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'hoj-input-with-preview';
    input.parentNode!.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    const preview = document.createElement('span');
    preview.className = 'hoj-color-preview';
    preview.dataset.previewFor = key;
    wrapper.appendChild(preview);

    const update = () => {
      const val = input.value.trim();
      let color = '';
      let title = '';

      if (isColorValue(val)) {
        color = val;
        title = val;
      } else if (val === '' || val === 'Default') {
        color = getDefaultColorFor(key, config);
        title = color ? `Default → ${color}` : 'Default';
      } else {
        title = `无效值：${val}`;
      }

      if (color) {
        preview.style.background = color;
        preview.style.opacity = '1';
      } else {
        preview.style.background = 'repeating-conic-gradient(#ccc 0 25%, #fff 0 50%) 50% / 8px 8px';
        preview.style.opacity = '0.6';
      }
      preview.title = title;
    };

    update();
    input.addEventListener('input', update);
    input.addEventListener('change', update);
  });
}

export function refreshAllColorPreviews(config: Config): void {
  if (!settingsPanel) return;
  const panel = getSettingsPanel();
  if (!panel) return;

  panel.querySelectorAll('.hoj-color-preview').forEach(preview => {
    const key = preview.dataset.previewFor as ColorKey;
    const input = panel.querySelector(`[data-key="${key}"]`) as HTMLInputElement;
    if (!input) return;
    input.dispatchEvent(new Event('input'));
  });
}

// Need to access settingsPanel from panel.ts
let settingsPanel: HTMLElement | null = null;
export function setSettingsPanel(panel: HTMLElement | null): void {
  settingsPanel = panel;
}
function getSettingsPanel(): HTMLElement | null {
  return settingsPanel;
}