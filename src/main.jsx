import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css'; // Tailwind styles

import { ClerkProvider } from '@clerk/clerk-react'
const PUBLISHABLE_KEY = "pk_test_cHJvdmVuLW1vbmtleS03OC5jbGVyay5hY2NvdW50cy5kZXYk";
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
