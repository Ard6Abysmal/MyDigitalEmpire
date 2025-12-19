export const getThemeClasses = (isDark) => ({
  bg: isDark ? 'bg-true-black' : 'bg-light-bg',
  bgSecondary: isDark ? 'bg-dark-bg' : 'bg-light-surface',
  bgSurface: isDark ? 'bg-dark-surface' : 'bg-light-surface',
  text: isDark ? 'text-empire-text' : 'text-light-text',
  textMuted: isDark ? 'text-text-muted' : 'text-light-muted',
  border: isDark ? 'border-dark-border' : 'border-light-border',
});
