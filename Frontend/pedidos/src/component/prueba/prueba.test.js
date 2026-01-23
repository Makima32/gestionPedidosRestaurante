import { describe, test, expect } from 'vitest';

const obtenerSaludo = (usuario) => {
  if (usuario.genero === "Mujer") return `Bienvenida, ${usuario.nombre}`;
  return `Bienvenido, ${usuario.nombre}`;
};

describe("Pruebas de Saludos", () => {
  
  test("Debe saludar correctamente a un hombre", () => {
    const user = { nombre: "Omar", genero: "Hombre" };

    const resultado = obtenerSaludo(user);4

    expect(resultado).toBe("Bienvenido, Omar");
  });

  test("Debe saludar correctamente a una mujer", () => {
    const user = { nombre: "Maria", genero: "Mujer" };

    const resultado = obtenerSaludo(user);

    expect(resultado).toBe("Bienvenida, Maria");
  });

});