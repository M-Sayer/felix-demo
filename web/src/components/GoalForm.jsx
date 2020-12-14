import React, { useState } from 'react';
import { 
  MuiPickersUtilsProvider, 
  KeyboardDatePicker,
  TimePicker,
  DateTimePicker, 
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Box, TextField, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

export const GoalForm = () => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [contribution, setContribution] = useState(0);


  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Typography variant='h3'>Create A New Goal</Typography>
      <Formik
        initialValues={{
          name: '',
          goal_amount: null,
          end_date: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required')
            .max(15, 'Must be 15 characters or less'),
          goal_amount: Yup.number().positive()
            .required('Required').max(1000000),
          end_date: Yup.date().required('Required').min(selectedDate),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values)
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
                id='goal_amount'
                name='goal_amount'
                label='Goal Amount'
                placeholder='e.g. 500'
                value={props.values.goal_amount}
                onChange={props.handleChange}
                error={props.touched.goal_amount && !!props.errors.goal_amount}
                helperText={props.touched.goal_amount && !!props.errors.goal_amount}
                inputProps={{ style: { textAlign: 'center' } }}
              />
              <KeyboardDatePicker value={selectedDate} />
              <TextField
                disabled
                id='contribution_amount'
                name='contribution_amount'
                label='Weekly Contribution'
                placeholder={contribution}
                value={contribution}
                inputProps={{ style: { textAlign: 'center' } }}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  )
}