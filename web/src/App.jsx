import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute/PublicOnlyRoute';

import { EmailRoute } from './routes/EmailRoute';
import { Home } from './components/Home';
import { TabBar } from './components/TabBar';

const App = () => {

  return (
    <div className='App'>
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

export default App;
