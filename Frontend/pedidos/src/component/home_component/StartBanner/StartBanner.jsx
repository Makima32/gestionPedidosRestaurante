import "./StartBanner.css";
import { IMAGENES } from "../../../utils/assets"; 

function Start_banner() {
  return (
    <div className="start_banner_div_father">

      <picture className="banner_picture_container">
        <source media="(min-width: 1024px)" srcSet={IMAGENES.BANNER.PC} />
        <source media="(min-width: 768px)" srcSet={IMAGENES.BANNER.TABLET} />
        
        <img 
          src={IMAGENES.BANNER.MOBILE} 
          alt="Banner Principal" 
          className="banner_img_bg"
          fetchPriority="high"  
        />
      </picture>

      <div className="banner_overlay"></div>

      
    </div>
  );
}

export default Start_banner;