import React, { useState } from 'react';
import userPool from './Userpool';
import { CognitoUser } from 'amazon-cognito-identity-js';


const Signup = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hideSuccess, setHideSuccess] = useState(false);
  const [code, setCode] = useState('');
  const [message, setMessage] = useState({
    Success: false,
    error: false,
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    userPool.signUp(username, password, [], null, (err, data) => {
      console.log(data);
      if (err) console.log(err);
      else setHideSuccess(true);
    });
  }

  const verifySibmit = (e) => {
    e.preventDefault();
    const user = new CognitoUser({
      Username: username,
      Pool: userPool
    });
  
    user.confirmRegistration(code, true, (err, data) => {
      console.log(data);

      if (err) {
        setMessage({ ...message, error: true, message: 'Invalid Id!!! 😠' });
      }
      else setMessage({ ...message, Success: true, message: 'Verification Complete!!! 😃' });
    });
    
  }


  return <form className='card shadow-lg rounded-lg' style={{ marginTop: '6rem' }}>
    <div className='p-4'>
      <h1 className='h3'> SignUp </h1>
      <p className='text-secondary font-weight-bold'>{(message.error || message.Success) && message.message}</p>
      <div className="mb-4">
        <label className="form-label">Email address</label>
        <input value={username} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" />
      </div>
      {
        (hideSuccess) ? (
          <div>
            <input className='form-control' value={code} onChange={(e) => setCode(e.target.value)} type='text' placeholder='Enter code!!' /><br />
            <button type='submit' onClick={verifySibmit} className="btn btn-success"> Verify </button>
          </div>
        ) : (
            <div>
              <div className="mb-4">
                <label className="form-label">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
              </div>
              <div className="mb-2 col">
                <a href="#!">Forgot password?</a>
              </div>
              <button type='submit' onClick={handleSubmit} className="btn btn-primary">Sign Up</button>
            </div>
          )
      }
    </div >
  </form >
}

export default Signup
