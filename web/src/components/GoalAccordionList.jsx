import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import moment from 'moment';
import { DeleteButton, EditButton } from './Buttons';

const List = withStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1),
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      marginBottom: theme.spacing(1),
    },
  },
  expanded: {},
}))(Accordion);

export const GoalAccordionList = ({ goals }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = idx => {
    setExpanded(expanded === idx ? false : idx);
  };

  return goals.map((goal, idx) => (
    <List marginBottom={2} key={idx} expanded={expanded === idx} onChange={() => handleChange(idx)}>
      <AccordionSummary flexDirection='row'>
          <Box flexGrow={2} >
            <Typography>{goal.name}</Typography>
          </Box>
          <Box color='tertiary.main' flexGrow={1} textAlign='right'>
            <Typography>${goal.current_amount}</Typography>
          </Box>
      </AccordionSummary>
      <AccordionDetails flexDirection='column'>
        <Grid
          container
          direction='row'
          spacing={2}
        >
          <Grid item xs={12} md={6}> 
            <Box display='flex' flexDirection='column'>
              <Box flexDirection='row'>
                <Typography flexGrow={2} display='inline'>Goal Amount: </Typography>
                <Typography flexGrow={1} display='inline'>${goal.goal_amount}</Typography>
              </Box>
              <Box flexDirection='row'>
                <Typography display='inline'>End Date: </Typography>
                <Typography display='inline'>{moment(goal.end_date).format('MM/DD/YYYY')}</Typography>
              </Box>
              <Box flexDirection='row'>
                <Typography display='inline'>Weekly Contribution Amount: </Typography>
                <Typography display='inline'>{goal.contribution_amount}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display='flex' flexDirection='row' justifyContent='space-evenly'>
              <EditButton />
              <DeleteButton />
            </Box>
          </Grid>
        </Grid>
      </AccordionDetails>
    </List>
  ));
}