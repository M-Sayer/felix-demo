import React from 'react';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';

class RegistrationRoute extends React.Component {
  static defaultProps = {
    history: {
      push: () => {},
    }
  }

  // User gets 'pushed' to the dashboard page on signup success
  handleRegSuccess = () => {
    // Add logic to redirect user to last private page visited
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <>
        <RegistrationForm
          onRegSuccess={this.handleRegSuccess}
          {...this.props}
        />
      </>
    )
  }
}

export default RegistrationRoute;