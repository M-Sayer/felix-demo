import React from 'react';
import Goal from '../components/Goal/Goal';

const GoalRoute = (props) => {
  return (
    <section>
      <Goal 
        {...props}
      />
    </section>
  )
}

export default GoalRoute;