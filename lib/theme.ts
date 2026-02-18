/**
 * Theme utilities and CSS variable generation
 * Maps brand colors to CSS custom properties for use in Tailwind
 */

export function generateThemeVariables(colors: {
  primary: string;
  secondary?: string;
  accent?: string;
}) {
  return `
    --color-primary: ${colors.primary};
    --color-secondary: ${colors.secondary || colors.primary};
    --color-accent: ${colors.accent || colors.primary};
  `.trim();
}

/**
 * Convert hex to HSL for Tailwind CSS variables
 */
export function hexToHSL(hex: string): string {
  // Remove # if present
  hex = hex.replace(/^#/, "");

  // Parse hex
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}
