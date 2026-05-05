import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/home";
import AdminIngredientePage from "./pages/admin/adminIngrediente";
import AdminPedidosPage from "./pages/admin/AdminPedidos";
import AdminclientesPage from "./pages/admin/adminClientes";
import AdminMesasPage from "./pages/admin/adminMesas";
import AdminReservasPage from "./pages/admin/adminReservas";
import VisualizarPage from "./pages/admin/visualizar";
import EliminarPage from "./pages/admin/Eliminar";
import AboutUsPage from "./pages/AboutUs";
import AdminPlatoPage from "./pages/admin/adminPlatos";
import AdminUsuariosPage from "./pages/admin/adminUsuarios";
import AgregarIngredientePage from "./pages/admin/agregarIngredientePage";
import AgregarUsuarioPage from "./pages/admin/agregarUsuarioPage";
import CartaPage from "./pages/carta";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import AdminMenuPage from "./pages/admin/adminMenu";
import PageNotFound from "./pages/PageNotFound";
import ModificarIngredientePage from "./pages/admin/modificarIngrediente";
import EditarIngrediente from "./component/AdminComponents/Ingredientes/EditarIngrediente";
import EditarUsuario from "./component/AdminComponents/Usuarios/EditarUsuario";
import AgregarPlatoPage from "./pages/admin/AgregarPlatoPage";
import ModificarPlatoPage from "./pages/admin/modificar/ModificarPlatosPage";
import ModificarPlato from "./pages/admin/modificarPlato";
import PedidosPage from "./pages/pedidosPage";
import FinalizarPedidoPage from "./pages/FinalizarPedidoPage";

import Layout from "./component/layout/layout";
import ScrollToTop from "./utils/ScrollTop";
import ErrorConexion from "./component/Common/ErrorConexion/ErrorConexion";
import Header_home from "./component/layout/header/headerHome";
import Header_admin from "./component/AdminComponents/common/headerAdmin"; 
import FooterWeb from "./component/layout/Footer/Footer";

import { ConnectivityProvider, useConnectivity } from "./hook/Conectividad/ConnectivityContext";
import ProfileInfoPage from "./pages/ProfileInfoPage";

function AppContent() {
  const { isOnline, retry } = useConnectivity();
  const location = useLocation();

  const isAdminPath = 
    location.pathname.startsWith('/admin') || 
    location.pathname.startsWith('/visualizar') || 
    location.pathname.startsWith('/eliminar') || 
    location.pathname.startsWith('/anadir') || 
    location.pathname.startsWith('/modificar') ||
    location.pathname.startsWith('/editar-ingrediente') ||
    location.pathname.startsWith('/editar-usuario');

  
  useEffect(() => {
    if (!isOnline) {
      retry();
    }
  }, [location.pathname]);

  if (!isOnline) {
    return (
      <>
        {isAdminPath ? <Header_admin /> : <Header_home />}
        
        <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ErrorConexion onRetry={retry} />
        </main>

        {!isAdminPath && <FooterWeb />}
      </>
    );
  }

  return (
    <Routes>
      {/*Administración */}
      <Route element={<ProtectedRoute />}>
        <Route path="/adminIngredientes" element={<AdminIngredientePage />} />
        <Route path="/adminPlatos" element={<AdminPlatoPage />} />
        <Route path="/adminPedidos" element={<AdminPedidosPage />} />
        <Route path="/adminClientes" element={<AdminclientesPage />} />
        <Route path="/adminUsuarios" element={<AdminUsuariosPage />} />
        <Route path="/adminMesas" element={<AdminMesasPage />} />
        <Route path="/adminReservas" element={<AdminReservasPage />} />
        <Route path="/visualizar/:tipo" element={<VisualizarPage />} />
        <Route path="/eliminar/:tipo" element={<EliminarPage />} />
        <Route path="/anadir/ingredientes" element={<AgregarIngredientePage />} />
        <Route path="/anadir/usuarios" element={<AgregarUsuarioPage />} />
        <Route path="/anadir/clientes" element={<AgregarUsuarioPage />} />
        <Route path="/adminMenu" element={<AdminMenuPage />} />
        <Route path="/anadir/platos" element={<AgregarPlatoPage />} />
        <Route path="/modificar/:tipo" element={<ModificarIngredientePage />} />
        <Route path="/editar-ingrediente/:id" element={<EditarIngrediente />} />
        <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
        <Route path="/modificar/platos/" element={<ModificarPlatoPage />} />
        <Route path="/modificar/plato/:id" element={<ModificarPlato />} />
      </Route>

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="/carta" element={<CartaPage />} />
        <Route path="/pedidos" element={<PedidosPage />} />
        <Route path="/finalizarPedido" element={<FinalizarPedidoPage />} />
        <Route path="/perfil" element={<ProfileInfoPage />} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} /> 
      </Route>

    
      
    </Routes>
  );
}



function App() {
  return (
    <ConnectivityProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </ConnectivityProvider>
  );
}

export default App;