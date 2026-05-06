import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hook/auth/authContext";

export default function ProtectedRoute({ rolesPermitidos }) {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: 24 }}>Cargando sesión…</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (!rolesPermitidos.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}