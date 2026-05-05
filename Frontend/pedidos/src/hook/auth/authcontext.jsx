import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SERVER } from "../../../src/utils/assets.js";

export const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}

const COOKIE_KEY = "auth:user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = Cookies.get(COOKIE_KEY);
    if (raw) {
      try { return JSON.parse(raw); } catch { return null; }
    }
    return null;
  });

  useEffect(() => {
    if (user) Cookies.set(COOKIE_KEY, JSON.stringify(user), { expires: 1 }); 
    else Cookies.remove(COOKIE_KEY);
  }, [user]);

  const login = async (username, password) => {
    try {
      const response = await fetch(`${SERVER}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) throw new Error("Usuario o contraseña incorrecta");
      
      const data = await response.json(); 
      
      const userToSave = { 
        idUsuario: data.idUsuario, 
        name: data.username, 
        token: data.jwt, 
        rol: data.rol,
        correo: data.correo,       
        direccion: data.direccion, 
        imagen: data.imagen        
      };
      
      setUser(userToSave);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const register = async (nombre, correo, password) => {
    try {
      const response = await fetch(`${SERVER}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, password }), 
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Error al registrar");
      }
      return true;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null); 
  };

  const actualizarSesion = (nuevosDatos) => {
    setUser(prev => {
      const usuarioActualizado = { ...prev, ...nuevosDatos };
      Cookies.set(COOKIE_KEY, JSON.stringify(usuarioActualizado), { expires: 1 });
      return usuarioActualizado;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, actualizarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}