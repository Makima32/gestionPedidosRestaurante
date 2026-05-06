# IL Rituale - Sistema de Gestión y Pedidos para Restaurante

[![Estado](https://img.shields.io/badge/Estado-Activo-success.svg)]()
[![Despliegue](https://img.shields.io/badge/Despliegue-Local-blue.svg)]()

## Descripción General del Proyecto

IL Rituale es una plataforma web full-stack integral diseñada para digitalizar y optimizar todos los procesos de un restaurante. Sirve un doble propósito:
1. **Web de posicionamiento:** Un escaparate digital donde los clientes pueden explorar la carta, gestionar su perfil y realizar pedidos en línea.
2. **Sistema Administrativo Interno:** Un panel de control privado y seguro para que el personal (Administradores y Chefs) gestione el inventario, los platos, los usuarios y el flujo de los pedidos.

## Características Principales

* **Seguridad y Roles Avanzados:** Autenticación protegida mediante JWT (JSON Web Tokens). Rutas y vistas dinámicas dependiendo del rol del usuario (Administrador, Chef, Cliente).
* **Sistema de Pedidos Completo:** Carrito de compras funcional, vinculación automática de pedidos al usuario autenticado y gestión de estados (ej. de Pendiente a Preparado).
* **Gestión de Inventario (CRUD):** Control exhaustivo de ingredientes, monitorización de stock y registro de alérgenos.
* **Administración de la Carta (CRUD):** Creación y edición de platos, asignación de precios y vinculación de ingredientes múltiples a cada plato.
* **Gestión de Archivos:** Subida y actualización de imágenes personalizadas para perfiles de usuario, platos e ingredientes.

## Stack Tecnológico

Este proyecto aplica una arquitectura cliente-servidor, separando claramente el frontend de la lógica de negocio y la persistencia de datos:

**Frontend**
* React.
* React Router DOM.
* Context API.

**Backend**
* Java 17+ con Spring Boot 3.
* Spring Security (Protección de endpoints, filtros CORS/CSRF y JWT).
* Spring Data JPA / Hibernate .

**Base de Datos**
* MySQL / MariaDB (Base de datos relacional).

## Inicio Rápido (Guía de Instalación Local)

Para arrancar el proyecto en tu ordenador, sigue estos pasos:

### 1. Backend (Spring Boot)
1. Clona el repositorio: 
   git clone https://github.com/Makima32/gestionPedidosRestaurante.git
2. Navega a la carpeta del proyecto backend.
3. Configura las credenciales de tu conexión a la base de datos en el archivo:
   src/main/resources/application.properties.
4. Compila y ejecuta la clase principal PedidosAplicacion.java desde tu IDE. El servidor arrancará en el puerto 8080.

### 2. Frontend (React)
1. Navega a la carpeta del proyecto frontend:
   cd Frontend/pedidos
2. Instala las dependencias necesarias: 
   npm install
3. Inicia el servidor de desarrollo: 
   npm run dev
4. La aplicación se abrirá automáticamente en tu navegador en http://localhost:5173.

## Documentación y Manuales

Para conocer mas sobre la arquitectura del sistema, los modelos de la base de datos, los casos de uso y aprender a interactuar con la plataforma, consulta la documentacion:

* [Documentación Técnica (PDF)](./Documentacion/documentacion.pdf)
* [Manual de Usuario (PDF)](./Documentacion/manualUsuario.pdf)
* [Manual de instalacion (PDF)](./Documentacion/manualInstalacion.pdf)


## Colaboradores


<div align="center">
  <a href="https://github.com/Makima32">
    <img src="./Frontend/pedidos/src/assets/Omar.png" alt="Omar" width="300" />
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/Santiagoooo1">
    <img src="./Frontend/pedidos/src/assets/Santiago.png" alt="Santiago" width="300" />
  </a>
</div>
