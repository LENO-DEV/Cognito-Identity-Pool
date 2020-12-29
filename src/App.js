import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import { GoogleLogin } from 'react-google-login';
import AWS from 'aws-sdk';
import { useCookies } from 'react-cookie';
import { AwsClient } from 'aws4fetch'

const App = () => {
  const [cookie, setCookie] = useCookies();


  const responseGoogle = (res) => {
    if (res) {
      const { profileObj } = res;
      setCookie('Profiles', profileObj);
      AWS.config.update({ region: 'ap-south-1' });
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'ap-south-1:4979d70f-ee73-4f5d-xxxxxxxx...', // I'Pool can be access from AWS Console......
        Logins: {
          'accounts.google.com': res.tokenObj.id_token // jwt token must be include.......
        }
      });
      AWS.config.credentials.get(async function () {
        console.log(AWS.config.credentials); // for logging purpose.......

        const aws = new AwsClient({
          service: 'execute-api',
          region: 'ap-south-1',
          // Required for getting Signature.........................
          accessKeyId: AWS.config.credentials.accessKeyId, 
          secretAccessKey: AWS.config.credentials.secretAccessKey,
          sessionToken: AWS.config.credentials.sessionToken
        });
        const url = 'https://myapi.execute-api.ap-south-1.amazonaws.com/dev/create/';
        const request = await aws.sign(url, {
          method: 'POST',
          body: JSON.stringify({ message: cookie.Profiles }), // must be stringify....(as body must be in string)
          headers: {
            'content-type': "application/json"
          },
        });

        const response = await fetch(request)
        console.log(await response.json()); // for verify the request...for success........
      });
    }
  }


  return <section className='container text-center'>
    <div className='row'>
      <h1 className='text-center p-2 mt-5'>AWS Coginto Auth</h1>
      <p className='text-center text-dark'>Hello</p>
      <GoogleLogin
        clientId="xxxxxx-p6t99p967skoc6u6rmeipom2t89uhqjg.apps.googleusercontent.com"
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
