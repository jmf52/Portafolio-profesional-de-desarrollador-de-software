/*
 * Portafolio personal de Julio Martínez Flores.
 * Para agregar tu fotografía, guarda el archivo como assets/perfil.jpg
 * y cambia perfil.foto a "assets/perfil.jpg".
 */
window.PORTAFOLIO = {
  perfil: {
    nombre: "Julio Martínez Flores",
    presentacion: "Soy futuro ingeniero en Desarrollo de Software, una persona capaz, responsable y comprometida con el aprendizaje continuo. Me interesa crear soluciones tecnológicas, enfrentar nuevos retos y aplicar mis conocimientos en el desarrollo de proyectos de software. Busco seguir fortaleciendo mis habilidades y adquirir experiencia profesional.",
    ubicacion: "Emiliano Zapata S/N, El Tráfico, 54400, Ciudad Nicolás Romero, Estado de México",
    foto: "", // Fotografía pendiente. Agrega tu imagen en assets/perfil.jpg cuando quieras.
    correo: "23302108@utfv.edu.mx",
    github: "https://github.com/jmf52",
    estudios: [
      {
        carrera: "Ingeniería en Desarrollo de Software",
        institucion: "Universidad Tecnológica Fidel Velázquez",
        periodo: "Inicio: 2024 · Décimo cuatrimestre"
      }
    ],
    // Tecnologías de formación y proyectos académicos; ajusta la lista a tu experiencia real.
    lenguajes: ["Java", "Python", "JavaScript", "HTML5", "CSS3", "PHP"],
    plataformas: ["Android Studio", "Visual Studio Code", "Git", "GitHub", "Docker"],
    basesDeDatos: ["MongoDB", "MySQL", "SQLite", "Firebase"]
  },
  proyectos: [
    {
      nombre: "SAPASNIR – Cultura del Agua",
      categoria: "Desarrollo web educativo",
      ejemplo: false,
      portada: "",
      imagen: "",
      descripcion: "Propuesta de sitio web educativo para apoyar las actividades de cultura del agua y promover el uso responsable y sustentable del recurso hídrico.",
      objetivo: "Facilitar la difusión de información y actividades educativas sobre el cuidado del agua, el tratamiento de aguas residuales y la captación de agua de lluvia.",
      aporte: "Participación en el desarrollo de la página web y en la organización de contenidos educativos, secciones informativas y recursos interactivos como una calculadora hídrica.",
      resultado: "Se definió una estructura web para presentar información de cultura del agua y materiales de apoyo para actividades educativas. El proyecto puede ampliarse con nuevas secciones y evidencias.",
      tecnologias: ["HTML", "CSS", "JavaScript"],
      demo: "proyectos/sapasnir.html",
      repositorio: "",
      evidencia: ""
    },
    {
      nombre: "Gestor de Tareas",
      categoria: "Aplicación móvil Android",
      ejemplo: false,
      portada: "",
      imagen: "",
      descripcion: "Aplicación móvil académica orientada a organizar tareas, actividades, horarios y recordatorios desde un solo lugar.",
      objetivo: "Ayudar al usuario a registrar sus actividades, consultar pendientes y dar seguimiento a las tareas completadas.",
      aporte: "Trabajo en la adaptación de la aplicación, su identidad visual y la organización de funciones para registrar y consultar actividades, además de considerar el funcionamiento sin conexión.",
      resultado: "Se establecieron las funciones principales de gestión de actividades y una propuesta de interfaz enfocada en facilitar la organización personal.",
      tecnologias: ["Android Studio", "Java", "Gradle"],
      demo: "proyectos/gestor-tareas.html",
      repositorio: "",
      evidencia: ""
    },
    {
      nombre: "SGID – Astra Nova Rockets",
      categoria: "Bases de datos y modelado de información",
      ejemplo: false,
      portada: "",
      imagen: "",
      descripcion: "Sistema académico de Gestión Integral de Datos para organizar información relacionada con cohetes, componentes, proveedores, empleados, pruebas de calidad y lanzamientos.",
      objetivo: "Diseñar una estructura de datos que permita organizar y consultar la información de las operaciones de una empresa aeroespacial ficticia.",
      aporte: "Participación en el diseño de la arquitectura y administración de datos, así como en el modelado de entidades y la organización de la base de datos.",
      resultado: "Se definió el modelo de información con las entidades principales y la base de datos de trabajo denominada sgid_astra_nova.",
      tecnologias: ["MongoDB", "mongosh", "Modelado de datos"],
      demo: "proyectos/sgid-astra-nova.html",
      repositorio: "",
      evidencia: ""
    },
    {
      nombre: "Implementación de Moodle",
      categoria: "Gestión y planeación de proyectos de software",
      ejemplo: false,
      portada: "",
      imagen: "",
      descripcion: "Proyecto académico de planeación para implementar Moodle como plataforma de apoyo a la enseñanza y administración de cursos.",
      objetivo: "Analizar y planear una solución de gestión del aprendizaje que permita organizar cursos, usuarios, recursos y actividades académicas.",
      aporte: "Participación en la selección de la plataforma, la definición de actividades del proyecto, la estimación de costos, la planeación de capacitación y las pruebas.",
      resultado: "Se elaboró una propuesta de implementación con etapas de configuración, diseño, capacitación y pruebas, además de una estimación presupuestal académica.",
      tecnologias: ["Moodle", "Gestión de proyectos", "Planeación de software"],
      demo: "proyectos/moodle.html",
      repositorio: "",
      evidencia: ""
    }
  ]
};
