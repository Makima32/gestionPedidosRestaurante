import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AdminIngredientePage from "./pages/admin/adminIngrediente";
import AdminPlatosPage from "./pages/admin/adminPlatos";
import AdminPedidosPage from "./pages/admin/AdminPedidos";
import AdminclientesPage from "./pages/admin/adminClientes";
import AdminMesasPage from "./pages/admin/adminMesas";
import AdminReservasPage from "./pages/admin/adminReservas";

function App() {
  return (
    <Router>
      <Routes>

        {/* Crud Admin */}

        <Route path="/" element={<Home />} />
        <Route path="/adminIngredientes" element={<AdminIngredientePage />} />
        <Route path="/adminPlatos" element={<AdminPlatosPage />} />
        <Route path="/adminPedidos" element={<AdminPedidosPage />} />
        <Route path="/adminClientes" element={<AdminclientesPage />} />
        <Route path="/adminMesas" element={<AdminMesasPage />} />
        <Route path="/adminReservas" element={<AdminReservasPage />} />


        {/* Crud Admin */}


      </Routes>
    </Router>
  );
}

export default App;
