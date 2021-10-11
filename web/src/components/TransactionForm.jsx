import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CancelButton } from './UI/Buttons';
import { MenuItem, Button } from '@material-ui/core';
import { FormField } from './UI/FormField'

export const TransactionForm = ({ transaction, setCreateTransaction, setEditTransaction, saveTransaction }) => {

  const trxTypes = ['income', 'expenses']
  const incomeCategories = ['paycheck', 'freelance', 'side_gig', 'other']
  const expenseCategories = ['bills', 'transportation', 'food', 'entertainment', 'other']

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          type: '',
          category: '',
          amount: '',
          description: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required').max(15, 'Must be 15 characters or less'),
          type: Yup.mixed().oneOf(trxTypes).required('Required'),
          category: Yup.mixed().required('Required')
            .when('type', {
              is: 'income',
              then: Yup.mixed().oneOf(incomeCategories),
              otherwise: Yup.mixed().oneOf(expenseCategories),
            }),
          amount: Yup.number().positive('Please enter a number greater than 0')
            .required('Required').max(1000000, 'Cannot be greater than 1,000,000'),
          description: Yup.string().max(50, 'Must be 50 characters or less'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)

          if (values.type == 'expenses') values.amount *= -1

          await saveTransaction(values)

          setSubmitting(false)

          transaction ? setEditTransaction(false) : setCreateTransaction(false)
        }}
      >
        {props => (
          <Form>
            <FormField 
              formik={props} 
              name='name'
              label='Transaction Name'
              placeholder='e.g. Starbucks'
            />
            <FormField 
              select
              formik={props}
              name='type'
              label='Type'
              helperText='Select a type'
            >
              {trxTypes.map(type => (
                <MenuItem key={type} value={type} name={type}>{type}</MenuItem>
              ))}
            </FormField>
            {props.values.type && (
              <FormField
                select
                formik={props}
                name='category'
                label='Category'
                helperText='Select a category'
              >
                {(props.values.type == 'income' ? incomeCategories : expenseCategories).map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </FormField>
            )}
            <FormField 
              formik={props}
              name='amount'
              label='Amount'
              placeholder='e.g. 500'
              type='number'
            />
            <FormField 
              formik={props} 
              name='description'
              label='Description'
              placeholder='e.g. Large coffee'
            />
            <Button 
              variant='contained' 
              color='primary' 
              type='submit' 
              disabled={props.isSubmitting}>
              Submit
            </Button>
            <CancelButton 
              onClick={() => transaction ? setEditTransaction(false) : setCreateTransaction(false)} 
              variant='contained' 
              disabled={props.isSubmitting}
            >
              Cancel
            </CancelButton>
          </Form>
        )}
      </Formik>
    </div>
  )
}
