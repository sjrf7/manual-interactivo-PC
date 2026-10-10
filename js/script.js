/* ============================================================
   MANUAL INTERACTIVO DE PC · SCRIPT PRINCIPAL
   Estructura del archivo:
     1. Datos (módulos, árbol de diagnóstico, preguntas)
     2. Utilidades generales
     3. Navegación y barra de progreso de lectura
     4. Animaciones de aparición (scroll reveal)
     5. Tarjetas de componentes (acordeón)
     6. Modal de módulos y seguimiento de pasos
     7. Diagnóstico interactivo
     8. Evaluación (quiz)
     9. Modo oscuro, botón "volver arriba" y avisos
   ============================================================ */

/* ------------------------------------------------------------
   1. DATOS DEL MANUAL
   ------------------------------------------------------------ */

/** Módulos de mantenimiento con sus pasos, objetivos y herramientas. */
const MODULOS = [
  {
    titulo: "Diagnóstico inicial",
    descripcion: "Detectar la falla cuando la computadora no enciende.",
    seguridad: "Desconecta la PC de la corriente antes de tocar cualquier componente interno.",
    objetivos: [
      "Identificar si la falla es eléctrica, de video o de arranque.",
      "Interpretar señales: LEDs, ventiladores y códigos de pitido.",
      "Registrar el hallazgo para elegir el procedimiento correcto."
    ],
    herramientas: ["Cable de alimentación probado", "Monitor y cable conocidos", "Guía de códigos POST", "Papel para anotar resultados"],
    pasos: [
      { titulo: "Verifica la alimentación eléctrica", texto: "Comprueba que el cable esté bien conectado, que el tomacorriente funcione (prueba con una lámpara) y que el interruptor posterior de la fuente esté en posición I (encendido).", tip: "Muchas fallas se resuelven solo con probar otro cable o enchufe." },
      { titulo: "Observa las señales de vida", texto: "Al pulsar el botón de encendido, mira si el LED del panel frontal se enciende, si las ventiladoras giran y si la tarjeta gráfica responde.", tip: "Si nada reacciona, el problema está en la alimentación: pasa al Módulo 2." },
      { titulo: "Escucha códigos de pitido (POST)", texto: "Presta atención a pitidos cortos o largos del altavoz interno: cada patrón indica un componente específico (memoria, video, placa madre).", tip: "Anota el patrón exacto: un pitido largo seguido de dos cortos es un código distinto a tres largos." },
      { titulo: "Aísla los periféricos", texto: "Desconecta USB, discos externos, tarjetas adicionales y deja solo lo esencial: CPU, memoria, fuente y video. Vuelve a intentar encender.", tip: "Si enciende sin un dispositivo, ese periférico es el causante de la falla." },
      { titulo: "Registra el hallazgo y decide", texto: "Escribe qué funcionó y qué no: ¿enciende?, ¿hay video?, ¿hay pitidos? Con eso eliges el módulo de reparación correspondiente.", tip: "Un diagnóstico bien documentado ahorra tiempo en la reparación." }
    ]
  },
  {
    titulo: "Verificar fuente de poder",
    descripcion: "Comprobar voltajes con un tester ATX de forma segura.",
    seguridad: "No abras la fuente: sus condensadores mantienen carga peligrosa incluso desconectada.",
    objetivos: [
      "Comprobar que la fuente entrega los voltajes dentro de rango.",
      "Aplicar la prueba de encendido sin placa madre (puente PS_ON).",
      "Decidir si la fuente se repara o se reemplaza."
    ],
    herramientas: ["Tester ATX / medidor de fuente", "Pinza o cable jumper", "Destornillador Phillips", "Multímetro (opcional)"],
    pasos: [
      { titulo: "Desconecta y prepara la fuente", texto: "Retira la fuente del gabinete o desconecta todos los cables ATX de los componentes. Deja únicamente el tester conectado al conector de 24 pines.", tip: "Marca los cables con cinta antes de retirarlos para facilitar el reensamblaje." },
      { titulo: "Conecta el tester ATX", texto: "Une el conector de 24 pines de la fuente al tester. Si tu fuente incluye cable de 8 pines para CPU, verifica ese conector por separado.", tip: "El tester simula a la placa madre y permite encender la fuente suelta." },
      { titulo: "Lee los voltajes", texto: "Enciende la fuente y revisa las lecturas: +12 V, +5 V, +3.3 V, −12 V y +5Vsb. Los valores no deben desviarse más de ±5 %.", tip: "Una lectura de 11.2 V o menos en el canal de 12 V indica una fuente defectuosa." },
      { titulo: "Ejecuta la prueba de carga", texto: "Si el tester no enciende, puentea el pin PS_ON (verde) con cualquier cable COM (negro) del conector de 24 pines para forzar el arranque.", tip: "Haz el puente con una pieza de cable o clip, nunca con metal suelto dentro de la fuente." },
      { titulo: "Toma la decisión", texto: "Si los voltajes son estables, la fuente está bien y la falla está en otro componente. Si hay voltajes fuera de rango o no enciende, reemplázala.", tip: "Antes de descartarla, prueba la fuente en otro equipo para confirmar el diagnóstico." }
    ]
  },
  {
    titulo: "Cambiar memoria RAM",
    descripcion: "Retiro e instalación segura de módulos DIMM sin daños.",
    seguridad: "Trabaja sobre una superficie libre de electricidad estática y con la PC desconectada.",
    objetivos: [
      "Retirar e instalar módulos DIMM correctamente.",
      "Evitar daños por electricidad estática.",
      "Verificar que el sistema reconozca la nueva memoria."
    ],
    herramientas: ["Memoria DIMM compatible", "Pulsera antiestática (opcional)", "Destornillador Phillips", "Manual de la placa madre"],
    pasos: [
      { titulo: "Descarga la electricidad estática", texto: "Apaga y desconecta la PC, luego toca una parte metálica del gabinete durante unos segundos para liberar cargas. Usa pulsera antiestática si la tienes.", tip: "La estática puede dañar silenciosamente la memoria y otros componentes." },
      { titulo: "Localiza las ranuras DIMM", texto: "Abre el gabinete y busca las ranuras largas junto al socket del procesador. Consulta el manual para saber qué ranuras usar en modo dual channel (suelen ser 2 y 4).", tip: "El manual de la placa indica el orden ideal para aprovechar el doble canal." },
      { titulo: "Retira el módulo actual", texto: "Presiona hacia abajo las pestañas de los extremos de la ranura hasta que se liberen, y extrae el módulo en vertical sin forzar.", tip: "No tires del módulo si las pestañas no están liberadas: puedes romper la ranura." },
      { titulo: "Instala el nuevo módulo", texto: "Alinea la muesca del módulo con el separador de la ranura y presiona con firmeza en ambos extremos hasta escuchar dos clics.", tip: "La muesca solo encaja en una posición: nunca fuerces al revés." },
      { titulo: "Verifica el reconocimiento", texto: "Enciende el equipo y entra a la BIOS/UEFI para confirmar la capacidad total. Después ejecuta una prueba de memoria para validar la estabilidad.", tip: "Si el PC no da video tras el cambio, reinserta los módulos: no están bien asentados." }
    ]
  },
  {
    titulo: "Aplicar pasta térmica",
    descripcion: "Limpieza y reaplicación correcta entre CPU y disipador.",
    seguridad: "Nunca arranques el procesador sin disipador montado: se sobrecalienta en segundos.",
    objetivos: [
      "Retirar la pasta térmica vieja sin dejar residuos.",
      "Aplicar la cantidad y el patrón correctos.",
      "Reinstalar el disipador con el apriete adecuado."
    ],
    herramientas: ["Pasta térmica nueva", "Alcohol isopropílico > 90 %", "Toallas de papel sin pelusa", "Destornillador o kit de limpieza"],
    pasos: [
      { titulo: "Desmonta el disipador", texto: "Desconecta el ventilador de la CPU de su encabezado (CPU_FAN) y libera los tornillos o clips del disipador girando en orden diagonal.", tip: "Gira los tornillos un par de vueltas cada uno en cruz para no deformar la base." },
      { titulo: "Limpia la pasta antigua", texto: "Con alcohol isopropílico y una toalla, frota con suavidad la parte superior del procesador y la base del disipador hasta que queden brillantes y libres de grumos.", tip: "Evita el alcohol con acetona: daña los plásticos y los rótulos." },
      { titulo: "Aplica la pasta nueva", texto: "Coloca una cantidad del tamaño de un grano de arroz en el centro de la CPU, o dibuja una X fina si la superficie es grande.", tip: "Más pasta no es mejor: el exceso sobresale y ensucia el zócalo." },
      { titulo: "Monta el disipador", texto: "Coloca el disipador de forma recta y aprieta los tornillos en diagonal, con presión uniforme, hasta que no haya movimiento.", tip: "Un disipador torcido deja un lado sin contacto y provoca sobrecalentamiento." },
      { titulo: "Verifica las temperaturas", texto: "Enciende el equipo y revisa el sensor de la CPU en reposo y bajo carga. Las temperaturas deben mantenerse en rangos seguros.", tip: "Si la CPU supera los 90 °C bajo carga, reaplica la pasta o revisa el ventilador." }
    ]
  },
  {
    titulo: "Cambio de placa madre",
    descripcion: "Desmontaje, montaje y configuración de una nueva board.",
    seguridad: "Ten a mano el manual de la nueva placa y verifica la compatibilidad de CPU y memoria antes de comprar.",
    objetivos: [
      "Documentar y retirar todos los componentes sin pérdidas.",
      "Montar la nueva placa con los standoffs correctos.",
      "Reconectar, configurar y validar el sistema."
    ],
    herramientas: ["Placa madre nueva compatible", "Destornillador Phillips", "Pasto térmico nuevo", "Cable de datos y notas", "Cámara o celular para fotos"],
    pasos: [
      { titulo: "Documenta las conexiones", texto: "Antes de desarmar, toma fotos de los cables, del front panel y de la distribución general. Anota en qué ranuras están CPU, RAM y tarjetas.", tip: "Las fotos son tu mapa: evitan dudas al reconectar todo después." },
      { titulo: "Retira los componentes", texto: "Extrae con cuidado la memoria, la tarjeta gráfica, los discos y los cables. Suelta el procesador levantando la palanca del socket.", tip: "Guarda tornillos y separadores por módulo en bolsas etiquetadas." },
      { titulo: "Desmonta la placa del gabinete", texto: "Retira los tornillos que fijan la placa al gabinete y saca la board junto con su panel trasero (I/O shield) viejo.", tip: "Si olvidas un tornillo y tiras de la placa, puedes rayar el circuito." },
      { titulo: "Instala la nueva placa madre", texto: "Coloca el nuevo panel trasero, alinea la placa con los standoffs y atornilla sin apretar en exceso. Verifica que ningún standoff sobresuelde bajo la board.", tip: "Un standoff de más bajo la placa provoca cortocircuitos: revisa la posición exacta." },
      { titulo: "Reinstala CPU, memoria y disipador", texto: "Monta el procesador respetando la marca del zócalo, instala la memoria en las ranuras indicadas y aplica pasta térmica nueva antes del disipador.", tip: "Si la CPU no entra sola, está mal orientada: nunca fuerces la palanca." },
      { titulo: "Reconecta y configura la BIOS", texto: "Conecta los cables ATX, CPU_FAN, discos y front panel. Enciende, entra a la BIOS, fecha y hora, orden de arranque y perfil de memoria (XMP/EXPO).", tip: "Guarda la configuración con F10 antes de salir de la BIOS." },
      { titulo: "Ejecuta las pruebas finales", texto: "Arranca el sistema operativo, revisa que todos los discos y puertos funcionen y deja el equipo en reposo un rato vigilando temperaturas y estabilidad.", tip: "Ejecuta una prueba de estrés corta para validar la alimentación de la nueva placa." }
    ]
  }
];

