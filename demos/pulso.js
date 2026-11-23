"use strict";

const tempo = document.getElementById("tempo");
const compas = document.getElementById("compas");
const lectura = document.getElementById("lectura-bpm");
const batutas = document.getElementById("batutas");
const iniciar = document.getElementById("iniciar");
const estadoAudio = document.getElementById("estado-audio");
let audio;
let sonando = false;
let siguiente = 0;
let paso = 0;
let reloj;
let inicioId = 0;

function dibujarCompas() {
  const marcas = Array.from({length:Number(compas.value)}, () => document.createElement("i"));
  batutas.replaceChildren(...marcas);
  paso = 0;
}
function clic(acentuado) {
  if (!audio || audio.state !== "running") return;
  const oscilador = audio.createOscillator();
  const volumen = audio.createGain();
  const ahora = audio.currentTime;
  oscilador.frequency.value = acentuado ? 1040 : 650;
  volumen.gain.setValueAtTime(0.0001, ahora);
  volumen.gain.exponentialRampToValueAtTime(0.18, ahora + 0.004);
  volumen.gain.exponentialRampToValueAtTime(0.0001, ahora + 0.065);
  oscilador.connect(volumen);
  volumen.connect(audio.destination);
  oscilador.start(ahora);
  oscilador.stop(ahora + 0.07);
  oscilador.onended = () => { oscilador.disconnect(); volumen.disconnect(); };
}
function marcar() {
  if (!sonando) return;
  Array.from(batutas.children).forEach((marca, i) => marca.classList.toggle("activo", i === paso));
  clic(paso === 0);
  paso = (paso + 1) % Number(compas.value);
  const intervalo = 60000 / Number(tempo.value);
  const ahora = performance.now();
  siguiente = Math.max(siguiente + intervalo, ahora + intervalo * 0.5);
  reloj = setTimeout(marcar, Math.max(0, siguiente - performance.now()));
}
function detener() {
  inicioId++;
  sonando = false;
  clearTimeout(reloj);
  Array.from(batutas.children).forEach(marca => marca.classList.remove("activo"));
  iniciar.textContent = "Iniciar metrónomo";
  iniciar.setAttribute("aria-pressed", "false");
  estadoAudio.textContent = "En pausa.";
  if (audio && audio.state === "running") audio.suspend().catch(() => {});
}
async function alternar() {
  if (sonando) { detener(); return; }
  sonando = true;
  const intento = ++inicioId;
  iniciar.textContent = "Detener metrónomo";
  iniciar.setAttribute("aria-pressed", "true");
  try {
    const Contexto = window.AudioContext || window.webkitAudioContext;
    if (!audio && Contexto) audio = new Contexto();
    if (audio && audio.state !== "running") await audio.resume();
  } catch { /* Los indicadores siguen marcando el pulso cuando el audio no está disponible. */ }
  if (!sonando || intento !== inicioId) return;
  estadoAudio.textContent = audio && audio.state === "running" ? "Reproduciendo con sonido." : "Reproduciendo con indicador visual.";
  paso = 0;
  siguiente = performance.now();
  marcar();
}
tempo.addEventListener("input", () => {
  lectura.value = tempo.value.padStart(3,"0");
  if (sonando && reloj) {
    clearTimeout(reloj);
    siguiente = performance.now() + 60000 / Number(tempo.value);
    reloj = setTimeout(marcar, siguiente - performance.now());
  }
});
compas.addEventListener("change", dibujarCompas);
iniciar.addEventListener("click", alternar);
document.addEventListener("visibilitychange", () => { if (document.hidden) detener(); });
window.addEventListener("pagehide", detener);
dibujarCompas();
