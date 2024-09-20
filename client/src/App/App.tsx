import { Container } from '@mui/material'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react';
import { UserDto } from '../DTOs/UserDto';
import http from '../Biz/http';

export const GlobalCtx = createContext({});

function App() {
  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    const stringUser = localStorage.getItem('user');
    if (stringUser)
    {
      const user = JSON.parse(stringUser);
      setUser(user);

      http.Account.currentUser().then(userDto => {
        if (userDto)
          localStorage.setItem('user', JSON.stringify(userDto));
      });
    }
  }, []);

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
