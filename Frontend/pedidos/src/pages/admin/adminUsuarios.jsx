import Crud from "../../component/AdminComponents/Crud/crud";
import Header_admin from "../../component/AdminComponents/common/headerAdmin";

function AdminUsuariosPage() {
    return (
        <>
            <Header_admin/> 
            <Crud valor={"usuarios"}/>
        </>
    );
}

export default AdminUsuariosPage;
