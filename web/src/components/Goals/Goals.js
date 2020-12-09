import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GoalsContext from '../../contexts/GoalsContext';
import GoalsService from '../../services/goals-service';
import './Goals.css';

const Goals = (props) => {
  const {
    goals = [],
    setGoals,
  } = useContext(GoalsContext);

  useEffect(() => {
    async function getUserGoals() {
      try {
        const goals = await GoalsService.getGoals();
        setGoals(goals);
      }
      catch(error) {
        console.log(error);
      }
    }
    getUserGoals();
  }, [setGoals]);

  const renderGoals = (goals) => {
    return goals
      .map((goal, i) => {
        if(!goal.completed) {
          return (
            <ul
              className='dataFlexRowALT'
              key={i}
            >
              <li className='dataFlexColALT'>
                <div className='goalTitleHeader'>
                  Name
                </div> 
                <div>{goal.name}</div>
              </li>
              <li className='dataFlexColALT'>
                <div className='goalTitleHeader'>
                  Current
                </div> 
                <div>{goal.current_amount}</div>
              </li>
              <li className='dataFlexColALT'>
                <div className='goalTitleHeader'>
                  Goal
                </div>
                <div>{goal.goal_amount}</div>
              </li>
              <li className='goalBtn'>
                <button
                  className='btn tertiaryBtn'
                  onClick={() =>
                    props.history.push(`/goal/${goal.id}`)
                  }
                >
                  Details
                </button>
              </li>
            </ul>
          );
        }
        return '';
      });
  }

  return (
    <article className='AllGoals'>
      <h2 className='sectionHeaderALT'>
        Goals
      </h2>
      <ul className='overviewSectionALT'>
        {
          (goals.length)
            ? renderGoals(goals)
            : ''
        }
      </ul>
      <button
        className='btn tertiaryBtn'
        onClick={() =>
          props.history.push('/')}
          type='click'
      >
        Back
      </button>
    </article>
  )
}

export default Goals;