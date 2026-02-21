import AboutUs2 from "../component/AboutUs_component/AboutUs2/AboutUs2";
import Card from "../component/AboutUs_component/Card/Card";
import Ingredientes from "../component/AboutUs_component/Ingredientes/Ingredientes";
import Paralax from "../component/AboutUs_component/Paralax/Paralax";
import { IMAGENES } from "../utils/assets";

function AboutUsPage() {
  return (
   
   <>
   
   <AboutUs2/>
   <Paralax img={IMAGENES.Paralax}/>
    <Ingredientes/>
    <hr />
    <Card/>
    </>
  );
}

export default AboutUsPage;
