import { useEffect, useRef, useState } from "react";
import "./LoginPrueba.css"; // Asegúrate de que este CSS esté funcionando
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hook/auth/authcontext";

function LoginPrueba() {
  // LÓGICA DE AUTENTICACIÓN
  // user no se usa directamente aquí, pero se mantiene por contexto.
  const { login } = useAuth();

  // ESTADOS para los campos de Login (Sign In)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Estado no usado en Login/Sign In, pero lo dejo si lo necesitas para Sign Up
  const [genero, setGenero] = useState("Hombre"); 
  
  const navigate = useNavigate();

  // REFERENCIAS para la animación de la interfaz
  const containerRef = useRef(null);
  const btnSignUp = useRef(null);
  const btnSignIn = useRef(null);

  /**
   * Maneja el envío del formulario de Iniciar Sesión (Sign In)
   * Usa la lógica de autenticación de tu contexto (useAuth).
   */
  async function handleLoginSubmit(e) {
    e.preventDefault();
    setError(""); // Limpiar errores previos
    
    // Si usas 'Email' en lugar de 'Nombre de Usuario' en el formulario, 
    // asegúrate de que 'login' acepta el campo correcto.
    try {
      await login(username, password); // <— Llama a la función de login del contexto

      // Redirección basada en el rol (como lo tenías)
      if (username === "admin") {
        // Mejor usar navigate para React Router
        navigate('/adminMenu'); 
        // Si tienes que usar recarga de página: window.location.href = '/adminMenu';
      }
      // O redirigir al menú principal para usuarios normales
      // else { navigate('/'); } 

    } catch (err) {
      // Muestra el error de la API o un mensaje genérico
      setError(err.message || "Credenciales incorrectas o error de conexión.");
    }
  }

  // Si decides implementar la lógica de Sign Up (registro), 
  // tendrías que definir una función similar aquí, por ejemplo:
  /*
  function handleSignupSubmit(e) {
    e.preventDefault();
    // Lógica para registrar un nuevo usuario...
  }
  */


  // EFECTO para manejar la animación del formulario
  useEffect(() => {
    const container = containerRef.current;
    const signUpButton = btnSignUp.current;
    const signInButton = btnSignIn.current;

    if (!container || !signUpButton || !signInButton) return;

    // Al hacer clic en Sign Up, añade la clase para deslizar
    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
      setError(""); // Opcional: limpiar errores al cambiar de panel
    });

    // Al hacer clic en Sign In, quita la clase para deslizar
    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
      setError(""); // Opcional: limpiar errores al cambiar de panel
    });

    return () => {
      // Limpieza de event listeners para evitar fugas de memoria
      signUpButton.removeEventListener("click", () => container.classList.add("right-panel-active"));
      signInButton.removeEventListener("click", () => container.classList.remove("right-panel-active"));
    };
  }, []);

  return (
    <div className="Form_div_father">
      <div className="container" ref={containerRef}>

        {/* Sign Up (Registro) - DEBES IMPLEMENTAR LA LÓGICA DE ENVÍO */}
        <div className="form-container sign-up-container">
          {/* Por ahora, este formulario está vacío de lógica. Le puse el handleSubmit de prueba */}
          <form /* onSubmit={handleSignupSubmit} */> 
            <h1>Crear una cuenta</h1>

            {/* NOTA: Estos campos no tienen 'value' ni 'onChange' */}
            <input type="text" placeholder="Nombre" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <select value={genero} onChange={(e) => setGenero(e.target.value)}>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>

            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In (Iniciar Sesión) - LÓGICA FUNCIONAL AQUÍ */}
        <div className="form-container sign-in-container">
          {/* 1. Usar el manejador de envío funcional (handleLoginSubmit) */}
          <form onSubmit={handleLoginSubmit}>
            <h1>Iniciar sesion</h1>

            {/* 2. Capturar el nombre de usuario/email */}
            <input 
              type="text" 
              placeholder="Nombre de Usuario / Email" 
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            {/* 3. Capturar la contraseña */}
            <input 
              type="password" 
              placeholder="Contraseña" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            {/* Mostrar el mensaje de error */}
            {error && <p style={{ color: "crimson", textAlign: "center", marginTop: "10px" }}>{error}</p>}
            
            <button type="submit">Iniciar sesion</button>
          </form>
        </div>

        {/* Overlay (Botones de Deslizamiento) */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <button className="ghost" ref={btnSignIn}>Iniciar sesion </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>!Hola, amigo!</h1>
              <button className="ghost" ref={btnSignUp}>Iniciar sesion</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LoginPrueba;