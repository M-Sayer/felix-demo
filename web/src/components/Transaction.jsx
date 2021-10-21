import { Box, Typography, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { useAccordionStyles } from '../utils/sharedClasses';

export const Transaction = ({ trx }) => {
  const classes = useAccordionStyles()
  const desktop = useMediaQuery(theme => theme.breakpoints.up('md'))
  
  return (
    <Box display='flex' flexDirection='row'>
      <Box className={classes.header}>
        <Typography>{trx.name}</Typography>
      </Box>
      {desktop && (
        <Box className={classes.subHeader}>
          <Typography>{trx.expense_category || trx.income_category}</Typography>
        </Box>
      )}
      {desktop && (
        <Box className={classes.subHeader}>
          <Typography>{trx.description}</Typography>
        </Box>
      )}
      <Box className={classes.amount} color={trx.income_amount ? 'primary.dark' : 'secondary.dark'}>
        <Typography>${trx.expense_amount || trx.income_amount}</Typography>
      </Box>
    </Box>
  )
}