'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import ErrorBoundary from '../../components/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ThemeProvider } from '../../ThemeContext';

const App = dynamic(() => import('../pages/index'), { ssr: false });

export function ClientOnly() {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
