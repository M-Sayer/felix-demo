import React, { useState } from 'react'
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
  Paper,
  withStyles, 
  useMediaQuery,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import moment from 'moment'

import { DeleteButton, EditButton } from './UI/Buttons'
import { Goal } from './Goal'
import { Transaction } from './Transaction'
import { GoalLabels, TransactionLabels } from './UI/Labels'


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
      '&:last-child': {
        marginBottom: theme.spacing(1),
      }
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
  <Summary expandIcon={<ExpandMoreIcon />}>
    {type === 'goal'
      ? <Goal goal={item} />
      : <Transaction trx={item} />
    }
  </Summary>
)

const DeleteDialog = ({ dialog, setDialog, deleteItem, item, setAnchorEl }) => (
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
        <DeleteButton onClick={async () => {
          console.log(item)
          await deleteItem(item)
          setAnchorEl && setAnchorEl({})
          setDialog(false)
        }} />
      </Box>
  </Dialog>
)

const FinancialDetails = ({ type, item, editItem, handleDelete}) => {
  let details

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

      break
  }

  const renderDetails = () => details.map(detail => (
      <Box flexDirection='row'>
        <Typography flexGrow={2} display='inline'>{detail.label}</Typography>
        <Typography flexGrow={1} display='inline'>{detail.data}</Typography>
      </Box>
    ))

    const mobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <AccordionDetails flexDirection='column'>
      <Grid
        container
        direction='row'
        spacing={2}
      >
        {mobile && (
          <Grid item xs={12} md={6}> 
            <Box display='flex' flexDirection='column'>
              {renderDetails}
            </Box>
          </Grid>
        )}
        <Grid item xs={12} md={mobile ? 6 : 12}>
          <Box display='flex' flexDirection='row' justifyContent='center'>
            <Box mr={2}>
              <EditButton onClick={() => editItem(item)} />
            </Box>
            <Box ml={2}>
              <DeleteButton marginLeft={2} onClick={() => handleDelete(item)} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </AccordionDetails>
  )
}

const MenuIcon = withStyles(theme => ({
  root: {
    padding: 0,
  }
}))(IconButton)

export const FinancialList = props => {
  const { list, type, context } = props
  const [expanded, setExpanded] = useState(false)
  const [anchorEl, setAnchorEl] = useState({})
  const [dialog, setDialog] = useState(false)
  const [listItem, setListItem] = useState(null)
  const mobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

  let editItem, deleteItem

  if (type === 'goal') {
    editItem = item => {
      context.setGoal(item)
      context.setEditGoal(true)
    }

    deleteItem = async item => await context.deleteGoal(item.id)
  } else {
    editItem = item => {
      context.setTransaction(item)
      context.setEditTransaction(true)
    }

    deleteItem = async item => await context.deleteTransaction(item.type, item.id)
  }

  const handleChange = idx => {
    setExpanded(expanded === idx ? false : idx)
  }

  const handleDelete = item => {
    setAnchorEl({})
    setListItem(item)
    setDialog(true)
  }

  return (
    <>
      <DeleteDialog dialog={dialog} setDialog={setDialog} deleteItem={deleteItem} item={listItem} setAnchorEl={setAnchorEl} />
      {!mobile && (
        <Box display="flex" padding={2}>
          {type === 'goal'
            ? <GoalLabels flexBasis="95%" />
            : <TransactionLabels flexBasis="95%" />  
          }
          <Box flexBasis="5%" />
        </Box>
      )}
      {list.map((item, idx) => (
        <Paper key={idx}>
          {mobile
            ? (
              <ListItem marginBottom={2} expanded={expanded === idx} onChange={() => handleChange(idx)}>
                <FinancialSummary item={item} type={type} />
                <FinancialDetails type={type} item={item} editItem={editItem} deleteItem={deleteItem} handleDelete={handleDelete} />
              </ListItem>
            ) : (
              <Box padding={2} mb={2} display="flex" flexDirection="row">
                {type === 'goal'
                  ? <Goal flexBasis="95%" goal={item} />
                  : <Transaction flexBasis="95%" trx={item} />
                }
                <Box display="flex" justifyContent="flex-end" flexBasis="5%">
                  <MenuIcon
                    aria-label="options"
                    aria-controls="menu"
                    aria-haspopup="true"
                    onClick={(e) => setAnchorEl({ [idx]: e.currentTarget })}
                  >
                    <MoreVertIcon />
                  </MenuIcon>
                  <Menu
                    id="menu"
                    anchorEl={anchorEl[idx]}
                    keepMounted
                    open={!!anchorEl[idx]}
                    onClose={() => setAnchorEl({})}
                  >
                    <MenuItem onClick={() => editItem(item)}>Edit</MenuItem>
                    <MenuItem onClick={() => handleDelete(item)}>Delete</MenuItem>
                  </Menu>
                </Box>
              </Box>
            )}
        </Paper>
      ))}
    </>
  )
}

