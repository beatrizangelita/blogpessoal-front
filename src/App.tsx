import React from "react";
import Navbar from "./components/estaticos/navbar/Navbar";
import Footer from "./components/estaticos/footer/footer";
import Home from "./paginas/home/Home";
import Login from "./paginas/login/Login";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastrousurio from "./paginas/cadastroUsuario/CadastroUsuario";
import ListaPostagens from "./components/postagens/listaPostagens/ListaPostagens";
import ListaTemas from "./components/temas/listaTemas/ListaTemas";
import CadastroTema from "./components/temas/cadastroTema/CadastroTema";
import DeletarTema from "./components/temas/deletarTema/DeletarTema";
import DeletarPostagens from "./components/postagens/deletarPostagens/DeletarPostagens";
import CadastroPostagens from "./components/postagens/cadastroPostagens/CadastroPostagens";
import { Provider } from "react-redux";
import store from "./store/store";
import PerfilUsuario from "./components/perfilUsuario/PerfilUsuario";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <>
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <div style={{ minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastrousuario" element={<Cadastrousurio />} />
            <Route path="/temas" element={<ListaTemas />} />
            <Route path="/postagens" element={<ListaPostagens />} />
            <Route path="/formularioPostagens" element={<CadastroPostagens />} />
            <Route path="/formularioPostagens/:id" element={<CadastroPostagens />} />
            <Route path="/formularioTema" element={<CadastroTema />} />
            <Route path="/formularioTema/:id" element={<CadastroTema />} />
            <Route path="/deletarTema/:id" element={<DeletarTema />} />
            <Route path="/deletarPostagens/:id" element={<DeletarPostagens />} />
            <Route path="/perfilUsuario" element={<PerfilUsuario />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
