import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const rootElement = document.getElementById('root')!;
const loader = document.getElementById('root-loader');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// remove loader after React mounts
loader?.remove();