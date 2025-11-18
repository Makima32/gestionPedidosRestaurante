import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AdminIngredientePage from "./pages/admin/adminIngrediente";
import AdminPlatosPage from "./pages/admin/adminPlatos";
import AdminPedidosPage from "./pages/admin/AdminPedidos";
import AdminclientesPage from "./pages/admin/adminClientes";
import AdminMesasPage from "./pages/admin/adminMesas";
import AdminReservasPage from "./pages/admin/adminReservas";
import VisualizarPage from "./pages/admin/visualizar";
import EliminarPage from "./pages/admin/Eliminar";
import AboutUsPage from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas CRUD */}
        <Route path="/" element={<Home />} />
        <Route path="/adminIngredientes" element={<AdminIngredientePage />} />
        <Route path="/adminPlatos" element={<AdminPlatosPage />} />
        <Route path="/adminPedidos" element={<AdminPedidosPage />} />
        <Route path="/adminClientes" element={<AdminclientesPage />} />
        <Route path="/adminMesas" element={<AdminMesasPage />} />
        <Route path="/adminReservas" element={<AdminReservasPage />} />
        <Route path="/visualizar/:tipo" element={<VisualizarPage />} />
        <Route path="/eliminar/:tipo" element={<EliminarPage />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
