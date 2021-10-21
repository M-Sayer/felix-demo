import React from 'react';
import { Box, Typography, useMediaQuery } from '@material-ui/core';
import dayjs from 'dayjs'
import { useAccordionStyles } from '../utils/sharedClasses';

export const Goal = ({ goal }) => {
  const classes = useAccordionStyles()
  const desktop = useMediaQuery(theme => theme.breakpoints.up('md'))

  return (
    <Box display='flex' flexDirection='row'>
      <Box className={classes.header}>
        <Typography>{goal.name}</Typography>
      </Box>
      {desktop && (
        <Box className={classes.subHeader} textAlign='center'>
          <Typography>{dayjs(goal.end_date).format('MM/DD/YYYY')}</Typography>
        </Box>
      )}
      {desktop && (
        <Box className={classes.subHeader} textAlign='center'>
          <Typography>{goal.contribution_amount}</Typography>
        </Box>
      )}
      <Box className={classes.amount} color='tertiary.main'>
        <Typography>${goal.current_amount}</Typography>
      </Box>
    </Box>
  )
}