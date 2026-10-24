import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safely ensure window.fetch is writable if a host/extension defined it as getter-only
try {
  const nativeFetch = typeof window !== 'undefined' && window.fetch ? window.fetch.bind(window) : undefined;
  if (nativeFetch) {
    const winDesc = Object.getOwnPropertyDescriptor(window, 'fetch');
    if (winDesc && winDesc.configurable && winDesc.get && !winDesc.set) {
      Object.defineProperty(window, 'fetch', {
        value: nativeFetch,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    }
  }
} catch {
  // Ignore if non-configurable
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

