import React from 'react';
import AuthService from '../../services/auth-service';
import UserContext from '../../contexts/UserContext';
import './RegistrationForm.css';

class RegistrationForm extends React.Component {
  static contextType = UserContext;

  static defaultProps = {
    onRegSuccess: () => {},
  }

  state = {
    error: null
  }

  handleUserRegistration = async (e) => {
    e.preventDefault();

    const {
      first_name,
      last_name,
      username,
      email,
      password } = e.target;

    const newUser = {
      first_name: first_name.value,
      last_name: last_name.value,
      username: username.value,
      email: email.value,
      password: password.value        
    }

    first_name.value = '';
    last_name.value = '';
    username.value = '';
    email.value = '';
    password.value = '';

    this.setState({error: null})

    try {
      const { authToken } = await AuthService.postNewUser(newUser);
      this.context.handleUserLog(authToken);
      this.props.onRegSuccess();
    }
    catch(error) {
      this.setState({...error});
    }
  }

  render() {
    const {error} = this.state;

    return (
      <div>
        <form 
          className='RegistrationForm'
          onSubmit={this.handleUserRegistration}
        >
          <div role='alert'>
            {error && <p className='error-alert'>{error}</p>}
          </div>

          <input
            aria-label='firstname'
            placeholder='first name'
            className='formInput'
            id='first_name'
            type='text'
            required
          />
      
          <input
            aria-label='lastname'
            placeholder='last name'
            className='formInput'
            id='last_name'
            type='text'
            required
          />
      
          <input
            aria-label='username'
            placeholder='username'
            className='formInput'
            id='username'
            type='text'
            required
          />
      
          <input
            aria-label='email'
            placeholder='email'
            className='formInput'
            id='email'
            type='text'
            required
          />

          <input
            aria-label='password'
            placeholder='password'
            className='formInput'
            id='password'
            type='password'
            required
          />
      
          <button
            className='primaryBtn btn'
            type='submit'
          >
            Submit
          </button>
        </form>

        <a href='/login'>
          Already have an account? Login
        </a>
      </div>
    )
  }   
}

export default RegistrationForm;