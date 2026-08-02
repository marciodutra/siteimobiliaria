import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Imoveis from "./pages/Imoveis";
import MeusImoveis from "./pages/MeusImoveis";
import CadastroImovel from "./pages/CadastroImovel";

import Layout from "./components/Layout";
import EditarImovel from "./pages/EditarImovel";



function App() {


  return (

    <BrowserRouter>


      <Routes>


        <Route
          path="/"
          element={<Login />}
        />


        <Route
          path="/login"
          element={<Login />}
        />



        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />



        <Route
          path="/imoveis"
          element={
            <Layout>
              <Imoveis />
            </Layout>
          }
        />



        <Route
          path="/meus-imoveis"
          element={
            <Layout>
              <MeusImoveis />
            </Layout>
          }
        />



        <Route
          path="/cadastro-imovel"
          element={
            <Layout>
              <CadastroImovel />
            </Layout>
          }
        />

        <Route
          path="/editar-imovel/:id"
          element={
            <Layout>
              <EditarImovel />
            </Layout>
          }
        />


      </Routes>


    </BrowserRouter>

  );

}


export default App;