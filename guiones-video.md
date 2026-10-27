# Guiones de video — Manual Interactivo de PC

Ocho videos cortos, uno por componente. Cada guion es autónomo y está pensado para
narración en off de unos dos minutos.

## Archivos de narración para TTS

| Video | Componente | Narración |
|---|---|---|
| 1 | Procesador (CPU) | `guiones/01-procesador.txt` |
| 2 | Placa madre | `guiones/02-placa-madre.txt` |
| 3 | Memoria RAM | `guiones/03-memoria-ram.txt` |
| 4 | Almacenamiento | `guiones/04-almacenamiento.txt` |
| 5 | Fuente de poder | `guiones/05-fuente-de-poder.txt` |
| 6 | Tarjeta gráfica | `guiones/06-tarjeta-grafica.txt` |
| 7 | Sistema de enfriamiento | `guiones/07-enfriamiento.txt` |
| 8 | Gabinete y periféricos | `guiones/08-gabinete-perifericos.txt` |

## Notas de producción

- Imágenes base disponibles en `img/`.
- Los textos de pantalla son breves; la narración va completa en off.
- Los archivos `.txt` contienen solo narración, sin acotaciones ni marcas de escena,
  para pegarlos directamente en un generador de voz.
- Ajusta la pronunciación de siglas en tu TTS si es necesario: `CPU`, `RAM`, `SSD`,
  `NVMe`, `PCIe`, `DDR4`, `DDR5`, `M.2`.
- Cada video termina presentando el componente del video siguiente.

---

# Video 1 — El Procesador (CPU)

**Duración:** 2:00 · **Archivo visual base:** `img/processor.webp` · **Narración TTS:** `guiones/01-procesador.txt`

**Escena 1 · 0:00–0:10 · Gancho**
- Visual: Zoom lento al procesador montado en el zócalo.
- Narración: "Si la computadora fuera una persona, el procesador sería su cerebro. Todo lo que haces en pantalla pasa, tarde o temprano, por este pequeño chip."
- Texto en pantalla: CPU · El cerebro de la PC

**Escena 2 · 0:10–0:30 · ¿Qué es?**
- Visual: Plano del chip y sus contactos.
- Narración: "El CPU, o unidad central de proceso, es el componente que lee, decodifica y ejecuta las instrucciones del sistema operativo y de tus programas. No guarda archivos: los procesa."
- Texto: Lee · Decodifica · Ejecuta

**Escena 3 · 0:30–1:00 · Cómo funciona**
- Visual: Animación de núcleos trabajando en paralelo.
- Narración: "Su trabajo se repite millones de veces por segundo: toma una instrucción, la interpreta y la ejecuta. Los núcleos son unidades de trabajo independientes, y los hilos permiten aprovechar mejor cada núcleo. La frecuencia, medida en gigahercios, indica cuántos ciclos realiza por segundo. Y la caché es una memoria ultrarrápida que guarda datos de uso inmediato."
- Texto: Núcleos · Hilos · GHz · Caché

**Escena 4 · 1:00–1:25 · Datos clave**
- Visual: Comparativa Intel Core i5 / AMD Ryzen 5.
- Narración: "Al elegir un procesador revisa cuatro cosas: núcleos e hilos, frecuencia, cantidad de caché y, sobre todo, el socket. El socket debe coincidir con el de la placa madre. Ejemplos comunes son el Intel Core i5 y el AMD Ryzen 5."
- Texto: Socket compatible

**Escena 5 · 1:25–1:50 · Cuidados y fallas**
- Visual: Aplicación de pasta térmica y montaje del disipador.
- Narración: "El CPU genera mucho calor. Necesita un disipador y pasta térmica bien aplicados. Si se calienta demasiado, reduce su velocidad para protegerse: eso se llama throttling. Si el equipo no enciende, revisa que el procesador esté bien asentado y que no haya pines doblados."
- Texto: Pasta térmica + disipador · Throttling

**Escena 6 · 1:50–2:00 · Cierre**
- Visual: Plano general del equipo encendido.
- Narración: "En resumen: el procesador ejecuta las instrucciones y marca el ritmo de la PC. En el siguiente video veremos la placa madre, el lugar donde todo se conecta."
- Texto: Siguiente: Placa madre

---

# Video 2 — La Placa Madre

**Duración:** 2:00 · **Archivo visual base:** `img/motherboard.webp` · **Narración TTS:** `guiones/02-placa-madre.txt`

