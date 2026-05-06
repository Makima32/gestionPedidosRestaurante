package com.pedidosrestaurante.pedidos.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private int idPedido;

    @Column(name = "fecha")
    private LocalDateTime fecha;

    @Column(name = "total")
    private double total;

    @Column(name = "estado")
    private String estado = "pendiente";

    @Column(name = "estado_pago")
    private String estadoPago = "pendiente";

    @Column(name = "tipo_pedido")
    private String tipoPedido;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario cliente;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlatoPedido> detalles = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        this.fecha = LocalDateTime.now();
    }

    public Pedido() {
    }

    public void addDetalle(PlatoPedido detalle) {
        detalles.add(detalle);
        detalle.setPedido(this);
    }

    public int getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(int idPedido) {
        this.idPedido = idPedido;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getEstadoPago() {
        return estadoPago;
    }

    public void setEstadoPago(String estadoPago) {
        this.estadoPago = estadoPago;
    }

    public String getTipoPedido() {
        return tipoPedido;
    }

    public void setTipoPedido(String tipoPedido) {
        this.tipoPedido = tipoPedido;
    }

    public Usuario getCliente() {
        return cliente;
    }

    public void setCliente(Usuario cliente) {
        this.cliente = cliente;
    }

    public List<PlatoPedido> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<PlatoPedido> detalles) {
        this.detalles = detalles;
    }
}