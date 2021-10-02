import { Box, Typography } from '@material-ui/core';
import React from 'react';

export const Transaction = ({ trx }) => (
  <Box display='flex' flexDirection='row'>
    <Box flexGrow={2} >
      <Typography>{trx.name}</Typography>
    </Box>
    <Box color={trx.income_amount ? 'primary.dark' : 'secondary.dark'} flexGrow={1} textAlign='right'>
      <Typography>${trx.expense_amount || trx.income_amount}</Typography>
    </Box>
  </Box>
)