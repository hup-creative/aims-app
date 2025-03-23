import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './MainApp';  // Changed from './App' to './MainApp'
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);