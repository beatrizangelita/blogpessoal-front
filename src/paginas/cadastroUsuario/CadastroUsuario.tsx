import React , {useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Usuario from '../../models/Usuario';
import { cadastroUsuario } from '../../service/Service'
import { Grid, Typography, Button, TextField } from '@material-ui/core';
import {Box} from '@mui/material';
import { Link } from 'react-router-dom';
import './CadastroUsuario.css';

function CadastroUsuario(){

    let navigate = useNavigate();
    const [confirmarSenha,setConfirmarSenha] = useState<String>("")
    const [usuario, setUsuario] = useState<Usuario>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: ''
        })

    const [usuarioResult, setUsuarioResult] = useState<Usuario>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: ''
        })

    useEffect(() => {
        if (usuarioResult.id != 0) {
            navigate("/login")
        }
    }, [usuarioResult])


    function confirmarSenhaHandle(event: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(event.target.value)
    }


    function updateModel(event: ChangeEvent<HTMLInputElement>) {

        setUsuario({
            ...usuario,
            [event.target.name]: event.target.value
        })

    }
    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        if(confirmarSenha == usuario.senha){
        cadastroUsuario(`/usuarios/cadastrar`, usuario, setUsuarioResult)
        alert('Usuario cadastrado com sucesso')
        }else{
            alert('Dados inconsistentes. Favor verificar as informações de cadastro.')
        }
    }

    return(
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='imgCadastro'></Grid>
            
            <Grid item xs={6} alignItems='center'>
                <Box padding={10 }>
                    
                <form onSubmit={onSubmit}>
                      
                      <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2'>Cadastrar Usuário</Typography>
                       
                       <TextField value={usuario.nome} onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)} id='nome' label='Nome' variant='outlined' name='nome' margin='normal' fullWidth />

                       <TextField value={usuario.usuario} onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)} id='usuario' label='Usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                       
                       <TextField value={usuario.senha} onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)} id='senha' label='Senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                       
                       <TextField value={confirmarSenha} onChange={(event: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(event)} id='confirmarSenha' label='Confirmar Senha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />
                           
                       <Box marginTop={2} textAlign='center'>

                           <Link to='/login' className='text-decorator-none'>
                               <Button variant='contained' color='secondary' className='btnCancelar'>
                                   Cancelar
                               </Button>
                           </Link>

                           <Button type='submit' variant='contained' color='primary'>
                                        Cadastrar
                                </Button>
                           
                       </Box>     

                   </form>
                </Box>
            </Grid>
        </Grid>
    );
}

export default CadastroUsuario;