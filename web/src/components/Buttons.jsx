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

export const DeleteButton = () => (
  <Delete
    variant='contained'
    startIcon={<DeleteIcon />}
  >
    Delete
  </Delete>
);

export const EditButton = () => (
  <Button
    variant='contained'
    startIcon={<EditIcon />}
    color='primary'
  >
    Edit
  </Button>
)