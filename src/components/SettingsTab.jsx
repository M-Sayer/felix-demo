import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import TokenService from '../services/token-service';

export const SettingsTab = () => {
  const history = useHistory();
  return (
    <Button onClick={() => {
      TokenService.clearAuthToken();
      history.push('/');
    }} 
    color='primary' 
    variant='outlined'
    >
      Log Out
    </Button>
  )
}