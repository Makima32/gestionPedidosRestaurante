
import { useAuth } from "../../../hook/auth/authcontext"
import "./Logout.css"
function Logout() {
    

    const {user, logout} = useAuth();

    async function logoutfunction() {
        
        await logout();
    }


    return(
        <>
        
        <div className="Logout_div_father">
        <button onClick={logoutfunction() } > </button>
        <h2>das</h2>
        </div>
        </>
    )
}

export default Logout