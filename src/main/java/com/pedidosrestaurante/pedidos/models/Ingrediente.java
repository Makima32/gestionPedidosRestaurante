package com.pedidosrestaurante.pedidos.models;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="ingredientes")

public class Ingrediente {

@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name="id_ingrediente")
private int idIngrediente;

@Column(name="nombre")
private String nombre;

@Column(name="descripcion")
private String descripcion;

@Column(name="alergenos")
private String alergenos;

@Column(name="stock")
private int stock;

@Column(name="es_vegano")
private boolean esVegano;


public Ingrediente(){};

public Ingrediente(String nombre, String descripcion, String alergenos, int stock, boolean esVegano) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.alergenos = alergenos;
    this.stock = stock;
    this.esVegano = esVegano;
}

public String getNombre() {
    return nombre;
}

public void setNombre(String nombre) {
    this.nombre = nombre;
}

public String getDescripcion() {
    return descripcion;
}

public void setDescripcion(String descripcion) {
    this.descripcion = descripcion;
}

public String getAlergenos() {
    return alergenos;
}

public void setAlergenos(String alergenos) {
    this.alergenos = alergenos;
}

public int getStock() {
    return stock;
}

public void setStock(int stock) {
    this.stock = stock;
}

public boolean isEsVegano() {
    return esVegano;
}

public void setEsVegano(boolean esVegano) {
    this.esVegano = esVegano;
}

@Override
public String toString() {
    return "ingredientes [idCliente=" + idIngrediente + ", nombre=" + nombre + ", descripcion=" + descripcion
            + ", alergenos=" + alergenos + ", stock=" + stock + ", esVegano=" + esVegano + "]";
}





}


