import { useState, useEffect } from 'react'
import IRestaurante from '../../../interfaces/IRestaurante'
import {
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Table,
  Paper,
  TableContainer,
  Button,
} from '@mui/material'
import axios from 'axios'
import { Link } from 'react-router-dom'
import http from '../../../http'

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    http
      .get<IRestaurante[]>('restaurantes/')
      .then((res) => setRestaurantes(res.data))
  }, [])

  const excluir = (restauranteAExcluir: IRestaurante) => {
    http
      .delete(`restaurantes/${restauranteAExcluir.id}/`)
      .then(res => {
        const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteAExcluir.id)
        setRestaurantes([ ...listaRestaurante])
      })
  } 

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                <Link to={`/admin/restaurantes/${restaurante.id}`}>
                  [ Editar ]
                </Link>
              </TableCell>
              <TableCell>
                <Button
                  onClick={()=> excluir(restaurante)}
                  variant='outlined'
                  color='error'
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoRestaurantes
