import Keycloak from 'keycloak-js';

const initOptions = {
  url: 'http://localhost:8080/auth',
  realm: 'springservice',
  clientId: 'bank-service',
  onLoad: 'login-required',
/*   'enable-cors': true,
  'bearer-only': true,
  'ssl-required': 'external' */
};

const keycloak = Keycloak(initOptions);

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = onAuthenticatedCallback => {
  keycloak
    .init({
      onLoad: 'login-required'
    })
    .success(auth => {
      if (!auth) {
        window.location.reload();
      } else {
        console.info('Authenticated');
      }

      //React Render
      //ReactDOM.render(<App />, document.getElementById('root'));
      onAuthenticatedCallback();

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
};

const doLogin = keycloak.login;

const doLogout = () => {
  //store.dispatch(resetUser());
  keycloak.logout();
};

const getToken = () => keycloak.token;

const updateToken = successCallback => {
  return keycloak
    .updateToken(5)
    .then(successCallback)
    .catch(doLogin);
};

const getUserInfos = () => ({
  roles: keycloak.tokenParsed.realm_access.roles,
  fullName: keycloak.tokenParsed.name,
  userName: keycloak.tokenParsed.preferred_username,
  firstName: keycloak.tokenParsed.given_name,
  lastName: keycloak.tokenParsed.family_name,
  email: keycloak.tokenParsed.email
});

export default {
  initKeycloak,
  doLogin,
  doLogout,
  getToken,
  updateToken,
  getUserInfos
};
