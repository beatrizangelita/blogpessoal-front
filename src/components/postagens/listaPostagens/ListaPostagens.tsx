import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Postagem } from '../../../models/Postagem';
import { busca } from '../../../service/Service'
import {Button, Typography } from '@material-ui/core';
import {Box, Grid} from '@mui/material';
import './ListaPostagens.css';
import {useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function ListaPostagem() {
  
  const [postagens, setPostagens] = useState<Postagem[]>([])
  const navigate = useNavigate();
  
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );
  
  function getPostagens() {
    busca('/postagens', setPostagens, {
      headers: {
        Authorization: token
      }
    })
  }
  
  useEffect(() => {
    getPostagens()
  }, [])

  useEffect(() => {
    if(token === ''){ 
      toast.info('Usuário deslogado', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        progress: undefined,
      });   
      navigate('/login')
    }
  }, [])

  return (
    <>
      <Grid container my={2} px={4}>
       
        <Box display='flex' flexWrap={'wrap'} width={'100%'}>
         
          {postagens.map((post) => (
         
         <Grid item xs={3} border={1} borderRadius={2} borderColor={'lightgray'} p={2}>
           
           <Typography>Usuário: {post.usuario?.nome}</Typography>

            <Typography>Título: {post.titulo}</Typography>
           
            <Typography>Texto: {post.texto}</Typography>
           
            <Typography>Data: {new Intl.DateTimeFormat('pt-br', {dateStyle: 'full'}).format(new Date(post.data))}</Typography>
            
            <Typography>Tema: {post.tema?.descricao}</Typography>
            
            <Box display={'flex'} gap={4}>
            
              <Link to={`/formularioPostagens/${post.id}`}>
                <Button fullWidth variant='contained' color='primary'>Atualizar</Button>
              </Link>
            
              <Link to={`/deletarPostagens/${post.id}`}>
                <Button fullWidth variant='contained' color='secondary'>Deletar</Button>
              </Link>
            
            </Box>
          </Grid>
          ))}
        </Box>
      </Grid>
    </>
  )
}

export default ListaPostagem;