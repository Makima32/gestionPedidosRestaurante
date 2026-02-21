import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie"
import { SERVER } from "../../utils/assets";

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}

const COOKIE_KEY = "auth:user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("auth:user");
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("auth:user", JSON.stringify(user));
    else localStorage.removeItem("auth:user");
  }, [user]);

  async function login(username, password) {
    try {
      const response = await fetch(`${SERVER}/usuarios/buscar/${username}`);
      if (!response.ok) throw new Error("Usuario no encontrado");
      const dbUser = await response.json();
      if (dbUser.password !== password) throw new Error("Contraseña incorrecta");

      const userToSave = { 
        id: dbUser.id, 
        name: dbUser.nombre, 
        rol: dbUser.rol 
      };

      setUser(userToSave);
      return userToSave;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  }

  function logout() {
    setUser(null);
  }

  const value = { user, loading, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthProvierCookie({children}){
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = Cookies.get(COOKIE_KEY)
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) Cookies.set(COOKIE_KEY, JSON.stringify(user),{expires: 1});
    else Cookies.remove(COOKIE_KEY);
  }, [user]);

  async function register(nombre, correo, password) {
    try {
      const response = await fetch(`${SERVER}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, password, rol: "user" }),
      });
      if (!response.ok) throw new Error("Error al registrar");
      return await response.text();
    } catch (error) {
      throw error;
    }
  }

  async function login(username, password) {
    try {
      const response = await fetch(`${SERVER}/usuarios/${username}`);
      if (!response.ok) throw new Error("Usuario no encontrado");
      const dbUser = await response.json();
      if (dbUser.password !== password) throw new Error("Contraseña incorrecta");

      const userToSave = { 
        id: dbUser.id, 
        name: dbUser.nombre, 
        rol: dbUser.rol 
      };

      setUser(userToSave);
      return userToSave;
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    setUser(null);
  }

  const value = { user, loading, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}