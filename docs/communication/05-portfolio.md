> **Registro historico, sustituido:** este documento conserva propuestas y observaciones anteriores, no la especificacion vigente. Consultar [decisiones aprobadas](12-decisions-pending.md), [auditoria](10-editorial-audit.md) y [preparacion de publicacion](../implementation/release-readiness.md).

# Portfolio — propuesta editorial

**Estado:** propuesta pendiente de aprobación humana. Fuente: [Tesis de la marca](https://app.notion.com/p/41cbac03703980bb8cc3e18250644c4f), secciones 5, 7 y 8. Esta propuesta no constituye autorización para publicar las iniciativas.

## A. Función estratégica

Mostrar cómo la ingeniería se expresa en iniciativas concretas, distinguiendo un producto proyectado, un proyecto aplicado y un proyecto colaborativo. El portfolio aporta evidencia del tipo y alcance de las intervenciones, sin convertir expectativas en resultados ni atribuir propiedad exclusiva sobre trabajos compartidos.

## B. Auditoría del contenido existente

`ProductsCarousel.jsx` presenta el título «Sistemas y proyectos», la introducción «Tecnología aplicada a operaciones reales del sector inmobiliario.» y una diapositiva por iniciativa con categoría, nombre, titular, descripción y enlace. Esa introducción mezcla una iniciativa proyectada con operaciones reales. El ID actual es `productos` y el control de estado visible agrega «Proyectado» únicamente a ese producto.

`app/src/data/mock/content.js` contiene tres tarjetas de muestra y rutas `#demo/portfolio/...`; imágenes y rutas son conceptuales, no son páginas comerciales ni evidencia verificable. La primera dice «Todas tus propiedades. Una sola operación.» y «Centralizá inmuebles, pagos, mantenimiento y proveedores en un sistema diseñado para operar con control y trazabilidad», formulación que sugiere disponibilidad. La simulación dice «Entender la operación antes de transformarla» y describe evaluación de escenarios; no debe inferirse mejora efectivamente conseguida. CCLF dice «Cada lote. Cada decisión. Bajo control» y presenta una plataforma de trazabilidad, sin precisar la colaboración. Ninguna denominación o captura de muestra acredita autorización pública.

El portfolio de `production.js` está vacío. El carrusel usa dos columnas en escritorio y una en móvil; titulares grandes y descripción de ancho máximo 31 rem requieren brevedad y verificación visual. Las páginas individuales no están habilitadas.

## C. Propuesta recomendada

**Denominación de sección:** Productos y proyectos

**Introducción:** Iniciativas que muestran distintas aplicaciones de la ingeniería al negocio inmobiliario, en diferentes etapas de desarrollo.

### 1. Administración de propiedades

- **Categoría:** Producto propio proyectado.
- **Nombre:** Administración de propiedades.
- **Headline:** Una nueva capacidad para la administración de propiedades.
- **Descripción:** Producto proyectado para explorar cómo la tecnología especializada puede apoyar la gestión de propiedades, información y procesos asociados.
- **Estado verificable:** Proyectado; todavía no disponible. No hay base para prometer funciones concretas, fechas o requisitos de acceso.
- **CTA individual recomendado:** «Consultar por el producto». Destino: contacto comercial general con la intención «Consultar por un producto o proyecto» y el nombre preseleccionado solo si esta funcionalidad se implementa; de lo contrario, el visitante puede indicarlo en el mensaje. La alternativa «Conocer el producto» requiere una página individual real y habilitada con información acorde a su estado.

### 2. Simulación de atención comercial

- **Categoría:** Proyecto aplicado.
- **Nombre:** Simulación de atención comercial.
- **Headline:** Analizar la atención antes de decidir cambios.
- **Descripción:** Modelización por eventos discretos de consultas y atención inicial, para explorar escenarios de capacidad y funcionamiento comercial.
- **Estado verificable:** Proyecto aplicado; no se han acreditado aquí fecha, estado operativo actual, resultados ni autorización de publicación. No es un CRM ni una solución automatizada de atención.
- **CTA individual recomendado:** «Consultar por el proyecto», hacia contacto comercial general, sujeto a poder publicar la descripción. «Explorar proyecto» solo cuando exista una página accesible y autorizada.
- **Identificación:** asociar «Keymex» únicamente tras verificar el permiso para mencionar el nombre y mostrar los materiales. Si no hay permiso, considerar una descripción anónima solo tras comprobar que su alcance y contexto también son publicables; de lo contrario, ocultar la iniciativa.

### 3. Comercialización de lotes

- **Categoría:** Proyecto colaborativo.
- **Nombre:** Comercialización de lotes.
- **Headline:** Información comercial para una operación compartida.
- **Descripción:** Proyecto colaborativo orientado a la gestión de lotes, inmobiliarias, prioridades, reservas, ventas y masterplan de un desarrollo inmobiliario.
- **Estado verificable:** Proyecto colaborativo; la fuente no acredita aquí una etapa operativa concreta ni resultados. No pertenece exclusivamente a TALAVERA ni representa un futuro sistema HOA integral.
- **CTA individual recomendado:** «Consultar por el proyecto», hacia contacto comercial general, únicamente cuando la información esté autorizada para publicación. «Explorar proyecto» requiere una página real y autorizada.
- **Identificación:** usar «CCLF» solo con autorización de las partes correspondientes y verificación del alcance atribuible. La anonimización no sustituye esos permisos; si no se autoriza siquiera el relato anónimo, ocultar la iniciativa.

Cada CTA de contacto debe abrir el mismo mecanismo general y no implicar disponibilidad, demostración ni una instancia de diagnóstico. El CTA debe ocultarse si no existe un mecanismo funcional; no se debe dirigir a páginas `#demo` en una versión pública.

## D. Alternativas

1. **«Portfolio»**: coincide exactamente con la navegación aprobada y es más breve; comunica menos claramente la convivencia de productos y proyectos. Puede conservarse en el header aunque se recomiende «Productos y proyectos» como título de sección.
2. **«Iniciativas»**: admite distintas modalidades y etapas; necesita una introducción que explicite productos y proyectos para evitar ambigüedad.
3. **Sin CTA individual hasta disponer de páginas propias:** máxima claridad de recorrido, pero reduce las oportunidades de consulta contextual. La recomendación de contacto resuelve esa intención sin simular una landing existente, siempre que el contacto y la publicación estén habilitados.

## E. Justificación

La sección distingue las modalidades aprobadas con estados expresos. El producto se formula como proyección y los proyectos se describen por sus alcances, no por supuestos resultados. La simulación muestra modelización aplicada sin atribuirle automatización; la colaboración se hace visible sin adjudicar exclusividad. El lenguaje conecta con negocio y decisión, mientras el hero establece la disciplina y Capacidades explica las tres finalidades de intervención.

## F. Dependencias

- **Hero y Capacidades:** proporcionan identidad y finalidades; estas tarjetas ilustran modalidades sin reducirlas a las iniciativas expuestas.
- **Header:** «Portfolio» permanece como categoría aprobada. Cualquier destino individual debe existir y estar autorizado; mientras tanto, dirigir al conjunto de la sección si está disponible.
- **Modal:** recibir la consulta sobre una iniciativa sin prometer acceso, demostración ni diagnóstico. La identificación automática es una posibilidad futura, no una capacidad actual.
- **Evidencia:** validar alcance atribuible, fecha y estado real cuando se conozcan; revisar nombres, referencias e imágenes con los titulares de derechos correspondientes.

## G. Impacto estructural

El carrusel existente ofrece espacios adecuados para categoría, nombre, titular, descripción, imagen y CTA. Será necesario revisar el tratamiento de estado para que distinga las tres clasificaciones y, según el mecanismo aprobado, admitir botones de contacto además de enlaces. El identificador `productos` y los destinos del header requieren alineación en una etapa posterior. Imágenes y fondo de muestra no son activos de publicación. Ajustar altura, quiebres y accesibilidad deberá verificarse al implementar; no se proponen cambios de código en esta fase.

## H. Restricciones de publicación

- Publicar una tarjeta solo después de confirmar que su descripción, estado y materiales son exactos y están autorizados.
- Producto proyectado: no presentarlo como disponible ni utilizar el umbral de seis propiedades, que no está validado.
- Keymex y CCLF: verificar autorización para nombres, marcas, alcance, activos y comunicación; anonimizar no garantiza permiso. Si no existe autorización suficiente, ocultar la tarjeta.
- Retirar imágenes y enlaces de demostración, y mantener ocultos los destinos inexistentes.
- Un portfolio sin iniciativas autorizadas suficientes debe permanecer oculto hasta contar con contenido publicable; no rellenarlo con evidencia ficticia.

## I. Decisiones para validación humana

1. Aprobar «Productos y proyectos» como título visible o elegir una alternativa.
2. Aprobar el copy y los CTA propuestos para cada iniciativa, sujetos a las verificaciones anteriores.
3. Aprobar la política de contacto contextual mientras no existan landings individuales, y decidir qué información de cada iniciativa se autoriza efectivamente a publicar.
