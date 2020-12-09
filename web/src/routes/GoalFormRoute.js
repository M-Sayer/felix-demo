import React from 'react';
import GoalForm from '../components/GoalForm/GoalForm';

const GoalFormRoute = (props) => {
  return (
    <>
      <GoalForm 
        {...props}
      />
    </>
  )
}

export default GoalFormRoute;