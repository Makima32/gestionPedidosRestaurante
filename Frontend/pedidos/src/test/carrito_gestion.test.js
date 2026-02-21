import { describe, it, expect } from 'vitest';
import { actualizarCarrito, eliminarPlatoDelCarrito } from '../component/pedidos_component/carrito.js'; 

describe('Lógica de Gestión del Carrito', () => {
  describe('actualizarCarrito()', () => {
    it('Añadir un plato nuevo con cantidad 1 si el carrito está vacío', () => {
      const carritoVacio = [];
      const platoNuevo = { idPlato: 1, nombre: 'Margarita', precio: 10 };
      const resultado = actualizarCarrito(carritoVacio, platoNuevo);
      expect(resultado.length).toBe(1);
      expect(resultado[0].cantidad).toBe(1);
    });

    it('Sumar 1 a la cantidad si el plato ya existe en el carrito', () => {
      const carritoConPlato = [{ idPlato: 1, nombre: 'Margarita', precio: 10, cantidad: 1 }];
      const mismoPlato = { idPlato: 1, nombre: 'Margarita', precio: 10 };
      const resultado = actualizarCarrito(carritoConPlato, mismoPlato);
      expect(resultado[0].cantidad).toBe(2); 
    });

    it('Debería rechazar un plato sin ID y devolver el carrito intacto (Caso límite)', () => {
      const carritoActual = [{ idPlato: 1, nombre: 'Margarita', cantidad: 1 }];
      const platoInvalido = { nombre: 'Pizza Fantasma', precio: 5 }; 
      const resultado = actualizarCarrito(carritoActual, platoInvalido);
      expect(resultado).toEqual(carritoActual); 
    });
  });

  describe('eliminarPlatoDelCarrito()', () => {
    it('Debería eliminar únicamente el plato especificado', () => {
      const carrito = [{ idPlato: 1, nombre: 'Margarita' }, { idPlato: 2, nombre: 'Diavola' }];
      const resultado = eliminarPlatoDelCarrito(carrito, 1);
      expect(resultado.length).toBe(1);
      expect(resultado[0].idPlato).toBe(2); 
    });
  });
});