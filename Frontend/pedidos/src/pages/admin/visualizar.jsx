import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Visualizar from "../../component/AdminComponents/visualizar/Visualizar";
import Header_admin from "../../component/AdminComponents/header_admin/headerAdmin";

function VisualizarPage() {
 
  
  return (
<>
    <Header_admin/>
   <Visualizar/>
  
  
  </>
  );
}

export default VisualizarPage;
