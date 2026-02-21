import Crud from "../../component/AdminComponents/Crud/crud";
import Header_admin from "../../component/AdminComponents/common/headerAdmin";

function AdminIngredientePage() {
    return(

<>

<Header_admin/> 

<Crud valor={"ingredientes"}/>
</>

    )
}

export default AdminIngredientePage;