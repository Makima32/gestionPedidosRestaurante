import Crud from "../../component/AdminComponents/Crud/crud";
import Header_admin from "../../component/AdminComponents/header_admin/headerAdmin";

function AdminclientesPage() {
    return(

<>

<Header_admin/> 

<Crud valor={"clientes"}/>
</>

    )
}

export default AdminclientesPage;