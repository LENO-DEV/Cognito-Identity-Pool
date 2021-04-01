import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import App from './App'
import ForgotPass from './ForgotPass';
import PrivateRoutes from './PrivateRoutes'
import SomeComp from './SomeComp'

const Routes = () => {

  // const [check, setcheck] = useState(false);
  // const { localStorageId } = useContext(AccountContext);


  return <BrowserRouter>
    <Switch>
      <PrivateRoutes path='/man' component={SomeComp} />
      <Route exact path='/' component={App} />
      <Route exact path='/forgotPassword' component={ForgotPass} />
    </Switch>
  </BrowserRouter>
}

export default Routes;
