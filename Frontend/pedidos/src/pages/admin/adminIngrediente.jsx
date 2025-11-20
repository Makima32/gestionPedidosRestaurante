import Crud from "../../component/AdminComponents/Crud/crud";
import Header_admin from "../../component/AdminComponents/header_admin/headerAdmin";

function AdminIngredientePage() {
    return(

<>

<Header_admin/> 

<Crud valor={"ingredientes"}/>
</>

    )
}

export default AdminIngredientePage;