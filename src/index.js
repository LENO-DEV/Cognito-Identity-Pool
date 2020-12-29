import React from 'react';
import ReactDom from 'react-dom';
import { Account } from './Account';
import Routes from './Routes';
import { CookiesProvider } from 'react-cookie';


ReactDom.render(
  <CookiesProvider>
    <Account>
      <Routes />
    </Account>
  </CookiesProvider>,
  document.getElementById('root')
);