/* ============================================================
   MANUAL INTERACTIVO DE PC · SCRIPT PRINCIPAL
   Estructura del archivo:
     1. Utilidades generales
     2. Navegación y barra de progreso de lectura
     3. Animaciones de aparición (scroll reveal)
     4. Tarjetas de componentes (acordeón)
     5. Lección en video y quiz
     6. Modo oscuro, botón "volver arriba" y avisos
   ============================================================ */

/* ------------------------------------------------------------
   1. UTILIDADES GENERALES
   ------------------------------------------------------------ */

/** Atajo corto para document.querySelector. */
const $ = (sel, ctx = document) => ctx.querySelector(sel);

/** Atajo corto para document.querySelectorAll. */
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/** Devuelve el valor guardado en localStorage (o un valor por defecto). */
function leerLocal(llave, porDefecto) {
  try {
    const dato = localStorage.getItem(llave);
    return dato ? JSON.parse(dato) : porDefecto;
  } catch {
    return porDefecto;
  }
}

/** Guarda un valor en localStorage convirtiéndolo a JSON. */
function guardarLocal(llave, valor) {
  try {
    localStorage.setItem(llave, JSON.stringify(valor));
  } catch {
    /* Si el almacenamiento no está disponible, se ignora en silencio */
  }
}

/** Muestra una notificación breve en la parte inferior. */
function mostrarAviso(texto) {
  const toast = $("#toast");
  toast.textContent = texto;
  toast.classList.add("is-visible");
  clearTimeout(mostrarAviso.tiempo);
  mostrarAviso.tiempo = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

/* ------------------------------------------------------------
   2. NAVEGACIÓN Y BARRA DE PROGRESO DE LECTURA
   ------------------------------------------------------------ */

/** Prepara la navegación: menú móvil, enlaces suaves y estado activo. */
function iniciarNavegacion() {
  const navbar = $("#navbar");
  const barra = $("#scrollBar");
  const toggle = $("#navToggle");
  const menu = $("#navMenu");

  /* Alterna el menú en pantallas pequeñas. */
  toggle.addEventListener("click", () => {
    const abierto = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-open", abierto);
    toggle.setAttribute("aria-expanded", String(abierto));
  });

  /* Cierra el menú al elegir un enlace. */
  $$(".nav-link").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* Efecto de sombra en la barra + progreso de lectura + botón arriba. */
  const alDesplazar = () => {
    const y = window.scrollY;
    navbar.classList.toggle("is-scrolled", y > 10);

    const alto = document.documentElement.scrollHeight - window.innerHeight;
    barra.style.width = `${alto > 0 ? (y / alto) * 100 : 0}%`;

    $("#toTop").classList.toggle("is-visible", y > 500);
  };
  window.addEventListener("scroll", alDesplazar, { passive: true });
  alDesplazar();

  /* Resalta el enlace de la sección visible en pantalla. */
  const secciones = $$("main section[id]");
  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        $$(".nav-link").forEach((l) => l.classList.remove("is-active"));
        const activo = $(`.nav-link[href="#${entrada.target.id}"]`);
        if (activo) activo.classList.add("is-active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  secciones.forEach((s) => observer.observe(s));
}

/* ------------------------------------------------------------
   3. ANIMACIONES DE APARICIÓN AL HACER SCROLL
   ------------------------------------------------------------ */

/** Revela los elementos con [data-reveal] cuando entran en pantalla. */
function iniciarReveal() {
  const elementos = $$("[data-reveal]");
  const observer = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada, i) => {
        if (!entrada.isIntersecting) return;
        /* Pequeño escalonado para las tarjetas de la misma fila */
        entrada.target.style.transitionDelay = `${Math.min(i * 70, 280)}ms`;
        entrada.target.classList.add("is-visible");
        obs.unobserve(entrada.target);
      });
    },
    { threshold: 0.14 }
  );
  elementos.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------
   4. TARJETAS DE COMPONENTES (ACORDEÓN)
   ------------------------------------------------------------ */

/** Permite abrir/cerrar los detalles de cada componente. */
function iniciarComponentes() {
  $$(".comp-card").forEach((tarjeta, i) => {
    const cabecera = $(".comp-head", tarjeta);
    const cta = $(".comp-cta", tarjeta);
    const cuerpo = $(".comp-body", tarjeta);

    /* Conecta ambos controles con la región que despliegan */
    const id = `componente-${i + 1}`;
    cuerpo.id = id;
    cabecera.setAttribute("aria-controls", id);

    /* Cabecera y botón "Comenzar" comparten el mismo estado */
    const alternar = () => {
      const abierta = tarjeta.classList.toggle("is-open");
      cabecera.setAttribute("aria-expanded", String(abierta));
      if (!cta.dataset.leccion) {
        cta.setAttribute("aria-expanded", String(abierta));
        cta.textContent = abierta ? "Cerrar" : "Comenzar";
      }
    };

    cabecera.addEventListener("click", alternar);

    /* Los botones con lección abren el video; el resto despliega detalles */
    if (cta.dataset.leccion) {
      cta.removeAttribute("aria-expanded");
    } else {
      cta.setAttribute("aria-controls", id);
      cta.addEventListener("click", alternar);
    }
  });
}

