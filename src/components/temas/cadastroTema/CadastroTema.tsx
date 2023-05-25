import React, { useState, useEffect, ChangeEvent } from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import "./CadastroTema.css";
import { buscaId, post, put } from "../../../service/Service";
import { Tema } from "../../../models/Tema";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";

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
      alert("O tema não existe");
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      getById(id);
    }
  }, [id]);

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
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
        alert("Tema atualizado com sucesso!");
        back();
      } catch (error) {
        alert("Não foi possível atualizadar o Tema!");
      }
    } else {
      try {
        await post("/temas", tema, setTema, {
          headers: {
            Authorization: token,
          },
        });
        alert("Tema cadastrado com Sucesso!");
        back();
      } catch (error) {
        alert("Não foi possível cadastrar o Tema!");
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