/** Árbol de decisiones del diagnóstico interactivo. */
const DIAGNOSTICO = {
  inicio: {
    pregunta: "¿El equipo enciende al pulsar el botón de alimentación?",
    opciones: [
      { texto: "Sí, enciende y las ventiladoras giran", siguiente: "monitor" },
      { texto: "No, no reacciona nada", siguiente: "pitidos" }
    ]
  },
  monitor: {
    pregunta: "¿El monitor muestra imagen o señal?",
    ruta: "Encendido",
    opciones: [
      { texto: "Sí, hay imagen en pantalla", siguiente: "mensaje" },
      { texto: "No hay imagen (monitor en negro o sin señal)", resultado: "video" }
    ]
  },
  pitidos: {
    pregunta: "¿Se escuchan pitidos o parpadea algún LED?",
    ruta: "Sin respuesta",
    opciones: [
      { texto: "Sí, hay pitidos o destellos", resultado: "post" },
      { texto: "No, totalmente muerto", siguiente: "olor" }
    ]
  },
  olor: {
    pregunta: "¿Se detecta olor a quemado, chasquido o manchas en la fuente?",
    ruta: "Sin respuesta",
    opciones: [
      { texto: "Sí, hay olor o daño visible", resultado: "quemado" },
      { texto: "No, todo se ve normal", resultado: "fuente" }
    ]
  },
  mensaje: {
    pregunta: "¿Aparece algún mensaje de error o la PC se congela?",
    ruta: "Con imagen",
    opciones: [
      { texto: "Aparece un mensaje de error", resultado: "arranque" },
      { texto: "Es lenta, se congela o muestra pantallazos", resultado: "inestable" }
    ]
  }
};

