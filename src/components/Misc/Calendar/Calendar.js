import React, { useEffect, useState } from 'react';
import calendar from 'calendar-js';
import moment from 'moment';
import './Calendar.css';

const Calendar = (props) => {
  // Current date and time object
  // console.log(moment())

  // Current date and time details 'ddd MMM DD YYYY HH:mm:ss UTC+-HH:mm'
  // console.log(moment()._d) 

  // Current date and time ISO 8601 format
  // console.log(moment().format())

  const { 
    initialYear,
    initialMonth,
  } = props;

  const [ year, setYear ] = useState(initialYear);
  const [ month, setMonth ] = useState(initialMonth);

  useEffect(() => {
    setYear(initialYear);
    setMonth(initialMonth);
    console.log('Meow')
  }, [initialYear, initialMonth]);

  console.log(month, initialMonth)

  // Returns an array of months
  // monthsAbbr returns an array of abbreviated months
  // console.log(calendar().months())
  
  const renderMonthOptions = () => {
    return calendar()
      .months()
      .map((month, i) => (
        <option
          key={i}
          value={i}
        >
          {month}
        </option>
      ));
  }

  // Accepts a range of years
  // Returns an array of years within the specified range
  // console.log(calendar().years(2020, 2025))

  const renderYearOptions = () => {
    return calendar()
      .years(moment().year(), moment().year() + 10)
      .map((year, i) => (
        <option
          key={i}
          value={year}
        >
          {year}
        </option>
      ));
  }

  const renderDatePicker = () => {
    // calendar().of(year, month)
    //
    const { calendar: datePickerInput } = calendar().of(year, month);
    let datePickerOutput = datePickerInput;
    
    // O(n^2) at first glance
    // But this is a matrix/2d array
    // In terms of input length
    // This is an O(n)
    for(let i = 0; i < datePickerInput.length; i++) {
      for(let j = 0; j < datePickerInput[i].length; j++) {
        if(datePickerInput[i][j] === 0) {
          datePickerOutput[i][j] = (
            <input
              className='calendar-input'
              key={i+j} // Possible values of 1-35
              type='button'
              value={''}
            />
          )
        }
        else {
          datePickerOutput[i][j] = (
            <input
              className='calendar-input'
              key={i+j} // Possible values of 1-35
              onClick={() => 
                handleDatePick(datePickerOutput[i]
                  .props
                  .children[j]
                  .props
                )
              }
              type='button'
              value={datePickerOutput[i][j]}
            />
          )
        }
      }
    }

    for(let row in datePickerOutput) {
      datePickerOutput[row] = (
        <div
          className='calendar-row'
          key={row}
        >
          {datePickerOutput[row]}
        </div>
      )
    }
    return datePickerOutput;
  }

  const renderWeekdays = () => {
    return [
      'S',
      'M',
      'T',
      'W',
      'Th',
      'F',
      'St',
    ]
      .map((weekday, i) => (
        <span
          key={i}
          className='calendar-row-header'
        >
          {weekday}
        </span>
      ))
  }

  const handleDatePick = ({ value }) => {
    console.log(moment([year, month, value]));
  }

  return (
    <>
      <div
        className='calendar'
      >
        <div
          className='calendar-header'
        >
          <select
            id='month'
            defaultValue={initialMonth}
            // defaultValue={moment().month()}
            name='month'
            onChange={(e) =>         
              setMonth(Number(e.target.value))
            }
          >
            {renderMonthOptions()}
          </select>
          <select
            id='year'
            name='year'
            onChange={(e) =>         
              setYear(Number(e.target.value))
            }
          >
            {renderYearOptions()}
          </select>
        </div>
        <div className='calendar-row'>
          {renderWeekdays()}
        </div>
        {renderDatePicker()}
      </div>
    </>
  )
}

export default Calendar;