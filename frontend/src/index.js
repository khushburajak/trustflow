import React from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);