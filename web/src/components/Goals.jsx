import { Box, Container, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import GoalsContext from '../contexts/GoalsContext'
import UserContext from '../contexts/UserContext';
import GoalsService from '../services/goals-service';

export const Goals = (props) => {
  const Goal = useContext(GoalsContext);
  let goals = Goal.goals;

  const getGoals = async () => {
    try {
      const goals = await GoalsService.getGoals();
      Goal.setGoals(goals);
    } catch(e) {
      Goal.setError(e)
    }
  }

  useEffect(() => {
    getGoals();
  }, []);

  if (props === 'overview') {
    goals.slice(0, 3)
  }

  const renderGoals = () => {
    return goals.map(goal => (
      <Box display='flex' flexDirection='row'>
        <Box flexGrow={2} >
          <Typography>{goal.name}</Typography>
        </Box>
        <Box color='tertiary.main' flexGrow={1} textAlign='right'>
          <Typography>${goal.current_amount}</Typography>
        </Box>
      </Box>
    ))
  }

  return (
    <Container>
      {goals ? renderGoals() : null}
    </Container>
    )
}