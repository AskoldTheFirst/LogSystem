import { Container } from '@mui/material'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { createContext, useState } from 'react';
import { UserDto } from '../DTOs/UserDto';

export const GlobalCtx = createContext();

function App() {
  const [user, setUser] = useState<UserDto | null>(null);

  return (
    <>
      <GlobalCtx.Provider value={[user, setUser ]}>
        {/* <CssBaseline /> */}
        <Header />
        <Container sx={{marginTop: 4}}>
          <Outlet />
        </Container>
      </GlobalCtx.Provider>
    </>
  )
}

export default App
