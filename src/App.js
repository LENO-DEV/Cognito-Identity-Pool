import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import { GoogleLogin } from 'react-google-login';
import { allowAccess } from './function';

const App = () => {
  // const [cookie, setCookie] = useCookies();


  const responseGoogle = (res) => {
    allowAccess(res);
  }


  return <section className='container text-center'>
    <div className='row'>
      <h1 className='text-center p-2 mt-5'>AWS Coginto Auth</h1>
      <p className='text-center text-dark'>Hello</p>
      <GoogleLogin
        clientId="1072297356666-p6t99p967skoc6u6rmeipom2t89uhqjg.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />,
      <p className='h3'> <Link to='/man'>Click Man</Link></p>
      <div className='col-md-6'>
        <Signup />
      </div>
      <div className='col-md-6'>
        <Login />
      </div>
    </div>
  </section>
}

export default App;
