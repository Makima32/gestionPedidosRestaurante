package com.pedidosrestaurante.pedidos.DTO;
    import java.util.List;

    public class PedidoRequestDTO {
        private double total;
        private String tipoPedido;
        private int idUsuario; 
        private List<DetallePedidoDTO> detalles;

        public double getTotal() { return total; }
        public void setTotal(double total) { this.total = total; }

        public String getTipoPedido() { return tipoPedido; }
        public void setTipoPedido(String tipoPedido) { this.tipoPedido = tipoPedido; }

        public int getIdUsuario() { return idUsuario; }
        public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }

        public List<DetallePedidoDTO> getDetalles() { return detalles; }
        public void setDetalles(List<DetallePedidoDTO> detalles) { this.detalles = detalles; }
    }
    
