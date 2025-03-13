import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { ContextProviders } from './contexts';
import { router } from './routes';
import '@/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextProviders>
      <RouterProvider router={router} />
    </ContextProviders>
  </React.StrictMode>
);
