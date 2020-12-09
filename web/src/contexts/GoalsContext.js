// import React, { Component } from 'react';
import React, { useState } from 'react'; 

const nullGoal = {
  'id' : null,
  'name': null,
  'user_id' : null,
  'goal_amount' : null,
  'contribution_amount' : null,
  'current_amount' : null,
  'end_date' : null
}

const GoalsContext = React.createContext({
  goal: nullGoal,
  goals: [],
  setGoal: () => {},
  setGoals: () => {},
  setError: () => {},
});

export default GoalsContext;

export const GoalsProvider = (props) => {
  const [error, setError] = useState(null);
  const [goal, setGoal] = useState(nullGoal);
  const [goals, setGoals] = useState([]);

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