/* ------------------------------------------------------------
   5. LECCIÓN EN VIDEO Y QUIZ
   ------------------------------------------------------------ */

/** Contenido de las lecciones disponibles. */
const LECCIONES = {
  bienvenida: {
    titulo: "Bienvenida · Guía visual de la PC",
    eyebrow: "Bienvenida",
    video: "videos/00-Bienvenida.mp4",
    poster: "img/bienvenida.webp",
    quiz: [
      {
        pregunta: "¿Qué encontrarás en este manual interactivo?",
        opciones: [
          "La función y los cuidados de los componentes de una PC.",
          "Solo programas de oficina.",
          "Juegos para instalar.",
          "Planos para fabricar una PC.",
        ],
        correcta: 0,
        explicacion:
          "El manual explica qué hace cada componente y cómo cuidarlo mediante tarjetas, videos y quizzes.",
      },
      {
        pregunta: "¿Cuál es el objetivo principal de la guía?",
        opciones: [
          "Vender componentes.",
          "Reparar televisores.",
          "Aprender qué hace cada pieza y cómo cuidarla.",
          "Instalar sistemas operativos.",
        ],
        correcta: 2,
        explicacion:
          "La guía busca que comprendas la función de cada pieza y los cuidados básicos para prolongar la vida de la PC.",
      },
      {
        pregunta: "¿Qué puedes hacer al finalizar cada lección?",
        opciones: [
          "Descargar música.",
          "Resolver un quiz para comprobar lo aprendido.",
          "Cambiar el idioma del sistema.",
          "Formatear el disco.",
        ],
        correcta: 1,
        explicacion:
          "Cada lección termina con un quiz breve que refuerza los conceptos principales del video.",
      },
    ],
  },
  procesador: {
    titulo: "Procesador",
    video: "videos/01-Procesador.mp4",
    poster: "img/processor.webp",
    quiz: [
      {
        pregunta: "¿Cuál es la función principal del procesador?",
        opciones: [
          "Ejecutar las instrucciones del software.",
          "Guardar archivos de forma permanente.",
          "Convertir la corriente eléctrica.",
          "Enfriar los componentes.",
        ],
        correcta: 0,
        explicacion:
          "La CPU interpreta y ejecuta las instrucciones; no almacena archivos de forma permanente ni convierte corriente.",
      },
      {
        pregunta: "¿Qué ventaja aporta un procesador con varios núcleos?",
        opciones: [
          "Aumenta la capacidad del disco duro.",
          "Elimina la necesidad de un disipador.",
          "Puede realizar varias tareas en paralelo.",
          "Convierte la PC en inalámbrica.",
        ],
        correcta: 2,
        explicacion:
          "Los núcleos permiten repartir el trabajo y ejecutar varias tareas a la vez, aunque no sustituyen a la RAM ni al disipador.",
      },
      {
        pregunta: "¿Qué necesita el procesador para mantener una temperatura segura?",
        opciones: [
          "Una tarjeta gráfica dedicada.",
          "Un disipador y pasta térmica.",
          "Un disco SSD más rápido.",
          "Una fuente de mayor voltaje.",
        ],
        correcta: 1,
        explicacion:
          "El disipador y la pasta térmica transfieren el calor; sin ellos la CPU se calienta y reduce su rendimiento.",
      },
    ],
  },
  "placa-memoria-ram": {
    titulo: "Placa y Memoria RAM",
    video: "videos/02-Placa Madre y Memoria RAM.mp4",
    poster: "img/motherboard.webp",
    quiz: [
      {
        pregunta: "¿Qué función cumple la placa madre?",
        opciones: [
          "Conectar e interconectar los componentes de la PC.",
          "Almacenar los archivos del usuario.",
          "Generar la imagen de la pantalla.",
          "Enfriar el procesador.",
        ],
        correcta: 0,
        explicacion:
          "La placa madre conecta CPU, RAM, almacenamiento y tarjetas de expansión, y permite que se comuniquen.",
      },
      {
        pregunta: "¿Qué ocurre con los datos de la RAM al apagar la PC?",
        opciones: [
          "Se borran.",
          "Se guardan para siempre.",
          "Se envían al disco duro automáticamente.",
          "Se comprimen.",
        ],
        correcta: 0,
        explicacion:
          "La RAM es memoria temporal: mantiene los datos mientras hay energía y se borra al apagar el equipo.",
      },
      {
        pregunta: "¿Qué debes verificar antes de cambiar de placa o ampliar la RAM?",
        opciones: [
          "El color del gabinete.",
          "La marca del monitor.",
          "Socket, tipo de memoria y compatibilidad.",
          "El tamaño del teclado.",
        ],
        correcta: 2,
        explicacion:
          "La placa y la RAM deben ser compatibles con el socket, el tipo de memoria y el factor de forma.",
      },
    ],
  },
  almacenamiento: {
    titulo: "Almacenamiento",
    video: "videos/03-Almacenamiento.mp4",
    poster: "img/hard_drive.webp",
    quiz: [
      {
        pregunta: "¿Cuál es la diferencia principal entre un SSD y un HDD?",
        opciones: [
          "El SSD no tiene partes móviles y es más rápido.",
          "El HDD no necesita alimentación.",
          "El SSD solo sirve para música.",
          "El HDD siempre es más rápido.",
        ],
        correcta: 0,
        explicacion:
          "El SSD usa memoria flash y no tiene partes móviles; el HDD usa platos y cabezal, por eso es más lento.",
      },
      {
        pregunta: "¿Para qué sirve la tecnología SMART?",
        opciones: [
          "Para convertir el disco en RAM.",
          "Para monitorear la salud del disco.",
          "Para aumentar la velocidad de Internet.",
          "Para enfriar el disco.",
        ],
        correcta: 1,
        explicacion:
          "SMART informa sobre errores y salud del disco para anticipar fallos y proteger los datos.",
      },
      {
        pregunta: "¿Qué hacer si el disco tiene sectores dañados?",
        opciones: [
          "Seguir usándolo sin copia.",
          "Cambiar solo el cable.",
          "Respaldar los datos y reemplazarlo.",
          "Formatearlo varias veces.",
        ],
        correcta: 2,
        explicacion:
          "Ante sectores dañados, lo prioritario es respaldar la información y reemplazar el disco para evitar pérdidas.",
      },
    ],
  },
  "fuente-gpu": {
    titulo: "Fuente de Poder y GPU",
    video: "videos/04-Fuente de Poder y GPU.mp4",
    poster: "img/GPU.webp",
    quiz: [
      {
        pregunta: "¿Qué hace la fuente de poder?",
        opciones: [
          "Convierte la corriente alterna en tensiones continuas.",
          "Almacena los archivos del sistema.",
          "Procesa las imágenes de los juegos.",
          "Enfría el procesador.",
        ],
        correcta: 0,
        explicacion:
          "La fuente transforma la corriente de la red en +12 V, +5 V y +3.3 V, que alimentan los componentes.",
      },
      {
        pregunta: "¿Cuál es la función principal de la GPU?",
        opciones: [
          "Procesar imagen y video en paralelo.",
          "Guardar el sistema operativo.",
          "Convertir la corriente eléctrica.",
          "Limpiar la memoria RAM.",
        ],
        correcta: 0,
        explicacion:
          "La GPU procesa cálculos gráficos en paralelo para escritorio, videojuegos, edición y renderizado 3D.",
      },
      {
        pregunta: "¿Qué necesita la GPU además de estar bien insertada?",
        opciones: [
          "Solo el monitor.",
          "Solo un cable HDMI.",
          "Alimentación PCIe y drivers actualizados.",
          "Una segunda fuente.",
        ],
        correcta: 2,
        explicacion:
          "La GPU necesita los cables de alimentación PCIe y los controladores instalados para funcionar correctamente.",
      },
    ],
  },
  refrigeracion: {
    titulo: "Refrigeración",
    video: "videos/05-Refrigeracion.mp4",
    poster: "img/fan_cooler.webp",
    quiz: [
      {
        pregunta: "¿Qué evita un buen sistema de enfriamiento?",
        opciones: [
          "El sobrecalentamiento y el throttling.",
          "La instalación de la RAM.",
          "El uso del teclado.",
          "La conexión a Internet.",
        ],
        correcta: 0,
        explicacion:
          "Un buen enfriamiento mantiene temperaturas seguras y evita que la CPU o la GPU reduzcan su rendimiento.",
      },
      {
        pregunta: "¿Cada cuánto se recomienda limpiar el polvo?",
        opciones: [
          "Cada semana.",
          "Cada 3 a 6 meses.",
          "Una vez al año.",
          "Nunca.",
        ],
        correcta: 1,
        explicacion:
          "Limpiar polvo cada tres a seis meses mantiene el flujo de aire y evita que los ventiladores trabajen de más.",
      },
      {
        pregunta: "¿Qué hacer si un ventilador hace ruido o se detiene?",
        opciones: [
          "Subirle el voltaje.",
          "Dejarlo girar más rápido.",
          "Reemplazarlo.",
          "Desconectarlo.",
        ],
        correcta: 2,
        explicacion:
          "Un ventilador con rodamiento desgastado o detenido debe reemplazarse para evitar sobrecalentamiento.",
      },
    ],
  },
  conclusion: {
    titulo: "Conclusión",
    eyebrow: "Fin del recorrido",
    video: "videos/07-Cierre.mp4",
    poster: "img/conclusion.webp",
    quiz: [],
  },
};

const MENSAJES_QUIZ = [
  "Conviene repasar el video antes de continuar.",
  "Vas por buen camino; repasa los detalles clave.",
  "Muy bien, dominas casi todo el tema.",
  "¡Excelente! Comprendiste el tema.",
];

/** Controla la lección modal: video, quiz, resultado y cierre. */
function iniciarLecciones() {
  const dialogo = $("#lessonDialog");
  const video = $("#lessonVideo");
  const etapaVideo = $("#videoStage");
  const seccionQuiz = $("#lessonQuiz");
  const formulario = $("#quizForm");
  const contenedor = $("#quizQuestions");
  const error = $("#quizError");
  const resultado = $("#quizResult");
  const marcador = $("#quizScore");
  const mensaje = $("#quizMessage");
  const botonComprobar = $("#quizSubmit");
  const salida = $("#lessonOutro");

  let leccionActual = null;

  /** Dibuja las preguntas y reinicia el estado del quiz. */
  function pintarQuiz(preguntas) {
    contenedor.innerHTML = preguntas
      .map(
        (item, i) => `
          <fieldset class="quiz-question">
            <legend><span class="quiz-number">${i + 1}</span>${item.pregunta}</legend>
            <div class="quiz-options">
              ${item.opciones
                .map(
                  (opcion, j) => `
                    <label class="quiz-option">
                      <input type="radio" name="pregunta-${i}" value="${j}">
                      <span>${opcion}</span>
                    </label>`
                )
                .join("")}
            </div>
            <p class="quiz-feedback" hidden></p>
          </fieldset>`
      )
      .join("");

    formulario.reset();
    error.hidden = true;
    resultado.hidden = true;
    botonComprobar.hidden = false;
  }

  /** Vuelve al video desde el inicio. */
  function mostrarVideo() {
    if (!leccionActual) return;

    pintarQuiz(leccionActual.quiz);
    etapaVideo.hidden = false;
    video.hidden = false;
    salida.hidden = true;
    seccionQuiz.hidden = true;
    if (video.readyState >= 1) video.currentTime = 0;
    video.focus({ preventScroll: true });
    video.play().catch(() => {});
  }

  /** Muestra el cierre para lecciones sin quiz. */
  function mostrarCierre() {
    if (!leccionActual) return;

    video.pause();
    etapaVideo.hidden = false;
    video.hidden = true;
    salida.hidden = false;
    seccionQuiz.hidden = true;
    salida.focus({ preventScroll: true });
  }

  /** Muestra el quiz cuando termina el video. */
  function mostrarQuiz() {
    if (!leccionActual) return;

    video.pause();
    etapaVideo.hidden = true;
    salida.hidden = true;
    seccionQuiz.hidden = false;
    seccionQuiz.scrollTop = 0;

    const primeraOpcion = contenedor.querySelector("input");
    if (primeraOpcion) primeraOpcion.focus({ preventScroll: true });
  }

  /** Abre la lección y arranca el video. */
  function abrirLeccion(id) {
    const datos = LECCIONES[id];
    if (!datos || dialogo.open) return;

    leccionActual = datos;
    const tieneQuiz = datos.quiz.length > 0;
    $("#lessonEyebrow").textContent = datos.eyebrow || "Lección en video";
    $("#lessonTitle").textContent = datos.titulo;
    $("#quizTitle").textContent = tieneQuiz ? `Quiz: ${datos.titulo}` : datos.titulo;
    $("#quizIntroText").textContent = tieneQuiz
      ? `Responde estas ${datos.quiz.length} preguntas. Puedes volver a ver el video si lo necesitas.`
      : "";
    video.setAttribute("aria-label", `Video de la lección: ${datos.titulo}`);
    video.poster = datos.poster;
    video.src = datos.video;
    video.load();

    dialogo.showModal();
    document.body.classList.add("modal-open");
    mostrarVideo();
  }

  formulario.addEventListener("change", () => {
    error.hidden = true;
  });

  /* Comprueba las respuestas y muestra la retroalimentación. */
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!leccionActual) return;

    const respuestas = leccionActual.quiz.map((_, i) =>
      formulario.querySelector(`input[name="pregunta-${i}"]:checked`)
    );
    const faltante = respuestas.findIndex((respuesta) => !respuesta);

    if (faltante !== -1) {
      error.hidden = false;
      const pregunta = contenedor.children[faltante];
      pregunta.scrollIntoView({ behavior: "smooth", block: "center" });
      pregunta.querySelector("input")?.focus({ preventScroll: true });
      return;
    }

    error.hidden = true;
    let aciertos = 0;

    leccionActual.quiz.forEach((item, i) => {
      const pregunta = contenedor.children[i];
      const elegida = Number(respuestas[i].value);
      const esCorrecta = elegida === item.correcta;
      if (esCorrecta) aciertos += 1;

      pregunta.classList.add(esCorrecta ? "is-correct" : "is-wrong");

      [...pregunta.querySelectorAll(".quiz-option")].forEach((opcion, j) => {
        const input = opcion.querySelector("input");
        input.disabled = true;
        if (j === item.correcta) opcion.classList.add("is-correct-answer");
        if (j === elegida && !esCorrecta) opcion.classList.add("is-wrong-answer");
      });

      const feedback = pregunta.querySelector(".quiz-feedback");
      feedback.hidden = false;
      feedback.classList.add(esCorrecta ? "is-ok" : "is-bad");
      feedback.textContent = `${esCorrecta ? "Correcto." : "Incorrecto."} ${item.explicacion}`;
    });

    marcador.textContent = `${aciertos} / ${leccionActual.quiz.length}`;
    mensaje.textContent = MENSAJES_QUIZ[aciertos];
    resultado.hidden = false;
    botonComprobar.hidden = true;
    resultado.scrollIntoView({ behavior: "smooth", block: "nearest" });
    resultado.focus({ preventScroll: true });
  });

  /* Reintenta el quiz desde cero. */
  $("#retryQuiz").addEventListener("click", () => {
    if (!leccionActual) return;
    pintarQuiz(leccionActual.quiz);
    seccionQuiz.scrollTop = 0;
    contenedor.querySelector("input")?.focus({ preventScroll: true });
  });

  /* Regresa al video desde el quiz. */
  $("#rewatchBtn").addEventListener("click", mostrarVideo);

  /* Cierra la lección con el botón, el fondo o Escape. */
  $("#lessonClose").addEventListener("click", () => dialogo.close());
  $("#outroClose").addEventListener("click", () => dialogo.close());
  dialogo.addEventListener("click", (evento) => {
    if (evento.target === dialogo) dialogo.close();
  });
  dialogo.addEventListener("close", () => {
    video.pause();
    document.body.classList.remove("modal-open");
  });

  video.addEventListener("ended", () => {
    if (leccionActual?.quiz.length) mostrarQuiz();
    else mostrarCierre();
  });
  video.addEventListener("error", () => {
    mostrarAviso("No se pudo cargar el video de la lección.");
  });

  /* Cada botón con data-leccion abre su contenido. */
  $$("[data-leccion]").forEach((boton) => {
    boton.addEventListener("click", () => abrirLeccion(boton.dataset.leccion));
  });
}

/* ------------------------------------------------------------
   6. MODO OSCURO, BOTÓN "VOLVER ARRIBA" Y AVISOS
   ------------------------------------------------------------ */

/** Aplica el tema guardado y alterna entre claro/oscuro. */
function iniciarTema() {
  const guardado = leerLocal("manual_pc_tema", "claro");
  if (guardado === "oscuro") document.body.classList.add("theme-dark");

  $("#themeToggle").addEventListener("click", () => {
    const oscuro = document.body.classList.toggle("theme-dark");
    guardarLocal("manual_pc_tema", oscuro ? "oscuro" : "claro");
    mostrarAviso(oscuro ? "Modo oscuro activado" : "Modo claro activado");
  });
}

/* ------------------------------------------------------------
   ARRANQUE DE LA APLICACIÓN
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  iniciarNavegacion();
  iniciarReveal();
  iniciarComponentes();
  iniciarLecciones();
  iniciarTema();

  /* Botón flotante para volver al inicio */
  $("#toTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
