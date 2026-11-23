# Portafolio de evidencias de desarrollo de software

Evaluación individual del tercer parcial. El proyecto está hecho con HTML5, CSS y JavaScript. Descomprime el ZIP y abre `index.html` en tu navegador. Para editarlo, abre la carpeta descomprimida en Visual Studio Code.

## Completar tu portafolio

Todos los datos de la página se editan en **`datos.js`**. Guarda las fotografías y capturas en `assets/`. Las rutas distinguen mayúsculas y minúsculas.

| Lo que aparecerá en la página | Qué debes completar |
| --- | --- |
| Fotografía | Copia tu foto como `assets/perfil.jpg` y escribe esa ruta en `perfil.foto`. También se admiten PNG y WebP. |
| Datos personales | En `perfil`, escribe tu nombre, una presentación de dos o tres líneas, el correo que deseas publicar y la URL completa de tu perfil de GitHub. La ciudad o el estado son opcionales. |
| Estudios | En `estudios`, agrega una entrada con `carrera`, `institucion` y `periodo`. El periodo puede ser el semestre, cuatrimestre o las fechas de tus estudios. |
| Perfil técnico | Completa por separado `lenguajes`, `plataformas` y `basesDeDatos` con las tecnologías que manejas. Escribe cada elemento entre comillas y sepáralos con comas. |
| Evidencias | Sustituye las tres entradas de muestra de `proyectos` por un mínimo de tres trabajos tuyos. Para cada uno indica el objetivo, qué desarrollaste tú, el resultado, las tecnologías y al menos un enlace que pueda abrir quien evalúa. |

### Modelo para documentar un proyecto

Usa este modelo dentro de la lista `proyectos` de `datos.js`. Repite el bloque para cada trabajo y separa las entradas con una coma. Completa los campos entre comillas con tus datos. Puedes dejar vacíos los campos opcionales.

```javascript
{
  nombre: "Nombre de tu proyecto",
  categoria: "Área de desarrollo",
  ejemplo: false,
  imagen: "",        // Ruta a tu captura, por ejemplo assets/proyecto-1.webp
  altImagen: "",     // Descripción breve de lo que muestra la captura
  descripcion: "Qué hace la aplicación y para quién sirve.",
  objetivo: "El problema que buscaba resolver.",
  aporte: "La parte que diseñé, programé o probé personalmente.",
  resultado: "Una función que se pueda comprobar o el resultado que obtuve.",
  tecnologias: [],   // Escribe las que utilizaste en este proyecto
  demo: "",          // URL de la aplicación, si está disponible
  repositorio: "",   // URL completa del repositorio de este proyecto
  evidencia: ""      // Opcional. Enlace adicional o ruta a un archivo
}
```

Introduce un enlace distinto que lleve directamente a cada trabajo. El botón principal utiliza la primera dirección disponible entre aplicación, repositorio y evidencia. La ficha técnica muestra todos los enlaces registrados. Al poner `ejemplo: false`, la ficha pasa a mostrar «Mi aportación» y «Resultado obtenido».

## Probar la página

- Abre **Ver proyectos** y entra en cada **Ficha técnica**. Abre también cada enlace al repositorio o a la aplicación.
- Ve a **Perfil** y comprueba que aparezcan tu foto, presentación y estudios. En **Tecnologías**, comprueba las tres categorías. En **Contacto**, abre el correo y el perfil de GitHub.
- En un teléfono, utiliza **Menú** para cambiar de sección. El enlace **Imprimir portafolio** abre la impresión del navegador y permite guardar una copia en PDF cuando esa opción está disponible.

El paquete incluye tres aplicaciones de muestra con enlaces locales. **Pulso** marca el tempo de un ensayo, **Bitácora QA** registra y filtra casos de prueba con IndexedDB, y **Desglose** calcula un presupuesto en pesos mexicanos. Las tres están identificadas como demostraciones hasta que incorpores tus proyectos.

## Publicar en tu GitHub personal

1. Para usar tu página personal de GitHub, crea o abre el repositorio `TU-USUARIO.github.io`, sustituyendo `TU-USUARIO` por tu usuario de GitHub en minúsculas. Si usas GitHub Free, elige un repositorio público. También puedes usar un repositorio público dedicado a la materia.
2. En la rama `main`, sube el **contenido descomprimido**. Deja `index.html` y `datos.js` en la raíz, junto con las carpetas `assets`, `css`, `js` y `demos`. Conserva `.nojekyll` y confirma los cambios. Si el repositorio ya contiene una página, revisa los archivos existentes antes de integrar el portafolio.
3. Abre **Settings → Pages**. En **Build and deployment**, elige **Deploy from a branch**, selecciona `main` y `/(root)`, y guarda los cambios.
4. Cuando GitHub muestre **Visit site**, abre esa dirección. Desde una ventana privada comprueba que las tres evidencias sean accesibles y comparte con tu docente la dirección de la página publicada.

La página personal tendrá la forma `https://TU-USUARIO.github.io/`. Para un repositorio de proyecto tendrá la forma `https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/`. Los archivos usan rutas relativas para ambos casos.

La documentación de GitHub explica la creación del sitio y la selección de rama y carpeta. [Crear un sitio de GitHub Pages](https://docs.github.com/es/pages/getting-started-with-github-pages/creating-a-github-pages-site) · [Configurar el origen de publicación](https://docs.github.com/es/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Material de la actividad

Las dos transcripciones proporcionadas orientaron el diseño. De la revisión de portafolios se retomaron el protagonismo de los proyectos, los enlaces directos, las descripciones breves y el bloque de estudios y contacto. Del tutorial de publicación se retomó el uso de GitHub Pages para servir archivos estáticos. [Primer video](https://www.youtube.com/watch?v=oYBC7r5oSzk) · [Segundo video](https://www.youtube.com/watch?v=v7HyyOnixJ8).

La imagen de la computadora de la portada es una ilustración generada para este sitio. La tipografía Roboto incluye su licencia en `assets/fuentes/LICENCIA-Roboto.txt`.
