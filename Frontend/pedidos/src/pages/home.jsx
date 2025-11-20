import { useEffect, useState } from "react";
import FooterWeb from "../component/Footer/Footer";
import Header_home from "../component/header/headerHome";
import About_Us from "../component/home_component/AboutUs/AboutUs";
import Carta from "../component/home_component/Carta/Carta";
import ContacUs from "../component/home_component/ContacUs/ContactUs";
import StartBanner from "../component/home_component/StartBanner/StartBanner";
import Ubicacion from "../component/home_component/Ubicacion/ubicacion";

function Home() {

//NO funciona revisar el porque, scroll da 0 en todo momento
const [scrolled, setScrolled] = useState(false);

useEffect(() => {

  function handleScroll() {
    setScrolled(window.scrollY >= window.innerHeight);
  }
console.log(window.scrollY)
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll); 

}, []);

  return (
    <>
      <Header_home  Style={scrolled}/>
      <StartBanner />

      <About_Us />
      <hr />

      <Carta />
      <hr />
      <Ubicacion />
      <hr />
      <ContacUs/>

      <FooterWeb/>
    </>
  );
}

export default Home;
