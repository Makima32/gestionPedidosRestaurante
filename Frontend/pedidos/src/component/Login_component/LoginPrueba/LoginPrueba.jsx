import { useEffect, useRef, useState } from "react";
import "./LoginPrueba.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hook/auth/authcontext";

function LoginPrueba() {

  const { user, login } = useAuth();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [genero, setGenero] = useState("Hombre");
  const navigate = useNavigate();

  
  const containerRef = useRef(null);
  const btnSignUp = useRef(null);
  const btnSignIn = useRef(null);

  
  // function handleSignup(e) {
  //   e.preventDefault();

       async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(username, password); // <— esto setea user en el contexto

      if (username === "admin") {
    window.location.href = 'adminMenu'; // Cambiar de pagina , cambiar por rol a futuro
      }
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión");
    }


    
  


  
  }

  useEffect(() => {
    const container = containerRef.current;
    const signUpButton = btnSignUp.current;
    const signInButton = btnSignIn.current;

    if (!container || !signUpButton || !signInButton) return;

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    return () => {};
  }, []);

  return (
    <div className="Form_div_father">
      <div className="container" ref={containerRef}>

        {/* Sign Up */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit}>
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

        {/* Sign In */}
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <button className="ghost" ref={btnSignIn}>Sign In</button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <button className="ghost" ref={btnSignUp}>Sign Up</button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default LoginPrueba;
