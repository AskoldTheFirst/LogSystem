import { Container } from '@mui/material'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function App() {
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
