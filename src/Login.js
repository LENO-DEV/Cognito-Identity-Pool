import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountContext } from './Account';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({
    Success: false,
    error: false,
    message: ''
  });
  const { authenicate } = useContext(AccountContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authenicate(email, password);
      if (res) {
        // window.location.reload();
        console.log(res);
        setMessage({ Success: true, message: 'Login Successs!!' });
      }
    } catch (error) {
      console.log(error);
    }
  }



  return <form className='card shadow-lg rounded-lg' style={{ marginTop: '6rem' }}>
    <div className='p-4'>
      <h1 className='h3'> Login </h1>
      <p className='text-secondary font-weight-bold'>{(message.error || message.Success) && message.message}</p>
      <div className="mb-4">
        <label className="form-label">Email address</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" />
      </div>
      <div className="mb-4">
        <label className="form-label">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
      </div>
      <div className="mb-2 col">
        <Link to='/forgotpassword'>Forgot Password?</Link>
      </div>

      <button type='submit' onClick={handleSubmit} className="btn btn-primary">Login Here</button>
    </div>
  </form >
}

export default Login;
