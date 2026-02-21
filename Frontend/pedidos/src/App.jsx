import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

// IMPORTAMOS EL CONTEXTO
import { ConnectivityProvider, useConnectivity } from "./hook/Conectividad/ConnectivityContext";

// 1. Creamos el componente que decide qué mostrar
function AppContent() {
  const { isOnline, setIsOnline } = useConnectivity();

  // SI NO HAY CONEXIÓN: Mostramos el mensaje de error
  if (!isOnline) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <img src="/icons/pizza_quemada.webp" alt="Error" style={{ width: '150px' }} />
        <h1 style={{ color: '#AC7E2F' }}>¡Vaya! Parece que el horno está apagado</h1>
        <p>No pudimos conectar con el servidor. Revisa tu conexión.</p>
        <button 
          onClick={() => setIsOnline(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#AC7E2F',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  // SI HAY CONEXIÓN: Mostramos todas tus rutas normales
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
        <Route index element={<Home />} /> {/* Usamos index para la ruta raíz */}
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

// 2. El componente App principal solo envuelve todo con los Providers
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