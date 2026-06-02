"use client";

// The theme state + toggleTheme() global live in the root layout's inline script
// (faithful to PHP). This is just the button that calls it.
declare global {
  interface Window {
    toggleTheme?: () => void;
  }
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => window.toggleTheme?.()}
      aria-label="Toggle dark mode"
      title="Toggle theme"
    >
      <span className="icon-moon">🌙</span>
      <span className="icon-sun">☀️</span>
    </button>
  );
}
