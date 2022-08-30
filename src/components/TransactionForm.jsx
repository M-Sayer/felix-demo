import React, { useContext, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CancelButton, SubmitButton } from './UI/Buttons';
import { Box, MenuItem } from '@material-ui/core';
import { FormField } from './UI/FormField'
import { TransactionsContext } from '../contexts/TransactionsContext'

export const TransactionForm = () => {
  const { transaction, setTransaction, setCreateTransaction, setEditTransaction, saveTransaction } = useContext(TransactionsContext)

  const trxTypes = ['income', 'expenses']
  const incomeCategories = ['paycheck', 'freelance', 'side_gig', 'other']
  const expenseCategories = ['bills', 'transportation', 'food', 'entertainment', 'other']

  const exitForm = () => {
    if (!transaction) return setCreateTransaction(false)
    
    setTransaction(null)
    setEditTransaction(false)
    return
  }

  useEffect(() => {
    // reset form on unmount
    return () => exitForm()
  })

  return (
    <div>
      <Formik
        initialValues={{
          name: (transaction && transaction.name) ?? '',
          type: (transaction && transaction.type) ?? '',
          category: (transaction && (transaction.income_category ?? transaction.expense_category)) ?? '',
          amount: (transaction && (transaction.income_amount ?? Math.abs(transaction.expense_amount))) ?? '',
          description: (transaction && transaction.description) ?? '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required').max(20, 'Must be 20 characters or less'),
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
          try {
            setSubmitting(true)

            if (values.type === 'expenses') values.amount *= -1

            await saveTransaction(values)

            setSubmitting(false)

            exitForm()
          } catch (error) {
            console.log(error)
          }
        }}
      >
        {props => (
          <Form style={{ display: 'flex', flexDirection: 'column' }}>
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
            />
            <FormField 
              formik={props} 
              name='description'
              label='Description'
              placeholder='e.g. Large coffee'
            />
            <Box width="100%" display="flex" flexDirection="column" pt={2}>
              <CancelButton 
                onClick={() => exitForm()} 
                color="primary"
                disabled={props.isSubmitting}
              />
              <SubmitButton
                disabled={props.isSubmitting}>
                Submit
              </SubmitButton>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  )
}
