import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Visualizar from "../../component/AdminComponents/common/Visualizar";
import Header_admin from "../../component/AdminComponents/common/headerAdmin";

function VisualizarPage() {
 
  
  return (
<>
    <Header_admin/>
   <Visualizar/>
  
  
  </>
  );
}

export default VisualizarPage;
