import Header_admin from "../../../component/AdminComponents/header_admin/headerAdmin";
import EditarIngrediente from "../../../component/AdminComponents/modificar/editarIngrediente/editarIngrediente";
import ModificarIngredientePage from "../modificarIngrediente"

function modificarIngredienteporIdPage() {
    
    return(
        <>
        
        <Header_admin/>

        <EditarIngrediente/>
        </>
    )
}

export default ModificarIngredientePage;