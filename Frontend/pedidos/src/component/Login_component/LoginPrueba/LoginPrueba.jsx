import { useEffect, useRef, useState } from "react";
import "./LoginPrueba.css"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hook/auth/authContext";

function LoginPrueba() {
  const { login, register } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [regNombre, setRegNombre] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [genero, setGenero] = useState("Hombre"); 

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const btnSignUp = useRef(null);
  const btnSignIn = useRef(null);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setError(""); 
    try {
      const userLogueado = await login(username, password); 
      if (userLogueado) {
        navigate('/'); 
      }
    } catch (err) {
      setError(err.message || "Credenciales incorrectas.");
    }
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await register(regNombre, regEmail, regPass);
      
      alert("¡Usuario creado!");
      
      setRegNombre("");
      setRegEmail("");
      setRegPass("");
      containerRef.current.classList.remove("right-panel-active");
    } catch (err) {
      setError(err.message || "Error al crear la cuenta.");
    }
  }

  useEffect(() => {
    const container = containerRef.current;
    const signUpButton = btnSignUp.current;
    const signInButton = btnSignIn.current;

    if (!container || !signUpButton || !signInButton) return;

    const handleSignUpClick = () => {
      container.classList.add("right-panel-active");
      setError(""); 
    };

    const handleSignInClick = () => {
      container.classList.remove("right-panel-active");
      setError(""); 
    };

    signUpButton.addEventListener("click", handleSignUpClick);
    signInButton.addEventListener("click", handleSignInClick);

    return () => {
      signUpButton.removeEventListener("click", handleSignUpClick);
      signInButton.removeEventListener("click", handleSignInClick);
    };
  }, []);

  return (
    <div className="Form_div_father">
      <div className="container" ref={containerRef}>

        <div className="form-container sign-up-container">
          <form onSubmit={handleRegisterSubmit}> 
            <h1>Crear una cuenta</h1>

            <input 
              type="text" 
              placeholder="Nombre" 
              value={regNombre}
              onChange={(e) => setRegNombre(e.target.value)}
              required
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={regPass}
              onChange={(e) => setRegPass(e.target.value)}
              required
            />

            <select value={genero} onChange={(e) => setGenero(e.target.value)}>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>

            <button type="submit">Registrarse</button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <h1>Iniciar sesion</h1>
            <input 
              type="text" 
              placeholder="Nombre de Usuario" 
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />

            {error && <p style={{ color: "crimson", textAlign: "center", marginTop: "10px" }}>{error}</p>}
            
            <button type="submit">Iniciar sesion</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>¡Bienvenido!</h1>
              <button className="ghost" ref={btnSignIn}>Iniciar sesion </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>!Hola, amigo!</h1>
              <button className="ghost" ref={btnSignUp}>Registrarse </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LoginPrueba;