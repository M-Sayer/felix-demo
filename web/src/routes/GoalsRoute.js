import React from 'react';
import Goals from '../components/Goals/Goals';

const GoalsRoute = (props) => {
  return (
    <section>
      <Goals 
        {...props}
      />
    </section>
  )
}

export default GoalsRoute;