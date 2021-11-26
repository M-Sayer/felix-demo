import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import PublicOnlyRoute from './PublicOnlyRoute';
import DashboardRoute from '../../routes/DashboardRoute'

describe(`PublicOnlyRoute Component`, () => {
  describe(`Smoke test`, () => {
    it(`Renders without crashing`, () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <BrowserRouter>
          <PublicOnlyRoute
            comp={DashboardRoute}
          />
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
});