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

      </Routes>

    </BrowserRouter>

  );

}

export default App;