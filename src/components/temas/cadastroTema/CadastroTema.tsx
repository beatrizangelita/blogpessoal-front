import React, { useState, useEffect, ChangeEvent } from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import "./CadastroTema.css";
import { buscaId, post, put } from "../../../service/Service";
import { Tema } from "../../../models/Tema";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { toast } from "react-toastify";

function CadastroTema() {
  
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  // pegar o token armazenado
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

  // iniciando a variavel para armazenar o tema digitado
  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: "",
  });

  async function getById(id: string) {
    try {
      await buscaId(`/temas/${id}`, setTema, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {

      toast.error('O tema não existe', {
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

  useEffect(() => {
    if (id !== undefined) {
      getById(id);
    }
  }, [id]);

  useEffect(() => {
    if (token === "") {

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
  }, []);

  // função que pega a alteração do input e armazena os dados
  function updatedTema(event: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [event.target.name]: event.target.value,
    });
  }

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (id !== undefined) {
      try {
        await put("/temas", tema, setTema, {
          headers: {
            Authorization: token,
          },
        });

        toast.success('Tema atualizado com sucesso!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
          progress: undefined,
        });   
        back();
      } catch (error) {

        toast.error('Não foi possível atualizadar o Tema!', {
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
        await post("/temas", tema, setTema, {
          headers: {
            Authorization: token,
          },
        });

        toast.success('Tema cadastrado com Sucesso!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
          progress: undefined,
        });   

        back();
      } catch (error) {

        toast.error('Não foi possível cadastrar o Tema!', {
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
    navigate("/temas");
  }

  return (
    <Container maxWidth="sm" className="topo">
      <form onSubmit={onSubmit}>
        <Typography variant="h3" color="textSecondary" component="h1" align="center" >
          {id !== undefined ? " Atualizar " : " Cadastrar "}
          Tema
        </Typography>

        <TextField
          value={tema.descricao}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)}
          id="descricao"
          label="descricao"
          variant="outlined"
          name="descricao"
          margin="normal"
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" disabled={tema.descricao.length < 4}>
        {id !== undefined ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </form>
    </Container>
  );
}

export default CadastroTema;
