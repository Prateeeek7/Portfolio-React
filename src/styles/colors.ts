// Design Color System - Modern Cockpit Dashboard theme
export const colors = {
  // Accent colors
  accent: {
    cyan: '#00E5FF',       // Neon Cyan
    teal: '#00BFA5',       // Neon Teal
    purple: '#D500F9',     // Neon Purple
    blue: '#2979FF',       // Neon Blue
    green: '#00E676',      // Neon Green
    orange: '#FF9100',     // Neon Orange
  },
  // Neutrals
  neutral: {
    white: '#FFFFFF',
    light: '#F4F4F6',
    gray: '#8E8E93',
    dark: '#121215',
    black: '#000000',
  },
  // Gradients
  gradients: {
    hero: 'linear-gradient(135deg, #00E5FF 0%, #2979FF 50%, #D500F9 100%)',
    border: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(213, 0, 249, 0.2) 100%)',
    hud: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
  }
} as const;

export const theme = {
  light: {
    bg: '#F4F4F6',
    bgSecondary: '#FFFFFF',
    text: '#121215',
    textSecondary: '#636366',
    border: '#E5E5EA',
    accent: '#2979FF',
    gridColor: 'rgba(0, 0, 0, 0.03)',
  },
  dark: {
    bg: '#000000',
    bgSecondary: '#0A0A0C',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#1C1C1E',
    accent: '#00E5FF',
    gridColor: 'rgba(255, 255, 255, 0.02)',
  },
} as const;
