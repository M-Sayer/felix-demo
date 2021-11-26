import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import TokenService from '../../services/token-service';

function PublicOnlyRoute(props) {
  const { comp: Component } = props;

  return (
    <Route
      {...props}
      render={(props) =>
        (TokenService.hasAuthToken())
          ? <Redirect 
              to={'/'}
            />
          : <Component
              {...props}
            />
      }
    />
  );
}

export default PublicOnlyRoute;