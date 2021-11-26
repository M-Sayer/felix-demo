import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#2d2d35',
      paper: '#303038',
    },
    primary: {
      main: '#7ac6c3', // balance
      dark: '#41b3a3', // allowance
    },
    secondary: {
      main: '#e8a87c', // Transac
      dark: '#e27d60', // Purchases
    },
    tertiary: {
      main: '#ffcdd2', //Pink
      dark: '#eec5de', // goals
    },
  },
  typography: {
    fontFamily: 'Roboto Condensed',
    money: {
      fontFamily: 'Roboto Slab',
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;