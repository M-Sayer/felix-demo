import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { AlertsProvider } from './contexts/AlertsContext';
import { TransactionsProvider } from './contexts/TransactionsContext';
import { GoalsProvider } from './contexts/GoalsContext';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './theme';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
        <AlertsProvider>
          <UserProvider>
            <TransactionsProvider>
              <GoalsProvider>
                <CssBaseline />
                <App />
              </GoalsProvider>
            </TransactionsProvider>
          </UserProvider>
        </AlertsProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);