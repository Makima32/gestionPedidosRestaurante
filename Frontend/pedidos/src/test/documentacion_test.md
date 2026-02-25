# 🧪 Documentación Técnica de Testing - IL RITUALE

 Documentación detalla de pruebas del frontend, asegurando la integridad de la lógica de negocio, la comunicación con la API y la interfaz de usuario.

---

## 1. Requisitos / Setup
- **Framework:** Vitest (Nativo para Vite, compatible con ESM).
- **Entorno de DOM:** `jsdom` (Simulación de navegador para React).
- **Librerías:** `@testing-library/react` para renderizado y `react-router-dom` (MemoryRouter) para navegación.
- **Configuración:** `globals: true` activado en `vite.config.js`.

---

## 2. Comandos Completos

| Acción | Comando |
| :--- | :--- |
| **Ejecutar todos los tests** | `npm test` |
| **Ejecutar todos los tests con UI** | `npm vitest:ui` |
| **Modo Observación (Watch)** | `npx vitest` |
| **Generar Cobertura (Coverage)** | `npx vitest run --coverage` |
| **Ejecutar archivo específico** | `npx vitest src/test/{Archivo.test.js}` |
| **Ejecutar por nombre/patrón** | `npx vitest -t "Administracion"` |

---

## 3. Cobertura (Métricas y Reglas)

### Métricas de Calidad:
- **Statements (Sentencias):** Porcentaje de instrucciones ejecutadas.
- **Branches (Ramas):** Caminos lógicos (`if/else`) recorridos.
- **Functions (Funciones):** Métodos invocados.
- **Lines (Líneas):** Líneas físicas de código protegidas por tests (indica qué bloques exactos están validados).

| Métrica | Porcentaje | Fracción | |
| :--- | :--- | :--- | :--- |
| Statements (Sentencias) | 43.41% | 56 / 129 |  |
| Branches (Ramas) | 35.82% | 24 / 67 |  |
| Functions (Funciones) | 48.38% | 15 / 31 |  |
| Lines (Líneas) | 45.13% | 51 / 113 | |

<br>

| Directorio / Archivo | Statements | Branches | Functions | Lines |
| :--- | :--- | :--- | :--- | :--- |
| utils | 100% (2/2) | 100% (0/0) | 100% (0/0) | 100% (2/2) |
| component/pedidos_component | 100% (23/23) | 80% (8/10) | 100% (10/10) | 100% (20/20) |
| component/layout/header | 84.61% (11/13) | 80% (12/15) | 50% (2/4) | 100% (10/10) |
| service | 31.25% (15/48) | 10.71% (3/28) | 25% (2/8) | 31.11% (14/45) |
| hook/auth | 11.62% (5/43) | 7.14% (1/14) | 11.11% (1/9) | 13.88% (5/36) |

## Nota: 
* Recuerda que te comentamos en clase el tema de los test de auth y services estan tan bajos porque habiamos implementado Jason web token el dia antes y no terminamos de incluirlo en los test
---

## 4. Alcance del Testing
- **Lógica:** Cálculos matemáticos de los precios y cantidades.
- **Datos:** Integridad de los objetos del carrito y platos.
- **API/Mocks:** Respuestas simuladas del servidor.
- **Interfaz:** Comportamiento condicional de componentes según el rol del usuario.

---

## 5. Análisis de cada test individiual

### 📂 Fichero: `api.test.js`
**Propósito:** Testear la función `obtenerEntidades` del servicio de API que recibe los objetos de la base de datos, principalmente platos e ingredientes.

| Test (`it`/`test`) | ¿Qué testea?  | Técnica Utilizada  | Cobertura de Líneas |
| :--- | :--- | :--- | :--- |
| *Obtener platos correctamente* | El éxito de la petición y el mapeo de datos. | `vi.spyOn` de `fetch` devolviendo `ok: true`. | Valida que funcione correctamente las peticiones para obtener platos testeando la funcion `try` |
| *Error HTTP (ok: false)* | El manejo de códigos de error Not Found/Error (404, 500). | Simulación de respuesta con `ok: false`. | Valida la lógica del `if (!response.ok)`. |
| *Fallo de red* | Cuando la petición API no responde , por si el backend está caído o desactivado | `mockRejectedValue` simulando error de red. | Valida la captura del error en el bloque `catch` cuando no responde. |

---

### 📂 Fichero: `carrito_calculos.test.js`
**Propósito:** Validar funciones aritméticas y de filtrado en `carrito.js`.

| Test (`it`/`test`) | ¿Qué testea?  | Técnica Utilizada | Cobertura de Líneas |
| :--- | :--- | :--- | :--- |
| *Actualizar cantidad* | Que la cantidad de un plato cambie de un numero a otro correctamente sin fallos. | Paso de parámetros a `cambiarCantidad`. | Cubre la función de mapeo `.map()` de carrito.js . |
| *Eliminar si es 0* | Que el plato desaparezca si la cantidad llega a 0. | Caso límite enviando valor `0`. | Valida la línea del `.filter()`. |
| *Sumar total de unidades* | La suma total del contador del carrito. | Uso de `calcularTotalItems` con array variado. | Cubre el acumulador `.reduce()`. |

