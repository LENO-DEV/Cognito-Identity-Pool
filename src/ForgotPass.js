import { CognitoUser } from 'amazon-cognito-identity-js';
import React, { useState } from 'react'
import Userpool from './Userpool';

const ForgotPass = () => {

  const [email, setemail] = useState('');
  const [state, setState] = useState(1);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const getUser = () => {
    return new CognitoUser({
      Username: email,
      Pool: Userpool
    });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    getUser().forgotPassword({
      onSuccess: (data) => {
        console.log(data);
      },
      onFailure: (err) => {
        console.log(err);
      },
      inputVerificationCode: (data) => {
        console.log('Input Code', data);
        setState(2);
      }
    });
  }

  const resetPassword = (e) => {
    e.preventDefault();
    getUser().confirmPassword(code, password, {
      onSuccess: data => {
        console.log(data);
      },
      onFailure: err => {
        console.log(err);
      }
    })
  }




  return <section className='container text-center' style={{ marginTop: '5rem' }}>
    <h1 className='mb-5'>Forgot PassWord</h1>
    {
      (state === 1)
        ? <form className='form col-6 offset-3'>
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder='Enter Email'
            type="email"
            className='form-control' />
          <button onClick={handleSubmit} className="mt-2 btn btn-secondary">
            Submit
          </button>
        </form>
        : <form className='form col-6 offset-3'>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder='Enter code'
            type="email"
            className='form-control' />
           <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Passowrd'
            type="email"
            className='form-control' />
          <button onClick={resetPassword} className="mt-2 btn btn-secondary">
            Submit
        </button>
        </form>
    }
  </section>
}

export default ForgotPass;
