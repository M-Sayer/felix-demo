import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import { Button, withStyles } from '@material-ui/core';

const StyledButton = withStyles(theme => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      margin: theme.spacing(1)
    },
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2)
    },
  }
}))(Button)

const Delete = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.error.light,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    }
  },
  }))(StyledButton);

export const DeleteButton = props => (
  <Delete
    variant="contained"
    startIcon={<DeleteIcon />}
    {...props}
  >
    Delete
  </Delete>
);

export const EditButton = props => (
  <StyledButton
    variant="contained"
    startIcon={<EditIcon />}
    color="primary"
    {...props}
  >
    Edit
  </StyledButton>
)

export const CancelButton = props => (
  <StyledButton
    variant="outlined"
    {...props}
  >
    Cancel
  </StyledButton>
)

export const SubmitButton = props => (
  <StyledButton
    variant="contained"
    type="submit"
    color="primary"
    {...props}
  >
    Submit
  </StyledButton>
)