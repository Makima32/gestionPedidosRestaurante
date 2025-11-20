
import Crud from "../../component/AdminComponents/Crud/crud";
import Header_admin from "../../component/AdminComponents/header_admin/headerAdmin";

function AdminPedidosPage() {
    return(

<>

<Header_admin/> 

<Crud valor={"pedidos"}/>
</>

    )
}

export default AdminPedidosPage;