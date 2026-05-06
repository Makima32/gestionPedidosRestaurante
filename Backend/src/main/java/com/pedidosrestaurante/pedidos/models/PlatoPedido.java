package com.pedidosrestaurante.pedidos.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "platos_pedidos")
public class PlatoPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "id_pedido")
    @JsonIgnore  
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "id_plato")
    private Plato plato;

    @Column(name = "cantidad")
    private int cantidad;

    public PlatoPedido() {}

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public Pedido getPedido() { return pedido; }
    public void setPedido(Pedido pedido) { this.pedido = pedido; }

    public Plato getPlato() { return plato; }
    public void setPlato(Plato plato) { this.plato = plato; }

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }
}