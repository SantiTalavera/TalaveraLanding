> **Registro historico, sustituido:** este documento conserva propuestas y observaciones anteriores, no la especificacion vigente. Consultar [decisiones aprobadas](12-decisions-pending.md), [auditoria](10-editorial-audit.md) y [preparacion de publicacion](../implementation/release-readiness.md).

# Preguntas frecuentes — propuesta editorial

**Estado:** propuesta pendiente de aprobación humana. Fuente doctrinal: [Tesis de la marca, §§ 4, 7 y 8](https://app.notion.com/p/41cbac03703980bb8cc3e18250644c4f).

## A. Función estratégica

Resolver dudas que pueden impedir una conversación comercial: encaje, modalidad de trabajo, producto frente a intervención a medida, sistemas existentes y colaboración. Esta sección aclara el siguiente paso sin transformar el contacto en una contratación o diagnóstico obligatorio.

## B. Auditoría del contenido existente

`FAQSection.jsx` muestra el rótulo «Información», el título «Preguntas frecuentes.» y la introducción «Una primera aproximación a la forma de trabajar de TALAVERA.». Utiliza acordeones `details` y recibe seis pares de pregunta y respuesta desde `data/content.js`.

En demostración y producción existen preguntas sobre organizaciones, productos o soluciones a medida, diagnóstico, inicio de proyecto, integraciones y participación como socio o consultor. La respuesta demostrativa emplea «Trabajamos», que puede sugerir una estructura plural; también presenta el diagnóstico como instancia inicial. La respuesta de producción lo identifica directamente con una primera conversación. Ambas expresiones confunden el contacto general con una intervención consultiva cuyos términos no están definidos. La producción usa datos propios, no evidencia de que el servicio esté disponible en condiciones particulares.

La composición actual distribuye introducción y acordeones en dos columnas, con una sola columna en pantallas de hasta 750 px. Las respuestas no tienen límite explícito de caracteres, pero deben ser breves para facilitar lectura en móvil. El contenido aprobado del header y la nueva sección de capacidades aún no están implementados.

## C. Propuesta recomendada

**Rótulo:** Información  
**Título:** Preguntas frecuentes.  
**Introducción:** Algunas respuestas para evaluar cómo podría comenzar una conversación con TALAVERA.

### 1. ¿Para qué tipo de organizaciones puede ser relevante TALAVERA?

Para organizaciones y responsables de negocios inmobiliarios que necesitan mejorar una operación, desarrollar una capacidad o explorar una oportunidad. Puede ser relevante, por ejemplo, para desarrolladores, administradores de propiedades, responsables patrimoniales e inmobiliarias. El encaje depende de la necesidad y del contexto de cada caso.

**Objeción que resuelve:** «¿Esto se aplica a mi organización?». **Por qué se incluye:** traduce la especialización a situaciones concretas sin excluir organizaciones maduras ni prometer cobertura universal.

### 2. ¿Es necesario tener una solución definida antes de contactar?

No. Podés compartir una necesidad, una dificultad o una oportunidad, aunque todavía no esté definida la forma de abordarla. La conversación inicial permite entender el contexto y evaluar si tiene sentido explorar una intervención.

**Objeción que resuelve:** «Todavía no sé qué pedir». **Por qué se incluye:** reduce una barrera temprana para decisores y evita imponer una solución tecnológica previa.

### 3. ¿Se puede consultar tanto por un producto como por una necesidad específica?

Sí. Podés consultar por las iniciativas presentadas en el portfolio o plantear una necesidad particular. Cada producto o proyecto debe evaluarse según su estado; una iniciativa proyectada no implica un producto disponible. Una intervención específica se considera de acuerdo con su alcance y contexto.

**Objeción que resuelve:** «¿Debo elegir una solución estándar o un desarrollo a medida?». **Por qué se incluye:** explica los recorridos comerciales sin convertir iniciativas proyectadas en una oferta disponible.

**Variante completa si el portfolio no está publicado:**

**¿Puedo consultar por una necesidad específica o por una iniciativa futura?**

Sí. Podés plantear una necesidad particular o consultar por iniciativas futuras vinculadas al negocio inmobiliario. La posibilidad de avanzar depende del contexto y del estado real de cada iniciativa; una idea o producto proyectado no implica disponibilidad.

### 4. ¿Es posible trabajar con sistemas y herramientas que ya utiliza la organización?

Las posibilidades se evalúan según las herramientas involucradas, sus capacidades y la información que se necesite compartir. Una intervención puede considerar los sistemas existentes; su integración y alcance requieren análisis para cada caso.

**Objeción que resuelve:** «¿Debo reemplazar lo que ya tengo?». **Por qué se incluye:** aborda el costo de cambio percibido sin garantizar compatibilidad ni integración.

### 5. ¿La primera conversación implica contratar un diagnóstico?

No. El contacto inicial permite presentar el contexto y explorar si existe una oportunidad de trabajo. Un diagnóstico estratégico podría ser una instancia consultiva posterior; sus condiciones y alcance se definirían por separado si correspondiera.

**Objeción que resuelve:** «¿Contactar me compromete a una intervención definida?». **Por qué se incluye:** distingue el contacto general de una posible instancia posterior sin prometer condiciones aún no aprobadas.

### 6. ¿Puedo proponer una colaboración u oportunidad empresarial?

Sí. El canal de contacto también está abierto a propuestas de colaboración y oportunidades vinculadas al negocio inmobiliario. Cada iniciativa se evalúa según su contexto y la posible complementariedad entre las partes.

**Objeción que resuelve:** «¿El contacto es solo para contratar un proyecto?». **Por qué se incluye:** habilita el recorrido estratégico sin atribuir asociaciones existentes o prometer participación.

## D. Alternativas

1. Introducción más directa: **«Información para dar el primer paso.»** Reduce extensión, aunque explica menos el propósito comercial que la recomendada.
2. Pregunta 1: **«¿Con qué organizaciones trabaja TALAVERA?»** Es más concisa; la formulación recomendada evita sugerir relaciones ya acreditadas con todas las categorías citadas.
3. Pregunta 5: **«¿Qué ocurre después de iniciar una conversación?»** Es más amplia, pero puede inducir a describir procesos y compromisos aún no definidos; se recomienda conservar la pregunta explícita sobre diagnóstico.

## E. Justificación

El orden acompaña el razonamiento de un decisor: relevancia, preparación necesaria, elección de recorrido, continuidad de herramientas, compromiso inicial y posibilidad de colaboración. Las respuestas agregan claridad comercial a las afirmaciones del hero y las capacidades sin repetir el portfolio. La voz es institucional, directa y compatible con una firma unipersonal.

## F. Dependencias

- El hero define identidad y especialización; Capacidades explica las tres dimensiones. La FAQ no debe transformarse en un segundo catálogo de servicios.
- Portfolio debe mostrar estados verificables; si no se publica ninguna iniciativa, adaptar la referencia al portfolio para no señalar contenido inexistente.
- El CTA aprobado «Iniciar conversación» debe abrir contacto general; la pregunta 5 depende de que el modal no prometa ni imponga diagnóstico.
- El alcance de cualquier integración, producto o colaboración se evalúa individualmente. Las condiciones de diagnóstico permanecen sin definir.

## G. Impacto estructural

Se pueden conservar el título, la estructura de acordeones y la disposición adaptable. Sustituir las seis entradas y la introducción cuando se apruebe el copy; no hace falta ampliar la cantidad de elementos. Mantener preguntas y respuestas asociadas, comprobando legibilidad, accesibilidad y longitud en móvil durante la implementación posterior. No se modifica el componente en esta fase.

## H. Restricciones de publicación

Verificar que el canal general funcione y que la disponibilidad y estados del portfolio coincidan con la respuesta 3. No atribuir precio, plazo, entregables, gratuidad, garantía, integración efectiva ni condiciones de diagnóstico no aprobadas. Revisar el texto si una oferta o proceso comercial se define con posterioridad.

## I. Decisiones para validación humana

1. Aprobar las seis preguntas, sus respuestas y el orden recomendado.
2. Aprobar la introducción y el nivel de explicitud de la pregunta sobre diagnóstico.
3. Confirmar la referencia al portfolio cuando existan iniciativas publicables; si no, aprobar su adaptación al estado real.