/** Resultados posibles del diagnóstico. */
const DIAG_RESULTADOS = {
  video: {
    titulo: "Posible falla de video",
    texto: "La PC enciende pero no entrega imagen. Revisa el cable del monitor, el puerto de salida (usa la salida integrada si la GPU dedicada no da video) y la correcta inserción de la tarjeta gráfica.",
    modulo: 0
  },
  post: {
    titulo: "Error de autoevaluación (POST)",
    texto: "Los pitidos o LEDs son códigos del arranque. Identifica el patrón en el manual de la placa madre: normalmente indican falla de memoria o de video.",
    modulo: 2
  },
  quemado: {
    titulo: "Daño eléctrico probable en la fuente",
    texto: "Detén el uso del equipo. Un olor a quemado indica componentes dañados: reemplaza la fuente de poder antes de encender de nuevo para evitar dañar el resto del equipo.",
    modulo: 1
  },
  fuente: {
    titulo: "Falla en la etapa de alimentación",
    texto: "No hay respuesta eléctrica. Verifica cable, tomacorriente y el interruptor de la fuente; si todo está bien, prueba la fuente con un tester ATX.",
    modulo: 1
  },
  arranque: {
    titulo: "Error de arranque o almacenamiento",
    texto: "La PC enciende, pero el sistema no carga. Entra a la BIOS para verificar el orden de arranque, revisa que el disco sea reconocido y repara el gestor de arranque.",
    modulo: 0
  },
  inestable: {
    titulo: "Inestabilidad por memoria o temperatura",
    texto: "Pantallazos, congelamientos y lentitud suelen deberse a memoria RAM defectuosa o sobrecalentamiento. Prueba los módulos uno por uno y revisa las temperaturas.",
    modulo: 2
  }
};

