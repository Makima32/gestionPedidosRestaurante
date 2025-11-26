import { useEffect, useRef, useState } from "react";
import "./LoginPrueba.css";
import { useNavigate } from "react-router-dom";

function LoginPrueba() {

  const [genero, setGenero] = useState("Hombre");
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const btnSignUp = useRef(null);
  const btnSignIn = useRef(null);

  function handleSignup(e) {
    e.preventDefault();

    if (genero === "Enfermo") {
      window.location.href =
        "https://hospitalessanroque.com/es/especialidades-medicas/psiquiatria?center=husr-en-las-palmas-de-gc";
      return;
    }

    if (genero === "Hombre") {
      navigate("/hombre");
      return;
    }

    if (genero === "Mujer") {
      navigate("/mujer");
      return;
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
          <form onSubmit={handleSignup}>
            <h1>Crear una cuenta</h1>

            <input type="text" placeholder="Nombre" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <select value={genero} onChange={(e) => setGenero(e.target.value)}>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Enfermo">No binarie</option>
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
