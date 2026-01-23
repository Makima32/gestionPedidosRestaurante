// src/ProtectedRoute.jsx
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./hook/auth/authContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: 24 }}>Cargando sesión…</div>;

  // 1️⃣ Si NO hay usuario → login
  if (!user) return <Navigate to="/login" replace />;

  if (user.rol != "admin") {
    
    return <Navigate to="/login" replace/>
  }

  // 3️⃣ Si hay usuario normal → dejar pasar
  return <Outlet />;
}

//Idea clave: ProtectedRoute se usa como “envoltorio” de todas las rutas que quieras proteger.