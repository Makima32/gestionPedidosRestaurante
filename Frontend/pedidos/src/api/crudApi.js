// src/api/crudApi.js

const BASE_URL = "http://localhost:8080";

function buildImagenUrl(tipo, raw) {
  // Si ya viene imagenUrl del backend, la respetamos
  if (raw.imagenUrl) return raw.imagenUrl;

  const folder = tipo === "platos" ? "Platos" : "Ingredientes";
  const nombre = raw.imagen && raw.imagen !== "" ? raw.imagen : "default";
  return `/CrudImg/${folder}/${nombre}.png`;
}

function addCommonFields(tipo, raw) {
  // Sacamos un id válido venga como venga del backend
  const id = raw.id ?? raw.idIngrediente ?? raw.idPlato;

  return {
    ...raw,
    id, // <- SIEMPRE habrá id aquí
    imagenUrl: buildImagenUrl(tipo, raw),
  };
}

export async function listar(tipo) {
  const res = await fetch(`${BASE_URL}/${tipo}/listar`);
  if (!res.ok) throw new Error("Error al listar " + tipo);
  const data = await res.json();

  // Normalizamos todos los items
  return data.map((raw) => addCommonFields(tipo, raw));
}

export async function eliminar(tipo, id) {
  console.log("[crudApi.eliminar] tipo:", tipo, "id:", id);

  if (id == null) {
    throw new Error("ID inválido al intentar eliminar: " + id);
  }

  const res = await fetch(`${BASE_URL}/${tipo}/eliminar/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar");
}

