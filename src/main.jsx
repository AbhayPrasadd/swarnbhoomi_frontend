import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ← import this
import App from './App.jsx';
import './index.css';
import './i18n';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* ← wrap App here */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
