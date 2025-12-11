#  IL Rituale - Sistema de Gestión y Pedidos para Restaurante


##  Descripción General del Proyecto

IL Rituale es una **plataforma web full-stack** diseñada para servir como la **interfaz pública (Posicionamiento)** y el **sistema administrativo interno** del restaurante.

Actualmente, el proyecto se enfoca en las funcionalidades de **Gestión de Recursos (CRUD)**. La visión a futuro es integrar un **Sistema Completo de Pedidos** en línea.

##  Funcionalidades Clave

### 1. Sistema de Gestión Interna (CRUD)

El módulo administrativo actual permite al personal del restaurante mantener actualizado el inventario y el menú:

* **Gestión de Ingredientes:** Control de ingredientes , stock y registro de alérgenos.
* **Gestión de Platos:** Creación y definición de platos y precios.

### 2. Stack Tecnológico

Este proyecto ha sido desarrollado utilizando tecnologías modernas y robustas, separando claramente el frontend de la lógica de negocio (backend):

* **Frontend:** **React** con **React Router DOM** (para navegación y rutas dinámicas).
* **Backend:** **Spring Boot** (Java) como API RESTful.
* **Base de Datos:** Mysql.


##  Inicio Rápido (Guía de Instalación)

Para arrancar el proyecto localmente, sigue estos pasos:

### 1. Backend (Spring Boot)

1.  Clona el repositorio: `git clone https://github.com/Makima32/gestionPedidosRestaurante`
2.  Navega a la carpeta del proyecto backend.
3.  Configura la conexión a la base de datos en `src/main/resources/application.properties`.
4.  Compila y ejecuta la aplicación PedidosAplicacion.java.

### 2. Frontend (React)

1.  Navega a la carpeta del proyecto frontend (Frontend/pedidos).
2.  Instala las dependencias: `npm install`
3.  Inicia la aplicación: `npm start`
4.  La aplicación debería abrirse en `http://localhost:5173`.


## La web subida esta en
https://gestion-pedidos-restaurante-5zds.vercel.app

