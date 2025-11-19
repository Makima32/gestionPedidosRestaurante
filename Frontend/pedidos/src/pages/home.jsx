import Header_home from "../component/header/headerHome";
import About_Us from "../component/home_component/AboutUs/AboutUs";
import Carta from "../component/home_component/Carta/Carta";
import ContacUs from "../component/home_component/ContacUs/ContactUs";
import StartBanner from "../component/home_component/StartBanner/StartBanner";
import Ubicacion from "../component/home_component/Ubicacion/ubicacion";

function Home() {
  return (
    <>
      <Header_home paginaInicial={true} />
      <StartBanner />

      <About_Us />
      <hr />

      <Carta />
      <hr />
      <Ubicacion />
      <hr />
      <ContacUs/>
    </>
  );
}

export default Home;
