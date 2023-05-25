import React, { ChangeEvent, useEffect, useState } from 'react'
import './Login.css'
import {Grid, Box, Typography, TextField, Button} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../service/Service'
import { UsuarioLogin } from '../../models/UsuarioLogin'
import { useDispatch } from 'react-redux'
import { addId, addToken } from '../../store/tokens/action'

function Login() {

    // cria a variavel para navegação interna pela rota
    const history = useNavigate();

    // cria um estado para armazenamento no localStorage do navegador
    const dispatch = useDispatch();
    const [token, setToken] = useState('');

    // cria um estado de controle para o usuário preencher os dados de login
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    })

    // State novo para receber o JSON de conexão do backend
    const [respUsuarioLogin, setRespUsuarioLogin] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: ''
    })

    // atualiza os dados do estado acima, e ajuda a formar o JSON para a requisição
    function updateModel(event: ChangeEvent<HTMLInputElement>){
        setUsuarioLogin({
            ...usuarioLogin,
            [event.target.name]: event.target.value
        })
    }
    
    // Efeito que fica de olho no token, e quando chega algo diferente de vazio, navega o usuario pra home
    useEffect(()=>{
        if(token != ''){
            dispatch(addToken(token))
            history('/home')
        }
    }, [token])

    // função que envia o formulário para o backend
    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        // previne que o formulario atualize a pagina
        event.preventDefault();
        try{
            await login(`/usuarios/logar`, usuarioLogin, setRespUsuarioLogin)

            alert('Usuário logado com sucesso!');
        }catch(error)
        {
            alert('Dados do usuário inconsistentes. Erro ao logar!');
        }
    }

    //metodo para pegar o token e o id do json e guardar no redux
    useEffect(() => {
        if(respUsuarioLogin.token !== ''){
            dispatch(addToken(respUsuarioLogin.token))
            dispatch(addId(respUsuarioLogin.id.toString()))
            history('/home')
        }
    }, [respUsuarioLogin.token])

  return (
    <>
        <Grid container direction='row' justifyContent='center' alignItems='center' className='fundo'>
            <Grid alignItems='center' xs={12} >
                <Box paddingX={0}>
                   
                    <form onSubmit={onSubmit} className='form'>
                      
                       <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center'>Entrar</Typography>
                        
                       <TextField value={usuarioLogin.usuario} onChange={(event:ChangeEvent<HTMLInputElement>) => updateModel(event)} id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                        
                       <TextField value={usuarioLogin.senha} onChange={(event:ChangeEvent<HTMLInputElement>) => updateModel(event)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        
                        <Box marginTop={2} textAlign='center'>
                                <Button className='btnLogin' type='submit' variant='contained'>
                                    Entrar
                                </Button>
                        </Box>     

                        <Box display='flex' justifyContent='center' marginTop={10}>
                            <Box marginRight={1}>
                                <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                            </Box>
                            <Link to='/cadastrousuario'>
                            <button className="glow-on-hover" type="button">CADASTRA-SE AQUI!</button>
                            </Link>
                        </Box>

                    </form>

                </Box>
            </Grid>
        </Grid>
    </>
  )
}

export default Login
