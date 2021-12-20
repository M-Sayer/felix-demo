import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { EmailRoute } from './routes/EmailRoute';
import { Home } from './components/Home';
import { TabBar } from './components/TabBar';
import { Box } from '@material-ui/core';

export const App = () => {
  return (
    <div className='App'>
      <Box bgcolor="red" textAlign="center">This demo is currently being refactored. Please excuse our appearance</Box>
      <Switch>
        <PrivateRoute
          exact path='/'
          comp={TabBar}
        />
        <Route path='/login'>
          <Home />
        </Route>
        <Route path='/email/:token'>
          <EmailRoute />
        </Route>
      </Switch>
    </div>
  );
};
