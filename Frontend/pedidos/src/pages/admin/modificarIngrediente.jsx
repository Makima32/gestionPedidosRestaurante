import { useParams } from "react-router-dom";
import Header_admin from "../../component/AdminComponents/common/headerAdmin";
import ListaIngredientesModificar from "../../component/AdminComponents/Ingredientes/ListaIngredientesModificar";
import ListaUsuarios from "../../component/AdminComponents/Usuarios/ListaUsuarios";

function ModificarIngredientePage() {
    const { tipo } = useParams();
    
    return (
        <>
            <Header_admin/>
            {tipo === "usuarios" ? (
                <ListaUsuarios modo="modificar" />
            ) : (
                <ListaIngredientesModificar />
            )}
        </>
    )
}

export default ModificarIngredientePage;