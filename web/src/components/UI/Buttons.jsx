import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import { Button, withStyles } from '@material-ui/core';

const Delete = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.error.light,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    }
  },
  }))(Button);

export const DeleteButton = props => (
  <Delete
    variant='contained'
    startIcon={<DeleteIcon />}
    {...props}
  >
    Delete
  </Delete>
);

export const EditButton = props => (
  <Button
    variant='contained'
    startIcon={<EditIcon />}
    color='primary'
    {...props}
  >
    Edit
  </Button>
)

const Cancel = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
  },
}))(Button)

export const CancelButton = props => (
  <Cancel 
    variant='contained'
    {...props}
  >
    Cancel
  </Cancel>
)