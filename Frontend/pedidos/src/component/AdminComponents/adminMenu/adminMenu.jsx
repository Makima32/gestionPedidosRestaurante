import "./adminMenu.css"
function AdminMenu() {

function redirigir(valor) {
        
        window.location.href = "/admin" + valor;
}
    return(

        <>
        
        <div className="adminMenu_div_father">


        <div className="adminMenu_div_content">


        <div className="adminMenu_div_contentPar">
         <button onClick={() => redirigir("Ingredientes")} id="IngredientesButton"></button>
         <button onClick={() => redirigir("Platos")} id="PlatosButton"></button>
         </div>
        <div className="adminMenu_div_contentPar">
         <button onClick={() => redirigir("Pedidos")} id="PedidosButton"></button>
         <button onClick={() => redirigir("Clientes")} id="ClientesButton"></button>
         </div>
     
   
     



        </div>



        </div>
        
        </>
    )
}

export default AdminMenu;