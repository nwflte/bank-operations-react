import React from 'react';
import ReactDOM from 'react-dom';
import KeycloakService from 'keycloak';
import { configureAxiosHandler } from 'utils/axios';
import * as serviceWorker from './serviceWorker';
import App from './App';

const renderApp = () =>
  ReactDOM.render(<App />, document.getElementById('root'));

KeycloakService.initKeycloak(renderApp);

configureAxiosHandler();

serviceWorker.unregister();
