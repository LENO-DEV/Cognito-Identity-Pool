import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import React, { createContext } from 'react';
import Userpool from './Userpool';
import Verifier from 'verify-cognito-token';
import { useCookies } from 'react-cookie';
import { allowAccess } from './function';


const AccountContext = createContext();

const Account = ({ children }) => {

  const [cookie, setCookie] = useCookies();


  const localStorageId = () => {
    const value = cookie.idToken;
    if (value) {
      return true;
    }
  }
  const getSession = async () => {
    const CurrentUser = Userpool.getCurrentUser();
    if (CurrentUser != null) {
      const params = {
        region: 'ap-south-1',
        userPoolId: 'ap-south-1_kmjtGXWFw'
      }
      const verifier = new Verifier(params);
      const token = cookie.idToken;
      const res = await verifier.verify(token);
      if (res) {
        return { message: true, CurrentUser };
      }
      return false;
    }
    else {
      return false;
    }
  }

  const changePass = async (old, newPass) => {
    const { CurrentUser } = await getSession();
    CurrentUser.getSession((err) => {
      if (err) {
        console.log(err);
      }
      CurrentUser.changePassword(old, newPass, (err, data) => {
        if (err) console.log(err);
        else console.log(data);
      });
    })
  }



  const authenicate = async (email, password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: Userpool
      });
      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password
      });
      user.authenticateUser(authDetails, {
        onSuccess: (res) => {
          setCookie('idToken', res.getIdToken().getJwtToken());
          allowAccess(res);
          resolve(res);
        },
        onFailure: (err) => {
          reject(err);
        }
      });
    })
  }

  return <AccountContext.Provider value={{ authenicate, getSession, localStorageId, changePass }}>
    {children}
  </AccountContext.Provider>
}

export { Account, AccountContext };
