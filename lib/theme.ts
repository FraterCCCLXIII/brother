export const theme = {
  colors: {
    bg: '#FFFFFF',
    card: '#F8F9FA',
    text: '#000000',
    sub: '#6C757D',
    accent: '#000000',
    danger: '#DC3545',
    border: '#E9ECEF',
    input: '#F8F9FA',
    button: '#000000',
    buttonText: '#FFFFFF',
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
