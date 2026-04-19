import { useState } from 'react';
import darkTokens from './tokens/dark.tokens.json';
import valueTokens from './tokens/value.tokens.json';
import { PreviewModal, ThemeToggle, UIAccordion, UIButton, UICard, UIField, type UIAccordionItem } from './components/index.ts';
import { Link } from 'react-router-dom';

const grayScale = Object.entries(valueTokens.color.primitive.gray);
const blueScale = Object.entries(valueTokens.color.primitive.blue);
const yellowScale = Object.entries(valueTokens.color.primitive.yellow);
const spacingScale = Object.entries(valueTokens.space);
const radiusScale = Object.entries(valueTokens.radius);
const elevationScale = Object.entries(valueTokens.elevation.surface);

const accordionItems: UIAccordionItem[] = [
  {
    id: 'buttons',
    title: 'Buttons',
    meta: 'cta',
    content:
      'Primary usa el azul del Sign up de la plantilla. Secondary usa el amarillo ya presente en el frontend. Ghost cubre acciones de baja jerarquia en paneles densos.',
  },
  {
    id: 'cards',
    title: 'Cards',
    meta: 'surface',
    content:
      'Las cards usan tonal layering, borde sutil y elevacion suave. La separacion visual viene por profundidad, no por divisores pesados.',
  },
  {
    id: 'spacing',
    title: 'Spacing',
    meta: '8px',
    content:
      'Todo padding, margin y gap nuevo debe salir de la escala de 8px: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 96 y 120.',
  },
];

function Swatch({
  name,
  value,
}: {
  name: string;
  value: string | number;
}) {
  return (
    <article className="ui-swatch">
      <div className="ui-swatch__preview" style={{ background: String(value) }} />
      <span className="ui-token-name">{name}</span>
      <span className="ui-token-value">{String(value)}</span>
    </article>
  );
}

function SpaceToken({
  name,
  value,
}: {
  name: string;
  value: string | number;
}) {
  return (
    <article className="ui-space-token">
      <div className="ui-space-bar" style={{ width: `${Number(value)}px` }} />
      <span className="ui-token-name">{name}</span>
      <span className="ui-token-value">{value}px</span>
    </article>
  );
}

function RadiusToken({
  name,
  value,
}: {
  name: string;
  value: string | number;
}) {
  return (
    <article className="ui-radius-token">
      <div className="ui-radius-box" style={{ borderRadius: `${Number(value)}px` }} />
      <span className="ui-token-name">{name}</span>
      <span className="ui-token-value">{value}px</span>
    </article>
  );
}

