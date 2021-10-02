import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionDetails, 
  AccordionSummary, 
  Box, 
  Button, 
  Dialog, 
  DialogTitle, 
  Grid, 
  Typography, 
  withStyles 
} from '@material-ui/core';
import moment from 'moment';
import { DeleteButton, EditButton } from './Buttons';
import { Goal } from './Goal';
import { Transaction } from './Transaction'


const ListItem = withStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1),
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      marginBottom: theme.spacing(1),
    },
  },
  expanded: {},
}))(Accordion);

const Summary = withStyles(theme => ({
  content: {
    display: 'block'
  }
}))(AccordionSummary)

const FinancialSummary = ({ item, type }) => (
  <Summary>
    {type == 'goal'
      ? <Goal goal={item} />
      : <Transaction trx={item} />
    }
  </Summary>
)

const FinancialDetails = ({ type, item, context }) => {
  const [dialog, setDialog] = useState(false)

  let details, editItem, deleteItem

  switch (type) {
    case 'goal':
      details = [
        {
          label: 'Goal Amount: ',
          data: '$' + item.goal_amount
        },
        {
          label: 'End Date: ',
          data: moment(item.end_date).format('MM/DD/YYYY')
        },
        {
          label: 'Weekly Contribution Amount: ',
          data: '$' + item.contribution_amount
        }
      ]

      editItem = () => {
        context.setGoal(item)
        context.setEditGoal(true)
      }

      deleteItem = async () => {
        await context.deleteGoal(item.id)
        setDialog(false);
      }

      break
  
    default: // transaction
    details = [
      {
        label: 'Details: ',
        data: item.description
      },
      {
        label: 'Amount: ',
        data: '$' + (item.income_amount ?? item.expense_amount)
      },
      {
        label: 'Category: ',
        data: item.income_category ?? item.expense_category
      },
    ]
      break;
  }

  const renderDetails = () => details.map(detail => (
      <Box flexDirection='row'>
        <Typography flexGrow={2} display='inline'>{detail.label}</Typography>
        <Typography flexGrow={1} display='inline'>{detail.data}</Typography>
      </Box>
    ))

  return (
    <AccordionDetails flexDirection='column'>
      <Grid
        container
        direction='row'
        spacing={2}
      >
        <Grid item xs={12} md={6}> 
          <Box display='flex' flexDirection='column'>
            {renderDetails}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display='flex' flexDirection='row' justifyContent='space-evenly'>
            <EditButton onClick={() => editItem()} />
            <DeleteButton onClick={() => setDialog(true)} />
            <Dialog aria-labelledby='confirm-delete' open={dialog} onClose={() => setDialog(false)}>
              <DialogTitle>Are you sure you wish to delete this item?</DialogTitle>
                <Box mb={2} display='flex' flexDirection='row' justifyContent='space-evenly'>
                  <Button 
                    variant='contained' 
                    color='primary' 
                    onClick={() => setDialog(false)}
                  >
                    Cancel
                  </Button>
                  <DeleteButton 
                    onClick={async () => {
                      await deleteItem()
                      setDialog(false);
                    }} 
                  />
                </Box>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
    </AccordionDetails>
  )
}

export const FinancialList = props => {
  const { list, type, context } = props
  const [expanded, setExpanded] = useState(false)

  const handleChange = idx => {
    setExpanded(expanded === idx ? false : idx)
  }
  // goal/income/expense
  const setAmount = item => item.current_amount ?? item.income_amount ?? item.expense_amount
  
  return list.map((item, idx) => (
    <ListItem marginBottom={2} key={idx} expanded={expanded === item.id} onChange={() => handleChange(item.id)}>
      <FinancialSummary item={item} type={type} />
      <FinancialDetails type={type} item={item} context={context} />
    </ListItem>
  ))
}

