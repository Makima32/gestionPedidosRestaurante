import Crud from "../../component/Crud/crud";
import Header_admin from "../../component/header_admin/headerAdmin";

function AdminReservasPage() {
    return(

<>

<Header_admin/> 

<Crud valor={"reservas"}/>
</>

    )
}

export default AdminReservasPage;