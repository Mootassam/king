import React from 'react';
import { useTheme } from 'src/modules/theme/themeContext';

interface Props {
  className?: string;
}

// Sun/moon switch used to toggle light/dark mode. Self-contained styling so
// it can be dropped into any header/toolbar without extra setup.
function ThemeToggle({ className }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={`kt-theme-toggle ${className || ''}`}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <i className={isDark ? 'fas fa-moon' : 'fas fa-sun'} />

      <style>{`
        .kt-theme-toggle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--kt-border);
          background: var(--kt-bg-card-alt);
          color: var(--kt-text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          cursor: pointer;
          transition: 0.2s;
          flex-shrink: 0;
        }
        .kt-theme-toggle:hover {
          border-color: #106cf5;
          color: #106cf5;
        }
      `}</style>
    </button>
  );
}

export default ThemeToggle;
