import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import SockJsClient from 'react-stomp';

import { AuthProvider } from 'authentication-context';
import { ReactQueryDevtools } from 'react-query-devtools';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

const SOCKET_URL = 'http://localhost:8081/ws-chat/';
let onConnected = () => {
  console.log('Connected!!');
};

let onMessageReceived = msg => {
  console.log('New Message Received!!', msg);
};
export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthProvider>
          <SockJsClient
            debug
            onConnect={() => console.log('Connected!!')}
            onDisconnect={console.log('Disconnected!')}
            onMessage={msg => console.log('New Message Received!!', msg)}
            topics={['/topic/group']}
            url={SOCKET_URL}
          />

          <Router history={browserHistory}>
            <Routes />
          </Router>
          <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
        </AuthProvider>
      </ThemeProvider>
    );
  }
}
