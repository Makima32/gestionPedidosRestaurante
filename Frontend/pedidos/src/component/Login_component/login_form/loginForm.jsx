import { useState } from "react";
import { useAuth } from "../../../hook/auth/authcontext";
import "./loginForm.css";

function LoginForm() {
  const { user, login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
    async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(username, password); // <— esto setea user en el contexto

      if (username === "admin") {
    window.location.href = 'adminIngredientes'; // Cambiar de pagina , cambiar por rol a futuro
      }
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión");
    }


    
  
  }
  return (
    <>
      <div className="loginForm_div_father">
        <div className="loginForm_div_content">
          <img src="/loginImage.png" alt="" />
          <form onSubmit={handleSubmit}>
            <label htmlFor="NombreUsuario">Nombre de usuario</label>
            <input
              type="text"
              name="NombreUsuario"
              placeholder="NombreUsuario"
              minLength={"5"}
              maxLength={"15"}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="Contraseña">Contraseña</label>
            <input type="password" name="Contraseña" placeholder="Contraseña" 
              onChange={(e) => setPassword(e.target.value)}
            
            />
          <button style={{width:"50%", margin:"0 auto"}}>Login</button>

                    {error && <p style={{ textAlign:"center", color: "crimson", fontSize: "1.5rem" }}>{error}</p>}
        
          </form>

        </div>
      </div>
    </>



);

}


export default LoginForm;
