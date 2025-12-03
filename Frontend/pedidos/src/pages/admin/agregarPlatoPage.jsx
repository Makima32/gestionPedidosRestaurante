import AgregarPlato from "../../component/AdminComponents/formularios/AgregarPlato/AgregarPlato";
import Header_admin from "../../component/AdminComponents/header_admin/headerAdmin";
import AdminIngredientePage from "./adminIngrediente";

function AgregarPlatoPage() {
    return (
        <>
            <Header_admin />
            <AgregarPlato />
        </>
    );
}
export default AgregarPlatoPage;