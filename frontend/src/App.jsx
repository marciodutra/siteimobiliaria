import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Imoveis from "./pages/Imoveis";
import MeusImoveis from "./pages/MeusImoveis";
import CadastroImovel from "./pages/CadastroImovel";
import EditarImovel from "./pages/EditarImovel";

import LayoutSistema from "./components/LayoutSistema";
import LayoutSite from "./components/LayoutSite";
import DetalhesImovel from "./pages/DetalhesImovel";
import BuscarImoveis from "./pages/BuscarImoveis";
import Usuarios from "./pages/Usuarios";
import Comprar from "./pages/Comprar";
import Alugar from "./pages/Alugar";
import Mensagens from "./pages/Mensagens";
import ListaUsuarios from "./pages/ListaUsuarios";
import Cliente from "./pages/Cliente";
import ClienteLogin from "./pages/ClienteLogin";
import ClienteCadastro from "./pages/ClienteCadastro";
import ClienteDashboard from "./pages/ClienteDashboard";
import Contratos from "./pages/Contratos";
import NovoContrato from "./pages/NovoContrato";
import ClienteImoveis from "./pages/ClienteImoveis";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <LayoutSite>
              <Home />
            </LayoutSite>
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <LayoutSistema>
              <Dashboard />
            </LayoutSistema>
          }
        />

        <Route
          path="/imoveis"
          element={
            <LayoutSistema>
              <Imoveis />
            </LayoutSistema>
          }
        />

        <Route
          path="/meus-imoveis"
          element={
            <LayoutSistema>
              <MeusImoveis />
            </LayoutSistema>
          }
        />

        <Route
          path="/cadastro-imovel"
          element={
            <LayoutSistema>
              <CadastroImovel />
            </LayoutSistema>
          }
        />

        <Route
          path="/editar-imovel/:id"
          element={
            <LayoutSistema>
              <EditarImovel />
            </LayoutSistema>
          }
        />

        <Route
          path="/imovel/:id"
          element={
            <LayoutSite>
              <DetalhesImovel />
            </LayoutSite>
          }
        />

        <Route
          path="/buscar-imoveis"
          element={
            <LayoutSite>
              <BuscarImoveis />
            </LayoutSite>
          }
        />

        <Route
          path="/usuarios"
          element={
            <LayoutSistema>
              <Usuarios />
            </LayoutSistema>
          }
        />

        <Route
          path="/comprar"
          element={
            <LayoutSite>
              <Comprar />
            </LayoutSite>
          }
        />

        <Route
          path="/alugar"
          element={
            <LayoutSite>
              <Alugar />
            </LayoutSite>
          }
        />

        <Route
          path="/mensagens"
          element={
            <LayoutSistema>
              <Mensagens />
            </LayoutSistema>
          }
        />

        <Route
          path="/lista-usuarios"
          element={
            <LayoutSistema>
              <ListaUsuarios />
            </LayoutSistema>
          }
        />

        <Route
          path="/cliente"
          element={
            <LayoutSite>
              <Cliente />
            </LayoutSite>
          }
        />


        <Route
          path="/cliente/login"
          element={
            <LayoutSite>
              <ClienteLogin />
            </LayoutSite>
          }
        />


        <Route
          path="/cliente/cadastro"
          element={
            <LayoutSite>
              <ClienteCadastro />
            </LayoutSite>
          }
        />

        <Route
          path="/cliente/dashboard"
          element={
            <ClienteDashboard />
          }
        />

        <Route
          path="/contratos"
          element={
            <LayoutSistema>
              <Contratos />
            </LayoutSistema>
          }
        />

        <Route
          path="/novo-contrato"
          element={
            <LayoutSistema>
              <NovoContrato />
            </LayoutSistema>
          }
        />

        <Route
          path="/cliente/imoveis"
          element={
            <ClienteImoveis />
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;