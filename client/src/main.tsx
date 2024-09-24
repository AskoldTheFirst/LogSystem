import { createRoot } from 'react-dom/client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './App/Routes.tsx';

// TODO: can we createContext() here? At least for using in http.
createRoot(document.getElementById('root')!).render(
  // TODO: why to use StrictMode?
  // <StrictMode>
    <RouterProvider router={router} />
  //</StrictMode>,
)
