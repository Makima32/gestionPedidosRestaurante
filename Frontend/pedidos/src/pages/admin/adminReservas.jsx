import Crud from "../../component/AdminComponents/Crud/crud";
import Header_admin from "../../component/AdminComponents/header_admin/headerAdmin";

function AdminReservasPage() {
    return(

<>

<Header_admin/> 

<Crud valor={"reservas"}/>
</>

    )
}

export default AdminReservasPage;