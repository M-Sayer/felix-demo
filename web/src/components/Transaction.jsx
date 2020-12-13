import { Box, Typography } from '@material-ui/core';
import React from 'react';

export const Transaction = props => (
  <Box display='flex' flexDirection='row'>
    <Box flexGrow={2} >
      <Typography>{props.trx.name}</Typography>
    </Box>
    <Box color={props.trx.income_amount ? 'primary.dark' : 'secondary.dark'} flexGrow={1} textAlign='right'>
      <Typography>${props.trx.expense_amount || props.trx.income_amount}</Typography>
    </Box>
  </Box>
)