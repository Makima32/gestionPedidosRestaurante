package com.pedidosrestaurante.pedidos.models;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


@Entity
@Table(name="ingredientes")

public class Ingrediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_ingrediente")

    private int idIngrediente;

    @OneToMany(mappedBy = "ingrediente") 
    private List<PlatoIngrediente> platosIngredientes;
    
    @NotBlank(message = "El nombre no puede estar vacío")
    @Column(name="nombre")
    private String nombre;

    @NotBlank(message = "La descripción no puede estar vacía")
    @Column(name="descripcion")
    private String descripcion;

    @NotBlank(message = "Los alérgenos no pueden estar vacíos")
    @Column(name="alergenos")
    private String alergenos;

    @NotNull(message = "El stock no puede ser nulo")
    @Column(name="stock")
    @Min(value = 0, message = "El stock no puede ser negativo")
    private int stock;

    @Column(name="es_vegano")
    private boolean esVegano;

    @Column(name="imagen")
    private String imagen;


    public Ingrediente(){};

    public Ingrediente(String nombre, String descripcion, String alergenos, int stock, boolean esVegano, String imagen) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.alergenos = alergenos;
        this.stock = stock;
        this.esVegano = esVegano;
        this.imagen = imagen;
    }



    public String getNombre() {
        return nombre;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
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
        return "ingredientes [idIngrediente=" + idIngrediente + ", nombre=" + nombre + ", descripcion=" + descripcion
                + ", alergenos=" + alergenos + ", stock=" + stock + ", esVegano=" + esVegano + "]" + imagen +"]";
    }

    public int getIdIngrediente() {
        return idIngrediente;
    }

    public void setIdIngrediente(int idIngrediente) {
        this.idIngrediente = idIngrediente;
    }

    public List<PlatoIngrediente> getPlatosIngredientes() {
        return platosIngredientes;
    }

    public void setPlatosIngredientes(List<PlatoIngrediente> platosIngredientes) {
        this.platosIngredientes = platosIngredientes;
    }
}