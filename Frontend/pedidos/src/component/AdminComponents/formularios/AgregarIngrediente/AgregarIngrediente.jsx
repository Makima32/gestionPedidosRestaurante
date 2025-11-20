import "../formularios.css";

function AgregarIngrediente() {
  return (
    <>

      <div className="div_father">
        <h2>Formulario agregacion Ingrediente</h2>

        <div className="div_form">
          <form action="" method="POST">
            <label for="nombre">Nombre alimento</label>
            <input type="text" name="nombre" placeholder="Nombre" />

            <label for="descripcion">Descripcion del alimento</label>
            <input type="text" name="descripcion" placeholder="descripcion" />

            <label for="alergeno">Alergeno del alimento</label>
            <select name="alergeno" id="alergeno">
              <option value="">Selecciona</option>
              <option value="gluten">Gluten</option>
              <option value="crustaceos">Crustáceos</option>
              <option value="huevos">Huevos</option>
              <option value="pescado">Pescado</option>
              <option value="cacahuetes">Cacahuetes</option>
              <option value="soja">Soja</option>
              <option value="lacteos">Lácteos</option>
              <option value="frutos_cascara">Frutos de cáscara</option>
              <option value="apio">Apio</option>
              <option value="mostaza">Mostaza</option>
              <option value="sesamo">Sésamo</option>
              <option value="sulfito">Dióxido de azufre y sulfitos</option>
              <option value="moluscos">Moluscos</option>
              <option value="altramuces">Altramuces</option>
            </select>

            <label for="stock">Stock del alimento</label>
            <input type="text" name="stock" placeholder="stock" />

            <label for="vegano">¿Es vegano el alimento?</label>
            <select name="vegano" id="vegano">
              <option value={""}>Selecciona</option>
              <option value={"True"}>Si</option>
              <option value={"false"}>No</option>
            </select>

            
            <label for="imagen">Url imagen del alimento</label>
            <input type="text" name="imagen" placeholder="Url imagen" />
          </form>
        </div>
      </div>
    </>
  );
}

export default AgregarIngrediente;
