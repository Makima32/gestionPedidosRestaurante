import { SERVER } from "../utils/assets.js";
import Cookies from "js-cookie"; 


const getAuthHeaders = () => {
  const rawCookie = Cookies.get("auth:user");
  
  if (rawCookie) {
    try {
      const userData = JSON.parse(rawCookie);
      
      if (userData && userData.token) {
        return { "Authorization": `Bearer ${userData.token}` };
      } 
    } catch (e) {
      console.error("Error al leer la cookie de autenticación:", e);
    }
  }
  
  return {};
};



export const obtenerEntidades = async (tipo) => {
  const endpoint = (tipo === "clientes" || tipo === "usuarios") ? "usuarios" : tipo;
  
  const response = await fetch(`${SERVER}/${endpoint}`, {
    headers: getAuthHeaders(), 
  });

  if (!response.ok) {
    if (response.status === 403) throw new Error("No tienes permisos para ver estos datos.");
    throw new Error(`Error al obtener datos de ${endpoint}`);
  }
  return response.json();
};

export const obtenerEntidadPorId = async (tipo, id) => {
  const endpoint = (tipo === "clientes" || tipo === "usuarios") ? "usuarios" : tipo;
  
  const response = await fetch(`${SERVER}/${endpoint}/${id}`, {
    headers: getAuthHeaders(), 
  });
  
  if (!response.ok) throw new Error(`Error al cargar el recurso en ${endpoint}`);
  return response.json();
};

export const eliminarEntidad = async (tipo, id) => {
  const endpoint = (tipo === "clientes" || tipo === "usuarios") ? "usuarios" : tipo;
  
  try {
    const response = await fetch(`${SERVER}/${endpoint}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(), 
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 403) throw new Error("No tienes permisos o tu sesión ha expirado.");
      throw new Error(errorText || `Error ${response.status}: No se pudo eliminar el recurso.`);
    }

    return response.text();
  } catch (error) {
    console.error("Error detallado en eliminarEntidad:", error);
    throw error;
  }
};



export const crearPlatoAPI = async (formData) => {
  const response = await fetch(`${SERVER}/platos`, {
    method: "POST",
    headers: getAuthHeaders(),
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
    headers: getAuthHeaders(), 
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


export const crearIngredienteAPI = async (formData) => {
  const response = await fetch(`${SERVER}/ingredientes`, {
    method: "POST",
    headers: getAuthHeaders(), 
    body: formData,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al crear ingrediente");
  }
  return response.text();
};

export const actualizarIngredienteAPI = async (id, formData) => {
  const response = await fetch(`${SERVER}/ingredientes/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(), 
    body: formData,
  });
  if (!response.ok) throw new Error("Error al actualizar ingrediente");
  return response.text();
};


export const crearUsuarioAPI = async (formData) => {
  const response = await fetch(`${SERVER}/usuarios/admin`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al crear usuario");
  }
  return response.text();
};

export const actualizarUsuarioAPI = async (id, formData) => {
  const headers = getAuthHeaders();

 
  const response = await fetch(`${SERVER}/usuarios/${id}`, {
    method: "PUT",
    headers: headers, 
    body: formData,
  });

  const respuestaTexto = await response.text();

  if (!response.ok) {
    let mensajeError = respuestaTexto;
    
    try {
      const errorData = JSON.parse(respuestaTexto);
      if (errorData && errorData.mensaje) {
        mensajeError = errorData.mensaje;
      }
    } catch (e) {
    }

    throw new Error(mensajeError || "Error al actualizar el usuario");
  }

  try {
    return respuestaTexto ? JSON.parse(respuestaTexto) : {};
  } catch (e) {
    return respuestaTexto; 
  }
};

export const actualizarPerfilAPI = async (formData) => {
  const headers = getAuthHeaders();

  const response = await fetch(`${SERVER}/usuarios/perfil`, {
    method: "PUT",
    headers: headers, 
    body: formData,
  });

  const respuestaTexto = await response.text();

  if (!response.ok) {
    let mensajeError = respuestaTexto;
    try {
      const errorData = JSON.parse(respuestaTexto);
      if (errorData && errorData.mensaje) {
        mensajeError = errorData.mensaje;
      }
    } catch (e) {}

    throw new Error(mensajeError || "Error al actualizar el perfil");
  }

  try {
    return respuestaTexto ? JSON.parse(respuestaTexto) : {};
  } catch (e) {
    return respuestaTexto; 
  }
};