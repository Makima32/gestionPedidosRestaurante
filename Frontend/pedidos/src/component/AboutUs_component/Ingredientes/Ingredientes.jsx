import { IMAGENES } from "../../../utils/assets";
import "./Ingredientes.css";

function Ingredientes() {
  return (
    <>
      <div className="ingredientes_div_father">
        <div className="ingredientes_div_img">
          <img src={IMAGENES.IngredientesFrescos} alt="" />
        </div>

        <div className="ingredientes_div_content">
          <h2>De la Tierra a tu Mesa</h2>
          <p>
            Cada pizza que servimos empieza con una elección consciente:
            ingredientes frescos, locales y de temporada, cuidadosamente
            seleccionados de productores de confianza. Creemos que el sabor
            auténtico nace del respeto por la tierra y quienes la trabajan, por
            eso apoyamos prácticas agrícolas sostenibles y responsables.
            Nuestros tomates, quesos y hierbas provienen de pequeñas fincas
            donde la calidad y el cuidado del medio ambiente son prioridad. Cada
            corte de carne, cada vegetal, es elegido para ofrecer la máxima
            frescura y garantizar un sabor que no solo satisface, sino que
            cuenta una historia. La sostenibilidad no es solo un concepto, es
            parte de nuestra filosofía diaria: reducimos desperdicios, usamos
            envases responsables y buscamos siempre un impacto positivo en
            nuestra comunidad. En nuestra cocina, los procesos artesanales se
            combinan con pasión y creatividad, para que cada pizza sea única,
            equilibrando tradición y modernidad. Queremos que cada bocado
            refleje nuestro compromiso con la calidad, el respeto por la
            naturaleza y la pasión por lo auténtico. Este viaje del campo a tu
            mesa nos permite ofrecer no solo una pizza deliciosa, sino una
            experiencia consciente, que conecta al cliente con el origen de sus
            alimentos. Porque en nuestra pizzería, cada ingrediente tiene una
            historia, y cada historia merece ser saboreada.
          </p>
        </div>
      </div>
    </>
  );
}

export default Ingredientes;
