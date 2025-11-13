import { useParams } from "react-router-dom";

function AdminVizualiarPage() {
  const { tipo } = useParams(); // tipo = "ingrediente", "plato", etc.

  return (
    <div>
      <h1>Visualizar {tipo}</h1>
      {/* Aquí decides qué mostrar según tipo */}
      {tipo === "ingrediente" && <p>Lista de ingredientes...</p>}
      {tipo === "plato" && <p>Lista de platos...</p>}
      {/* Puedes añadir más tipos */}
    </div>
  );
}

export default Visualizar;
