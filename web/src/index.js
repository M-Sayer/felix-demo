import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { AlertsProvider } from './contexts/AlertsContext';
import { TransactionsProvider } from './contexts/TransactionsContext';
import { GoalsProvider } from './contexts/GoalsContext';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import App from './components/App/App';

import { Auth0Provider } from "@auth0/auth0-react";

import './styles/index.css'

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
        <AlertsProvider>
          <UserProvider>
            <TransactionsProvider>
              <GoalsProvider>
                <Auth0Provider
                  domain='amina-assistant.us.auth0.com'
                  clientId='s2amWLKnb3fJkZN7tUYPZNJoOwqnnEif'
                  redirectUri={window.location.origin}
                >
                  <App />
                </Auth0Provider>
              </GoalsProvider>
            </TransactionsProvider>
          </UserProvider>
        </AlertsProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);