import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header_admin from "../../component/AdminComponents/common/headerAdmin";
import Eliminar from "../../component/AdminComponents/common/Eliminar";

function EliminarPage() {
 
  
  return (
<>
  
  <Header_admin/>
   <Eliminar/>

  
  </>
  );
}

export default EliminarPage;
