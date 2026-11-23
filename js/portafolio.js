"use strict";

const perfil = window.PORTAFOLIO.perfil;
const proyectos = window.PORTAFOLIO.proyectos;
const porId = (id) => document.getElementById(id);
const ficha = porId("ficha");

function elemento(etiqueta, texto, clase) {
  const nodo = document.createElement(etiqueta);
  if (texto) nodo.textContent = texto;
  if (clase) nodo.className = clase;
  return nodo;
}

// Acepta enlaces web y archivos relativos. Estos últimos también funcionan al abrir index.html con doble clic.
function rutaValida(valor) {
  if (!valor || typeof valor !== "string") return "";
  const ruta = valor.trim();
  if (!ruta || ruta.startsWith("//") || ruta.includes("\\")) return "";
  try {
    const url = new URL(ruta, document.baseURI);
    if (["http:", "https:"].includes(url.protocol)) return ruta;
    if (url.protocol === "file:" && !/^[a-z][a-z\d+.-]*:/i.test(ruta)) return ruta;
  } catch {
    return "";
  }
  return "";
}

function enlace(texto, ruta, clase) {
  const a = elemento("a", texto, clase);
  a.href = ruta;
  return a;
}

function par(termino, valor) {
  const fila = elemento("div");
  fila.append(elemento("dt", termino), elemento("dd", valor));
  return fila;
}

function destinos(proyecto) {
  const opciones = [
    [proyecto.ejemplo ? "Abrir demo" : "Ver proyecto", proyecto.demo],
    ["Ver repositorio", proyecto.repositorio],
    ["Ver evidencia", proyecto.evidencia]
  ];
  return opciones.map(([texto, ruta]) => [texto, rutaValida(ruta)]).filter(([, ruta]) => ruta);
}

function detalleProyecto(proyecto) {
  return [
    ["Objetivo", proyecto.objetivo],
    [proyecto.ejemplo ? "Implementación de la demo" : "Mi aportación", proyecto.aporte],
    [proyecto.ejemplo ? "Qué puedes comprobar" : "Resultado obtenido", proyecto.resultado],
    ["Tecnologías", (proyecto.tecnologias || []).join(" · ")]
  ].filter(([, valor]) => valor);
}

function mostrarFicha(proyecto) {
  porId("ficha-tipo").textContent = proyecto.ejemplo ? "Ficha técnica · Demo de muestra" : "Ficha técnica · Evidencia personal";
  porId("ficha-titulo").textContent = proyecto.nombre;
  porId("ficha-resumen").textContent = proyecto.descripcion;
  porId("ficha-contenido").replaceChildren(...detalleProyecto(proyecto).map(([t, v]) => par(t, v)));
  porId("ficha-enlaces").replaceChildren(...destinos(proyecto).map(([t, r]) => enlace(t, r, "boton boton-tinta")));
  ficha.showModal();
}

function cubierta(proyecto) {
  const contenedor = elemento("div", "", "cubierta");
  const ruta = rutaValida(proyecto.imagen);
  if (ruta) {
    const img = elemento("img");
    img.src = ruta;
    img.alt = proyecto.altImagen || "";
    img.loading = "lazy";
    img.addEventListener("error", () => {
      contenedor.classList.add("portada-neutra");
      contenedor.textContent = "</>";
    }, {once:true});
    contenedor.append(img);
    return contenedor;
  }
  contenedor.setAttribute("aria-hidden", "true");
  const arte = ["pulso", "bitacora", "desglose"].includes(proyecto.portada) && porId("arte-" + proyecto.portada);
  if (arte) {
    contenedor.classList.add("portada-" + proyecto.portada);
    contenedor.append(arte.content.cloneNode(true));
  } else {
    contenedor.classList.add("portada-neutra");
    contenedor.textContent = "</>";
  }
  return contenedor;
}

function tarjeta(proyecto) {
  const tarjeta = elemento("article", "", "proyecto");
  const cuerpo = elemento("div", "", "cuerpo-proyecto");
  const mixta = proyectos.some(p => p.ejemplo) && proyectos.some(p => !p.ejemplo);
  const categoria = [proyecto.categoria, mixta && proyecto.ejemplo ? "Demo de muestra" : ""].filter(Boolean).join(" · ");
  cuerpo.append(elemento("p", categoria, "categoria"), elemento("h3", proyecto.nombre), elemento("p", proyecto.descripcion));
  const tecnologias = elemento("ul", "", "tags");
  (proyecto.tecnologias || []).forEach(t => tecnologias.append(elemento("li", t)));
  cuerpo.append(tecnologias);
  const acciones = elemento("div", "", "acciones-proyecto");
  const links = destinos(proyecto);
  if (links.length) {
    const [texto, ruta] = links[0];
    const a = enlace(texto, ruta);
    a.setAttribute("aria-label", texto + " · " + proyecto.nombre);
    acciones.append(a);
  }
  const boton = elemento("button", "Ficha técnica");
  boton.type = "button";
  boton.setAttribute("aria-label", "Ficha técnica de " + proyecto.nombre);
  boton.addEventListener("click", () => mostrarFicha(proyecto));
  acciones.append(boton);
  const impreso = elemento("div", "", "print-details");
  detalleProyecto(proyecto).filter(([t]) => t !== "Tecnologías").forEach(([t, v]) => impreso.append(elemento("p", t + ". " + v)));
  links.forEach(([t, r]) => impreso.append(elemento("p", t + " · " + (location.protocol === "file:" ? r : new URL(r, document.baseURI).href))));
  cuerpo.append(acciones, impreso);
  tarjeta.append(cubierta(proyecto), cuerpo);
  return tarjeta;
}

