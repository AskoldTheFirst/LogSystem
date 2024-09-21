import { Container } from '@mui/material'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react';
import http from '../Biz/http';
import { AppState } from '../Biz/Types/AppState';
import { UserDto } from '../DTOs/UserDto';

export const Ctx = createContext<AppState>({
  user: getCurrentUser(),
  setUser: null
});

function getCurrentUser(): UserDto | null {
  const stringUser = localStorage.getItem('user');
  if (stringUser) {
    return JSON.parse(stringUser);
  }

  return null;
}

function App() {
  const [user, setUser] = useState<UserDto | null>(getCurrentUser());

  useEffect(() => {
    http.Account.currentUser().then(userDto => {
      if (userDto) {
        localStorage.setItem('user', JSON.stringify(userDto));
        setUser(userDto);
      }
      else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });
  }, []);

  return (
    <Ctx.Provider value={{ user, setUser }}>
      <Header />
      <Container sx={{ marginTop: 4 }}>
        <Outlet />
      </Container>
    </Ctx.Provider>
  )
}

export default App
