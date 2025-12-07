import { useEffect, useRef, useState } from "react";
import "./LoginPrueba.css"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hook/auth/authcontext";

function LoginPrueba() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [genero, setGenero] = useState("Hombre"); 
  
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const btnSignUp = useRef(null);
  const btnSignIn = useRef(null);


  async function handleLoginSubmit(e) {
    e.preventDefault();
    setError(""); 
    try {
      await login(username, password); 

      if (username === "admin") {
        navigate('/adminMenu'); 
      }

    } catch (err) {
      setError(err.message || "Credenciales incorrectas o error de conexión.");
    }

    navigate('/');
  }



  useEffect(() => {
    const container = containerRef.current;
    const signUpButton = btnSignUp.current;
    const signInButton = btnSignIn.current;

    if (!container || !signUpButton || !signInButton) return;

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
      setError(""); 
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
      setError(""); 
    });

    return () => {
      signUpButton.removeEventListener("click", () => container.classList.add("right-panel-active"));
      signInButton.removeEventListener("click", () => container.classList.remove("right-panel-active"));
    };
  }, []);

  return (
    <div className="Form_div_father">
      <div className="container" ref={containerRef}>

        <div className="form-container sign-up-container">
          <form > 
            <h1>Crear una cuenta</h1>

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

        <div className="form-container sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <h1>Iniciar sesion</h1>

            <input 
              type="text" 
              placeholder="Nombre de Usuario / Email" 
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            {error && <p style={{ color: "crimson", textAlign: "center", marginTop: "10px" }}>{error}</p>}
            
            <button type="submit">Iniciar sesion</button>
          </form>
        </div>

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