export default function DesignSystemPortal() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="ui-page">
      <div className="ui-page__inner">
        <div className="ui-topbar">
          <Link className="ui-backlink" to="/">
            Volver al uploader
          </Link>
          <div className="ui-topbar__actions">
            <Link className="ui-backlink" to="/ui-components">
              /ui-components
            </Link>
            <ThemeToggle />
          </div>
        </div>

        <section className="ui-shell">
          <div className="ui-hero">
            <div>
              <p className="ui-kicker">viralco ui system</p>
              <h1 className="ui-title">Tokens y componentes base para construir el frontend a partir de la landing.</h1>
              <p className="ui-body">
                Esta libreria toma el lenguaje visual del starter desplegado en <strong>3005</strong>, conserva el azul del CTA original,
                incorpora el amarillo existente de ViralCo y normaliza spacing, superficies y componentes reutilizables para producto.
              </p>
              <div className="ui-actions">
                <UIButton variant="primary" size="lg">Primary Action</UIButton>
                <UIButton variant="secondary" size="lg">Secondary Action</UIButton>
                <UIButton variant="ghost" size="lg">Ghost Action</UIButton>
              </div>
            </div>

            <div className="ui-showcase-card">
              <p className="ui-label">reglas visuales</p>
              <h3>Base operativa</h3>
              <p>
                Nocturnal surfaces, tipografia display + body, radius apretado, jerarquia de color azul/amarillo y ritmo de 8px.
              </p>
              <div className="ui-note">
                <strong>Semantica recomendada:</strong> azul para accion principal, amarillo para accion secundaria/promocional, cyan para estado
                vivo y grises 0-9 para toda la estructura.
              </div>
            </div>
          </div>

          <div className="ui-stat-grid">
            <article className="ui-stat">
              <span className="ui-label">Primary</span>
              <strong>{darkTokens.color.semantic.action.primary.default}</strong>
              <p>Color tomado del boton Sign up del starter original.</p>
            </article>
            <article className="ui-stat">
              <span className="ui-label">Secondary</span>
              <strong>{darkTokens.color.semantic.action.secondary.default}</strong>
              <p>Acento amarillo para CTAs alternas, highlight y estados de marketing.</p>
            </article>
            <article className="ui-stat">
              <span className="ui-label">Scale</span>
              <strong>{grayScale.length} tonos</strong>
              <p>Escala de grises 0-9 para fondos, texto, bordes y jerarquia tonal.</p>
            </article>
          </div>
        </section>

        <section className="ui-section">
          <div className="ui-section__header">
            <div>
              <p className="ui-kicker">ui rules</p>
              <h2 className="ui-section__title">Reglas de diseño</h2>
            </div>
            <p className="ui-body ui-section__copy">
              Estas reglas son la base para nuevas pantallas del frontend. Si un caso no cabe aquí, primero se extiende el sistema y luego se
              implementa la vista.
            </p>
          </div>
          <div className="ui-rules-grid">
            <article className="ui-rule-card">
              <span className="ui-chip">01</span>
              <h3>Spacing en 8px</h3>
              <p>Ningun margin, padding o gap arbitrario. Todo sale de la escala 8-120 para mantener consistencia entre dashboard y formularios.</p>
            </article>
            <article className="ui-rule-card">
              <span className="ui-chip">02</span>
              <h3>Tonal layering</h3>
              <p>Separa paneles y cards por capas y elevacion. Evita cajas con borde duro como primera herramienta visual.</p>
            </article>
            <article className="ui-rule-card">
              <span className="ui-chip">03</span>
              <h3>Accion con semantica clara</h3>
              <p>Azul para la accion principal, amarillo para apoyo o promo, ghost para controles densos y cyan para feedback vivo.</p>
            </article>
          </div>
        </section>

        <section className="ui-section">
          <div className="ui-section__header">
            <div>
              <p className="ui-kicker">tokens</p>
              <h2 className="ui-section__title">Paletas</h2>
            </div>
          </div>

          <div className="ui-section">
            <p className="ui-label">blue scale</p>
            <div className="ui-token-grid">
              {blueScale.map(([name, value]) => (
                <Swatch key={name} name={`blue.${name}`} value={value} />
              ))}
            </div>
          </div>

          <div className="ui-section">
            <p className="ui-label">yellow scale</p>
            <div className="ui-token-grid">
              {yellowScale.map(([name, value]) => (
                <Swatch key={name} name={`yellow.${name}`} value={value} />
              ))}
            </div>
          </div>

          <div className="ui-section">
            <p className="ui-label">gray 0-9</p>
            <div className="ui-token-grid">
              {grayScale.map(([name, value]) => (
                <Swatch key={name} name={`gray.${name}`} value={value} />
              ))}
            </div>
          </div>
        </section>

        <section className="ui-section">
          <div className="ui-section__header">
            <div>
              <p className="ui-kicker">layout tokens</p>
              <h2 className="ui-section__title">Spacing, radius y elevacion</h2>
            </div>
          </div>

          <div className="ui-section">
            <p className="ui-label">spacing scale</p>
            <div className="ui-token-grid">
              {spacingScale.map(([name, value]) => (
                <SpaceToken key={name} name={name} value={value} />
              ))}
            </div>
          </div>

          <div className="ui-section">
            <p className="ui-label">radius scale</p>
            <div className="ui-token-grid">
              {radiusScale
                .filter(([, value]) => typeof value === 'number')
                .map(([name, value]) => (
                  <RadiusToken key={name} name={name} value={value} />
                ))}
            </div>
          </div>

          <div className="ui-section">
            <p className="ui-label">elevation levels</p>
            <div className="ui-elevation-grid">
              {elevationScale.map(([name, value]) => (
                <article key={name} className={`ui-elevation-card ui-elevation-card--${name}`}>
                  <span className="ui-chip">{name}</span>
                  <h3>{name === 'low' ? 'Low elevation' : name === 'mid' ? 'Mid elevation' : 'High elevation'}</h3>
                  <p>
                    {name === 'low'
                      ? 'Nivel base para cards discretas y paneles frecuentes.'
                      : name === 'mid'
                        ? 'Nivel recomendado por defecto para la mayoria de superficies.'
                        : 'Nivel maximo del sistema. Queda aproximadamente a la mitad de la sombra anterior de las cards.'}
                  </p>
                  <span className="ui-token-value">{String(value)}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ui-section">
          <div className="ui-section__header">
            <div>
              <p className="ui-kicker">components</p>
              <h2 className="ui-section__title">Componentes reusables</h2>
            </div>
            <a className="ui-inline-link" href="/design-system">
              Alias disponible en /design-system
            </a>
          </div>

          <div className="ui-components-grid">
            <div className="ui-showcase-card">
              <p className="ui-label">buttons</p>
              <h3>Jerarquia de CTA</h3>
              <div className="ui-button-row">
                <UIButton variant="primary">Primary</UIButton>
                <UIButton variant="secondary">Secondary</UIButton>
                <UIButton variant="ghost">Ghost</UIButton>
                <UIButton variant="danger">Danger</UIButton>
              </div>
            </div>

            <div className="ui-showcase-card">
              <p className="ui-label">form controls</p>
              <h3>Inputs base</h3>
              <div className="ui-field-stack">
                <UIField label="Nombre del evento" placeholder="ViralCo Launch Bogotá" hint="Campo base para formularios del admin." />
                <UIField label="Copy del deliverable" multiline placeholder="Comparte tu video del evento con un solo link." />
              </div>
            </div>
          </div>

          <div className="ui-section">
            <p className="ui-label">cards</p>
            <div className="ui-card-grid">
              <UICard
                eyebrow="live delivery"
                title="Card analitica"
                body="Surface principal para modulos de dashboard, metricas y resumenes operativos."
              />
              <UICard
                eyebrow="interactive"
                title="Card seleccionable"
                body="Usala para eventos, assets o lotes navegables cuando el usuario necesita explorar contenido."
                interactive
              />
              <UICard
                eyebrow="marketing ops"
                title="Card promocional"
                body="Sirve para destacar upgrades, configuraciones clave o llamadas a la accion dentro del panel."
              >
                <div className="ui-actions">
                  <UIButton variant="secondary" size="sm">Activar</UIButton>
                </div>
              </UICard>
              <UICard
                eyebrow="asset delivery"
                title="Card media reusable"
                body="Base para items del uploader, galerias operativas y modulos con preview embebido."
                headerAside={<span className="ui-chip">Live</span>}
                media={<div className="ui-card-media-demo">Asset preview</div>}
                actions={
                  <>
                    <UIButton variant="primary" size="sm">Descargar</UIButton>
                    <UIButton variant="secondary" size="sm">Ver</UIButton>
                    <UIButton variant="danger" size="sm">Eliminar</UIButton>
                  </>
                }
              >
                <p className="ui-card__body">video/mp4</p>
              </UICard>
            </div>
          </div>

          <div className="ui-section">
            <p className="ui-label">accordion</p>
            <UIAccordion items={accordionItems} />
          </div>

          <div className="ui-section">
            <p className="ui-label">modal</p>
            <div className="ui-showcase-card">
              <h3>Preview modal</h3>
              <p>Patron reusable para ver videos o imagenes sin salir del flujo de trabajo.</p>
              <div className="ui-actions">
                <UIButton variant="ghost" onClick={() => setIsPreviewOpen(true)}>Trigger example</UIButton>
              </div>
            </div>
            <PreviewModal
              open={isPreviewOpen}
              onClose={() => setIsPreviewOpen(false)}
              title="Vista previa del asset"
              mediaType="video/mp4"
              mediaUrl="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
