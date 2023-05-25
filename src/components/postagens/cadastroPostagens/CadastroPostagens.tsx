import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import "./CadastroPostagens.css";
import { useNavigate, useParams } from "react-router-dom";
import { Tema } from "../../../models/Tema";
import { Postagem } from "../../../models/Postagem";
import { busca, buscaId, post, put } from "../../../service/Service";
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { addToken } from "../../../store/tokens/action";

function CadastroPostagens() {
  
  const navigate = useNavigate();
  
  const { id } = useParams<{ id: string }>();
  
  const [temas, setTemas] = useState<Tema[]>([]);
  
  const dispatch = useDispatch();
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: "",
  });

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: "",
    texto: "",
    data: "",
    tema: null,
  });

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado");
      navigate("/login");
    }
  }, [token]);

  async function getTemas() {
    try {
      await busca('/temas', setTemas, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().contains('403')) {
        alert('Token expirado, logue novamente');
        dispatch(addToken(''));
        navigate('/login');
      }
    }
  }

  async function getPostById(id: string) {
    await busca(`/postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {
    getTemas();
    if(id !== undefined) {
      getPostById(id)
    }
  }, []);

  function updatedPostagem(event: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [event.target.name]: event.target.value,
      tema: tema,
    });
  }

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (id !== undefined) {
      try {
        await put('/postagens', postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        alert('Postagem, atualizada com sucesso!')
        navigate('/postagens')
      } catch (error) {
        alert('Não foi possível atualizar!');
      }
    } else {
      try {
        await post('/postagens', postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        alert('Postagem, cadastrada com sucesso!')
        navigate('/postagens')
      } catch (error) {
        alert('Não foi possível cadastrar a postagem!');
      }
    }
  }

  function back() {
    navigate("/postagens");
  }

  return (
    <Container maxWidth="sm" className="topo">
      <form onSubmit={onSubmit}>
        
        <Typography variant="h3" color="textSecondary" component="h1" align="center" >
        {id !== undefined ? ' Atualização ' : ' Cadastro '} da Postagem
        </Typography>
        
        <TextField
          name="titulo"
          fullWidth
          margin="normal"
          label="Titulo da postagem"
          helperText='Pelo menos 5 caracteres'
          value={postagem.titulo}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updatedPostagem(event)
          }
        />

        <TextField
          name="texto"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          label="Texto da postagem"
          value={postagem.texto}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updatedPostagem(event)
          }
        />

        <FormControl>
          <InputLabel id="demo-simple-select-helper-label"> Tema </InputLabel>
          
          <Select
            labelId="selectTema"
            onChange={(event) =>
              buscaId(`/temas/${event.target.value}`, setTema, {
                headers: {
                  Authorization: token,
                },
              })
            }
          >
            {temas.map((tema) => (
                <MenuItem key={tema.id} value={tema.id}>
                  {tema.descricao}
                </MenuItem>
              ))}

          </Select>
          <FormHelperText>Escolha um tema para a postagem</FormHelperText>
          
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={tema.id === 0}>
            {id !== undefined ? 'Atualizar Postagem' : 'Cadastrar Postagem'}
          </Button>
          
        </FormControl>
      </form>
    </Container>
  );
}
export default CadastroPostagens;