**Escena 1 · 0:00–0:10 · Gancho**
- Visual: Plano cenital de la placa madre.
- Narración: "Ningún componente de la PC trabaja solo. Todos se comunican a través de una sola pieza: la placa madre."
- Texto: Placa madre · El punto de encuentro

**Escena 2 · 0:10–0:30 · ¿Qué es?**
- Visual: Recorrido por la superficie del circuito.
- Narración: "Es el circuito impreso principal del equipo. Sobre ella se montan el procesador, la memoria RAM, el almacenamiento y las tarjetas de expansión. Además distribuye energía y datos entre todos ellos."
- Texto: Conecta · Alimenta · Comunica

**Escena 3 · 0:30–1:00 · Cómo funciona**
- Visual: Señalización de socket, ranuras DIMM, PCIe, M.2 y SATA.
- Narración: "Cada componente tiene su lugar. El socket recibe el CPU; las ranuras DIMM, la memoria; las ranuras PCIe, la tarjeta gráfica u otras tarjetas; y las conexiones M.2 y SATA, los discos. El chipset es el que coordina la comunicación y define qué componentes son compatibles."
- Texto: Socket · DIMM · PCIe · M.2 · SATA

**Escena 4 · 1:00–1:25 · Datos clave**
- Visual: Comparativa de factores de forma ATX, Micro-ATX y Mini-ITX.
- Narración: "Antes de comprar una placa revisa el socket, el tipo de memoria que admite, las ranuras disponibles y el factor de forma. Debe coincidir con el gabinete. Su firmware, BIOS o UEFI, realiza el POST al encender y verifica que el hardware esté presente."
- Texto: Socket · Memoria · Factor de forma · BIOS/UEFI

**Escena 5 · 1:25–1:50 · Cuidados y fallas**
- Visual: Montaje con standoffs y descarga de estática.
- Narración: "Manipúlala con cuidado y descarga la electricidad estática antes de tocarla. Usa los separadores o standoffs del gabinete para evitar cortocircuitos. Si el equipo no arranca, revisa la alimentación, la RAM y el diagnóstico por LED o pitidos."
- Texto: Evita cortocircuitos

**Escena 6 · 1:50–2:00 · Cierre**
- Visual: Placa con todos los componentes instalados.
- Narración: "La placa madre es la base de toda la PC: si no es compatible, nada encaja. En el siguiente video hablaremos de la memoria RAM."
- Texto: Siguiente: Memoria RAM

---

# Video 3 — La Memoria RAM

**Duración:** 2:00 · **Archivo visual base:** `img/ram.webp` · **Narración TTS:** `guiones/03-memoria-ram.txt`

**Escena 1 · 0:00–0:10 · Gancho**
- Visual: Módulo RAM girando lentamente.
- Narración: "¿Por qué tu computadora se vuelve lenta cuando abres muchas pestañas? La respuesta está en la memoria RAM."
- Texto: RAM · La memoria de trabajo

**Escena 2 · 0:10–0:30 · ¿Qué es?**
- Visual: Diagrama de programas abiertos.
- Narración: "La RAM guarda los datos y programas que estás usando en este momento. Es una memoria temporal y muy rápida. Cuando apagas la PC, su contenido se borra por completo."
- Texto: Volátil · Rápida · Temporal

**Escena 3 · 0:30–1:00 · Cómo funciona**
- Visual: Comparativa DDR4 / DDR5 y doble canal.
- Narración: "Su capacidad se mide en gigabytes y su velocidad en megahercios. Los tipos más comunes hoy son DDR4 y DDR5. Cuando trabajas, el sistema mueve datos entre el disco, la RAM y el procesador. Si la RAM se llena, el equipo recurre al disco y todo se vuelve más lento."
- Texto: GB · MHz · DDR4/DDR5 · Doble canal

**Escena 4 · 1:00–1:25 · Datos clave**
- Visual: Instalación alineando la muesca.
- Narración: "Al instalar un módulo, alinea la muesca con la ranura y presiona hasta cerrar los seguros. Para aprovechar el doble canal, coloca los módulos en las ranuras indicadas por la placa. Verifica siempre el tipo de memoria que admite tu equipo."
- Texto: Alinea la muesca · Doble canal

**Escena 5 · 1:25–1:50 · Cuidados y fallas**
- Visual: Pantallazo azul, reinicios y prueba de memoria.
- Narración: "Una RAM defectuosa o mal colocada provoca pantallazos azules, reinicios o fallos al arrancar. Si sospechas de ella, prueba un módulo a la vez y usa una herramienta de diagnóstico de memoria."
- Texto: Síntomas: pantallazos y reinicios

