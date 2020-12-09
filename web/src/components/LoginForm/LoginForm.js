import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import AuthService from '../../services/auth-service';
import '../../styles/FormStyles.css'
import '../../styles/ButtonStyles.css'
import './LoginForm.css'

// Validation
// Integrate with Formik as soon as logic has been implemented

class LoginForm extends Component {
  static contextType = UserContext;

  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = {
    error: null,
  }

  async handleUserLogin(e) {
    e.preventDefault();
    const {
      username,
      password,
    } = e.target;

    const oldUser = {
      username: username.value,
      password: password.value,
    }

    username.value = '';
    password.value = '';

    this.setState({error: null});

    try {
      const { authToken } = await AuthService.postOldUser(oldUser);
      this.context.handleUserLog(authToken);
      this.props.onLoginSuccess();
    }
    catch(error) {
      console.log(error);
      this.setState({...error});
    }
  }
    
  render() {

    const {error} = this.state;

    return (
        <form
        className='formContainer'
          onSubmit={(e) => 
            this.handleUserLogin(e)}
        >
          <div role='alert'>
            {error && <p className='errorMessage'>{error}</p>}
          </div>
    
          <input
            aria-label='username'
            placeholder='username'
            className='formInput'
            autoComplete='username'
            id='username'
            type='text'
          />

          <input
            aria-label='password'
            placeholder='password'
            className='formInput'
            autoComplete='current-password'
            id='password'
            type='password'
          />
    
          <button
            className='primaryBtn btn'
            type='submit'
          >
            Submit
          </button>
        </form>
    );
  }
}

export default LoginForm;