"use strict";

const moneda = new Intl.NumberFormat("es-MX", {style:"currency", currency:"MXN"});
const partidas = document.getElementById("partidas");
const agregar = document.getElementById("agregar-partida");
const estado = document.getElementById("estado-presupuesto");
const total = document.getElementById("total");
let secuencia = 0;

function actualizar() {
  let suma = 0;
  let completo = true;
  for (const fila of partidas.children) {
    const cantidad = fila.querySelector(".cantidad");
    const precio = fila.querySelector(".precio");
    const subtotal = fila.querySelector(".subtotal");
    const valido = cantidad.validity.valid && precio.validity.valid;
    cantidad.setAttribute("aria-invalid", String(!cantidad.validity.valid));
    precio.setAttribute("aria-invalid", String(!precio.validity.valid));
    if (!valido) {
      completo = false;
      subtotal.value = "—";
      continue;
    }
    const centavos = Math.round(precio.valueAsNumber * 100) * cantidad.valueAsNumber;
    subtotal.value = moneda.format(centavos / 100);
    suma += centavos;
  }
  total.value = completo ? moneda.format(suma / 100) : "—";
  estado.textContent = completo ? "" : "Revisa los valores marcados. La cantidad admite enteros de 0 a 9999 y el precio de 0 a 999999.99, con hasta dos decimales.";
}
function nuevaPartida(nombre, cantidad, precio) {
  const fila = document.getElementById("plantilla-partida").content.firstElementChild.cloneNode(true);
  const concepto = fila.querySelector(".concepto");
  const unidades = fila.querySelector(".cantidad");
  const costo = fila.querySelector(".precio");
  const quitar = fila.querySelector(".quitar");
  const numero = ++secuencia;
  concepto.value = nombre;
  unidades.value = cantidad;
  costo.value = precio;
  concepto.setAttribute("aria-label","Concepto de la partida " + numero);
  function identificar() {
    const referencia = concepto.value.trim() || "la partida " + numero;
    unidades.setAttribute("aria-label","Cantidad de " + referencia);
    costo.setAttribute("aria-label","Precio unitario de " + referencia);
    quitar.setAttribute("aria-label","Quitar " + referencia);
    fila.querySelector(".subtotal").setAttribute("aria-label","Importe de " + referencia);
  }
  identificar();
  concepto.addEventListener("input", identificar);
  quitar.addEventListener("click", () => {
    const siguiente = fila.nextElementSibling || fila.previousElementSibling;
    fila.remove();
    actualizar();
    (siguiente ? siguiente.querySelector(".concepto") : agregar).focus();
  });
  partidas.append(fila);
  return concepto;
}
partidas.addEventListener("input", actualizar);
agregar.addEventListener("click", () => {
  nuevaPartida("", 1, "0.00").focus();
  actualizar();
});
nuevaPartida("Listones de ensayo", 6, "35.00");
nuevaPartida("Traslado local", 1, "600.00");
nuevaPartida("Material de utilería", 2, "95.00");
actualizar();
