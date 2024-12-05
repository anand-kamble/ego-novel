import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import './index.css';
import DarkModeProvider from './contexts/DarkModeContext';
import "@radix-ui/themes/styles.css";
import './i18n';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeProvider>
          <App />
      </DarkModeProvider>
    </Provider>
  </React.StrictMode >
);

