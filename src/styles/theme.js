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
    navy900: '#0B1526', // deepest ink — sidebar background
    navy800: '#12203D', // sidebar surface / headers
    navy700: '#1B2A4A', // hover / active surfaces on dark
    navy600: '#2E4270', // borders on dark surfaces
    gold500: '#D9A441', // primary accent — compass gold
    gold600: '#BF8B2C',
    teal500: '#2F8F86', // confirmed / success / booked
    coral500: '#D6604F', // alerts / overdue / at-risk
    ink900: '#161B2C', // primary text
    ink600: '#5B6479', // secondary text
    ink400: '#8B93A7', // muted / placeholder text
    line200: '#E6E9F0', // hairline borders
    surface0: '#F5F6FA', // app background
    surface1: '#FFFFFF', // card / paper surface
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
        root: { borderRadius: tokens.radius.sm, boxShadow: 'none' },
        containedPrimary: {
          '&:hover': { boxShadow: 'none' },
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
          boxShadow: 'none',
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
        },
      },
    },
  },
});

export default theme;
