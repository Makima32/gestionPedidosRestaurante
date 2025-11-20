import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header_admin from "../../component/AdminComponents/header_admin/headerAdmin";
import Eliminar from "../../component/AdminComponents/eliminar/eliminar";

function EliminarPage() {
 
  
  return (
<>
  
  <Header_admin/>
   <Eliminar/>

  
  </>
  );
}

export default EliminarPage;
