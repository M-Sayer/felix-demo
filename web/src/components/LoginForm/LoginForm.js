import React, { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import AuthService from '../../services/auth-service';
import '../../styles/FormStyles.css'
import '../../styles/ButtonStyles.css'
import './LoginForm.css'
import { ErrorMessage, Form, Formik, Field } from 'formik';
import * as Yup from 'yup';

export const LoginForm = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  return (
    <>
      {success && 
        <p>
          We sent you an email
        </p>
      }
      <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required()
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await AuthService.emailLogin(values);
            setSuccess(true);
          } catch(e) {
            setError(e.error);
          }
        }}
      >
        {props => (
          <Form>
            <label htmlFor='email'>Email
              <Field name='email' type='text' />
            </label>
            <ErrorMessage name='email' />
            <button type='submit' disabled={props.isSubmitting}>Submit</button>
          </Form>
        )}
      </Formik>
      {error === 'User does not exist' && 
        <p>
          We couldn't find that email address. Did you want to register?
        </p>
      }
    </>
  )
}

// class LoginForm extends Component {
//   static contextType = UserContext;

//   static defaultProps = {
//     onLoginSuccess: () => {}
//   }

//   state = {
//     error: null,
//   }

//   async handleUserLogin(e) {
//     e.preventDefault();
//     const {
//       username,
//       password,
//     } = e.target;

//     const oldUser = {
//       username: username.value,
//       password: password.value,
//     }

//     username.value = '';
//     password.value = '';

//     this.setState({error: null});

//     try {
//       const { authToken } = await AuthService.postOldUser(oldUser);
//       this.context.handleUserLog(authToken);
//       this.props.onLoginSuccess();
//     }
//     catch(error) {
//       console.log(error);
//       this.setState({...error});
//     }
//   }
    
//   render() {

//     const {error} = this.state;

//     return (
//         <form
//         className='formContainer'
//           onSubmit={(e) => 
//             this.handleUserLogin(e)}
//         >
//           <div role='alert'>
//             {error && <p className='errorMessage'>{error}</p>}
//           </div>
    
//           <input
//             aria-label='username'
//             placeholder='username'
//             className='formInput'
//             autoComplete='username'
//             id='username'
//             type='text'
//           />

//           <input
//             aria-label='password'
//             placeholder='password'
//             className='formInput'
//             autoComplete='current-password'
//             id='password'
//             type='password'
//           />
    
//           <button
//             className='primaryBtn btn'
//             type='submit'
//           >
//             Submit
//           </button>
//         </form>
//     );
//   }
// }

// export default LoginForm;