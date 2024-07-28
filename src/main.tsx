import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { ThemeProvider } from './ThemeContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
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
