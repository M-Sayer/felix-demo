import React, { useState } from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Box, TextField, Typography, Button } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Moment from 'moment';
import { toCents, toDollars } from '../utils/moneyHelpers';

export const GoalForm = props => {
  const [contribution, setContribution] = useState(0);
  const moment = Moment();
  const goal = props.goal;

  const DatePickerField = ({ field, form, ...other}) => {
    const currentError = form.errors[field.name];

    return (
      <KeyboardDatePicker
        name={field.name}
        value={field.value}
        label='Goal Date'
        placeholder='Choose a date'
        helperText={currentError}
        error={!!currentError} 
        onChange={date => form.setFieldValue(field.name, date, true)}
        {...other}
      />
    );
  };

  const createContributionAmt = (goalDate, goalAmt) => {
    const weeks = goalDate.diff(moment, 'weeks');
    setContribution(Math.ceil(toCents(goalAmt) / weeks));
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Typography variant='h3'>Create A New Goal</Typography>
      <Formik
        initialValues={{
          name: goal ? goal.name : '',
          goal_amount: goal ? goal.goal_amount : '',
          end_date: goal ? goal.end_date : moment,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required')
            .max(15, 'Must be 15 characters or less'),
          goal_amount: Yup.number().positive('Please enter a number greater than 0')
            .required('Required').max(1000000, 'Cannot be greater than 1,000,000'),
          end_date: Yup.date().required('Required').min(new Date() + 1, 'Please select a date in the future'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values.end_date)
          console.log(moment)
        }}
      >
        {props => (
          <Form>
            <Box>
              <TextField
                id='name'
                name='name'
                label='Goal Name'
                placeholder='e.g. New Bicycle'
                value={props.values.name}
                onChange={props.handleChange}
                error={props.touched.name && !!props.errors.name}
                helperText={props.touched.name && props.errors.name}
                inputProps={{ style: { textAlign: 'center' } }}
              />
              <TextField
                type='number'
                id='goal_amount'
                name='goal_amount'
                label='Goal Amount'
                placeholder='e.g. 500'
                value={props.values.goal_amount}
                onChange={props.handleChange}
                error={props.touched.goal_amount && !!props.errors.goal_amount}
                helperText={props.touched.goal_amount && props.errors.goal_amount}
                inputProps={{ style: { textAlign: 'center' } }}
              />
              <Field name='end_date' component={DatePickerField} />
              <TextField
                disabled
                type='number'
                id='contribution_amount'
                name='contribution_amount'
                label='Weekly Contribution'
                placeholder={toDollars(contribution)}
                value={toDollars(contribution)}
                inputProps={{ style: { textAlign: 'center' } }}
                onChange={
                  (!props.values.goal_amount || props.values.end_date === moment) 
                    ? 0 
                    : createContributionAmt(props.values.end_date, props.values.goal_amount)
                }
              />
            </Box>
            <Button variant='contained' color='primary' type='submit' disabled={props.isSubmitting}>Submit</Button>
          </Form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  );
}