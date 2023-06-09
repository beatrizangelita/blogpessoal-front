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
import Usuario from "../../../models/Usuario";
import { toast } from "react-toastify";

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
    usuario: null //linha adicionada para inserir o usuário dono da postagem
  });

  //Busca o ID dentro do redux
  const userId = useSelector<TokenState, TokenState['id']>(
    (state) => state.id
  )

  //State que vai controlar o usuário que será inserido na postagem
  const [usuario, setUsuario] = useState<Usuario>({
    id: +userId,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  useEffect(() => {
    if (token == "") {
      toast.error('Você precisa estar logado', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        progress: undefined,
      });   
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
        toast.error('Token expirado, logue novamente', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
          progress: undefined,
        });  
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
      usuario: usuario //adicionar o usuário dentro da postagem que está sendo enviada para o backend
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

        toast.success('Postagem, atualizada com sucesso!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
          progress: undefined,
        });  
        
        navigate('/postagens')
      } catch (error) {

        toast.error('Não foi possível atualizar!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
          progress: undefined,
        });  
      }
    } else {
      try {
        await post('/postagens', postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        toast.success('Postagem, cadastrada com sucesso!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
          progress: undefined,
        }); 

        navigate('/postagens')
      } catch (error) {

        toast.error('Não foi possível cadastrar a postagem!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
          progress: undefined,
        }); 
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
