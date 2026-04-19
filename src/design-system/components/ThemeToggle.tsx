import { useTheme } from '../theme.tsx';

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="M4.93 4.93l1.41 1.41" />
        <path d="M17.66 17.66l1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="M4.93 19.07l1.41-1.41" />
        <path d="M17.66 6.34l1.41-1.41" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.4 13.7A8.8 8.8 0 0 1 19 14c-5 0-9-4-9-9 0-.8.1-1.6.3-2.4.1-.3 0-.7-.3-1-.3-.3-.6-.4-1-.3A11 11 0 1 0 22.6 15c.1-.3 0-.7-.3-1-.3-.3-.6-.4-.9-.3Z"
      />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="ui-theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      title={isDark ? 'Tema claro' : 'Tema oscuro'}
    >
      <span className="ui-theme-toggle__icon">{isDark ? <SunIcon /> : <MoonIcon />}</span>
      <span className="ui-theme-toggle__label">{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