/** Preguntas de la evaluación final. */
const QUIZ = [
  {
    pregunta: "¿Qué componente convierte la corriente alterna de la red en las tensiones continuas que usa la PC?",
    opciones: ["La placa madre", "La fuente de poder", "La memoria RAM", "El procesador"],
    correcta: 1,
    explicacion: "La fuente de poder (PSU) transforma 110/220 V AC en +12 V, +5 V y +3.3 V DC."
  },
  {
    pregunta: "¿Cuál es la función principal de la memoria RAM?",
    opciones: ["Guardar archivos de forma permanente", "Almacenar temporalmente los datos en uso", "Producir la imagen en el monitor", "Regular la temperatura de la CPU"],
    correcta: 1,
    explicacion: "La RAM es volátil: guarda datos y programas mientras el equipo está encendido."
  },
  {
    pregunta: "¿Qué prueba debe pasar un procesador al encender antes de cargar el sistema operativo?",
    opciones: ["El POST (Power-On Self-Test)", "La defragmentación", "El formateo", "El respaldo de disco"],
    correcta: 0,
    explicacion: "El POST verifica memoria, video y dispositivos antes de arrancar el sistema."
  },
  {
    pregunta: "¿Para qué sirve la pasta térmica?",
    opciones: ["Lubricar el ventilador", "Mejorar la transferencia de calor entre CPU y disipador", "Aumentar la velocidad de la RAM", "Limpiar el polvo"],
    correcta: 1,
    explicacion: "Rellena las microirregularidades entre la CPU y el disipador para disipar mejor el calor."
  },
  {
    pregunta: "¿Cuál es la primera acción recomendada ante una PC que no enciende?",
    opciones: ["Reinstalar el sistema operativo", "Cambiar la placa madre", "Verificar la alimentación eléctrica", "Comprar más memoria RAM"],
    correcta: 2,
    explicacion: "Siempre se parte por lo simple: cable, tomacorriente, interruptor y luego la fuente."
  },
  {
    pregunta: "¿Qué significa que una fuente tenga certificación 80 Plus?",
    opciones: ["Que tiene 80 vatios de potencia", "Que es de 80 centímetros", "Que cumple estándares de eficiencia energética", "Que tiene 80 conectores"],
    correcta: 2,
    explicacion: "80 Plus certifica que la fuente convierte la energía de forma eficiente y con menos pérdidas."
  }
];

