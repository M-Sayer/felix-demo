import React, { useState, useEffect } from 'react';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import GoalsService from '../../services/goals-service';

const GoalForm = (props) => {
  const [ error, setError ] = useState(null);

  // Extract form type and goal id (if any) from params
  // Based on form type, set HTTP method
  const { type = 'add', id = '' } = props.match.params;
  const method = (type === 'add') ? 'POST': 'PATCH';

  // Set initial date to current date
  // Using native date object
  // DatePicker updated to deprecate using Moment.js
  const [ date, setDate ] = useState(new Date());

  // If form type is edit, make a fetch call to get goal information
  const [ goal, setGoal ] = useState({});
  const [ contributionAmount, setContributionAmount ] = useState(0);
  const [ goalAmount, setGoalAmount ] = useState(0);

  const countNumberOfSundays = (daysFromCurrentDate) => {
    let numberOfSundays = 0;

    for(let i = 0; i <= daysFromCurrentDate; i++) {
      if(moment().add(i, 'days').day() === 0) {
        numberOfSundays += 1;
      }
    }

    return numberOfSundays;
  }

  const calculateContributionAmount = (date, goalAmount) => {
    let contribution_amount = 0;

    // Form picks up date selected by user and sets state var date
    // Use moment wrapper: native date object -> moment object
    // For accuracy & consistency
    const end_date = moment(date);
    const currentDate = moment();

    // Use moment method .diff to calculate number of days from current to end date
    const daysFromCurrentDate =  end_date.diff(currentDate, 'days');

    // Contribution amount is moved from allowance to goals every Sunday, 00:00 UTC
    // Calculate number of Sundays (and not number of weeks)
    // Consider the edge case when there are 3 Sundays but only 20 days
    // Conclusion: Number of weeks from now is not a reliable measure given the above edge case
    const numberOfSundays = countNumberOfSundays(daysFromCurrentDate);

    if(numberOfSundays <= 0) {
      contribution_amount = Number(goalAmount);
    } 
    else {
      contribution_amount = Math.ceil(((Number(goalAmount) / numberOfSundays) * 100) / 100);
    }

    return {
      end_date,
      contribution_amount
    }
  }

  useEffect(() => {
    if(type === 'edit') {
      async function setInitialFormValues(id) {
        try {
          const goal = await GoalsService.getGoal(id); 
          setContributionAmount(goal.contribution_amount);
          setDate(new Date(goal.end_date));
          setGoal(goal);
          setGoalAmount(goal.goal_amount);
        }
        catch(error) {
          setError(error);
        }
      }
      setInitialFormValues(id);
    }
  }, [type, id]);

  const handleChangeGoalAmount = (e) => {
    setError(null);
    const newGoalAmount = e.target.value;
    const { contribution_amount } = calculateContributionAmount(date, newGoalAmount);

    setGoalAmount(newGoalAmount);
    setContributionAmount(contribution_amount);
  }

  const handleChangeDate = (date) => {
    // Form picks up date selected by user and sets state var date
    setDate(date);
    
    const { contribution_amount } = calculateContributionAmount(date, goalAmount);
    setContributionAmount(contribution_amount);
  }

  const handleSubmitForm = async (e) => {
    setError(null);
    e.preventDefault();

    const name = e.target['goal_name'].value;
    const goal_amount = e.target['goal_amount'].value;
    const { end_date, contribution_amount } = calculateContributionAmount(date, goal_amount);
    
    const newGoal = {
      name,
      goal_amount,
      contribution_amount,
      end_date,
    }

    // POST/PATCH goal to server
    try {
      await GoalsService.createUpdateGoal(newGoal, id, method);
      props.history.push('/');
    }
    catch({ error }) {
      setError(error);
    }
  }

  return (
    <form
      className='formContainer'
      onSubmit={(e) =>
        handleSubmitForm(e)
      }
    >
      {error &&
        <div
          className='error'
          role='alert'
        >
          {error}
        </div>
      }
      {contributionAmount > 0 &&
        <div>
          Your Weekly Contribution Amount: {contributionAmount}
        </div>
      }
      <label
        htmlFor='goal_name'
      >
      </label>
      <input
        aria-label='goal_name'
        className='formInput'
        defaultValue={
          (type === 'edit')
          ? goal.name
          : ''
        }
        id='goal_name'
        onChange={() => {
        }}
        placeholder='goal name'
        type='text'
        required
      />

      <label
        htmlFor='goal_amount'
      >
      </label>
      <input
        aria-label='goal amount'
        className='formInput'
        defaultValue={
          (type === 'edit')
          ? goal.goal_amount
          : ''
        }
        id='goal_amount'
        min='0'
        onChange={(e) => {
          handleChangeGoalAmount(e);
        }}
        placeholder='amount'
        // step='0.1'
        type='number'
        required
      />

      <DatePicker
        aria-label='goal target end date'
        className='formInput'
        selected={date}
        onChange={handleChangeDate}
        placeholder={date}
      />
      <div>
        <button
          className='btn secondaryBtnALT'
        >
          Submit
        </button>
        <button
          className='btn cancel secondaryBtnALT'
          onClick={() => {
            props.history.push('/')
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default GoalForm;