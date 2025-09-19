//
// PUBLIC INTERFACE: Theme tokens and helpers for the Elegant Rose Gold theme
//

// PUBLIC_INTERFACE
export const themeTokens = {
  name: "Rose Gold",
  description: "Soft rose & warm gold tones",
  colors: {
    primary: "#F472B6", // Rose
    primaryDark: "#DB2777",
    secondary: "#F59E0B", // Warm gold
    secondaryDark: "#B45309",
    success: "#10B981",
    error: "#EF4444",
    background: "#FDF2F8", // Rose-50 background
    surface: "#FFFFFF",
    text: "#374151", // Gray-700
    textMuted: "rgba(55, 65, 81, 0.7)",
    border: "rgba(55, 65, 81, 0.12)",
    shadow: "rgba(0,0,0,0.08)",
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "18px",
    xl: "24px",
    pill: "9999px",
  },
  spacing: {
    xs: "6px",
    sm: "10px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  shadow: {
    sm: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    md: "0 4px 10px rgba(0,0,0,0.08)",
    lg: "0 10px 24px rgba(0,0,0,0.10)",
  },
};

// PUBLIC_INTERFACE
export function applyCssVariables(root = document.documentElement) {
  /**
   * Apply CSS variables to the :root for the Rose Gold theme.
   * This enables styling via var(--color-*) references throughout CSS.
   */
  const c = themeTokens.colors;
  const r = themeTokens.radius;
  const s = themeTokens.spacing;

  root.style.setProperty("--color-primary", c.primary);
  root.style.setProperty("--color-primary-dark", c.primaryDark);
  root.style.setProperty("--color-secondary", c.secondary);
  root.style.setProperty("--color-secondary-dark", c.secondaryDark);
  root.style.setProperty("--color-success", c.success);
  root.style.setProperty("--color-error", c.error);
  root.style.setProperty("--color-bg", c.background);
  root.style.setProperty("--color-surface", c.surface);
  root.style.setProperty("--color-text", c.text);
  root.style.setProperty("--color-text-muted", c.textMuted);
  root.style.setProperty("--color-border", c.border);
  root.style.setProperty("--color-shadow", c.shadow);

  root.style.setProperty("--radius-sm", r.sm);
  root.style.setProperty("--radius-md", r.md);
  root.style.setProperty("--radius-lg", r.lg);
  root.style.setProperty("--radius-xl", r.xl);
  root.style.setProperty("--radius-pill", r.pill);

  root.style.setProperty("--space-xs", s.xs);
  root.style.setProperty("--space-sm", s.sm);
  root.style.setProperty("--space-md", s.md);
  root.style.setProperty("--space-lg", s.lg);
  root.style.setProperty("--space-xl", s.xl);
  root.style.setProperty("--space-xxl", s.xxl);
}

// PUBLIC_INTERFACE
export function getGradient(style = "subtle") {
  /**
   * Return gradient strings aligned with the Elegant Rose Gold palette.
   * subtle: very soft pastel blend
   * vivid: more pronounced rose-gold blend
   */
  if (style === "vivid") {
    return `linear-gradient(135deg, rgba(244,114,182,0.20), rgba(245,158,11,0.20))`;
  }
  return `linear-gradient(135deg, #FFF1F5, #F5F3FF)`; // from-rose-50 to-purple-50
}
