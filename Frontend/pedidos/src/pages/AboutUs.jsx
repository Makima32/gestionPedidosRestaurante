import AboutUs2 from "../component/AboutUs_component/AboutUs2/AboutUs2";
import Cards from "../component/AboutUs_component/AboutUs2/Cards/Cards";
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
    <Cards/>
    </>
  );
}

export default AboutUsPage;
