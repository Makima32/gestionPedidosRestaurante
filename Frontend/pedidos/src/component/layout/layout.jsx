import { Outlet, useLocation } from "react-router-dom";
import Header_home from "./header/headerHome";
import FooterWeb from "./Footer/Footer";
import Chatbot from "../Common/chatbot/chatbot";

function Layout() {
  
  const location = useLocation();
  const isHome = location.pathname === "/";
  
    return (
    <div className="layout-container">
      <Header_home home={isHome} />
      <Chatbot/>
      <main className="main-content">
        <Outlet/>
      </main>

      <FooterWeb />
    </div>
  );
}

export default Layout;