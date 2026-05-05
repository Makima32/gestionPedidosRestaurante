package com.pedidosrestaurante.pedidos.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private int idUsuario;

    @NotBlank(message = "El nombre no puede estar vacío")
    @Column(name = "nombre", unique = true)
    private String nombre;

    @NotBlank(message = "La contraseña no puede estar vacía")
    @Column(name = "password")
    private String password;

    @Column(name = "rol", columnDefinition = "VARCHAR(255) DEFAULT 'user'")
    private String rol = "user";

    @NotBlank(message = "El correo no puede estar vacío")
    @Column(name = "correo")
    private String correo;

    @Column(name = "imagen")
    private String imagen;

    @Column(name = "direccion")
    private String direccion;

    public Usuario() {
    }

    public Usuario(String nombre, String password, String rol, String correo, String imagen, String direccion) {
        this.nombre = nombre;
        this.password = password;
        this.rol = rol;
        this.correo = correo;
        this.imagen = imagen;
        this.direccion = direccion;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
}