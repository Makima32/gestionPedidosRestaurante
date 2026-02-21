import Crud from "../../component/AdminComponents/Crud/crud";
import Header_admin from "../../component/AdminComponents/common/headerAdmin";

function AdminMesasPage() {
    return(

<>

<Header_admin/> 

<Crud valor={"mesas"}/>
</>

    )
}

export default AdminMesasPage;