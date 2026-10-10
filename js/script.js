/* ============================================================
   MANUAL INTERACTIVO DE PC · SCRIPT PRINCIPAL
   Estructura del archivo:
     1. Utilidades generales
     2. Navegación y barra de progreso de lectura
     3. Animaciones de aparición (scroll reveal)
     4. Tarjetas de componentes (acordeón)
     5. Modo oscuro, botón "volver arriba" y avisos
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
    cta.setAttribute("aria-controls", id);

    /* Cabecera y botón "Comenzar" comparten el mismo estado */
    const alternar = () => {
      const abierta = tarjeta.classList.toggle("is-open");
      cabecera.setAttribute("aria-expanded", String(abierta));
      cta.setAttribute("aria-expanded", String(abierta));
      cta.textContent = abierta ? "Cerrar" : "Comenzar";
    };

    cabecera.addEventListener("click", alternar);
    cta.addEventListener("click", alternar);
  });
}

/* ------------------------------------------------------------
   5. MODO OSCURO, BOTÓN "VOLVER ARRIBA" Y AVISOS
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
  iniciarTema();

  /* Botón flotante para volver al inicio */
  $("#toTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
