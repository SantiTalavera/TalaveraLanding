# Hero — propuesta editorial

**Estado:** propuesta pendiente de aprobación humana. Fuente doctrinal: [Tesis de la marca](https://app.notion.com/p/41cbac03703980bb8cc3e18250644c4f), secciones 1–3, 7 y 8.

## A. Función estratégica

Presentar de inmediato qué es TALAVERA, desde qué disciplina interviene y en qué sector. El valor inicial debe abrir el recorrido hacia capacidades y portfolio, sin presentar el horizonte empresarial como una realidad consolidada ni enumerar servicios.

## B. Auditoría del contenido existente

En `app/src/components/Hero/Hero.jsx` aparecen:

- **Titular:** «Sistemas para operaciones complejas en real estate.»
- **Complemento:** «Diseño e implemento sistemas que aportan estructura, control y trazabilidad a operaciones inmobiliarias de alto valor.»
- **Botón:** «Diagnóstico estratégico».

La formulación centra la marca en operaciones existentes y sistemas, y no identifica expresamente la ingeniería de sistemas. Reduce la apertura hacia nuevas capacidades y oportunidades. El botón contradice la decisión aprobada de contacto general: el diagnóstico podría ser una instancia posterior.

La composición actual es centrada: titular de hasta 65 rem, tamaño adaptable de 2,25 a 4,8 rem y párrafo de hasta 43 rem. El espacio visual reservado ocupa hasta 26 rem de ancho y entre 8 y 15 rem de alto; en móvil su altura es 7 rem. No existe actualmente una escena Three.js. La adaptación tipográfica y los saltos de línea deben verificarse en distintos anchos antes de implementar.

## C. Propuesta recomendada

**Headline institucional**

> Ingeniería de sistemas para el negocio inmobiliario.

**Texto complementario**

> TALAVERA aplica ingeniería y conocimiento del sector para comprender negocios, estructurar operaciones y desarrollar nuevas capacidades.

**CTA principal**

> Iniciar conversación

**Destino previsto:** modal de contacto comercial general; no presupone diagnóstico, reunión ni entregable.

## D. Alternativas

1. **«Ingeniería de sistemas aplicada al sector inmobiliario.»** Prioriza la identificación de disciplina e industria con formulación directa; comunica menos explícitamente el objeto empresarial que la recomendada.
2. **«Ingeniería de sistemas para desarrollar negocios inmobiliarios.»** Enfatiza creación y evolución; podría percibirse como una promesa de resultado o como desarrollo inmobiliario ya consolidado, por lo que requiere un complemento especialmente preciso.
3. **«Comprender, estructurar y desarrollar el negocio inmobiliario.»** Traduce los verbos de la tesis a un mensaje de valor; obliga a que el texto complementario identifique con claridad la ingeniería de sistemas y la identidad actual.

## E. Justificación

La opción recomendada nombra la disciplina completa —evitando confusión con ingeniería civil— y la vincula con el negocio inmobiliario, no solo con software o con una etapa operativa. El complemento introduce comprensión, estructura y desarrollo como intención de intervención, sin presentar resultados como hechos ni afirmar que el horizonte de desarrollo empresarial ya se materializó. La tercera persona es compatible con la estructura unipersonal y orienta el mensaje a decisores no técnicos.

## F. Dependencias

- **Capacidades:** desarrollar allí las tres dimensiones de intervención y sus consecuencias empresariales, sin repetir el titular ni enumerarlas exhaustivamente en el hero.
- **Portfolio:** aportar evidencia y estados verificables; el hero no debe sugerir trayectoria, resultados o clientes que no estén acreditados.
- **Header y modal:** conservar el CTA aprobado y abrir el contacto general, diferenciado del posible diagnóstico posterior.
- **Voz:** la tercera persona y «sector inmobiliario» son recomendaciones de copy pendientes de validación transversal; se conserva el descriptor oficial «Real Estate Systems» en la marca.

## G. Impacto estructural

Pueden conservarse el `h1`, el párrafo, el botón y el espacio visual existentes. La sustitución futura del texto y del comportamiento del botón requiere implementación posterior aprobada; no se propone cambiar ni desarrollar la escena. La longitud es orientativa y su ajuste visual aún no fue probado en navegador.

## H. Restricciones de publicación

El prototipo es privado. Antes de publicar, verificar que el destino del CTA funcione como contacto general y que el mecanismo de recepción sea real y esté identificado con precisión. Revisar accesibilidad y composición en escritorio y móvil; no atribuir al espacio visual una escena implementada.

## I. Decisiones para validación humana

1. Aprobar el headline recomendado o elegir una alternativa.
2. Aprobar el texto complementario y la voz institucional propuesta.

El texto «Iniciar conversación» ya está aprobado; no se solicita volver a decidirlo.
