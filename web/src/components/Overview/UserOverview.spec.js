import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
import { BrowserRouter, Route } from 'react-router-dom';
import { UserProvider } from '../../contexts/UserContext';
import UserOverview from './UserOverview';

describe(`UserOverview Component`, () => {
  describe(`Smoke test`, () => {
    it(`Renders without crashing`, () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <BrowserRouter>
          <UserProvider>
            <Route
              component={UserOverview}
            />
          </UserProvider>
        </BrowserRouter>,
        div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
  
  // describe(`Snapshot test`, () => {
  //   it(`Renders the UI as expected`, () => {
  //     const tree = renderer
  //       .create(
  //         <BrowserRouter>
  //             <App />
  //         </BrowserRouter>
  //       )
  //       .toJSON()
  //     expect(tree).toMatchSnapshot()
  //   });
  // });
})