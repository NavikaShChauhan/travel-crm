import { createTheme } from '@mui/material/styles';

/**
 * Design tokens
 * -----------------------------------------------------------------------
 * Modern Vibrant Purple & Clean Slate SaaS Theme (inspired by modern studio dashboards)
 * Main Brand Color: Vibrant Violet / Indigo Gradient (#6366F1 -> #8B5CF6)
 * Canvas Background: Soft Lavender Gray (#F4F5FB)
 * Sidebar Background: Clean White (#FFFFFF) with Rounded Violet Active Pills
 */
export const tokens = {
  color: {
    purple600: '#6366F1', // primary violet/indigo
    purple700: '#8B5CF6', // vivid purple
    purple800: '#7C3AED', // deep purple
    purple100: '#F3E8FF', // light purple pastel
    purple50: '#F5F3FF',
    accentPink: '#EC4899',
    accentTeal: '#14B8A6',
    accentOrange: '#F97316',
    ink900: '#0F172A', // primary dark heading
    ink700: '#334155', // body text
    ink500: '#64748B', // muted secondary text
    line200: '#F1F5F9', // subtle dividers
    line300: '#E2E8F0', // card borders
    surface0: '#F4F5FB', // main app canvas background
    surface1: '#FFFFFF', // card / panel surface background
  },
  font: {
    display: '"Plus Jakarta Sans", "Inter", sans-serif',
    body: '"Plus Jakarta Sans", "Inter", sans-serif',
    mono: '"IBM Plex Mono", monospace',
  },
  radius: {
    sm: 8,
    md: 14,
    lg: 20,
    xl: 24,
  },
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: tokens.color.purple700,
      light: tokens.color.purple600,
      dark: tokens.color.purple800,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: tokens.color.accentPink,
      contrastText: '#FFFFFF',
    },
    success: { main: '#10B981', light: '#DCFCE7' },
    warning: { main: '#F59E0B', light: '#FEF3C7' },
    error: { main: '#EF4444', light: '#FEE2E2' },
    info: { main: '#0284C7', light: '#E0F2FE' },
    background: {
      default: tokens.color.surface0,
      paper: tokens.color.surface1,
    },
    text: {
      primary: tokens.color.ink900,
      secondary: tokens.color.ink500,
      disabled: '#94A3B8',
    },
    divider: tokens.color.line200,
  },
  shape: {
    borderRadius: tokens.radius.md,
  },
  typography: {
    fontFamily: tokens.font.body,
    h1: { fontFamily: tokens.font.display, fontWeight: 800, letterSpacing: '-0.02em', color: tokens.color.ink900 },
    h2: { fontFamily: tokens.font.display, fontWeight: 800, letterSpacing: '-0.02em', color: tokens.color.ink900 },
    h3: { fontFamily: tokens.font.display, fontWeight: 700, letterSpacing: '-0.01em', color: tokens.color.ink900 },
    h4: { fontFamily: tokens.font.display, fontWeight: 700, color: tokens.color.ink900 },
    h5: { fontFamily: tokens.font.display, fontWeight: 700, color: tokens.color.ink900 },
    h6: { fontFamily: tokens.font.display, fontWeight: 700, color: tokens.color.ink900 },
    subtitle1: { fontFamily: tokens.font.body, fontWeight: 600, color: tokens.color.ink900 },
    subtitle2: { fontFamily: tokens.font.body, fontWeight: 600, color: tokens.color.ink500 },
    body1: { fontFamily: tokens.font.body, color: tokens.color.ink700 },
    body2: { fontFamily: tokens.font.body, color: tokens.color.ink700 },
    button: { fontFamily: tokens.font.body, fontWeight: 700, textTransform: 'none' },
    overline: {
      fontFamily: tokens.font.mono,
      letterSpacing: '0.08em',
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: tokens.color.surface0,
          fontFamily: tokens.font.body,
          color: tokens.color.ink700,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: 700,
          padding: '8px 18px',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
          color: '#FFFFFF',
          boxShadow: '0 4px 14px rgba(139, 92, 246, 0.25)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            boxShadow: '0 6px 18px rgba(139, 92, 246, 0.35)',
          },
        },
        outlined: {
          backgroundColor: '#FFFFFF',
          borderColor: tokens.color.line300,
          color: tokens.color.ink700,
          '&:hover': {
            borderColor: tokens.color.purple700,
            backgroundColor: '#F8FAFC',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${tokens.color.line200}`,
          borderRadius: tokens.radius.lg,
          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.04)',
          backgroundColor: tokens.color.surface1,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 700, borderRadius: 20 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: `1px solid ${tokens.color.line200}`,
          backgroundColor: tokens.color.surface1,
        },
      },
    },
  },
});

export default theme;
