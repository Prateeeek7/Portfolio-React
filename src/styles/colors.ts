// Unique Color Palette - Modern & Vibrant
export const colors = {
  // Primary gradient colors
  primary: {
    light: '#FF6B6B',      // Coral Red
    main: '#E63946',       // Vibrant Red
    dark: '#C1121F',       // Deep Red
  },
  // Secondary gradient colors
  secondary: {
    light: '#4ECDC4',      // Turquoise
    main: '#06A77D',       // Teal
    dark: '#048A68',       // Dark Teal
  },
  // Accent colors
  accent: {
    purple: '#9B59B6',     // Purple
    orange: '#FF8C42',     // Orange
    yellow: '#FFD93D',     // Yellow
    blue: '#4A90E2',       // Blue
  },
  // Neutral colors
  neutral: {
    white: '#FFFFFF',
    light: '#F8F9FA',
    gray: '#6C757D',
    dark: '#212529',
    black: '#000000',
  },
  // Background gradients
  gradients: {
    hero: 'linear-gradient(135deg, #E63946 0%, #06A77D 50%, #4A90E2 100%)',
    card: 'linear-gradient(135deg, rgba(230, 57, 70, 0.1) 0%, rgba(6, 167, 125, 0.1) 100%)',
    skill: 'linear-gradient(90deg, #E63946 0%, #06A77D 100%)',
    button: 'linear-gradient(135deg, #E63946 0%, #FF6B6B 100%)',
  },
} as const;

export const theme = {
  light: {
    bg: colors.neutral.white,
    bgSecondary: colors.neutral.light,
    text: colors.neutral.dark,
    textSecondary: colors.neutral.gray,
    border: '#E0E0E0',
  },
  dark: {
    bg: '#0F0F1E',
    bgSecondary: '#1A1A2E',
    text: colors.neutral.white,
    textSecondary: '#B0B0B0',
    border: '#2A2A3E',
  },
} as const;




