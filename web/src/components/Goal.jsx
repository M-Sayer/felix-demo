import { Box, Typography } from '@material-ui/core';
import React from 'react';

export const Goal = ({ goal }) => (
  <Box display='flex' flexDirection='row'>
    <Box flexGrow={2} >
      <Typography>{goal.name}</Typography>
    </Box>
    <Box color='tertiary.main' flexGrow={1} textAlign='right'>
      <Typography>${goal.current_amount}</Typography>
    </Box>
  </Box>
)