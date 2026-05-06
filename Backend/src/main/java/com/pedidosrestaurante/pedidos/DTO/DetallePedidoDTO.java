package com.pedidosrestaurante.pedidos.DTO;

public class DetallePedidoDTO {
    private int idPlato; 
    private Integer cantidad;

    public int getIdPlato() { return idPlato; }
    public void setIdPlato(int idPlato) { this.idPlato = idPlato; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
}