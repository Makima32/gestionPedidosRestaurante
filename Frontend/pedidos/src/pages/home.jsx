import { useEffect, useState } from "react";
import FooterWeb from "../component/layout/Footer/Footer";
import Header_home from "../component/layout/header/headerHome";
import About_Us from "../component/home_component/AboutUs/AboutUs";
import Carta from "../component/home_component/Carta/Carta";
import ContacUs from "../component/home_component/ContacUs/ContactUs";
import StartBanner from "../component/home_component/StartBanner/StartBanner";
import Ubicacion from "../component/home_component/Ubicacion/ubicacion";
import Chatbot from "../component/Common/chatbot/chatbot";
import PlatosEstrellas from "../component/home_component/platosEstrellas/PlatosEstrellas";
import Pedir from "../component/home_component/pedir/pedir";

function Home() {


  return (
    <>
      <StartBanner />

      <About_Us />
      <hr />
      <Carta />
      <hr />

      <PlatosEstrellas
        pizza1="Speck_Carbonara"
        pizza2="Quattro_Formaggi"
        pizza3="Clásica_di_Napoli"
        pizza4="La_Ibérica"
        pizza5="La_Diavola"
      />
      <hr />

      <Ubicacion />
      <hr />
      
      <Pedir/>
      <hr />

      <ContacUs />

    </>
  );
}

export default Home;
