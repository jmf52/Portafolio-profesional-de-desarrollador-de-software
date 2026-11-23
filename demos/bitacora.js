"use strict";

const ESTADOS = ["Pendiente","Aprobado","Fallido"];
const EJEMPLOS = [
  {nombre:"Crear un registro", esperado:"El registro aparece en la lista después de guardarlo.", estado:"Pendiente"},
  {nombre:"Buscar sin coincidencias", esperado:"Aparece un aviso que indica que la búsqueda no tuvo resultados.", estado:"Aprobado"}
];
const porId = id => document.getElementById(id);
const ayuda = porId("estado-bitacora");
const filtro = porId("filtro");
let base;
let casos = [];
let idTemporal = 0;

function abrirBase() {
  return new Promise((resolve, reject) => {
    const solicitud = indexedDB.open("portafolio-evidencias-bitacora-qa", 1);
    solicitud.onupgradeneeded = () => {
      const tabla = solicitud.result.createObjectStore("casos", {keyPath:"id", autoIncrement:true});
      EJEMPLOS.forEach(caso => tabla.add({...caso}));
    };
    solicitud.onsuccess = () => resolve(solicitud.result);
    solicitud.onerror = () => reject(solicitud.error);
    solicitud.onblocked = () => { porId("almacenamiento").textContent = "Cierra otras versiones de esta demo para abrir la bitácora."; };
  });
}

// Se confirma la operación cuando la transacción termina de escribirse.
function operar(modo, trabajo) {
  return new Promise((resolve, reject) => {
    const tx = base.transaction("casos", modo);
    let resultado;
    tx.oncomplete = () => resolve(resultado);
    tx.onabort = () => reject(tx.error || new Error("Transacción interrumpida"));
    const tabla = tx.objectStore("casos");
    const solicitud = trabajo(tabla);
    if (solicitud) solicitud.onsuccess = () => { resultado = solicitud.result; };
  });
}

function mostrar() {
  const seleccion = filtro.value;
  const visibles = casos.filter(caso => seleccion === "Todos" || caso.estado === seleccion);
  porId("sin-casos").hidden = visibles.length > 0;
  porId("casos").replaceChildren(...visibles.map(caso => {
    const li = document.createElement("li");
    li.className = "caso";
    const titulo = document.createElement("h3");
    titulo.textContent = caso.nombre;
    const esperado = document.createElement("p");
    esperado.textContent = caso.esperado;
    const label = document.createElement("label");
    label.append("Estado");
    const select = document.createElement("select");
    select.setAttribute("aria-label","Estado de " + caso.nombre);
    ESTADOS.forEach(estado => select.add(new Option(estado, estado, false, estado === caso.estado)));
    select.addEventListener("change", async () => {
      const nuevo = select.value;
      select.disabled = true;
      try {
        if (base) {
          await operar("readwrite", tabla => {
            const lectura = tabla.get(caso.id);
            lectura.onsuccess = () => {
              if (lectura.result) tabla.put({...lectura.result, estado:nuevo});
            };
          });
        }
        caso.estado = nuevo;
        ayuda.textContent = caso.nombre + " · " + nuevo + ".";
        if (filtro.value !== "Todos" && filtro.value !== nuevo) {
          mostrar();
          filtro.focus();
        }
      } catch {
        select.value = caso.estado;
        ayuda.textContent = "No se guardó el cambio de estado. Inténtalo de nuevo.";
      } finally { select.disabled = false; }
    });
    label.append(select);
    li.append(titulo, esperado, label);
    return li;
  }));
}
async function actualizarLista() {
  if (base) casos = (await operar("readonly", tabla => tabla.getAll())).reverse();
  mostrar();
}
function modoTemporal() {
  if (base) base.close();
  base = null;
  if (!casos.length) casos = EJEMPLOS.map((c, i) => ({...c, id:i+1})).reverse();
  idTemporal = casos.reduce((max, c) => Math.max(max, c.id), 0);
  porId("almacenamiento").textContent = "Almacenamiento no disponible. Los cambios durarán solo esta sesión.";
  mostrar();
}
async function preparar() {
  try {
    base = await abrirBase();
    base.onversionchange = modoTemporal;
    await actualizarLista();
    porId("almacenamiento").textContent = "Los casos se guardan en este navegador con IndexedDB.";
  } catch {
    modoTemporal();
  }
  porId("entradas").disabled = false;
}
porId("formulario-caso").addEventListener("submit", async evento => {
  evento.preventDefault();
  const nombre = porId("caso").value.trim();
  const esperado = porId("esperado").value.trim();
  if (!nombre || !esperado) {
    ayuda.textContent = "Escribe el nombre y el resultado esperado.";
    porId(nombre ? "esperado" : "caso").focus();
    return;
  }
  const caso = {nombre, esperado, estado:"Pendiente"};
  porId("entradas").disabled = true;
  try {
    if (base) {
      const id = await operar("readwrite", tabla => tabla.add(caso));
      casos.unshift({...caso, id});
    } else {
      casos.unshift({...caso, id:++idTemporal});
    }
    if (filtro.value !== "Todos" && filtro.value !== "Pendiente") filtro.value = "Todos";
    mostrar();
    porId("formulario-caso").reset();
    ayuda.textContent = "Caso guardado como pendiente.";
  } catch {
    ayuda.textContent = "No se guardó el caso. Conservamos el texto para que puedas reintentar.";
  } finally {
    porId("entradas").disabled = false;
    porId("caso").focus();
  }
});
filtro.addEventListener("change", mostrar);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && base) actualizarLista().catch(() => { ayuda.textContent = "No se pudo actualizar la lista."; });
});
preparar();
