import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#2d2d35',
      paper: '#303038'
    },
    primary: {
      main: '#7ac6c3',
      dark: '#41b3a3'
    },
    secondary: {
      main: '#e8a87c',
      dark: '#e27d60'
    },
    tertiary: {
      main: '#ffcdd2',
      dark: '#eec5de'
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;