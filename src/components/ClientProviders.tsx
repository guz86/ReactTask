'use client';

import React from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary';
import { store } from '../store';
import { ThemeProvider } from '../ThemeContext';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>{children}</ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
