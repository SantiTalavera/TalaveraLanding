# Capacidades — propuesta editorial

**Estado:** propuesta pendiente de aprobación humana. Fuente doctrinal: [Tesis de la marca, §§ 3, 7 y 8](https://app.notion.com/p/41cbac03703980bb8cc3e18250644c4f). No constituye una especificación de implementación.

## A. Función estratégica

Traducir el posicionamiento institucional del hero en tres propósitos de intervención reconocibles por un decisor inmobiliario. La sección explica dónde puede aportar TALAVERA; el portfolio posterior muestra iniciativas concretas, sujetas a sus propios estados y permisos. La amplitud de las capacidades no implica que cada iniciativa del portfolio las demuestre todas.

## B. Auditoría del contenido existente

La sección aprobada todavía no existe en la página activa: `App.jsx` pasa de `ClientsMarquee` a `ProductsCarousel`. Por lo tanto, no hay copy ni composición actuales específicos que deban preservarse. `Soluciones/Soluciones.jsx` existe en el repositorio pero no está importado en `App.jsx`; presenta tarjetas por segmento, como «HOAs / Clubes de campo», «Desarrollos inmobiliarios» y «Administración / operación», con frases como «elimina conflictos» y «control absoluto». No es evidencia de oferta pública ni una base fiel a las tres dimensiones aprobadas.

La navegación implementada también conserva «Soluciones»; la arquitectura aprobada en Notion dispone «Capacidades», con «Optimización operativa», «Ingeniería y tecnología» y «Desarrollo estratégico». Es una diferencia de implementación, no una decisión que deba reabrirse. La composición y la extensión de la nueva sección no están definidas: se recomienda un encabezado breve, tres unidades de lectura y un único enlace opcional, sujetos a revisión visual posterior.

## C. Propuesta recomendada

**Título de sección**

Capacidades

**Introducción**

Desde la operación actual hasta el desarrollo de nuevas oportunidades, cada intervención parte de las necesidades del negocio.

**1. Optimizar lo existente**

Analizar procesos, información y decisiones para identificar mejoras en la operación y dar mayor claridad a su gestión.

**2. Construir nuevas capacidades**

Diseñar y desarrollar sistemas, productos y herramientas especializadas para responder a necesidades que las soluciones actuales no cubren.

**3. Desarrollar oportunidades**

Analizar iniciativas y explorar colaboraciones en las que la ingeniería pueda contribuir al desarrollo de una oportunidad empresarial inmobiliaria.

**CTA secundario recomendado:** «Explorar portfolio», con destino a la sección de portfolio de la misma página, únicamente cuando esa sección presente al menos una iniciativa habilitada. Si no existe ese destino real, omitir el enlace. El contacto general conserva el CTA principal aprobado «Iniciar conversación» en el header y el cierre.

**Jerarquía comunicacional:** título → introducción → tres dimensiones con igual relevancia → enlace opcional al portfolio. Los cuatro pilares —inteligencia, estructura, tecnología y desarrollo— fundamentan la sección transversalmente, sin convertirse en cuatro categorías adicionales visibles. Los textos son compactos, pero requieren comprobación de longitud y lectura en escritorio y móvil durante una futura implementación.

## D. Alternativas

1. **Título: «Ingeniería aplicada al negocio inmobiliario».** Refuerza la disciplina y el sector, pero puede repetir el posicionamiento del hero; se recomienda «Capacidades» para facilitar orientación y corresponder al header.
2. **Introducción: «Cada negocio plantea necesidades diferentes. TALAVERA aplica ingeniería de sistemas y conocimiento del sector inmobiliario para intervenir en tres dimensiones».** Explicita disciplina y sector, pero repite el posicionamiento y el complemento propuestos para el hero.
3. **CTA: «Iniciar conversación».** Acerca directamente al contacto, pero añade otra llamada comercial donde el portfolio puede dar sustento a la propuesta. Usarlo solo si se decide priorizar conversión directa; no debe prometer diagnóstico.

## E. Justificación

Las dimensiones mantienen el «para qué» aprobado y vinculan la ingeniería con decisiones, gestión, capacidades y oportunidades comprensibles para un decisor no técnico. El texto evita asegurar resultados obtenidos o prometer una estructura empresarial mayor. Las colaboraciones se presentan como exploración posible, compatible con el posicionamiento actual de ingeniería y con el horizonte empresarial aún no materializado. Los pilares se expresan mediante comprensión, diseño, herramientas y desarrollo, sin agregar una taxonomía paralela.

La relación con el menú aprobado es conceptual, no de equivalencia rígida uno a uno: «Optimización operativa» se vincula especialmente con la primera dimensión; «Ingeniería y tecnología», con el diseño y construcción de capacidades; «Desarrollo estratégico», con oportunidades. Las capacidades pueden cruzar dimensiones según el contexto.

## F. Dependencias

- El hero debe establecer identidad y especialización; esta sección desarrolla la aplicación empresarial sin repetir su formulación completa. La introducción podrá abreviarse si el hero ya expresa inequívocamente ingeniería y sector.
- El portfolio debe distinguir producto proyectado, proyecto aplicado y proyecto colaborativo. El enlace secundario depende de un destino con contenido real y autorizado.
- El menú aprobado debe dirigir a esta sección como destino inicial; las páginas específicas solo se habilitarán con contenido suficiente.
- El modal de contacto y el cierre deben admitir necesidades, proyectos y colaboraciones sin convertir el diagnóstico en paso obligatorio.

## G. Impacto estructural

En una etapa posterior será necesario incorporar una sección institucional entre organizaciones y portfolio, con un ancla de navegación accesible, encabezado, tres unidades y enlace condicional. Si la cinta se oculta por falta de evidencia, la sección seguirá después del hero. No se propone reutilizar sin revisión las tarjetas de `Soluciones`: su clasificación por segmentos y sus afirmaciones no cumplen la función aprobada. La composición concreta, los estilos y el comportamiento accesible se resolverán en implementación, sin modificar ahora componentes ni CSS.

## H. Restricciones de publicación

Comprobar que los alcances comunicados correspondan a capacidades y formas de intervención efectivamente ofrecidas. No insinuar resultados garantizados, disponibilidad de productos futuros ni participaciones empresariales ya materializadas. Habilitar el enlace al portfolio solo con un destino real y contenido publicable. Revisar la compatibilidad visual y accesibilidad del copy cuando exista la sección; esta revisión documental no demuestra ajuste en pantalla.

## I. Decisiones para validación humana

1. Aprobar o ajustar el texto completo de la sección, incluidas las tres descripciones.
2. Aprobar el uso de «Capacidades» como título y la introducción propuesta frente a sus alternativas.
3. Aprobar el enlace secundario «Explorar portfolio» condicionado a un destino habilitado, o elegir contacto directo u omitir CTA.