function mostrarProyectos() {
  const ejemplos = proyectos.filter(p => p.ejemplo).length;
  let intro = "Cada ficha reúne el objetivo, mi aportación y el resultado del proyecto.";
  if (proyectos.length && ejemplos === proyectos.length) intro = "Demos de muestra que puedes probar. Cada ficha explica cómo funciona el proyecto.";
  if (ejemplos && ejemplos < proyectos.length) intro = "Evidencias personales y demos de muestra. Abre una ficha para consultar sus detalles.";
  if (!proyectos.length) intro = "Las evidencias personales se incorporarán aquí.";
  porId("introduccion-proyectos").textContent = intro;
  porId("lista-proyectos").replaceChildren(...proyectos.map(tarjeta));
}

function mostrarPerfil() {
  if (perfil.nombre) {
    document.title = perfil.nombre + " · Portafolio de evidencias";
    porId("nombre-perfil").textContent = perfil.nombre;
    porId("resumen-portada").textContent = "Portafolio de " + perfil.nombre + " para la evaluación individual del tercer parcial.";
    porId("credito").textContent = perfil.nombre + " · Evaluación individual del tercer parcial";
  }
  if (perfil.presentacion) porId("bio-perfil").textContent = perfil.presentacion;
  if (perfil.ubicacion) {
    porId("ubicacion-perfil").textContent = perfil.ubicacion;
    porId("ubicacion-perfil").hidden = false;
  }
  if (rutaValida(perfil.foto)) {
    const img = elemento("img");
    img.alt = perfil.nombre ? "Fotografía de " + perfil.nombre : "Fotografía de perfil";
    img.addEventListener("load", () => porId("foto-perfil").replaceChildren(img), {once:true});
    img.src = perfil.foto;
  }
  const estudios = (perfil.estudios || []).filter(e => e.carrera || e.institucion || e.periodo);
  if (estudios.length) porId("lista-estudios").replaceChildren(...estudios.map(e => {
    const item = elemento("div");
    if (e.carrera) item.append(elemento("h3", e.carrera));
    if (e.institucion) item.append(elemento("p", e.institucion));
    if (e.periodo) item.append(elemento("p", e.periodo));
    return item;
  }));
}

function mostrarTecnologias() {
  const grupos = [
    {titulo:"Lenguajes de programación", valores:perfil.lenguajes || [], muestra:["JavaScript"]},
    {titulo:"Tecnologías y plataformas", valores:perfil.plataformas || [], muestra:["HTML5", "CSS", "Web Audio API"]},
    {titulo:"Bases de datos", valores:perfil.basesDeDatos || [], muestra:["IndexedDB"]}
  ];
  const tieneDatos = grupos.some(g => g.valores.length);
  const soloDemos = proyectos.length > 0 && proyectos.every(p => p.ejemplo);
  const muestra = !tieneDatos && soloDemos;
  let nota = "Herramientas y tecnologías que utilizo en mis proyectos.";
  if (muestra) nota = "Herramientas utilizadas en las demos de muestra. La experiencia técnica personal está pendiente.";
  else if (!tieneDatos) nota = "La experiencia técnica personal está pendiente de incorporar.";
  porId("nota-tecnica").textContent = nota;
  porId("lista-tecnologias").replaceChildren(...grupos.map(g => par(g.titulo, (muestra ? g.muestra : g.valores).join(" · ") || "Por completar")));
}

function mostrarContacto() {
  const canales = porId("canales");
  const correo = (perfil.correo || "").trim();
  const github = rutaValida(perfil.github);
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) canales.append(enlace(correo, "mailto:" + correo));
  if (github) canales.append(enlace("Perfil en GitHub", github));
  if (canales.childElementCount) porId("nota-contacto").textContent = "Canales de contacto y consulta de proyectos.";
}

const menu = porId("menu-principal");
const botonMenu = document.querySelector(".boton-menu");
function cambiarMenu(abierto) {
  menu.classList.toggle("abierto", abierto);
  botonMenu.setAttribute("aria-expanded", String(abierto));
}
botonMenu.addEventListener("click", () => cambiarMenu(!menu.classList.contains("abierto")));
menu.addEventListener("click", () => cambiarMenu(false));
document.addEventListener("click", evento => {
  if (!evento.target.closest(".cabecera") && menu.classList.contains("abierto")) cambiarMenu(false);
});
document.addEventListener("keydown", evento => {
  if (evento.key === "Escape" && menu.classList.contains("abierto")) {
    cambiarMenu(false);
    botonMenu.focus();
  }
});
window.matchMedia("(min-width:761px)").addEventListener("change", () => cambiarMenu(false));
function marcarSeccion() {
  menu.querySelectorAll("a").forEach(a => {
    if (a.hash === location.hash) a.setAttribute("aria-current","location");
    else a.removeAttribute("aria-current");
  });
}
window.addEventListener("hashchange", marcarSeccion);
porId("cerrar-ficha").addEventListener("click", () => ficha.close());
ficha.addEventListener("click", evento => {
  if (evento.target !== ficha) return;
  const rect = ficha.getBoundingClientRect();
  if (evento.clientX < rect.left || evento.clientX > rect.right || evento.clientY < rect.top || evento.clientY > rect.bottom) ficha.close();
});
porId("imprimir").addEventListener("click", () => window.print());
mostrarProyectos();
mostrarPerfil();
mostrarTecnologias();
mostrarContacto();
marcarSeccion();
