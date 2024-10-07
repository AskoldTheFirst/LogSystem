import { Container } from '@mui/material'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react';
import http from '../Biz/http';

function App() {

  useEffect(() => {

    http.App.logger().then((jsLogger) => {
      eval(jsLogger);
    });

    http.App.tracer().then((jsTracer) => {
      eval(jsTracer);
    });
    
  }, []);

  return (
    <>
      <Header />
      <Container sx={{ marginTop: 4 }}>
        <Outlet />
      </Container>
    </>
  )
}

export default App
