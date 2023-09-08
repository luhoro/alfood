import { useState, useEffect } from 'react'
import IPrato from '../../../interfaces/IPrato'
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
import { Link } from 'react-router-dom'
import http from '../../../http'

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    http.get<IPrato[]>('pratos/').then((res) => setPratos(res.data))
  }, [])

  const excluir = (pratoAExcluir: IPrato) => {
    http.delete(`pratos/${pratoAExcluir.id}/`).then((res) => {
      const listaPratos = pratos.filter(
        (prato) => prato.id !== pratoAExcluir.id
      )
      setPratos([...listaPratos])
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>

              <TableCell>{prato.descricao}</TableCell>

              <TableCell>{prato.tag}</TableCell>

              <TableCell>
                <a href={prato.imagem} target='_blank' rel='noreferrer'>Ver</a>
              </TableCell>

              <TableCell>
                <Link to={`/admin/pratos/${prato.id}`}>[Editar]</Link>
              </TableCell>

              <TableCell>
                <Button
                  onClick={() => excluir(prato)}
                  variant="outlined"
                  color="error"
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

export default AdministracaoPratos
