import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type SharedButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type UIButtonAsButtonProps = SharedButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

type UIButtonAsAnchorProps = SharedButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

type UIButtonProps = UIButtonAsButtonProps | UIButtonAsAnchorProps;

export default function UIButton({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: PropsWithChildren<UIButtonProps>) {
  const sizeClass = size === 'lg' ? 'ui-btn--large' : size === 'sm' ? 'ui-btn--small' : '';
  const classes = ['ui-btn', `ui-btn--${variant}`, sizeClass, className].filter(Boolean).join(' ');

  if ('href' in props && props.href) {
    return (
      <a className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
