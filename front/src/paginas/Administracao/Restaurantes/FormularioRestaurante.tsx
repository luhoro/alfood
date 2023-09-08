import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import IRestaurante from '../../../interfaces/IRestaurante'
import http from '../../../http'


const FormularioRestaurante = () => {
  const parametros = useParams()
  const [nomeRestaurante, setNomeRestaurante] = useState('')

  useEffect(() => {
    if (parametros.id) {
      http
        .get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then((res) => setNomeRestaurante(res.data.nome))
    }
  }, [parametros])

  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (parametros.id) {
      http
        .put(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => alert('restaurante atualizado com sucesso'))
    } else {
      http
        .post('restaurantes/', {
          nome: nomeRestaurante,
        })
        .then(() => alert('restaurante cadastrado com sucesso'))
    }
  }

  return (
    <Box>
      <Container maxWidth="md" sx={{ mt: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              marginTop: '2rem',
              flexGrow: 1,
            }}
          >
            <Typography component="h1" variant="h5">
              Formulário de restaurantes
            </Typography>

            <Box
              component="form"
              onSubmit={aoSubmeterForm}
              sx={{ width: '100%' }}
            >
              <TextField
                value={nomeRestaurante}
                onChange={(event) => setNomeRestaurante(event.target.value)}
                id="standard-basic"
                label="Nome do restaurante"
                variant="standard"
                fullWidth
                required
              />
              <Button
                sx={{ marginTop: '1rem' }}
                type="submit"
                variant="outlined"
                fullWidth
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default FormularioRestaurante
