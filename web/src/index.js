import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// Use SimplifiedApp for development without all dependencies
// Switch to App for full features after running npm install
import App from './components/SimplifiedApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
