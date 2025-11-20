import "./loginForm.css"
function LoginForm() {
  return (
    <>
      <div className="loginForm_div_father">
        <div className="loginForm_div_content">

            <img src="/loginImage.png" alt="" />
          <form>
            <label for="NombreUsuario">Nombre de usuario</label>
            <input  type="text" name="NombreUsuario" placeholder="NombreUsuario" />
          
            <label for="Contraseña">Contraseña</label>
            <input type="password" name="Contraseña" placeholder="Contraseña" />

          
          </form>

          <button>Login</button>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
