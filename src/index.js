import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, HashRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      {/* <HashRouter> */}
      <App />
      {/* </HashRouter> */}
    </Router>
  </React.StrictMode>
);
