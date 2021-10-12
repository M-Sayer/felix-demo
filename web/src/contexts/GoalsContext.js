// import React, { Component } from 'react';
import React, { useEffect, useState } from 'react'; 
import GoalsService from '../services/goals-service';
import TokenService from '../services/token-service';

export const GoalsContext = React.createContext({
  goal: null,
  goals: [],
  setGoal: () => {},
  setGoals: () => {},
  setError: () => {},
  createGoal: false,
  setCreateGoal: () => {},
  editGoal: false,
  setEditGoal: () => {},
  deleteGoal: () => {},
  saveGoal: () => {},
});

export const GoalsProvider = props => {
  const [error, setError] = useState(null);
  const [goal, setGoal] = useState(null);
  const [goals, setGoals] = useState([]);
  const [createGoal, setCreateGoal] = useState(false);
  const [editGoal, setEditGoal] = useState(false);

  const getGoals = async () => {
    try {
      const goals = await GoalsService.getGoals()

      setGoals(goals)

      console.log(goals)
    } catch(e) {
      setError(e);
    };
  };

  const deleteGoal = async goalId => {
    await GoalsService.deleteGoal(goalId)
    
    await getGoals()

    return
  }

  const saveGoal = async values => {
    const res = createGoal 
      ? await GoalsService.createGoal(values)
      : await GoalsService.updateGoal(values, goal.id)

    await getGoals()

    return
  }

  useEffect(() => {TokenService.hasAuthToken() && getGoals()}, [createGoal, editGoal])

  return (
    <GoalsContext.Provider 
      value={{ 
        goal,
        goals,
        setGoal,
        setGoals,
        createGoal,
        setCreateGoal,
        editGoal,
        setEditGoal,
        error,
        setError,
        deleteGoal,
        saveGoal,
      }}>
      {props.children}
    </GoalsContext.Provider>
  )
}