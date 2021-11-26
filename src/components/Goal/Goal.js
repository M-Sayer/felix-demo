import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import GoalsContext from '../../contexts/GoalsContext';
import GoalsService from '../../services/goals-service';
import './Goal.css';

const Goal = (props) => {
  const { 
    goal = {},
    setGoal 
  } = useContext(GoalsContext);

  useEffect(() => {
    async function getGoal() {
      try {
        const goal = await GoalsService.getGoal(props.match.params.id);
        setGoal(goal);
      }
      catch(error) {
        console.log(error);
      }
    }
    getGoal();

  }, [setGoal, props.match.params]);

  const handleDeleteGoal = async () => {
    try {
      const response = await GoalsService.deleteGoal(goal.id);
      props.history.push(`/goals`);
      console.log(response);
    }
    catch(error) {
      console.log(error);
    }
  }

  return (
    <article
      className='goalContainer'
    >
      <h2
        className='goalName'
      >
        {goal.name}
      </h2>
      <ul
        className=''
      >
        <li
          className='goalAttribute'
        >
          <span
            className='goalProperty'
          >
            Goal Amount:
          </span>
          <span
            className='goalValue'
          >
            {goal.goal_amount}
          </span>
        </li>
        <li
          className='goalAttribute'
        >
          <span
            className='goalProperty'
          >
            Current Amount:
          </span>
          <span
            className='goalValue'
          >
            {goal.current_amount}
          </span>
        </li>
        <li
          className='goalAttribute'
        >
          <span
            className='goalProperty'
          >
            Weekly Contribution Amount:
          </span>
          <span
            className='goalValue'
          >
            {goal.contribution_amount}
          </span>
        </li>
        <li
          className='goalAttribute'
        >
          <span
            className='goalProperty'
          >
            Target End Date:
          </span>
          <span
            className='goalValue'
          >
            {moment(goal.end_date).format('MM/DD/YYYY')}
          </span>
        </li>
      </ul>
      <div
        className='btnsFlexRow'
      >
        <button
          className='btn tertiaryBtn'
          onClick={() =>
            props.history.push(`/goal/edit/${goal.id}`)
          }
        >
          Edit
        </button>
        <button
          className='btn delete tertiaryBtn'
          onClick={() =>
            handleDeleteGoal()
          }
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default Goal;