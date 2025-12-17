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
import EditarIngrediente from "./component/AdminComponents/modificar/editarIngrediente/editarIngrediente";
import AgregarPlatoPage from "./pages/admin/AgregarPlatoPage";
import ModificarPlatoPage from "./pages/admin/modificar/ModificarPlatosPage";
import ModificarPlato from "./pages/admin/modificarPlato";
import Layout from "./component/layout/layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas CRUD */}
        
        <Route element={<ProtectedRoute/>}>
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
        <Route path="/" element={<Home />} />
        <Route path="/carta" element={<CartaPage />} />
        


        {/* Login */}
        <Route path="/login" element={<LoginPage />} />



        <Route path="/*" element={<PageNotFound />} />

    </Route>
      </Routes>
    </Router>
  );
}

export default App;
