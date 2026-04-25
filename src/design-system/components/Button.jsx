export default function UIButton({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
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
    <button type={props.type ?? 'button'} className={classes} {...props}>
      {children}
    </button>
  );
}
