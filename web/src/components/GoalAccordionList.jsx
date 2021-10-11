import { 
  Accordion, 
  AccordionDetails, 
  AccordionSummary, 
  Box, 
  Button, 
  Dialog, 
  DialogTitle, 
  Grid, 
  Typography, 
  withStyles 
} from '@material-ui/core';
import React, { useState, useContext } from 'react';
import moment from 'moment';
import { DeleteButton, EditButton } from './UI/Buttons'
import { GoalsContext } from '../contexts/GoalsContext';
import GoalsService from '../services/goals-service';

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
  const [dialog, setDialog] = useState(false);
  const GoalCtx = useContext(GoalsContext);

  const handleChange = idx => {
    setExpanded(expanded === idx ? false : idx);
  };

  return goals.map((goal, idx) => (
    <List marginBottom={2} key={idx} expanded={expanded === goal.id} onChange={() => handleChange(goal.id)}>
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
              <EditButton onClick={() => {
                GoalCtx.setGoal(goal);
                GoalCtx.setEditGoal(true);
                }} />
              <DeleteButton onClick={() => setDialog(true)} />
              <Dialog aria-labelledby='confirm-delete' open={dialog} onClose={() => setDialog(false)}>
                <DialogTitle>Are you sure you wish to delete this item?</DialogTitle>
                    <Box mb={2} display='flex' flexDirection='row' justifyContent='space-evenly'>
                      <Button 
                        variant='contained' 
                        color='primary' 
                        onClick={() => setDialog(false)}
                      >
                        Cancel
                      </Button>
                      <DeleteButton onClick={async () => {
                        await GoalsService.deleteGoal(expanded);
                        const goals = await GoalsService.getGoals();
                        GoalCtx.setGoals(goals);
                        setDialog(false);
                        }} 
                      />
                    </Box>
              </Dialog>
            </Box>
          </Grid>
        </Grid>
      </AccordionDetails>
    </List>
  ));
}