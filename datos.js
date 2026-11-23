/*
 * Edita este archivo para personalizar todo el portafolio.
 * Guarda las imágenes en assets/ e indica aquí su ruta, respetando mayúsculas.
 * Introduce solo datos que quieras hacer públicos. README.md incluye un ejemplo de proyecto.
 */
window.PORTAFOLIO = {
  perfil: {
    nombre: "",
    presentacion: "",
    ubicacion: "",
    foto: "",
    correo: "",
    github: "", // URL completa de tu perfil
    estudios: [
      // { carrera: "Nombre de la carrera", institucion: "Nombre de la institución", periodo: "Semestre o periodo" }
    ],
    lenguajes: [],
    plataformas: [], // Herramientas, plataformas, frameworks y tecnologías web
    basesDeDatos: []
  },
  proyectos: [
    {
      nombre: "Pulso",
      categoria: "Audio interactivo",
      ejemplo: true,
      portada: "pulso",
      imagen: "",
      descripcion: "Metrónomo visual y sonoro para practicar a un tempo constante durante un ensayo.",
      objetivo: "Marcar el tiempo de una secuencia y reconocer el primer pulso de cada compás.",
      aporte: "Control de tempo entre 40 y 220 BPM, selector de compás y acento en el primer tiempo mediante Web Audio API.",
      resultado: "Al pasar de 4/4 a 3/4 se muestran tres indicadores. A 60 BPM se escucha un pulso por segundo.",
      tecnologias: ["JavaScript", "Web Audio API"],
      demo: "demos/pulso.html",
      repositorio: "",
      evidencia: ""
    },
    {
      nombre: "Bitácora QA",
      categoria: "Pruebas de software",
      ejemplo: true,
      portada: "bitacora",
      imagen: "",
      descripcion: "Registro de casos de prueba con resultados esperados, seguimiento y filtros por estado.",
      objetivo: "Reunir los resultados de pruebas manuales para identificar qué casos requieren seguimiento.",
      aporte: "Formulario para crear casos, actualización de estado y persistencia local en una base de datos IndexedDB.",
      resultado: "Se puede registrar un caso, marcarlo como fallido y localizarlo con el filtro de estado. Si el navegador permite almacenamiento, el caso se conserva al recargar.",
      tecnologias: ["JavaScript", "IndexedDB"],
      demo: "demos/bitacora.html",
      repositorio: "",
      evidencia: ""
    },
    {
      nombre: "Desglose",
      categoria: "Cálculo de costos",
      ejemplo: true,
      portada: "desglose",
      imagen: "",
      descripcion: "Calculadora de presupuesto para estimar materiales, vestuario y otros gastos de un montaje.",
      objetivo: "Conocer el costo total de un montaje al reunir cantidades y precios por concepto.",
      aporte: "Edición de partidas, cálculos en centavos y formato de moneda en pesos mexicanos.",
      resultado: "Cambiar una cantidad actualiza su importe y el total. Se pueden añadir o quitar conceptos durante la sesión.",
      tecnologias: ["JavaScript", "Intl.NumberFormat"],
      demo: "demos/desglose.html",
      repositorio: "",
      evidencia: ""
    }
  ]
};
