import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
// 1. IMPORTANTE: Importamos la nueva función genérica
import { obtenerEntidades } from '../service/api.js';

describe('API - Peticiones al Servidor (Mocks)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Limpiamos los mocks 
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Omar
  it('Debería obtener los platos correctamente cuando el servidor responde OK', async () => {
    const mockPlatos = [
      { idPlato: 1, nombre: 'Margarita', precio: 10 },
      { idPlato: 2, nombre: 'Barbacoa', precio: 12 }
    ];

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockPlatos,
    });

    const resultado = await obtenerEntidades("platos");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(resultado).toEqual(mockPlatos);
  });

  it('Debería lanzar un error si el servidor responde con error HTTP (ok: false)', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(obtenerEntidades("platos")).rejects.toThrow("Error al obtener datos");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  // Santiago
  it('Debería fallar si no hay red o el backend está apagado', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error("Failed to fetch"));

    await expect(obtenerEntidades("platos")).rejects.toThrow("Failed to fetch");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});