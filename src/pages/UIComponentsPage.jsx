import { UIButton, UICard } from '../design-system/components';
import { useTheme } from '../design-system/theme';
import valueTokens from '../design-system/tokens/value.tokens.json';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" className="ui-theme-toggle" onClick={toggleTheme}>
      <span className="ui-theme-toggle__icon" aria-hidden>
        {theme === 'dark' ? '◐' : '◑'}
      </span>
      <span className="ui-theme-toggle__label">{theme}</span>
    </button>
  );
}

function PrimitiveScale({ name, values }) {
  return (
    <div className="ui-section">
      <div className="ui-section__header">
        <h2 className="ui-section__title">{name}</h2>
      </div>
      <div className="ui-token-grid">
        {Object.entries(values).map(([step, color]) => (
          <div key={`${name}-${step}`} className="ui-swatch">
            <div className="ui-swatch__preview" style={{ background: String(color) }} />
            <span className="ui-token-name">{step}</span>
            <span className="ui-token-value">{String(color)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UIComponentsPage() {
  const primitives = valueTokens.color.primitive;
  const statusScales = {
    info: {
      100: '#d9fbff',
      200: '#aef5ff',
      300: '#51e7ff',
      400: '#05c9ea',
      500: '#008ca7',
      600: '#006d82',
    },
    warn: {
      100: '#fff1bf',
      200: '#ffe693',
      300: '#ffd85c',
      400: '#ffbf00',
      500: '#f0ab00',
      600: '#c88800',
    },
    error: {
      100: '#ffe2df',
      200: '#ffbdb8',
      300: '#ff8f87',
      400: '#f26a63',
      500: '#cb3347',
      600: '#9e1d30',
    },
    success: {
      100: '#dbfaec',
      200: '#b8f3d9',
      300: '#84e8bd',
      400: '#4fd59f',
      500: '#22b77f',
      600: '#159263',
    },
  };
  const principalColors = [
    ['primary', '#1d4ed8'],
    ['secondary', '#ffbf00'],
    ['alert', '#dc2626'],
  ];
  const mobileColorTokens = [
    ['backgroundLight', '#f5f7fb'],
    ['backgroundDark', '#111827'],
    ['surfaceLight', '#ffffff'],
    ['surfaceDark', '#1f2937'],
    ['borderLight', '#dbe3ee'],
    ['borderDark', '#374151'],
    ['textPrimaryLight', '#111827'],
    ['textPrimaryDark', '#f9fafb'],
    ['textSecondaryLight', '#4b5563'],
    ['textSecondaryDark', '#9ca3af'],
    ['actionPrimaryText', '#ffffff'],
  ];

  return (
    <main className="ui-page">
      <div className="ui-page__inner">
        <div className="ui-topbar">
          <a href="/" className="ui-backlink">/</a>
          <div className="ui-topbar__actions">
            <ThemeToggle />
          </div>
        </div>

        <section className="ui-shell">
          <div className="ui-section">
            <div className="ui-section__header">
              <h2 className="ui-section__title">Buttons</h2>
            </div>
            <div className="ui-button-row">
              <UIButton variant="primary">Primary</UIButton>
              <UIButton variant="secondary">Secondary</UIButton>
              <UIButton variant="ghost">Ghost</UIButton>
              <UIButton variant="danger">Danger</UIButton>
            </div>
          </div>

          <div className="ui-section">
            <div className="ui-section__header">
              <h2 className="ui-section__title">Cards</h2>
            </div>
            <div className="ui-card-grid">
              <UICard eyebrow="Card" title="Default" body="Default" />
              <UICard eyebrow="Card" title="Interactive" body="Interactive" interactive />
              <UICard eyebrow="Card" title="Actions" body="Actions" actions={<UIButton size="sm">Action</UIButton>} />
            </div>
          </div>

          <div className="ui-section">
            <div className="ui-section__header">
              <h2 className="ui-section__title">Elevations</h2>
            </div>
            <div className="ui-elevation-grid">
              <div className="ui-elevation-card ui-elevation-card--low">
                <span className="ui-token-name">surface.low</span>
              </div>
              <div className="ui-elevation-card ui-elevation-card--mid">
                <span className="ui-token-name">surface.mid</span>
              </div>
              <div className="ui-elevation-card ui-elevation-card--high">
                <span className="ui-token-name">surface.high</span>
              </div>
            </div>
          </div>

          <div className="ui-section">
            <div className="ui-section__header">
              <h2 className="ui-section__title">Colores Principales</h2>
            </div>
            <div className="ui-token-grid">
              {principalColors.map(([name, hex]) => (
                <div key={name} className="ui-swatch">
                  <div className="ui-swatch__preview" style={{ background: hex }} />
                  <span className="ui-token-name">{name}</span>
                  <span className="ui-token-value">{hex}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ui-section">
            <div className="ui-section__header">
              <h2 className="ui-section__title">Mobile Tokens Base (Hex)</h2>
            </div>
            <div className="ui-token-grid">
              {mobileColorTokens.map(([name, hex]) => (
                <div key={name} className="ui-swatch">
                  <div className="ui-swatch__preview" style={{ background: hex }} />
                  <span className="ui-token-name">{name}</span>
                  <span className="ui-token-value">{hex}</span>
                </div>
              ))}
            </div>
          </div>

          <PrimitiveScale name="Blue" values={primitives.blue} />
          <PrimitiveScale name="Yellow" values={primitives.yellow} />
          <PrimitiveScale name="Gray" values={primitives.gray} />
          <PrimitiveScale name="Cyan" values={primitives.cyan} />
          <PrimitiveScale name="Rose" values={primitives.rose} />
          <PrimitiveScale name="Info" values={statusScales.info} />
          <PrimitiveScale name="Warn" values={statusScales.warn} />
          <PrimitiveScale name="Error" values={statusScales.error} />
          <PrimitiveScale name="Success" values={statusScales.success} />
        </section>
      </div>
    </main>
  );
}
