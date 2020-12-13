// import React, { Component } from 'react';
import React, { useEffect, useState } from 'react'; 
import GoalsService from '../services/goals-service';
import TokenService from '../services/token-service';

const GoalsContext = React.createContext({
  goal: null,
  goals: [],
  setGoal: () => {},
  setGoals: () => {},
  setError: () => {},
});

export default GoalsContext;

export const GoalsProvider = (props) => {
  const [error, setError] = useState(null);
  const [goal, setGoal] = useState(null);
  const [goals, setGoals] = useState([]);

  const fetchData = async () => {
    try {
      const goals = await GoalsService.getGoals();
      setGoals(goals);
    } catch(e) {
      setError(e);
    };
  };

  useEffect(() => {TokenService.hasAuthToken() && fetchData()}, [])

  return (
    <GoalsContext.Provider 
      value={{ 
        goal,
        goals,

        setGoal,
        setGoals,

        error,
        setError,

      }}>
      {props.children}
    </GoalsContext.Provider>
  )
}