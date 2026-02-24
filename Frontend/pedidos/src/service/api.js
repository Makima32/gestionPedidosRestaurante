import { SERVER } from "../utils/assets.js";

// ==========================================
// FUNCIONES GENÉRICAS (GET y DELETE)
// ==========================================

export const obtenerEntidades = async (tipo) => {
  const response = await fetch(`${SERVER}/${tipo}`);
  if (!response.ok) throw new Error(`Error al obtener datos de ${tipo}`);
  return response.json();
};

export const obtenerEntidadPorId = async (tipo, id) => {
  const response = await fetch(`${SERVER}/${tipo}/${id}`);
  if (!response.ok) throw new Error(`Error al cargar el ${tipo}`);
  return response.json();
};

export const eliminarEntidad = async (tipo, id) => {
  const response = await fetch(`${SERVER}/${tipo}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Error al eliminar en ${tipo}`);
  }
  return response.text();
};

// ==========================================
//  FUNCIONES ESPECÍFICAS para platos
// ==========================================

export const crearPlatoAPI = async (formData) => {
  const response = await fetch(`${SERVER}/platos`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error ${response.status}: ${errorText || "No se pudo crear el plato."}`,
    );
  }
  return response.text();
};

export const actualizarPlatoAPI = async (id, formData) => {
  const response = await fetch(`${SERVER}/platos/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error ${response.status}: ${errorText || "No se pudo actualizar el plato."}`,
    );
  }
  return response.text();
};


// ==========================================
//  FUNCIONES ESPECÍFICAS para ingredientes
// ==========================================


export const crearIngredienteAPI = async (formData) => {
  const response = await fetch(`${SERVER}/ingredientes`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Error al crear ingrediente");
  return response.text();
};

export const actualizarIngredienteAPI = async (id, formData) => {
  const response = await fetch(`${SERVER}/ingredientes/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) throw new Error("Error al actualizar ingrediente");
  return response.text();
};
