import { useSelector } from "react-redux";
import { TokenState } from "../../store/tokens/tokensReducer";
import { useEffect, useState } from "react";
import Usuario from "../../models/Usuario";
import {buscaId} from "../../service/Service"
import { Container, Grid, Typography } from "@material-ui/core";
import { Avatar } from "@mui/material";

function perfilUsuario() {

  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

  const userId = useSelector<TokenState, TokenState["id"]>((state) => state.id);

  const [usuario, setUsuario] = useState<Usuario>({
    id: +userId,
    nome: "",
    usuario: "",
    foto: "",
    senha: "",
  });

  async function getUserById(id: number) {
    await buscaId(`/usuarios/${id}`, setUsuario, {
      headers: { Authorization: token },
    });
  }

  useEffect(() => {
    getUserById(+userId);
  }, []);

  return (
    <>
      <h1>TESTANDO A PÁGINA DO PERFIL DO USUÁRIO</h1>

      <Container>
        <Grid container>

            <Grid xs={3} alignItems='center' justifyContent='center'>
                <Avatar src={usuario.foto} alt="" style={{width: '15rem', height: '15rem', margin: '0 auto'}} />
                <Typography variant='h5' align='center'>
                    {usuario.nome}
                    </Typography>   

                    Você tem um total de {usuario.postagem?.length} postagens feitas

                    {usuario.postagem?.map((post) => (
                        <p>{post.titulo}</p>
                    ))}
            </Grid>

        </Grid>
      </Container>
    </>
  );
}

export default perfilUsuario;
