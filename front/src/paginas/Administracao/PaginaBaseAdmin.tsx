import {
  TextField,
  Button,
  Typography,
  Box,
  AppBar,
  Container,
  Toolbar,
  Link,
  Paper,
} from '@mui/material'
import { Outlet, useParams } from 'react-router-dom'

import { Link as RouterLink } from 'react-router-dom'

const PaginaBaseAdmin = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography>Administração</Typography>

            <Box sx={{ display: 'flex', flexGrow: 1, ml: 4}}>
              <Link component={RouterLink} to="/admin/restaurantes">
                <Button sx={{ my: 2, color: 'white' }}>Restaurantes</Button>
              </Link>

              <Link component={RouterLink} to="/admin/restaurantes/novo">
                <Button sx={{ my: 2, color: 'white' }}>Novo restaurante</Button>
              </Link>

              <Link component={RouterLink} to="/admin/pratos">
                <Button sx={{ my: 2, color: 'white' }}>Pratos</Button>
              </Link>

              <Link component={RouterLink} to="/admin/pratos/novo">
                <Button sx={{ my: 2, color: 'white' }}>Novo prato</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth="md" sx={{ mt: 1 }}>
          <Outlet />
        </Container>
      </Box>
    </>
  )
}

export default PaginaBaseAdmin
