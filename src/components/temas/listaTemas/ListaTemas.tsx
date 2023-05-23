import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import {Box} from '@mui/material';
import './ListaTemas.css';
import { Tema } from '../../../models/Tema';
import useLocalStorage from 'react-use-localstorage';
import { busca } from '../../../service/Service';

function ListaTemas() {

  const [temas, setTemas] = useState<Tema[]>([])
  const [token, setToken] = useLocalStorage('token');

  function getTemas(){
    busca('/temas', setTemas, {
      headers:{
        Authorization: token
      }
    })
  }

  return (
    <>

    <h2>Lista de Temas: </h2>
    {temas.map((tema) => (

      <Box m={2} >
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Tema
            </Typography>
            <Typography variant="h5" component="h2">
              Descricao
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5} >

              <Link to="" className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" className="marginLeft" size='small' color="primary" >
                    Editar
                  </Button>
                </Box>
              </Link>
              <Link to="" className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size='small' color="secondary">
                    deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
    ))}
    </>
  );
}


export default ListaTemas;