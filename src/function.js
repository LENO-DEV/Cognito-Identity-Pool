import AWS from 'aws-sdk';
import { AwsClient } from 'aws4fetch';


export const allowAccess = (res) => {
  if (res) {
    console.log(res.idToken.jwtToken);
    AWS.config.update({ region: 'ap-south-1' });
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'ap-south-1:4979d70f-ee73-4f5d-b057-5af093b65404', // I'Pool can be access from AWS Console......
      Logins: {
        // 'accounts.google.com': res.tokenObj.id_token,
        'cognito-idp.ap-south-1.amazonaws.com/ap-south-1_bOxWozR1j': res.idToken.jwtToken // jwt token must be include.......
      }
    });
    AWS.config.credentials.get(async function () {
      console.log(AWS.config.credentials.accessKeyId); // for logging purpose.......

      const aws = new AwsClient({
        service: 'execute-api',
        region: 'ap-south-1',
        // Required for getting Signature.........................
        accessKeyId: AWS.config.credentials.accessKeyId,
        secretAccessKey: AWS.config.credentials.secretAccessKey,
        sessionToken: AWS.config.credentials.sessionToken
      });
      const url = 'https://ni3y49vxw6.execute-api.ap-south-1.amazonaws.com/dev';
      const request = await aws.sign(url, {
        method: 'GET',
        headers: {
          'content-type': "application/json"
        },
      });

      const response = await fetch(request)
      console.log(await response.json()); // for verify the request...for success........
    });
  }
}