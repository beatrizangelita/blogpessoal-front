import { AppBar, Grid, Toolbar, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { addToken } from "../../../store/tokens/action";

function Navbar() {

  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

  function goLogout() {
    dispatch(addToken(''));
    alert("Usuário deslogado");
    navigate("/login");
  }

  var navbarComponent;
  if(token != ""){
    navbarComponent = 
    <AppBar position="static" className="navbar">

    <Toolbar variant="dense">

    <Grid container justifyContent={'space-between'} className='fonte'>

      <Box className="cursor">
        <Typography variant="h5" color="inherit">
          BlogPessoal - Desenhos
        </Typography>
      </Box>
      
      <Box display="flex" justifyContent="start">

        <Link to="/home" className="text-decorator-none">
          <Box mx={1} className="cursor">
            <Typography variant="h6" color="inherit">
              Home
            </Typography>
          </Box>
        </Link>

        <Link to="/postagens" className="text-decorator-none">
          <Box mx={1} className="cursor">
            <Typography variant="h6" color="inherit">
              Postagens
            </Typography>
          </Box>
        </Link>

        <Link to="/temas" className="text-decorator-none">
          <Box mx={1} className="cursor">
            <Typography variant="h6" color="inherit">
              Temas
            </Typography>
          </Box>
        </Link>

        <Link to="/formularioTema" className="text-decorator-none"> 
          <Box mx={1} className="cursor">
            <Typography variant="h6" color="inherit">
              Cadastrar Tema
            </Typography>
          </Box>
        </Link>

        <Link to="/perfilUsuario" className="text-decorator-none"> 
          <Box mx={1} className="cursor">
            <Typography variant="h6" color="inherit">
              Perfil
            </Typography>
          </Box>
        </Link>

        <Box mx={1} className="cursor" onClick={goLogout}>
            <Typography variant="h6" color="inherit">
              Logout
            </Typography>
        </Box>
        
      </Box>
      
      </Grid>
    </Toolbar>
  </AppBar>
  }

  return (
    <>
      {navbarComponent}
    </>
  );
}

export default Navbar;
