import Crud from "../../component/Crud/crud";
import Header_admin from "../../component/header_admin/headerAdmin";

function AdminMesasPage() {
    return(

<>

<Header_admin/> 

<Crud valor={"mesas"}/>
</>

    )
}

export default AdminMesasPage;