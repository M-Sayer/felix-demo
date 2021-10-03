import React, { useEffect } from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Box, TextField, Typography, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Moment from 'moment';
import { toCents, toDollars } from '../utils/moneyHelpers';
import { CancelButton } from './UI/Buttons';

export const GoalForm = ({ submitGoal, createGoal, editGoal, goal }) => {
  const moment = Moment(), date = moment._d;

  const formik = useFormik({
    initialValues: {
      name: goal ? goal.name : '',
      goal_amount: goal ? goal.goal_amount : '',
      end_date: goal ? goal.end_date : date,
      contribution_amount: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required')
        .max(15, 'Must be 15 characters or less'),
      goal_amount: Yup.number().positive('Please enter a number greater than 0')
        .required('Required').max(1000000, 'Cannot be greater than 1,000,000'),
      end_date: Yup.date().required('Required').min(date, 'Please select a date in the future'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await submitGoal(
        {...values}, 
        goal ? goal.id : '',
        goal ? 'PATCH' : 'POST'
      );

      goal ? editGoal(false) : createGoal(false)
    },
  })

  const setContributionAmt = (goalDate, goalAmt) => {
    if (goalAmt !== '' || goalDate !== date) {
      const weeks = Moment(goalDate).diff(moment, 'weeks');
      const amt = Math.ceil(toCents(goalAmt) / weeks)

      formik.setFieldValue('contribution_amount', toDollars(amt))
    } 
  };

  // reactively set contribution amt when values change in formik
  useEffect(() => {
    setContributionAmt(formik.values.end_date, formik.values.goal_amount)
  }, [formik.values.goal_amount, formik.values.end_date])


  return (
    <div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Typography variant='h3'>Create A New Goal</Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <TextField
              id='name'
              name='name'
              label='Goal Name'
              placeholder='e.g. New Bicycle'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
              inputProps={{ style: { textAlign: 'center' } }}
            />
            <TextField
              type='number'
              id='goal_amount'
              name='goal_amount'
              label='Goal Amount'
              placeholder='e.g. 500'
              value={formik.values.goal_amount}
              onChange={formik.handleChange}
              error={formik.touched.goal_amount && !!formik.errors.goal_amount}
              helperText={formik.touched.goal_amount && formik.errors.goal_amount}
              inputProps={{ style: { textAlign: 'center' } }}
            />
            <KeyboardDatePicker
              name='end_date'
              value={formik.values.end_date}
              label='Goal Date'
              placeholder='Choose a date'
              helperText={formik.touched.end_date && formik.errors.end_date}
              error={formik.touched.end_date && !!formik.errors.end_date} 
              onChange={date => formik.setFieldValue('end_date', date, true)}
            />
            <TextField
              disabled
              type='number'
              id='contribution_amount'
              name='contribution_amount'
              label='Weekly Contribution'
              placeholder={0}
              value={formik.values.contribution_amount}
              inputProps={{ style: { textAlign: 'center' } }}
              // onChange={createContributionAmt(props.values.end_date, props.values.goal_amount)}
            />
          </Box>
          <Button 
            variant='contained' 
            color='primary' 
            type='submit' 
            disabled={formik.isSubmitting}>
            Submit
          </Button>
          <CancelButton 
            onClick={() => goal ? editGoal(false) : createGoal(false)} 
            variant='contained' 
            disabled={formik.isSubmitting}
          >
            Cancel
          </CancelButton>
        </form>
      </MuiPickersUtilsProvider>
    </div>
  );
}