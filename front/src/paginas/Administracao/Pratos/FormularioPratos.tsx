import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { useState, useEffect } from 'react'
import http from '../../../http'
import IPrato from '../../../interfaces/IPrato'
import ITag from '../../../interfaces/ITag'
import IRestaurante from '../../../interfaces/IRestaurante'
import { useParams } from 'react-router-dom'

const FormularioRestaurante = () => {
  const [nomePrato, setNomePrato] = useState('')
  const [descricao, setDescricao] = useState('')

  const [tags, setTags] = useState<ITag[]>([])
  const [tag, setTag] = useState('')

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [restaurante, setRestaurante] = useState('')

  const [imagem, setImagem] = useState<File | null>(null)

  useEffect(() => {
    http.get<{ tags: ITag[] }>(`tags/`).then((res) => setTags(res.data.tags))
    http
      .get<IRestaurante[]>('restaurantes/')
      .then((res) => setRestaurantes(res.data))
  }, [])

  const parametros = useParams()
  useEffect(() => {
    if (parametros.id) {
      http
        .get<IPrato>(`pratos/${parametros.id}/`)
        .then((res) => {
          setNomePrato(res.data.nome)
          setDescricao(res.data.descricao)
          setTag(res.data.tag)
          setRestaurante(res.data.restaurante)
        })
    }
  }, [parametros])

  const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setImagem(event.target.files[0])
    } else {
      setImagem(null)
    }
  }

  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()

    formData.append('nome', nomePrato)
    formData.append('descricao', descricao)
    formData.append('tag', tag)
    formData.append('restaurante', restaurante)
    if (imagem) {
      formData.append('imagem', imagem)
    }

    http
      .request({
        url: 'pratos/',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      })
      .then(() => {
        setDescricao('')
        setNomePrato('')
        setTag('')
        setRestaurante('')
        alert('Prato cadastrado com sucesso!')
      })
      .catch((error) => alert(error))
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
              Formulário de pratos
            </Typography>

            <Box
              component="form"
              onSubmit={aoSubmeterForm}
              sx={{ width: '100%' }}
            >
              <TextField
                value={nomePrato}
                onChange={(event) => setNomePrato(event.target.value)}
                id="standard-basic"
                label="Nome do prato"
                variant="standard"
                fullWidth
                required
                margin="dense"
              />

              <TextField
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
                id="standard-basic"
                label="Descrição do prato"
                variant="standard"
                fullWidth
                required
                margin="dense"
              />

              <FormControl margin="dense" fullWidth>
                <InputLabel id="select-tag">Tag</InputLabel>
                <Select
                  labelId="select-tag"
                  value={tag}
                  onChange={(event) => setTag(event.target.value)}
                >
                  {tags.map((tag) => (
                    <MenuItem value={tag.value} key={tag.id}>
                      {tag.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl margin="dense" fullWidth>
                <InputLabel id="select-restaurante">Restaurante</InputLabel>
                <Select
                  labelId="select-restaurante"
                  value={tag}
                  onChange={(event) => setRestaurante(event.target.value)}
                >
                  {restaurantes.map((restaurante) => (
                    <MenuItem value={restaurante.id} key={restaurante.id}>
                      {restaurante.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <input type="file" onChange={selecionarArquivo} />

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
