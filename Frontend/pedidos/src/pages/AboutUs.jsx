import AboutUs2 from "../component/AboutUs_component/AboutUs2/AboutUs2";
import Card from "../component/AboutUs_component/Card/Card";
import Ingredientes from "../component/AboutUs_component/Ingredientes/Ingredientes";
import Paralax from "../component/AboutUs_component/Paralax/Paralax";
import Header_home from "../component/header/headerHome";

function AboutUsPage() {
  return (
   
   <>
    <Header_home/>
   <AboutUs2/>
   <Paralax img={"/BannerHome.png"}/>
    <Ingredientes/>
    <hr />
    <Card/>
    </>
  );
}

export default AboutUsPage;
