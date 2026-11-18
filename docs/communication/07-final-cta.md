# CTA final — propuesta editorial

**Estado:** propuesta pendiente de aprobación humana. Fuente: [Tesis de la marca](https://app.notion.com/p/41cbac03703980bb8cc3e18250644c4f), secciones 7 y 8.

## A. Función estratégica

Cerrar el recorrido ofreciendo un siguiente paso concreto: plantear una necesidad, consultar por una iniciativa o proponer una colaboración para explorar su posible encaje. El visitante no necesita formular una solución técnica ni aceptar un diagnóstico para iniciar el contacto.

## B. Auditoría del contenido existente

`app/src/components/CTAFinal/CTAFinal.jsx` contiene:

- **Etiqueta:** «Una conversación para avanzar».
- **Headline:** «La próxima mejora de tu operación comienza con una decisión.»
- **Complemento:** «Analicemos tu operación y las oportunidades de mejorar su estructura, trazabilidad y capacidad de crecimiento.»
- **Botón:** «Diagnóstico estratégico».

El cierre presupone una mejora operativa y un análisis como siguiente paso universal, cuando la conversación también puede referirse a productos o colaboraciones. El botón contradice el CTA de contacto general ya aprobado. La composición está centrada; el contenedor admite hasta 60 rem, el párrafo hasta 39 rem y el titular escala entre 2,1 y 4,1 rem. La adaptación final a móvil y escritorio requiere verificación visual.

## C. Propuesta recomendada

**Etiqueta introductoria:** Una conversación para avanzar

**Headline:** Una necesidad o una oportunidad puede ser el punto de partida.

**Texto complementario:** Compartí el contexto de tu iniciativa inmobiliaria para explorar si existe una forma de trabajar en ella, consultar por un producto o proyecto, o proponer una colaboración.

**CTA principal:** Iniciar conversación

**Destino previsto:** modal de contacto comercial general, con las tres intenciones previstas. El contacto no constituye por sí mismo una solicitud ni una contratación de diagnóstico.

## D. Alternativas

1. **Headline: «Conversemos sobre lo que tu negocio necesita desarrollar.»** Prioriza la necesidad empresarial; la referencia al negocio puede resultar menos natural para quien propone una colaboración entre organizaciones.
2. **Headline: «Toda iniciativa empieza por entender su contexto.»** Subraya el criterio de comprensión; es menos concreto respecto de la acción que se propone al visitante.
3. **Complemento alternativo:** «Contá qué necesitás resolver, qué iniciativa te interesa o qué oportunidad querés proponer. La conversación permite explorar posibles próximos pasos.» Enfatiza las tres vías con mayor claridad; desplaza la referencia inmobiliaria al contexto de las secciones anteriores.

## E. Justificación

El argumento es práctico: compartir contexto ayuda a evaluar si existe encaje y cuáles podrían ser los siguientes pasos. Acoge situaciones ya definidas y oportunidades abiertas, sin repetir el posicionamiento disciplinar del hero ni presentar un resultado, reunión, plazo o diagnóstico como garantizado. El tono directo es compatible con una firma unipersonal.

## F. Dependencias

- **Hero y capacidades:** establecen qué es TALAVERA y cómo puede intervenir; el cierre propone la acción, evitando volver a enumerar servicios.
- **Portfolio:** una consulta puede referirse a una iniciativa cuyo estado y autorización estén claramente indicados.
- **Modal:** debe admitir las tres intenciones, describir con precisión el mecanismo y no prometer respuesta ni prestaciones no aprobadas.
- **Header:** conservar el mismo CTA y el mismo destino general aprobados.

## G. Impacto estructural

Puede conservarse la estructura existente de etiqueta, `h2`, párrafo y botón. En una etapa posterior deberá cambiarse el texto y conectarse el botón al modal de contacto general efectivamente implementado. No se desarrolla interfaz ni funcionalidad en esta propuesta. Los saltos de línea y la altura deben validarse al implementar.

## H. Restricciones de publicación

No habilitar el CTA como contacto real hasta disponer de un mecanismo funcional cuyo comportamiento coincida con lo comunicado en el modal. No utilizar el resultado simulado del prototipo como prueba de envío. La landing continúa siendo privada y el copy pendiente de aprobación.

## I. Decisiones para validación humana

1. Aprobar el headline recomendado o una alternativa.
2. Aprobar el texto complementario y conservar o ajustar la etiqueta introductoria.

«Iniciar conversación» y su carácter de contacto general ya están aprobados; no se solicita reabrir esa decisión.
