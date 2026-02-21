import Crud from "../../component/AdminComponents/Crud/crud";
import Header_admin from "../../component/AdminComponents/common/headerAdmin";

function AdminPlatoPage() {
    return(

<>

<Header_admin/> 

<Crud valor={"platos"}/>
</>

    )
}

export default AdminPlatoPage;