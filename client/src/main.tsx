import { createRoot } from 'react-dom/client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './App/Routes.tsx';
import { StrictMode } from 'react';
import { GlobalContextProvider } from './globalContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  </StrictMode>
)
