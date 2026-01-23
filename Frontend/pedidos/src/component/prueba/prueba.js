const obtenerSaludo = (usuario) => {
  if (usuario.genero === "Mujer") return `Bienvenida, ${usuario.nombre}`;
  return `Bienvenido, ${usuario.nombre}`;
};