**Escena 6 · 1:50–2:00 · Cierre**
- Visual: Diagrama CPU-RAM-Almacenamiento.
- Narración: "Más RAM significa más programas abiertos sin perder velocidad. En el siguiente video veremos dónde se guardan tus archivos: el almacenamiento."
- Texto: Siguiente: Almacenamiento

---

# Video 4 — El Almacenamiento

**Duración:** 2:00 · **Archivo visual base:** `img/hard_drive.webp` · **Narración TTS:** `guiones/04-almacenamiento.txt`

**Escena 1 · 0:00–0:10 · Gancho**
- Visual: Disco duro abierto y luego un SSD.
- Narración: "Cuando apagas la computadora, tus archivos siguen ahí. El responsable es el almacenamiento."
- Texto: Almacenamiento · Memoria permanente

**Escena 2 · 0:10–0:30 · ¿Qué es?**
- Visual: Sistema operativo, fotos y documentos.
- Narración: "Es el medio donde viven el sistema operativo, tus aplicaciones y todos tus archivos. A diferencia de la RAM, no se borra al apagar el equipo."
- Texto: Sistema · Archivos · Aplicaciones

**Escena 3 · 0:30–1:00 · Tipos y funcionamiento**
- Visual: HDD con platos, SSD SATA y SSD NVMe en M.2.
- Narración: "Existen tres tipos principales. El HDD usa platos y cabezales móviles: ofrece mucha capacidad, pero es más lento y frágil. El SSD SATA usa memoria flash y moderniza equipos antiguos. Y el SSD NVMe se instala en la ranura M.2 y es el más rápido de todos."
- Texto: HDD · SSD SATA · SSD NVMe

**Escena 4 · 1:00–1:25 · Datos clave**
- Visual: Comparativa de velocidades.
- Narración: "Para el sistema operativo conviene un SSD, preferiblemente NVMe. Para archivos grandes y respaldo, un HDD de mayor capacidad puede ser suficiente. Lo ideal es combinar ambos según tu presupuesto."
- Texto: Sistema en SSD · Archivo en HDD

**Escena 5 · 1:25–1:50 · Cuidados y fallas**
- Visual: Ruidos del HDD y revisión de salud SMART.
- Narración: "Un disco puede fallar sin avisar. Los HDD suelen emitir ruidos extraños; los SSD pueden volverse lentos o dejar de detectarse. Revisa su estado con herramientas SMART y mantén copias de seguridad."
- Texto: Respaldos · Salud SMART

**Escena 6 · 1:50–2:00 · Cierre**
- Visual: Copia de archivos completándose.
- Narración: "El almacenamiento conserva tu información: cuídalo con respaldos. En el siguiente video veremos la fuente de poder."
- Texto: Siguiente: Fuente de poder

---

# Video 5 — La Fuente de Poder

**Duración:** 2:00 · **Archivo visual base:** `img/power_source.webp` · **Narración TTS:** `guiones/05-fuente-de-poder.txt`

**Escena 1 · 0:00–0:10 · Gancho**
- Visual: Fuente conectada al equipo.
- Narración: "Sin energía, ningún componente funciona. La fuente de poder es el corazón eléctrico de la computadora."
- Texto: Fuente de poder

**Escena 2 · 0:10–0:30 · ¿Qué es?**
- Visual: Diagrama de corriente alterna a continua.
- Narración: "Su función es transformar la corriente alterna de la red, de 110 o 220 voltios, en las tensiones continuas que usan los componentes: principalmente 12, 5 y 3.3 voltios."
- Texto: AC → DC · 12 V / 5 V / 3.3 V

**Escena 3 · 0:30–1:00 · Cómo funciona**
- Visual: Etiqueta de especificaciones y certificación 80 Plus.
- Narración: "Los vatios indican cuánta energía puede entregar. Deben cubrir el consumo de todos los componentes con margen. La certificación 80 Plus indica eficiencia, y las protecciones evitan daños por sobrecarga, cortocircuito o sobretensión."
- Texto: Vatios · 80 Plus · Protecciones

**Escena 4 · 1:00–1:25 · Datos clave**
- Visual: Conectores de 24 pines, EPS y PCIe.
- Narración: "Revisa que tenga los conectores que necesita tu placa y tu tarjeta gráfica: el de 24 pines, el de CPU y los de PCIe. Una fuente insuficiente provoca apagones o reinicios bajo carga."
- Texto: 24 pines · CPU · PCIe

