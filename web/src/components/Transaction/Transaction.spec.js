import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
import { BrowserRouter, Route } from 'react-router-dom';
import { TransactionsProvider } from '../../contexts/TransactionsContext';
import Transaction from './Transaction';

describe(`Transaction Component`, () => {
  describe(`Smoke test`, () => {
    it(`Renders without crashing`, () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <BrowserRouter>
          <TransactionsProvider>
            <Route
              component={Transaction}
            />
          </TransactionsProvider>
        </BrowserRouter>,
        div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
  

})