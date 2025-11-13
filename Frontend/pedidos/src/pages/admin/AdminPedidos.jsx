
import Crud from "../../component/Crud/crud";
import Header_admin from "../../component/header_admin/headerAdmin";

function AdminPedidosPage() {
    return(

<>

<Header_admin/> 

<Crud valor={"pedidos"}/>
</>

    )
}

export default AdminPedidosPage;