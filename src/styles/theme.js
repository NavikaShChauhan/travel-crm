import { createTheme } from '@mui/material/styles';

/**
 * Design tokens
 * -----------------------------------------------------------------------
 * Voyage — Travel CRM design language.
 * Palette is built around "waypoint navy" (deep, chart-room blue) with a
 * single warm "compass gold" accent used sparingly for active states,
 * key actions, and data highlights. A cool teal is reserved for
 * positive/confirmed states (booked, paid, completed) to keep gold
 * meaningful rather than decorative.
 */
export const tokens = {
  color: {
    navy900: '#223559', // sidebar background
    navy800: '#31446E', // sidebar hover / active state
    navy700: '#31446E', // reused for active nav highlight
    navy600: '#475569', // navigation icon default / muted dark text
    gold500: '#D49A15', // kept as a muted semantic accent only if required elsewhere
    gold600: '#BF8B2C',
    teal500: '#2F8F86', // semantic success / confirmed states
    coral500: '#D6604F', // semantic warning / error 
    ink900: '#1F2937', // topbar text / primary dark gray
    ink600: '#475569', // topbar icon color / secondary text
    ink400: '#64748B', // muted text
    line200: '#E5E7EB', // borders / subtle dividers
    surface0: '#F0F1F9', // main app background
    surface1: '#FFFFFF', // card / table header / panel surface
  },
  font: {
    display: '"Space Grotesk", "Inter", sans-serif',
    body: '"Inter", "Helvetica Neue", sans-serif',
    mono: '"IBM Plex Mono", "SFMono-Regular", monospace',
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 16,
  },
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: tokens.color.navy800,
      light: tokens.color.navy700,
      dark: tokens.color.navy900,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: tokens.color.gold500,
      dark: tokens.color.gold600,
      contrastText: tokens.color.navy900,
    },
    success: { main: tokens.color.teal500 },
    error: { main: tokens.color.coral500 },
    background: {
      default: tokens.color.surface0,
      paper: tokens.color.surface1,
    },
    text: {
      primary: tokens.color.ink900,
      secondary: tokens.color.ink600,
      disabled: tokens.color.ink400,
    },
    divider: tokens.color.line200,
  },
  shape: {
    borderRadius: tokens.radius.md,
  },
  typography: {
    fontFamily: tokens.font.body,
    h1: { fontFamily: tokens.font.display, fontWeight: 600, letterSpacing: '-0.02em' },
    h2: { fontFamily: tokens.font.display, fontWeight: 600, letterSpacing: '-0.02em' },
    h3: { fontFamily: tokens.font.display, fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontFamily: tokens.font.display, fontWeight: 600 },
    h5: { fontFamily: tokens.font.display, fontWeight: 600 },
    h6: { fontFamily: tokens.font.display, fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500, color: tokens.color.ink600 },
    button: { fontWeight: 600, textTransform: 'none' },
    overline: {
      fontFamily: tokens.font.mono,
      letterSpacing: '0.08em',
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: tokens.color.surface0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.sm,
          boxShadow: 'none',
          textTransform: 'none',
        },
        containedPrimary: {
          bgcolor: tokens.color.navy900,
          color: '#FFFFFF',
          '&:hover': {
            bgcolor: tokens.color.navy800,
            boxShadow: 'none',
          },
        },
        outlined: {
          bgcolor: '#FFFFFF',
          borderColor: '#D1D5DB',
          color: tokens.color.navy900,
          '&:hover': {
            borderColor: tokens.color.navy800,
            bgcolor: '#F8FAFC',
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
          borderRadius: tokens.radius.md,
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)',
          backgroundColor: tokens.color.surface1,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
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
