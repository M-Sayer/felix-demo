import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../../contexts/UserContext';
import Header from './Header';

describe(`Header Component`, () => {
  describe(`Smoke test`, () => {
    it(`Renders without crashing`, () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <BrowserRouter>
          <UserProvider>
            <Header />
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