/* ------------------------------------------------------------
   2. UTILIDADES GENERALES
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

/* Estado de los pasos completados por módulo (persistente). */
const progresoPasos = leerLocal("manual_pc_pasos", {});

/* ------------------------------------------------------------
   3. NAVEGACIÓN Y BARRA DE PROGRESO DE LECTURA
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
   4. ANIMACIONES DE APARICIÓN AL HACER SCROLL
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
   5. TARJETAS DE COMPONENTES (ACORDEÓN)
   ------------------------------------------------------------ */

/** Permite abrir/cerrar los detalles de cada componente. */
function iniciarComponentes() {
  $$(".comp-card").forEach((tarjeta) => {
    const cabecera = $(".comp-head", tarjeta);
    cabecera.addEventListener("click", () => {
      const abierta = tarjeta.classList.toggle("is-open");
      cabecera.setAttribute("aria-expanded", String(abierta));
    });
  });
}

/* ------------------------------------------------------------
   6. MODAL DE MÓDULOS Y SEGUIMIENTO DE PASOS
   ------------------------------------------------------------ */

/** Índice del módulo abierto y paso actual en pantalla. */
let moduloActual = 0;
let pasoActual = 0;

/** Estado por defecto de los pasos de un módulo. */
function pasosDelModulo(indice) {
  if (!progresoPasos[indice]) progresoPasos[indice] = [];
  return progresoPasos[indice];
}

