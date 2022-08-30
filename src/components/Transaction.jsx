import { Box, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { formatDollarUS } from '../utils/helpers';

export const Transaction = ({ trx, ...props }) => {
  const desktop = useMediaQuery(theme => theme.breakpoints.up('md'))

  const styles = makeStyles(theme => ({
    name: {
      [theme.breakpoints.down('md')]: {
        flexGrow: 1
      },
      [theme.breakpoints.up('md')]: {
        flexBasis: '40%',
        flexShrink: 0,
      }
    },
    category: {
      flexBasis: '20%',
      flexShrink: 0,
      color: '#C0C0C0',  },
    description: {
      flexBasis: '30%',
      flexShrink: 0,
      color: '#C0C0C0',
    },
    amount: {
      [theme.breakpoints.down('md')]: {
        flexGrow: 1
      },
      [theme.breakpoints.up('md')]: {
        flexBasis: '10%',
        flexShrink: 0,
      },
      textAlign: 'right',
    }
  }))

  const classes = styles()
  
  return (
    <Box display='flex' flexDirection='row' {...props}>
      <Box className={classes.name}>
        <Typography>{trx.name}</Typography>
      </Box>
      {desktop && (
        <Box className={classes.category}>
          <Typography>{trx.expense_category || trx.income_category}</Typography>
        </Box>
      )}
      {desktop && (
        <Box className={classes.description}>
          <Typography>{trx.description}</Typography>
        </Box>
      )}
      <Box className={classes.amount} color={trx.income_amount ? 'primary.dark' : 'secondary.dark'}>
        <Typography>{formatDollarUS(trx.expense_amount || trx.income_amount)}</Typography>
      </Box>
    </Box>
  )
}