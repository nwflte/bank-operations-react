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

/* import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import Keycloak from 'keycloak-js';

let initOptions = {
  url: 'https://localhost:8080/auth',
  realm: 'springservice',
  clientId: 'bank-service',
  onLoad: 'login-required'
};

let keycloak = Keycloak(initOptions);

keycloak
  .init({ onLoad: initOptions.onLoad })
  .success(auth => {
    if (!auth) {
      window.location.reload();
    } else {
      console.info('Authenticated');
    }

    //React Render
    ReactDOM.render(<App />, document.getElementById('root'));

    localStorage.setItem('react-token', keycloak.token);
    localStorage.setItem('react-refresh-token', keycloak.refreshToken);

    setTimeout(() => {
      keycloak
        .updateToken(70)
        .success(refreshed => {
          if (refreshed) {
            console.debug('Token refreshed' + refreshed);
          } else {
            console.warn(
              'Token not refreshed, valid for ' +
                Math.round(
                  keycloak.tokenParsed.exp +
                    keycloak.timeSkew -
                    new Date().getTime() / 1000
                ) +
                ' seconds'
            );
          }
        })
        .error(() => {
          console.error('Failed to refresh token');
        });
    }, 60000);
  })
  .error(() => {
    console.error('Authenticated Failed');
  });

serviceWorker.unregister();
 */
