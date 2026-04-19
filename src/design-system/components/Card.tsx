import type { PropsWithChildren, ReactNode } from 'react';

interface UICardProps {
  actions?: ReactNode;
  eyebrow?: string;
  body: string;
  className?: string;
  headerAside?: ReactNode;
  interactive?: boolean;
  media?: ReactNode;
  title: string;
}

export default function UICard({
  actions,
  eyebrow,
  title,
  body,
  className,
  headerAside,
  interactive = false,
  media,
  children,
}: PropsWithChildren<UICardProps>) {
  const classes = ['ui-card', interactive ? 'ui-card--interactive' : '', className ?? ''].filter(Boolean).join(' ');

  return (
    <article className={classes}>
      {media ? <div className="ui-card__media-shell">{media}</div> : null}
      <div className="ui-card__content">
        {(eyebrow || headerAside) ? (
          <div className="ui-card__header">
            {eyebrow ? <span className="ui-chip">{eyebrow}</span> : <span />}
            {headerAside}
          </div>
        ) : null}
        <h3 className="ui-card__title">{title}</h3>
        <p className="ui-card__body">{body}</p>
        {children}
        {actions ? <div className="ui-card__actions">{actions}</div> : null}
      </div>
    </article>
  );
}
