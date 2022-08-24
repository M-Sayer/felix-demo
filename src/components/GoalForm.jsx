import React, { useEffect, useContext } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Box, TextField, Typography, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toCents, toDollars } from '../utils/helpers';
import { CancelButton } from './UI/Buttons';
import { GoalsContext } from '../contexts/GoalsContext';
import dayjs from 'dayjs'

export const GoalForm = () => {
  const date = dayjs()
  const minDate = dayjs().add(7, 'days') 
  const GoalsCtx = useContext(GoalsContext)
  const { goal, setGoal, setCreateGoal, setEditGoal, saveGoal } = GoalsCtx

  const exitForm = () => {
    if (!goal) return setCreateGoal(false)
    
    setGoal(null)
    setEditGoal(false)
    return
  }

  const formik = useFormik({
    initialValues: {
      name: goal ? goal.name : '',
      goal_amount: goal ? goal.goal_amount : '',
      end_date: goal ? dayjs(goal.end_date) : minDate,
      contribution_amount: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required')
        .max(20, 'Must be 20 characters or less'),
      goal_amount: Yup.number().positive('Please enter a number greater than 0')
        .required('Required').max(1000000, 'Cannot be greater than 1,000,000'),
      end_date: Yup.date().required('Required').min(date, 'Please select a date in the future'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true)

        await saveGoal(values)

        setSubmitting(false)

        exitForm()
      } catch (error) {
        console.log(error)
      }
    },
  })

  const setContributionAmt = (goalDate, goalAmt) => {
    const weeks = Math.ceil(goalDate.diff(date, 'weeks', true))
    const amt = Math.ceil(toCents(goalAmt) / weeks)

    return formik.setFieldValue('contribution_amount', toDollars(amt))
  }

  // reactively set contribution amt when values change in formik
  useEffect(() => {
    if (formik.values.goal_amount) setContributionAmt(formik.values.end_date, formik.values.goal_amount)

  }, [formik.values.goal_amount, formik.values.end_date])

  useEffect(() => {
    return () => exitForm()
  }, [])


  return (
    <div>
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
            disablePast='true'
            minDate={minDate}
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
            placeholder='0'
            value={formik.values.contribution_amount}
            inputProps={{ style: { textAlign: 'center' } }}
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
          onClick={() => exitForm()} 
          variant='contained' 
          disabled={formik.isSubmitting}
        >
          Cancel
        </CancelButton>
      </form>
    </div>
  );
}