**Escena 5 · 1:25–1:50 · Cuidados y fallas**
- Visual: Olor a quemado, zumbidos y tester ATX.
- Narración: "Olor a quemado, zumbidos o arranques fallidos son señales de alerta. Nunca abras una fuente: almacena energía peligrosa. Para diagnosticar, usa un tester ATX o prueba con otra fuente."
- Texto: No la abras · Tester ATX

**Escena 6 · 1:50–2:00 · Cierre**
- Visual: Equipo encendido de forma estable.
- Narración: "Una buena fuente protege toda la inversión. En el siguiente video veremos la tarjeta gráfica."
- Texto: Siguiente: Tarjeta gráfica

---

# Video 6 — La Tarjeta Gráfica

**Duración:** 2:00 · **Archivo visual base:** `img/GPU.webp` · **Narración TTS:** `guiones/06-tarjeta-grafica.txt`

**Escena 1 · 0:00–0:10 · Gancho**
- Visual: Tarjeta gráfica con ventiladores encendidos.
- Narración: "Todo lo que ves en tu pantalla, desde el escritorio hasta un videojuego, pasa por la tarjeta gráfica."
- Texto: GPU · Tarjeta gráfica

**Escena 2 · 0:10–0:30 · ¿Qué es?**
- Visual: Comparativa GPU integrada y dedicada.
- Narración: "Es el componente que procesa imágenes y video. Trabaja en paralelo, realizando miles de cálculos a la vez. Puede venir integrada en el procesador, para uso básico, o ser una tarjeta dedicada con mucho más potencia."
- Texto: iGPU vs GPU dedicada

**Escena 3 · 0:30–1:00 · Cómo funciona**
- Visual: Memoria VRAM y procesadores gráficos.
- Narración: "La GPU tiene su propia memoria, llamada VRAM, donde guarda texturas y datos gráficos. Cuanta más VRAM y potencia tenga, mejor responderá en juegos, edición y renderizado 3D. Se conecta a la placa mediante una ranura PCIe."
- Texto: VRAM · PCIe · Renderizado

**Escena 4 · 1:00–1:25 · Datos clave**
- Visual: Puertos HDMI y DisplayPort.
- Narración: "Revisa los puertos de salida: HDMI y DisplayPort deben coincidir con tu monitor. También necesita alimentación adicional de la fuente mediante cables PCIe y un buen flujo de aire."
- Texto: HDMI · DisplayPort · Alimentación PCIe

**Escena 5 · 1:25–1:50 · Cuidados y fallas**
- Visual: Limpieza de ventiladores y actualización de drivers.
- Narración: "Mantén limpios sus ventiladores y actualiza los controladores. Si aparecen artefactos en pantalla, apagones o sobrecalentamiento, revisa la temperatura, la alimentación y que esté bien insertada."
- Texto: Drivers y temperatura

**Escena 6 · 1:50–2:00 · Cierre**
- Visual: Juego o render terminado.
- Narración: "La tarjeta gráfica da vida a la imagen, pero debe equilibrarse con el resto del equipo. En el siguiente video veremos el enfriamiento."
- Texto: Siguiente: Enfriamiento

---

# Video 7 — El Sistema de Enfriamiento

**Duración:** 2:00 · **Archivo visual base:** `img/fan_cooler.webp` · **Narración TTS:** `guiones/07-enfriamiento.txt`

**Escena 1 · 0:00–0:10 · Gancho**
- Visual: Ventilador girando y polvo acumulado.
- Narración: "El calor es el enemigo silencioso de la computadora. El sistema de enfriamiento evita que los componentes se dañen."
- Texto: Enfriamiento

**Escena 2 · 0:10–0:30 · ¿Qué es?**
- Visual: Disipador, ventiladores y pasta térmica.
- Narración: "Combina varias piezas: el disipador, que absorbe el calor; los ventiladores, que lo expulsan; la pasta térmica, que mejora el contacto; y el flujo de aire del gabinete."
- Texto: Disipador · Ventilador · Pasta térmica

**Escena 3 · 0:30–1:00 · Cómo funciona**
- Visual: Flujo de aire dentro del gabinete.
- Narración: "El calor pasa del chip al disipador y de ahí al aire. Los ventiladores renuevan ese aire. Si el flujo se obstruye, la temperatura sube y el procesador reduce su velocidad para protegerse, bajando el rendimiento."
- Texto: Aire frío entra · Aire caliente sale

