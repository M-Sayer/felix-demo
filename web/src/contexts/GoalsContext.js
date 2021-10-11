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
});

export const GoalsProvider = props => {
  const [error, setError] = useState(null);
  const [goal, setGoal] = useState(null);
  const [goals, setGoals] = useState([]);
  const [createGoal, setCreateGoal] = useState(false);
  const [editGoal, setEditGoal] = useState(false);

  const fetchData = async () => {
    try {
      const goals = await GoalsService.getGoals();
      setGoals(goals);
    } catch(e) {
      setError(e);
    };
  };

  const deleteGoal = async (goalId) => {
    await GoalsService.deleteGoal(goalId)
    fetchData()
  }

  useEffect(() => {TokenService.hasAuthToken() && fetchData()}, [createGoal, editGoal])

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
      }}>
      {props.children}
    </GoalsContext.Provider>
  )
}