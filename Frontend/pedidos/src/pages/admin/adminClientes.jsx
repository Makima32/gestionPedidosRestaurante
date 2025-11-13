import Crud from "../../component/Crud/crud";
import Header_admin from "../../component/header_admin/headerAdmin";

function AdminclientesPage() {
    return(

<>

<Header_admin/> 

<Crud valor={"clientes"}/>
</>

    )
}

export default AdminclientesPage;