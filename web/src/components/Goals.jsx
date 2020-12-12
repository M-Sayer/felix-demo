import { Box, Container, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import GoalsContext from '../contexts/GoalsContext'
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
      <Box>
        <Typography>{goal.name}</Typography>
        <Typography>{goal.goal_amount}</Typography>
      </Box>
    ))
  }

  return (
    <Container>
      <Typography>
        <Box color='tertiary.dark'>Goals</Box>
      </Typography>
      {renderGoals()}
    </Container>
    )
}