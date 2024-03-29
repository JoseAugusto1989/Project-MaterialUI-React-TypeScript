import { createTheme } from '@mui/material';
import { cyan, green, red } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: green[700],
      dark: green[800],
      light: green[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#ffffff',
    },
    warning: {
      main: red[500],
      dark: red[400],
      light: red[300],
      contrastText: '#ffffff',
    },
    background: {
      default: '#303134',
      paper: '#202124',
    },
  },
  typography: {
    allVariants: {
      color: 'white',
    }
  },
});