/** Abre el visor de un módulo. Modo "resumen" o "pasos". */
function abrirModulo(indice, modo = "resumen") {
  moduloActual = indice;
  pasoActual = 0;
  const modulo = MODULOS[indice];
  const pasos = pasosDelModulo(indice);

  /* Cabecera del modal */
  $("#modalKicker").textContent = `Módulo ${indice + 1} de ${MODULOS.length}`;
  $("#modalTitle").textContent = modulo.titulo;
  $("#modalDesc").textContent = modulo.descripcion;
  $("#tabStepsCount").textContent = modulo.pasos.length;

  /* Resumen: objetivos, herramientas y aviso de seguridad */
  $("#modalObjectives").innerHTML = modulo.objetivos.map((o) => `<li>${o}</li>`).join("");
  $("#modalTools").innerHTML = modulo.herramientas.map((h) => `<li>${h}</li>`).join("");
  $("#modalSafety").textContent = `Seguridad: ${modulo.seguridad}`;

  /* Pasos renderizados con su casilla de verificación */
  $("#stepsList").innerHTML = modulo.pasos
    .map((paso, i) => {
      const hecho = pasos.includes(i);
      return `
        <li class="step-item ${hecho ? "is-done" : ""} ${i === 0 ? "is-current" : ""}" data-step="${i}">
          <span class="step-num">${i + 1}</span>
          <button class="step-check" data-check="${i}" aria-label="Marcar paso ${i + 1} como completado">
            <svg class="ic"><use href="#icon-check"></use></svg>
          </button>
          <h4 class="step-title">${paso.titulo}</h4>
          <p class="step-text">${paso.texto}</p>
          <div class="step-tip"><b>Consejo:</b> ${paso.tip}</div>
        </li>`;
    })
    .join("");

  /* Activa la pestaña solicitada por el botón de origen */
  cambiarPestaña(modo === "pasos" ? "pasos" : "resumen");
  actualizarProgresoModal();
  actualizarIndicadorPaso();

  /* Muestra el modal y bloquea el desplazamiento del fondo */
  const modal = $("#modal");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

/** Cierra el visor de módulos. */
function cerrarModulo() {
  const modal = $("#modal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/** Cambia entre las pestañas "Resumen" y "Pasos". */
function cambiarPestaña(nombre) {
  $$(".modal-tab").forEach((t) => t.classList.toggle("is-active", t.dataset.tab === nombre));
  $("#tab-resumen").classList.toggle("is-active", nombre === "resumen");
  $("#tab-pasos").classList.toggle("is-active", nombre === "pasos");

  /* Los pasos solo se navegan dentro de su pestaña */
  const enPasos = nombre === "pasos";
  $("#stepPrev").disabled = false;
  $("#stepNext").textContent = enPasos ? "Siguiente →" : "Ver pasos →";
}

/** Actualiza la barra de progreso y el texto de pasos completados. */
function actualizarProgresoModal() {
  const total = MODULOS[moduloActual].pasos.length;
  const hechos = pasosDelModulo(moduloActual).length;
  $("#modalProgressBar").style.width = `${(hechos / total) * 100}%`;
  $("#modalProgressText").textContent = `${hechos} de ${total} pasos completados`;
  actualizarProgresoGlobal();
}

/** Refresca el indicador "Paso X / Y" del pie del modal. */
function actualizarIndicadorPaso() {
  const total = MODULOS[moduloActual].pasos.length;
  $("#stepIndicator").textContent = `Paso ${pasoActual + 1} / ${total}`;
  $("#stepPrev").disabled = pasoActual === 0;

  /* Resalta el paso visible */
  $$(".step-item").forEach((item, i) => item.classList.toggle("is-current", i === pasoActual));
}

/** Lleva la vista a un paso concreto dentro de la lista. */
function enfocarPaso(indice) {
  const total = MODULOS[moduloActual].pasos.length;
  pasoActual = Math.max(0, Math.min(indice, total - 1));
  cambiarPestaña("pasos");
  const item = $(`.step-item[data-step="${pasoActual}"]`);
  if (item) item.scrollIntoView({ behavior: "smooth", block: "center" });
  actualizarIndicadorPaso();
}

/** Marca o desmarca un paso como completado. */
function alternarPaso(indice) {
  const hechos = pasosDelModulo(moduloActual);
  const posicion = hechos.indexOf(indice);

  if (posicion >= 0) hechos.splice(posicion, 1);
  else hechos.push(indice);

  const item = $(`.step-item[data-step="${indice}"]`);
  if (item) item.classList.toggle("is-done", posicion < 0);

  guardarLocal("manual_pc_pasos", progresoPasos);
  actualizarProgresoModal();

  /* Aviso al completar todos los pasos del módulo */
  const total = MODULOS[moduloActual].pasos.length;
  if (hechos.length === total) {
    mostrarAviso(`¡Módulo "${MODULOS[moduloActual].titulo}" completado!`);
  }
}

/** Actualiza la barra global de progreso de la sección de módulos. */
function actualizarProgresoGlobal() {
  let completados = 0;
  MODULOS.forEach((modulo, i) => {
    const hechos = (progresoPasos[i] || []).length;
    if (hechos >= modulo.pasos.length) completados++;
  });

  $("#globalProgressText").textContent = `${completados} / ${MODULOS.length} módulos completados`;
  $("#globalProgressBar").style.width = `${(completados / MODULOS.length) * 100}%`;
}

/** Configura los eventos del modal de módulos. */
function iniciarModal() {
  /* Botones de las tarjetas: Ejecutar y Ver módulo */
  $$("[data-open-module]").forEach((boton) => {
    boton.addEventListener("click", () => {
      abrirModulo(Number(boton.dataset.openModule), boton.dataset.mode);
    });
  });

  /* Cierre por botón, fondo o tecla Escape */
  $$("[data-close-modal]").forEach((el) => el.addEventListener("click", cerrarModulo));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModulo();
  });

  /* Pestañas del modal */
  $$(".modal-tab").forEach((tab) => {
    tab.addEventListener("click", () => cambiarPestaña(tab.dataset.tab));
  });

  /* Navegación entre pasos */
  $("#stepPrev").addEventListener("click", () => enfocarPaso(pasoActual - 1));
  $("#stepNext").addEventListener("click", () => {
    if ($(".modal-tab.is-active").dataset.tab !== "pasos") {
      cambiarPestaña("pasos");
      enfocarPaso(0);
    } else {
      enfocarPaso(pasoActual + 1);
    }
  });

  /* Casillas de verificación (delegación de eventos) */
  $("#stepsList").addEventListener("click", (e) => {
    const boton = e.target.closest("[data-check]");
    if (boton) alternarPaso(Number(boton.dataset.check));
  });
}

/* ------------------------------------------------------------
   7. DIAGNÓSTICO INTERACTIVO
   ------------------------------------------------------------ */

/** Nodo de diagnóstio actual. */
let nodoDiag = "inicio";
let rutaDiag = [];

/** Renderiza la pregunta y las opciones del nodo actual. */
function pintarDiagnostico() {
  const nodo = DIAGNOSTICO[nodoDiag];

  $("#diagBreadcrumb").textContent = rutaDiag.length ? `Ruta: ${rutaDiag.join(" › ")}` : "Inicio";
  $("#diagQuestion").textContent = nodo.pregunta;
  $("#diagResult").hidden = true;

  $("#diagOptions").innerHTML = nodo.opciones
    .map((op, i) => `
      <button class="diag-option" data-op="${i}">
        <svg class="ic ic-xs"><use href="#icon-chevron"></use></svg>
        ${op.texto}
      </button>`)
    .join("");

  /* Delegación: una sola escucha para todas las opciones */
  $$("#diagOptions .diag-option").forEach((btn) => {
    btn.addEventListener("click", () => responderDiagnostico(nodo.opciones[Number(btn.dataset.op)]));
  });
}

/** Procesa la respuesta y avanza o muestra el resultado. */
function responderDiagnostico(opcion) {
  if (opcion.texto) rutaDiag.push(opcion.texto.split(",")[0]);

  if (opcion.siguiente) {
    nodoDiag = opcion.siguiente;
    pintarDiagnostico();
    return;
  }

  mostrarResultadoDiagnostico(opcion.resultado);
}

/** Muestra la tarjeta de resultado con la recomendación final. */
function mostrarResultadoDiagnostico(clave) {
  const res = DIAG_RESULTADOS[clave];

  $("#diagQuestion").textContent = "Resultado del diagnóstico";
  $("#diagOptions").innerHTML = "";
  $("#diagResult").hidden = false;
  $("#diagResultTitle").textContent = res.titulo;
  $("#diagResultText").textContent = res.texto;

  /* Botón para abrir el módulo sugerido (si existe) */
  const botonModulo = $("#diagResultModule");
  if (Number.isInteger(res.modulo)) {
    botonModulo.hidden = false;
    botonModulo.textContent = `Ver Módulo ${res.modulo + 1}: ${MODULOS[res.modulo].titulo}`;
    botonModulo.onclick = () => abrirModulo(res.modulo, "resumen");
  } else {
    botonModulo.hidden = true;
  }
}

/** Reinicia el asistente de diagnóstico. */
function reiniciarDiagnostico() {
  nodoDiag = "inicio";
  rutaDiag = [];
  pintarDiagnostico();
}

/** Configura los eventos de la sección de diagnóstico. */
function iniciarDiagnostico() {
  pintarDiagnostico();
  $("#diagRestart").addEventListener("click", reiniciarDiagnostico);
}

/* ------------------------------------------------------------
   8. EVALUACIÓN (QUIZ)
   ------------------------------------------------------------ */

let preguntaActual = 0;
let aciertos = 0;
let respondida = false;

/** Pinta la pregunta actual y sus opciones. */
function pintarPregunta() {
  const dato = QUIZ[preguntaActual];
  respondida = false;

  $("#quizCounter").textContent = `Pregunta ${preguntaActual + 1} de ${QUIZ.length}`;
  $("#quizBar").style.width = `${(preguntaActual / QUIZ.length) * 100}%`;
  $("#quizQuestion").textContent = dato.pregunta;
  $("#quizFeedback").hidden = true;
  $("#quizNext").hidden = true;

  $("#quizOptions").innerHTML = dato.opciones
    .map((op, i) => `
      <button class="quiz-option" data-op="${i}">
        <span>${String.fromCharCode(65 + i)}</span> ${op}
      </button>`)
    .join("");

  $$("#quizOptions .quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => responderQuiz(Number(btn.dataset.op)));
  });
}

