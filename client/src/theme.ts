import { createTheme } from '@mui/material/styles';

export const themeSettings = (): object => {
  const breakpoints = {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  };
  return {
    palette: {
      primary: { main: '#1E88E5' },
      secondary: { main: '#f5f6f5' },
      background: {
        default: '#f5f6f5',
        paper: '#fff',
      },
    },
    breakpoints,
    typography: {
      fontSize: 22,
      h1: {
        fontSize: 30,
      },
      h2: {
        fontSize: 32,
      },
      h3: {
        fontSize: 24,
      },
      h4: {
        fontSize: '3.4rem',
        fontWeight: 400,
      },
      h5: {
        fontSize: '2.2rem',
        fontWeight: 400,
      },
      h6: {
        fontSize: '2rem',
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontSize: '1.5rem',
            height: '4.2rem',
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: '1.2rem',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontSize: '1.6rem',
          },
        },
      },
    },
  };
};
type Theme = ReturnType<typeof createTheme>;
export function useMode(): [Theme] {
  const theme = createTheme(themeSettings());
  return [theme];
}
