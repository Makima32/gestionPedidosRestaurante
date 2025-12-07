import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie"
// 1) Creamos el contexto
const AuthContext = createContext(null);

// 2) Hook de conveniencia
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}

// 3 Keys de almacenamientos 
const COOKIE_KEY = "auth:user";


/**
 * AuthProvider
 * - Mantiene el estado de la sesión { user: {...} | null }
 * - Expone login() y logout()
 * - Persiste en localStorage para recordar sesión al recargar
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);         // null = no autenticado
  const [loading, setLoading] = useState(true);   // para el "arranque"

  // Cargar sesión guardada al montar
  useEffect(() => {

    const raw = localStorage.getItem("auth:user");
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
    setLoading(false);
  }, []);

  // Guardar cuando cambie
  useEffect(() => {
    if (user) localStorage.setItem("auth:user", JSON.stringify(user));
    else localStorage.removeItem("auth:user");
  }, [user]);

  // Simulación de login (valida si hay algo escrito)
  async function login(username, password) {
    // En real: llamar a API, recibir token/perfil…
    if (!username || !password) {
      throw new Error("Credenciales inválidas");
    }
    // Usuario “fake”:
    const fakeUser = { id: 1, name: username, role: "user" };
    setUser(fakeUser);
    return fakeUser;
  }

  function logout() {
    // null==> usuario no logeado
    setUser(null);
  }

  const value = { user, loading, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}




/*
EXAMPLE

Cookie.set("usuario","Jhon",{
  expires: 7, // Número de días /Fecha
  path: "/", //Qué rutas pueden acceder a la cookie (/, /admin, etc)
  domain: "example.com"  //Restringe la cookie a un dominio o subdominio
  secure: true, //Obliga envió solo por https
  sameSite: "lax" //Previene el envió por cross-site (LAX, STRICT, NONE), Necesario tener el secure: true
  })

  Cross-Site o XSS es un ataque para introducir un código malicioso desde otros sitios y que es capaz de ejecutarse
  desde el cliente

*/
export function AuthProvierCookie({children}){
  
  const [user, setUser] = useState(null);         // null = no autenticado
  const [loading, setLoading] = useState(true);   // para el "arranque"

  // Cargar sesión guardada al montar
  useEffect(() => {

    const raw = Cookies.get(COOKIE_KEY)
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
    setLoading(false);
  }, []);

  // Guardar cuando cambie
  useEffect(() => {
    if (user) Cookies.set(COOKIE_KEY, JSON.stringify(user),{expires: 1}); // 1-> 1día
    else Cookies.remove(COOKIE_KEY);
  }, [user]);

  // Simulación de login (valida si hay algo escrito)
  async function login(username, password) {
    // En real: llamar a API, recibir token/perfil…
    if (!username || !password) {
      throw new Error("Credenciales inválidas");
    }
    // Usuario “fake”:
    const fakeUser = { id: 1, name: username, role: "user" };
    setUser(fakeUser);
    return fakeUser;
  }

  function logout() {
    // null==> usuario no logeado
    setUser(null);
  }

  const value = { user, loading, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}
