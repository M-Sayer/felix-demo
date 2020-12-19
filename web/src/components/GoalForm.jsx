import React, { useState } from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Box, TextField, Typography, Button, withStyles } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Moment from 'moment';
import { toCents, toDollars } from '../utils/moneyHelpers';

const CancelButton = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
  },
}))(Button);

export const GoalForm = props => {
  const [contribution, setContribution] = useState(0);
  const moment = Moment(), date = moment._d, goal = props.goal;
  const { submitGoal, createGoal } = props;

  const DatePickerField = ({ field, form, ...other}) => {
    const currentError = form.errors[field.name];
    
    return (
      <KeyboardDatePicker
        name={field.name}
        value={field.value}
        label='Goal Date'
        placeholder='Choose a date'
        helperText={form.touched.end_date && currentError}
        error={form.touched.end_date && !!currentError} 
        onChange={date => form.setFieldValue(field.name, date, true)}
        {...other}
      />
    );
  };

  const createContributionAmt = (goalDate, goalAmt) => {
    if (goalAmt !== '' || goalDate !== date) {
      const weeks = Moment(goalDate).diff(moment, 'weeks');
      setContribution(Math.ceil(toCents(goalAmt) / weeks));
    } 
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Typography variant='h3'>Create A New Goal</Typography>
        <Formik
          initialValues={{
            name: goal ? goal.name : '',
            goal_amount: goal ? goal.goal_amount : '',
            end_date: goal ? goal.end_date : date,
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Required')
              .max(15, 'Must be 15 characters or less'),
            goal_amount: Yup.number().positive('Please enter a number greater than 0')
              .required('Required').max(1000000, 'Cannot be greater than 1,000,000'),
            end_date: Yup.date().required('Required').min(date, 'Please select a date in the future'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await submitGoal({...values, contribution_amount: contribution}, '', 'POST');
            createGoal(false)
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
                  placeholder={0}
                  value={toDollars(contribution)}
                  inputProps={{ style: { textAlign: 'center' } }}
                  onChange={createContributionAmt(props.values.end_date, props.values.goal_amount)}
                />
              </Box>
              <Button variant='contained' color='primary' type='submit' disabled={props.isSubmitting}>
                Submit
              </Button>
              <CancelButton onClick={() => createGoal(false)} variant='contained' disabled={props.isSubmitting}>
                Cancel
              </CancelButton>
            </Form>
          )}
        </Formik>
      </MuiPickersUtilsProvider>
    </div>
  );
}