import React from 'react';
import Navbar from './components/estaticos/navbar/Navbar';
import Footer from './components/estaticos/footer/footer';
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cadastrousurio from './paginas/cadastroUsuario/CadastroUsuario';
import ListaPostagens from './components/postagens/listaPostagens/ListaPostagens';
import ListaTemas from './components/temas/listaTemas/ListaTemas';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
          <div style={{ minHeight: '100vh' }}>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/login' element={<Login />} />
              <Route path='/home' element={<Home />} />
              <Route path='/cadastrousuario' element={<Cadastrousurio />} />
              <Route path='/temas' element={<ListaTemas />} />
              <Route path='/postagens' element={<ListaPostagens />} />
            </Routes>
          </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
