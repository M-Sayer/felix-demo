import React, { useContext, useEffect } from 'react';
import GoalsContext from '../../contexts/GoalsContext';
import GoalsService from '../../services/goals-service';
import './Overview.css';

const GoalsOverview = (props) => {
  const { 
    goals = [],
    setGoals,
    setError,
  } = useContext(GoalsContext);

  useEffect(() => {
    async function getUserGoals() {
      try {
        const goals = await GoalsService.getGoals();
        setGoals(goals);
      }
      catch({ error }) {
        setError(error)
      }
    }
    getUserGoals();
  }, [setGoals, setError]);

  const renderGoals = (goals) => {
    const goalsList = [];
    let i = 0;

    for(const goal of goals) {
      if(i < 3 && i < goals.length && !goal.completed) {
        goalsList.push((
          <li
            className='userData2'
            key={i}
          >
            <div
              className='dataFlexRow'
            >
              <span>
                {goal.name}
              </span>
              <span>
                {goal.current_amount} of {goal.goal_amount}
              </span>
            </div>
          </li>
        ));
        i++;
      }
    }

    return (
      <ul>
        {goalsList}
      </ul>
    );
  }

  return (
    <article
      className='overviewSection'
    >
      <h2
        className='sectionHeader'
      >
        Goals Overview
      </h2>
      {(goals.length)
          ? renderGoals(goals)
          : ''
      }
      <div
        className='btnsFlexRow'
      >
        <button
            className='btn tertiaryBtn'
            onClick={() =>
              props.history.push('/goal/add/ ')}
              type='click'
          >
            +
        </button>
        {(goals.length)
          ? <button
              className='btn tertiaryBtn'
              onClick={() =>
                props.history.push('/goals')
              }
              type='click'
            >
              See All
            </button>
          : ''
        }
      </div>
    </article>
  );
}

export default GoalsOverview;