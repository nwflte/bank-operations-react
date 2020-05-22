export const REACT_APP_BACKEND_URL = window.REACT_APP_BACKEND_URL
  ? formatURL(window.REACT_APP_BACKEND_URL)
  : 'http://localhost:8081/';
export const REACT_APP_KEYCLOAK_URL = window.REACT_APP_KEYCLOAK_URL
  ? formatURL(window.REACT_APP_KEYCLOAK_URL)
  : 'http://localhost:8080/auth';

function formatURL(url) {
  let formatedURL =
    url.includes('http://') || url.includes('https://') ? url : 'http://' + url;

  return formatedURL[formatedURL.length - 1] === '/'
    ? formatedURL
    : formatedURL + '/';
}
