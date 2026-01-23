/**
 * Lógica pura para gestionar el carrito.
 */

// AÃ±ade o actualiza un plato en el carrito.
export const actualizarCarrito = (carritoActual, plato) => {
  // Defensa: Asegurarnos que el plato y su ID son validos.
  if (!plato || typeof plato.idPlato === 'undefined') {
    console.error("Error: Se intento anadir un plato sin ID valido.", plato);
    return carritoActual; // Devolvemos el carrito sin cambios.
  }

  const existe = carritoActual.find((item) => item.idPlato === plato.idPlato);

  if (existe) {
    // Si ya existe, sumamos cantidad
    return carritoActual.map((item) =>
      item.idPlato === plato.idPlato ? { ...item, cantidad: item.cantidad + 1 } : item
    );
  } else {
    // Si es nuevo, lo anadimos con toda su info y cantidad 1.
    return [...carritoActual, { ...plato, cantidad: 1 }];
  }
};

export const eliminarPlatoDelCarrito = (carritoActual, platoId) => {
  return carritoActual.filter(item => item.idPlato !== platoId);
};

export const cambiarCantidad = (carritoActual, platoId, nuevaCantidad) => {
  console.log("cambiarCantidad llamado:", { carritoActual, platoId, nuevaCantidad }); // LOG DEPURACION
  const nuevoCarrito = carritoActual.map(item =>
      item.idPlato === platoId
          ? { ...item, cantidad: nuevaCantidad }
          : item
  ).filter(item => item.cantidad > 0);
  console.log("cambiarCantidad devuelve:", nuevoCarrito); // LOG DEPURACION
  return nuevoCarrito;
};

export const calcularTotalItems = (carrito) => {
    return carrito.reduce((acc, item) => acc + item.cantidad, 0);
};

