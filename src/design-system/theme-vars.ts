import darkTokens from './tokens/dark.tokens.json';
import lightTokens from './tokens/light.tokens.json';
import valueTokens from './tokens/value.tokens.json';

type ThemeMode = 'dark' | 'light';

function setVar(name: string, value: string | number) {
  document.documentElement.style.setProperty(name, String(value));
}

export function applyThemeVariables(theme: ThemeMode) {
  const semantic = theme === 'light' ? lightTokens.color.semantic : darkTokens.color.semantic;
  const primitive = valueTokens.color.primitive;
  const elevation = valueTokens.elevation;

  Object.entries(primitive.blue).forEach(([key, value]) => setVar(`--token-blue-${key}`, value));
  Object.entries(primitive.yellow).forEach(([key, value]) => setVar(`--token-yellow-${key}`, value));
  Object.entries(primitive.gray).forEach(([key, value]) => setVar(`--token-gray-${key}`, value));
  Object.entries(primitive.cyan).forEach(([key, value]) => setVar(`--token-cyan-${key}`, value));
  Object.entries(primitive.rose).forEach(([key, value]) => setVar(`--token-rose-${key}`, value));

  setVar('--token-bg-canvas-default', semantic.background.canvas.default);
  setVar('--token-bg-canvas-subtle', semantic.background.canvas.subtle);
  setVar('--token-bg-canvas-elevated', semantic.background.canvas.elevated);
  setVar('--token-bg-canvas-sunken', semantic.background.canvas.sunken);

  setVar('--token-surface-panel-default', semantic.surface.panel.default);
  setVar('--token-surface-panel-muted', semantic.surface.panel.muted);
  setVar('--token-surface-panel-elevated', semantic.surface.panel.elevated);
  setVar('--token-surface-panel-overlay', semantic.surface.panel.overlay);
  setVar('--token-surface-card-default', semantic.surface.card.default);
  setVar('--token-surface-card-subtle', semantic.surface.card.subtle);
  setVar('--token-surface-card-interactive', semantic.surface.card.interactive);
  setVar('--token-surface-card-selected', semantic.surface.card.selected);

  setVar('--token-text-primary', semantic.text.primary.default);
  setVar('--token-text-secondary', semantic.text.secondary.default);
  setVar('--token-text-muted', semantic.text.muted.default);
  setVar('--token-text-accent', semantic.text.accent.default);
  setVar('--token-text-info', semantic.text.info?.default ?? semantic.text.success.default);
  setVar('--token-text-danger', semantic.text.danger.default);

  setVar('--token-border-subtle', semantic.border.subtle.default);
  setVar('--token-border-strong', semantic.border.subtle.strong);
  setVar('--token-border-accent', semantic.border.accent.default);
  setVar('--token-focus-ring', semantic.focus.ring.default);

  setVar('--token-action-primary', semantic.action.primary.default);
  setVar('--token-action-primary-hover', semantic.action.primary.hover);
  setVar('--token-action-primary-text', semantic.action.primary.text);
  setVar('--token-action-secondary', semantic.action.secondary.default);
  setVar('--token-action-secondary-hover', semantic.action.secondary.hover);
  setVar('--token-action-secondary-text', semantic.action.secondary.text);
  setVar('--token-action-danger', semantic.action.danger.default);
  setVar('--token-action-danger-text', semantic.action.danger.text);

  setVar('--token-feedback-info', semantic.feedback.info.default);
  setVar('--token-feedback-info-surface', semantic.feedback.info.surface);
  setVar('--token-feedback-warning', semantic.feedback.warning.default);
  setVar('--token-feedback-warning-surface', semantic.feedback.warning.surface);

  setVar('--token-shadow-low', elevation.surface.low);
  setVar('--token-shadow-mid', elevation.surface.mid);
  setVar('--token-shadow-high', elevation.surface.high);
  setVar('--token-glow-primary', elevation.glow.primary);
  setVar('--token-glow-secondary', elevation.glow.secondary);
  setVar('--token-glow-info', elevation.glow.info);
}
