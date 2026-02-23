import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import AgregarIngredientePage from "./pages/admin/agregarIngredientePage";
import CartaPage from "./pages/carta";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import AdminMenuPage from "./pages/admin/adminMenu";
import PageNotFound from "./pages/PageNotFound";
import ModificarIngredientePage from "./pages/admin/modificarIngrediente";
import EditarIngrediente from "./component/AdminComponents/Ingredientes/EditarIngrediente";
import AgregarPlatoPage from "./pages/admin/AgregarPlatoPage";
import ModificarPlatoPage from "./pages/admin/modificar/ModificarPlatosPage";
import ModificarPlato from "./pages/admin/modificarPlato";
import Layout from "./component/layout/layout";
import PedidosPage from "./pages/pedidosPage";
import ScrollToTop from "./utils/ScrollTop";
import FinalizarPedidoPage from "./pages/FinalizarPedidoPage";

import { ConnectivityProvider, useConnectivity } from "./hook/Conectividad/ConnectivityContext";
import ErrorConexion from "./component/Common/ErrorConexion/ErrorConexion";
import Header_home from "./component/layout/header/headerHome";
import FooterWeb from "./component/layout/Footer/Footer";
import { useEffect } from "react";

function AppContent() {
  const { isOnline, setIsOnline, retry } = useConnectivity();
  const location = useLocation(); 


  //Funcion para que en la pantalla de error permita redigir al usuario a la pagina clicada
  useEffect(() => {
    if (!isOnline) {
      retry(); 
    }
  }, [location.pathname]);
  if (!isOnline) {
    return (
   <>
        <Header_home /> 
        <main style={{ minHeight: '70vh' }}>
          <ErrorConexion onRetry={retry} />
        </main>
        <FooterWeb />
   </>
    );
    
  }

  // Si conecta con el backend se muestra rutas normales
  return (
    <Routes>
      {/* Rutas CRUD */}
      <Route element={<ProtectedRoute />}>
        <Route path="/adminIngredientes" element={<AdminIngredientePage />} />
        <Route path="/adminPlatos" element={<AdminPlatoPage />} />
        <Route path="/adminPedidos" element={<AdminPedidosPage />} />
        <Route path="/adminClientes" element={<AdminclientesPage />} />
        <Route path="/adminMesas" element={<AdminMesasPage />} />
        <Route path="/adminReservas" element={<AdminReservasPage />} />
        <Route path="/visualizar/:tipo" element={<VisualizarPage />} />
        <Route path="/eliminar/:tipo" element={<EliminarPage />} />
        <Route path="/anadir/ingredientes" element={<AgregarIngredientePage />} />
        <Route path="/adminMenu" element={<AdminMenuPage />} />
        <Route path="/anadir/platos" element={<AgregarPlatoPage />} />
        <Route path="/modificar/:tipo" element={<ModificarIngredientePage />} />
        <Route path="/editar-ingrediente/:id" element={<EditarIngrediente />} />
        <Route path="/modificar/platos/" element={<ModificarPlatoPage />} />
        <Route path="/modificar/plato/:id" element={<ModificarPlato />} />
      </Route>

      {/* Rutas pagina Usuario */}
      <Route path="/" element={<Layout />}>
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route index element={<Home />} /> 
        <Route path="/carta" element={<CartaPage />} />
        <Route path="/pedidos" element={<PedidosPage />} />
        <Route path="/finalizarPedido" element={<FinalizarPedidoPage />} />
      </Route>

      {/* Login */}
        
      <Route path="/login" element={<LoginPage />} />

      {/* 404 */}
      <Route path="*" element={<PageNotFound />} />
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