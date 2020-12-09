import React, { Component } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';

class LoginRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    }
  }

  onLoginSuccess = () => {
    // Add logic to redirect user to last private page visited
    const { history } = this.props;
    history.push('/');
  }
  // Redirect logic here

  render() {
    return (
      <>
        <LoginForm
          onLoginSuccess={this.onLoginSuccess} />
      </>
    );
  }
}

export default LoginRoute;