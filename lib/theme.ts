export const theme = {
  colors: {
    bg: '#0B0B0F',
    card: '#111216',
    text: '#F2F2F7',
    sub: '#A1A1AA',
    accent: '#4ADE80',
    danger: '#F87171',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
  },
} as const;

export type Theme = typeof theme;