/** Valida la respuesta, aplica colores y muestra la explicación. */
function responderQuiz(indice) {
  if (respondida) return;
  respondida = true;

  const dato = QUIZ[preguntaActual];
  const botones = $$("#quizOptions .quiz-option");

  botones.forEach((btn, i) => {
    btn.disabled = true;
    if (i === dato.correcta) {
      btn.classList.add("is-correct");
      btn.insertAdjacentHTML("beforeend", '<svg class="ic ic-xs"><use href="#icon-check"></use></svg>');
    } else if (i === indice) {
      btn.classList.add("is-wrong");
    }
  });

  const acerto = indice === dato.correcta;
  if (acerto) aciertos++;

  const feedback = $("#quizFeedback");
  feedback.hidden = false;
  feedback.className = `quiz-feedback ${acerto ? "ok" : "no"}`;
  feedback.innerHTML = `<b>${acerto ? "¡Correcto!" : "Incorrecto."}</b> ${dato.explicacion}`;

  $("#quizNext").hidden = false;
  $("#quizNext").textContent = preguntaActual === QUIZ.length - 1 ? "Ver resultado" : "Siguiente";
  if (preguntaActual !== QUIZ.length - 1) {
    $("#quizNext").insertAdjacentHTML("beforeend", ' <svg class="ic ic-xs"><use href="#icon-chevron"></use></svg>');
  }
}