**Escena 4 · 1:00–1:25 · Datos clave**
- Visual: Diferencias entre disipador de aire y líquido.
- Narración: "Existen disipadores de aire y sistemas líquidos. Para la mayoría de equipos, un buen disipador de aire es suficiente. Lo importante es que sea compatible con el socket y con el espacio del gabinete."
- Texto: Aire o líquido · Compatibilidad

**Escena 5 · 1:25–1:50 · Cuidados y fallas**
- Visual: Limpieza y monitoreo de temperaturas.
- Narración: "Limpia el polvo cada tres a seis meses y vigila las temperaturas con software de sensores. Ruido excesivo, apagones o temperaturas muy altas indican que el enfriamiento necesita atención."
- Texto: Limpieza cada 3-6 meses

**Escena 6 · 1:50–2:00 · Cierre**
- Visual: Equipo funcionando fresco y silencioso.
- Narración: "Un buen enfriamiento alarga la vida de la PC y mantiene su rendimiento. En el último video veremos el gabinete y los periféricos."
- Texto: Siguiente: Gabinete y periféricos

---

# Video 8 — Gabinete y Periféricos

**Duración:** 2:00 · **Archivo visual base:** `img/tower_pc.webp` · **Narración TTS:** `guiones/08-gabinete-perifericos.txt`

**Escena 1 · 0:00–0:10 · Gancho**
- Visual: Gabinete abierto con componentes ordenados.
- Narración: "La caja de la PC no es solo estética. El gabinete protege, organiza y ayuda a que todo funcione mejor."
- Texto: Gabinete y periféricos

**Escena 2 · 0:10–0:30 · ¿Qué es el gabinete?**
- Visual: Factores de forma y paneles.
- Narración: "Es la estructura que aloja y protege los componentes. Debe ser compatible con el tamaño de la placa madre y ofrecer espacio para la fuente, los discos y la tarjeta gráfica."
- Texto: ATX · Micro-ATX · Mini-ITX

**Escena 3 · 0:30–1:00 · Flujo de aire y cableado**
- Visual: Ventiladores frontales y traseros, cables ordenados.
- Narración: "Un buen gabinete permite que entre aire frío y salga el caliente. El cableado ordenado no solo se ve mejor: mejora el flujo de aire y facilita el mantenimiento. Algunos incluyen filtros antipolvo que conviene limpiar."
- Texto: Flujo de aire · Cableado limpio · Filtros

**Escena 4 · 1:00–1:25 · Periféricos de entrada**
- Visual: Teclado, mouse y micrófono.
- Narración: "Los periféricos de entrada envían información al sistema: el teclado, el mouse, el micrófono y la cámara web. Gracias a ellos puedes comunicarte con la computadora."
- Texto: Entrada

**Escena 5 · 1:25–1:50 · Periféricos de salida**
- Visual: Monitor, parlantes e impresora.
- Narración: "Los de salida muestran o reproducen el resultado: el monitor, los parlantes y la impresora. Algunos dispositivos, como una pantalla táctil, cumplen ambas funciones."
- Texto: Salida

**Escena 6 · 1:50–2:00 · Cierre**
- Visual: Recorrido final por todo el equipo.
- Narración: "Con esto completas los ocho componentes de la PC. Ya puedes entender cómo se conectan y cómo cuidarlos. Gracias por acompañarnos en este manual interactivo."
- Texto: Fin del recorrido

---

## Generar los videos

El proyecto incluye un generador automático con **Edge TTS** y **FFmpeg**. La primera
ejecución crea un entorno virtual e instala las dependencias.

```bash
npm run videos
```

Opciones útiles:

```bash
# Solo algunos componentes
bash tools/generar-videos.sh --solo 01,03,07

# Cambiar la voz
bash tools/generar-videos.sh --voz es-MX-DaliaNeural

# Regenerar solo los videos, reutilizando la voz ya generada
bash tools/generar-videos.sh --forzar-video

# Solo audio y subtítulos
bash tools/generar-videos.sh --sin-video
```

Resultados en `salida/`:

- `salida/videos/`: los 8 videos MP4 en 1080p.
- `salida/audios/`: la narración en MP3.
- `salida/subtitulos/`: subtítulos SRT sincronizados.
- `salida/miniaturas/`: portada de cada video.

Requiere conexión a internet para Edge TTS. Las fuentes Inter y Space Grotesk están
incluidas en `tools/fonts/` con sus licencias OFL.
