import { Box, Typography } from '@material-ui/core';
import React from 'react';

export const Goal = props => (
  <Box display='flex' flexDirection='row'>
    <Box flexGrow={2} >
      <Typography>{props.goal.name}</Typography>
    </Box>
    <Box color='tertiary.main' flexGrow={1} textAlign='right'>
      <Typography>${props.goal.current_amount}</Typography>
    </Box>
  </Box>
)