import { UIButton, UICard } from '../design-system/components/index.js';
import styles from './HelloPage.module.scss';

export default function HelloPage() {
  return (
    <main className={`ui-page ${styles.page}`}>
      <div className="ui-page__inner">
        <section className={`ui-shell ${styles.shell}`}>
          <p className="ui-kicker">ViralCo Branding</p>
          <h1 className="ui-title">Hola Mundo</h1>
          <p className="ui-copy">
            Este es el nuevo frontend base de ViralCo con React + Vite 6, React Router y CSS Modules con SCSS.
          </p>
          <div className={styles.actions}>
            <UIButton size="lg">Comenzar</UIButton>
            <UIButton variant="ghost" size="lg">Ver roadmap</UIButton>
            <UIButton variant="secondary" size="lg" href="/ui-components">System Design</UIButton>
          </div>

          <div className={styles.cards}>
            <UICard
              eyebrow="FASE 0"
              title="Stack definido"
              body="Arquitectura de frontend definida para construir sobre una base limpia."
            />
            <UICard
              eyebrow="READY"
              title="Un solo punto de entrada"
              body="Ruta unica para arrancar implementacion sin deuda heredada de la prueba anterior."
            />
          </div>
        </section>
      </div>
    </main>
  );
}
