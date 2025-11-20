import Crud from "../../component/AdminComponents/Crud/crud";
import Header_admin from "../../component/AdminComponents/header_admin/headerAdmin";

function AdminPlatoPage() {
    return(

<>

<Header_admin/> 

<Crud valor={"platos"}/>
</>

    )
}

export default AdminPlatoPage;