import Header_admin from "../component/AdminComponents/header_admin/headerAdmin";
import Header_home from "../component/header/headerHome";
import LoginForm from "../component/Login_component/login_form/loginForm";
import LoginPrueba from "../component/Login_component/LoginPrueba/LoginPrueba";

function LoginPage() {
    

    return(

        <>
        
        <Header_home home={false}/>
        <LoginPrueba/>
        
        {/* <LoginPrueba/> */}
        </>
    )
}

export default LoginPage;