/** Avanza a la siguiente pregunta o muestra el resultado final. */
function siguientePregunta() {
  if (preguntaActual < QUIZ.length - 1) {
    preguntaActual++;
    pintarPregunta();
  } else {
    finalizarQuiz();
  }
}

/** Muestra la pantalla de resultado y guarda el récord. */
function finalizarQuiz() {
  $("#quizQuestion").hidden = true;
  $("#quizOptions").hidden = true;
  $("#quizFeedback").hidden = true;
  $("#quizNext").hidden = true;
  $(".quiz-track").hidden = true;
  $("#quizFinal").hidden = false;
  $("#quizCounter").textContent = "Resultado final";
  $("#quizBar").style.width = "100%";

  $("#quizMedal").textContent = `${aciertos}/${QUIZ.length}`;

  /* Mensaje según la puntuación obtenida */
  let titulo = "Sigue estudiando";
  let texto = "Repasa los componentes y vuelve a intentarlo: la práctica hace al maestro.";
  if (aciertos === QUIZ.length) {
    titulo = "¡Puntuación perfecta!";
    texto = "Dominas los fundamentos de hardware y mantenimiento. Listo para los módulos prácticos.";
  } else if (aciertos >= 4) {
    titulo = "¡Muy buen resultado!";
    texto = "Tienes una base sólida. Revisa las preguntas fallidas y estará listo.";
  }
  $("#quizFinalTitle").textContent = titulo;
  $("#quizFinalText").textContent = texto;

  /* Conserva el mejor puntaje */
  const mejor = Math.max(aciertos, leerLocal("manual_pc_quiz", 0));
  guardarLocal("manual_pc_quiz", mejor);
  $("#quizBest").textContent = mejor;
}

/** Restablece el quiz desde el principio. */
function reiniciarQuiz() {
  preguntaActual = 0;
  aciertos = 0;

  $("#quizQuestion").hidden = false;
  $("#quizOptions").hidden = false;
  $(".quiz-track").hidden = false;
  $("#quizFinal").hidden = true;

  pintarPregunta();
}

/** Configura los eventos de la evaluación. */
function iniciarQuiz() {
  $("#quizBest").textContent = leerLocal("manual_pc_quiz", 0);
  pintarPregunta();
  $("#quizNext").addEventListener("click", siguientePregunta);
  $("#quizRestart").addEventListener("click", reiniciarQuiz);
}

/* ------------------------------------------------------------
   9. MODO OSCURO, BOTÓN "VOLVER ARRIBA" Y AVISOS
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
  iniciarModal();
  iniciarDiagnostico();
  iniciarQuiz();
  iniciarTema();
  actualizarProgresoGlobal();

  /* Botón flotante para volver al inicio */
  $("#toTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
