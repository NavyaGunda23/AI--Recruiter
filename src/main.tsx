import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import AppRoutes from '@/routes';
import './index.css';
import { AirtableProvider } from './context/AirtableContext';
import AirtableListener from './components/AirtableListener';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AirtableProvider >
      <AirtableListener />
      <AppRoutes />
      </AirtableProvider>
    </Provider>
  </React.StrictMode>
);