---

### 📂 Fichero: `carrito_gestion.test.js`
**Propósito:** Validar el CRUD interno del carrito y su integridad.

| Test (`it`/`test`) | ¿Qué testea?  | Técnica Utilizada  | Cobertura de Líneas |
| :--- | :--- | :--- | :--- |
| *Añadir plato nuevo* | La inserción inicial con `cantidad: 1`, testea que se añada correctamente el plato al carrito. | `actualizarCarrito` con array vacío. | Bloque de creación de nuevo objeto. |
| *Sumar si ya existe* | El incremento de cantidad de un plato repetido. | `actualizarCarrito` con ID coincidente. | Bloque de actualización de propiedad. |
| *Rechazar plato sin ID* | Test para evitar datos corruptos. | Intento de inserción de objeto sin `idPlato`. | Valida el `if (!plato.idPlato)` inicial. |
| *Eliminar por ID* | El borrado correcto de un elemento. | `eliminarPlatoDelCarrito` con ID específico. | Bloque de filtrado por ID. |

---

### 📂 Fichero: `header.test.jsx`
**Propósito:** Validar la lógica de UI del componente `Header`.

| Test (`it`/`test`) | ¿Qué testea?  | Técnica Utilizada  | Cobertura de Líneas |
| :--- | :--- | :--- | :--- |
| *Ver "Administración"* | Que se vea del enlace para administradores en el header si el usuario logueado es un admin. | Render con `rol: 'admin'` en `AuthContext`. | Cubre la rama `user.rol === 'admin'`. |
| *Ocultar "Administración"* | Que un usuario normal no vea el menú admin. | Render con rol `ROLE_user`. | Cubre la rama negativa del condicional. |
| *Botón "Login"* | Visibilidad para usuarios no identificados, solo le sale a los usuarios que no han logueado. | Render con `user: null` en el contexto. | Valida la lógica de `!user`. |
| *Nombre en banner* | Personalización de la sesión con nombre y salga el banner con su usuario. | Render con `name: 'Omar2'`. | Línea de renderizado de la variable `nombre`. |

---

## 6. Guía para escribir Tests (AAA)

### Patrón Arrange-Act-Assert:
1.  **Arrange (Preparar):** Configurar el escenario inicial.
2.  **Act (Actuar):** Ejecutar la acción o función.
3.  **Assert (Confirmar):** Validar que el resultado es el esperado.

### Ejemplo de nuestros test:
```javascript
it('Debería eliminar el plato si la nueva cantidad es 0', () => {
  const carrito = [{ idPlato: 1, cantidad: 2 }]; // Arrange
  const resultado = cambiarCantidad(carrito, 1, 0); // Act
  expect(resultado.length).toBe(0); // Assert
});
```

---
### 7. Mocks y Aislamiento

Para garantizar que los tests sean rápidos y no dependan de que el servidor backend esté encendido, aislamos el entorno utilizando Mocks:

- **Mockeo de API/Fetch:** Utilizamos `vi.spyOn(global, 'fetch')` para interceptar cualquier llamada de red. Dependiendo del test, le ordenamos que devuelva una respuesta exitosa (`mockResolvedValue`) o un fallo forzado (`mockRejectedValue`) para probar cómo reacciona el frontend.
- **Limpieza (Clean-up):** Para evitar "fugas" de datos entre tests, implementamos los hooks de limpieza de Vitest. Usamos `vi.clearAllMocks()` en el `beforeEach` para reiniciar contadores, y `vi.restoreAllMocks()` en el `afterEach` para destruir el mock por completo y devolver `fetch` a su estado original.

### 8. Troubleshooting (Problemas Comunes y Soluciones)
| Problema / Error | Causa Raíz | Solución |
| :--- | :--- | :--- |
| **`ReferenceError: fetch is not defined`** | Node.js (el entorno donde se ejecutan los tests) no incluye la API `fetch` del navegador por defecto en versiones antiguas. | Utilizar `vi.spyOn(global, 'fetch')` para mockear la función directamente en el archivo de test antes de llamar a la API. |
| **`document is not defined` / Fallo de DOM** | React intenta renderizar el HTML del componente, pero Node no tiene interfaz gráfica ni DOM real. | Asegurarse de tener el entorno simulado. Añadir `environment: 'jsdom'` en el archivo `vite.config.js` y verificar que el paquete `jsdom` está instalado. |
| **`useHref() may be used only in the context of a <Router>`** | Se intenta probar un componente que tiene etiquetas `<Link>` (como nuestro Header), pero no está dentro del enrutador principal de la app. | Importar `MemoryRouter` de `react-router-dom` y envolver el componente dentro del test: `<MemoryRouter><Header /></MemoryRouter>`. |
| **`Otros problemas>`** | Tuvimos problemas con la interfaz grafica de los test, el `vitest:ui` y algun problema con el tema del rendrizado de los test de interfaz| Integrar correctamente `vitest:ui`en el json con dependencias y lo del renderizado fue un error por no importar correctamente un par de librerias como la de `react` y `render`|