import { IMAGENES } from "../../../utils/assets";
import "./Banner_menu.css"
function BannerMenu() {
    return(

        <>

<div 
  className="BannerMenu_div" 
style={{ backgroundImage: `url(${IMAGENES.MenuBanner})` }}>


        <div className="BannerMenu_div_text">
        <h2>Nuestro Menú</h2>
        </div>
        </div>
        
        </>
    )
}

export default BannerMenu;