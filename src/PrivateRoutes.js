import React, { useContext, useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AccountContext } from './Account'


const PrivateRoutes = ({ component: Comp, ...rest }) => {
  const { localStorageId, getSession } = useContext(AccountContext);
  const [checkToken, setCheckToken] = useState(false);
  const [loading, setloading] = useState(true);


  useEffect(() => {
    const session = async () => {
      try {
        const res = await getSession();
        if (res) {
          setCheckToken(true);
          setloading(false);
        }
        setloading(false);
      } catch (error) {
        setloading(false);
      }
    }
    session(); 
  }, [getSession]);

  if (loading) {
    return <h1>Loding...</h1>
  }


  return <Route {...rest} render={() => {
    return (localStorageId() && checkToken) ? <Comp load={loading} /> : <Redirect to='/' />
  }} />
}

export default PrivateRoutes;
