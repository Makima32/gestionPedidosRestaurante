import { describe, it, expect } from 'vitest';
import { cambiarCantidad, calcularTotalItems } from '../component/pedidos_component/carrito.js';

describe('Lógica de Cálculos del Carrito', () => {
    describe('cambiarCantidad()', () => {
        it('Debería actualizar la cantidad de un plato específico', () => {
            const carrito = [{ idPlato: 1, nombre: 'Margarita', cantidad: 1 }];
            const resultado = cambiarCantidad(carrito, 1, 5);
            expect(resultado[0].cantidad).toBe(5);
        });

        it('Debería eliminar el plato si la nueva cantidad es 0 (Caso límite)', () => {
            const carrito = [{ idPlato: 1, nombre: 'Margarita', cantidad: 2 }];
            const resultado = cambiarCantidad(carrito, 1, 0);
            expect(resultado.length).toBe(0);
        });
    });

    describe('calcularTotalItems()', () => {
        it('Debería sumar correctamente el total de unidades en el carrito', () => {
            const carrito = [{ idPlato: 1, cantidad: 2 }, { idPlato: 2, cantidad: 3 }];
            const total = calcularTotalItems(carrito);
            expect(total).toBe(5);
        });
    });
});