import { CognitoUserPool } from 'amazon-cognito-identity-js';


const poolData = {
  UserPoolId: 'ap-south-1_bOxWozR1j',
  ClientId: '42t7o86c7g6kgrh8lb7fa8gr0r'
};
export default new CognitoUserPool(poolData);