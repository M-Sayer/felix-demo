import { makeStyles } from "@material-ui/core";

export const useAccordionStyles = makeStyles(theme => ({
  header: {
    [theme.breakpoints.down('md')]: {
      flexGrow: 1
    },
    [theme.breakpoints.up('md')]: {
      flexBasis: '40%',
      flexShrink: 0,
    }
  },
  subHeader: {
    flexBasis: '20%',
    flexShrink: 0,
    color: '#C0C0C0',
  },
  amount: {
    [theme.breakpoints.down('md')]: {
      flexGrow: 1
    },
    [theme.breakpoints.up('md')]: {
      flexBasis: '20%',
      flexShrink: 0,
    },
    textAlign: 'right',
  }
}))