import NoEncontrado from "../component/404/NoEncontrado";
import Header_home from "../component/header/headerHome";

function PageNotFound() {
 return<>
 
 
 <Header_home home={false}/>
 <NoEncontrado/>
 </>   
}

export default PageNotFound;