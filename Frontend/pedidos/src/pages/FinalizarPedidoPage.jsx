import FinalizarPedido from "../component/finalizar_pedido_component/FinalizarPedido";

function FinalizarPedidoPage() {
    // Esta pagina actua como un contenedor para el componente de checkout,
    // permitiendo que se integre con el sistema de rutas y el layout general.
    return (
        <>
            <FinalizarPedido />
        </>
    );
}

export default FinalizarPedidoPage;
