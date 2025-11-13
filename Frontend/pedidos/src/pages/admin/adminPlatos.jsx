import Crud from "../../component/Crud/crud";
import Header_admin from "../../component/header_admin/headerAdmin";

function AdminPlatoPage() {
    return(

<>

<Header_admin/> 

<Crud valor={"platos"}/>
</>

    )
}

export default AdminPlatoPage;