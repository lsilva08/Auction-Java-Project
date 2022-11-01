import React from 'react';
import ReactDOM from 'react-dom';
import App from './router';
import Notifications from 'react-notify-toast';

import './index.css';
import 'semantic-ui-css/semantic.min.css'
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Notifications />
  </React.StrictMode>,
  document.getElementById('root')
);
