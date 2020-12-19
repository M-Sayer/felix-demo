import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import moment from 'moment';

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

const Summary = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: 10,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
}))(AccordionSummary);

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
      <AccordionDetails>
        <Box display='flex' flexDirection='column'>
          <Box flexDirection='row'>
            <Typography flexGrow={2} display='inline'>Goal Amount: </Typography>
            <Typography flexGrow={1} display='inline'>${goal.goal_amount}</Typography>
          </Box>
          <Box flexDirection='row'>
            <Typography display='inline'>End Date: </Typography>
            <Typography display='inline'>{console.log(moment(goal.end_date, 'MM-DD-YYYY', true))}</Typography>
          </Box>
          <Box flexDirection='row'>
            <Typography display='inline'>Weekly Contribution Amount:</Typography>
            <Typography display='inline'>{goal.contribution_amount}</Typography>
          </Box>
        </Box>
      </AccordionDetails>
    </List>
  ));
}