import React, { ChangeEvent, useEffect, useState } from 'react'
import {Typography, Button, Card, CardActions, CardContent } from "@material-ui/core"
import {Box} from '@mui/material';
import './DeletarPostagens.css';
import { Postagem } from '../../../models/Postagem';
import { buscaId, deleteId } from '../../../service/Service';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';

function DeletarPostagem() {
    
  const navigate = useNavigate();

  const { id } = useParams<{id: string}>();

  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

  const [postagens, setPostagens] = useState<Postagem>()

  useEffect(() => {
      if (token == "") {
          alert("Você precisa estar logado")
          navigate("/login")
  
      }
  }, [token])

  async function getById(id: string) {
    await buscaId(`/postagens/${id}`, setPostagens, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      getById(id);
    }
  }, []);

      function sim() {
        navigate('/postagens')
          deleteId(`/postagens/${id}`, {
            headers: {
              'Authorization': token
            }
          });
          alert('Postagem deletada com sucesso!');
        }
      
        function nao() {
          navigate('/postagens')
        } 

  return (
    <>
      <Box m={2}>
        <Card variant="outlined" >
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Postagem:
              </Typography>
              <Typography color="textSecondary" >
              {postagens?.titulo}
              </Typography>
            </Box>

          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
              <Button onClick={sim}  variant="contained" className="marginLeft" size='large' color="primary">
                Sim
              </Button>
              </Box>
              <Box>
              <Button onClick={nao}  variant="contained" size='large' color="secondary">
                Não
              </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarPostagem;