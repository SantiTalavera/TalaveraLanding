# Auditoría editorial integral

**Estado:** revisión independiente de propuestas, no aprobación humana ni autorización de publicación. Alcance: documentos 00–09, las restricciones y el estado del prototipo consignados en ellos, contrastados con la [tesis rectora](https://app.notion.com/p/41cbac03703980bb8cc3e18250644c4f). No se ha comprobado visualmente en navegador la composición futura ni se han acreditado permisos o capacidades comerciales. Esta revisión no habilita la publicación.

**Integración posterior:** se incorporaron en 06 y 11 una variante completa de FAQ sin portfolio, y en 08 y 11 las correcciones de voz y del texto de `mailto:` observadas abajo. Se conservan los hallazgos como registro de la revisión; los textos ajustados siguen pendientes de aprobación humana.

## Resultado doctrinal

| Criterio | Evaluación | Evidencia o límite |
| --- | --- | --- |
| Identidad y especialización | Conforme en la propuesta | Hero [02](02-hero.md) dice «ingeniería de sistemas» y «negocio inmobiliario»; se evita atribuir una estructura plural. |
| Enfoques A y B | Conforme con cautela | La firma de ingeniería es la identidad actual; [04](04-capabilities.md) abre oportunidades y colaboración como exploración, sin presentar el horizonte como realizado. El software no agota la oferta. |
| Audiencia y modalidades | Conforme | Las tres dimensiones en [04](04-capabilities.md), las iniciativas clasificadas en [05](05-portfolio.md) y la FAQ en [06](06-faq.md) atienden a decisores y distinguen intervenciones, productos proyectados y colaboración. Cada capacidad concreta debe verificarse antes de publicarla. |
| Jerarquía y redundancia | Conforme con observación | Hero establece disciplina y sector; capacidades explica finalidades; portfolio aporta manifestaciones condicionadas; FAQ resuelve objeciones; cierre invita a compartir contexto. El footer reitera la identidad de forma breve. La introducción de capacidades fue abreviada para evitar repetir el hero. |
| Terminología | Conforme con observación | «Capacidades», «Portfolio», «Perspectivas» y «Firma» se mantienen como categorías aprobadas; «Productos y proyectos» se propone como título visible del portfolio, no sustituye el menú. La voz impersonal y el uso de «sector inmobiliario» son recomendaciones pendientes. |
| CTA y diagnóstico | Conforme en la propuesta | «Iniciar conversación» es el CTA aprobado de hero y cierre; [08](08-contact-modal.md) admite tres intenciones y no exige diagnóstico. El código actual aún usa «Diagnóstico estratégico» y no coincide con esta arquitectura. |
| Estados del portfolio | Conforme sujeto a verificación | [05](05-portfolio.md) distingue producto proyectado no disponible, simulación aplicada y proyecto colaborativo; no los presenta respectivamente como producto activo, CRM, automatización ni propiedad exclusiva o HOA integral. Permisos, material y estado adicional continúan sin comprobar. |
| Afirmaciones y relaciones | Conforme sujeto a evidencia | No se inventan métricas ni clientes. [03](03-organizations.md) propone ocultar organizaciones sin evidencia y autorización suficientes. Las descripciones de proyectos y alcances requieren verificación y permiso antes de publicación. |
| Destinos | Condicionado | Se omiten enlaces ficticios; Capacidades, portfolio, publicaciones y landings individuales requieren contenido real y accesible. El portfolio puede estar oculto: hay que adaptar los textos que remiten a él. |
| Composición y accesibilidad | Pendiente de validación práctica | Hero, carrusel, FAQ, modal y footer se analizaron según sus restricciones actuales, no mediante pruebas de composición futuras. Capacidades no existe; faltan validación móvil y revisión de flujo, foco, anclajes y legibilidad. |

## Bloqueantes para publicar

Estos puntos **no bloquean la entrega de propuestas editoriales**. Sí impiden tratar el prototipo o este copy como listo para producción:

1. **Aprobación y concordancia de implementación.** El copy nuevo sigue pendiente de aprobación. El header implementado utiliza categorías anteriores y CTA de diagnóstico; falta Capacidades y el modal actual no es el contacto general propuesto. La implementación futura debe reflejar las decisiones aprobadas y el copy validado, sin inferir que ya está hecha. Ver [01](01-header-approved.md), [04](04-capabilities.md) y [08](08-contact-modal.md).
2. **Evidencia y autorización.** No publicar la cinta con relaciones no acreditadas ni las iniciativas, nombres, marcas o activos de terceros sin verificar alcance y permisos. Anonimizar no sustituye automáticamente el permiso. El producto de propiedades sigue proyectado y no disponible; no comunicar resultados esperados como conseguidos. Ocultar cada elemento no habilitado. Ver [03](03-organizations.md) y [05](05-portfolio.md).
3. **Contacto y veracidad del estado.** El modal demostrativo no envía ni guarda. El `mailto:` actual solo solicita la apertura del cliente de correo: no confirma apertura, envío ni recepción. Hay que elegir y verificar un mecanismo real, su configuración y sus mensajes; no mostrar éxito de recepción salvo confirmación fiable. Ver [08](08-contact-modal.md).
4. **Destinos y material de muestra.** Retirar referencias y rutas `#demo/`, logotipos y catálogo ficticios de la versión pública. No habilitar páginas, soporte, redes, legales ni enlaces de productos que no existan y no estén verificados; el registro HOA «active» sin destino en producción no acredita disponibilidad. Eliminar o adaptar también los CTA hacia un portfolio oculto. Ver [00](00-context.md), [05](05-portfolio.md) y [09](09-footer.md).
5. **Revisión de composición y privacidad.** Validar en una futura implementación lectura y accesibilidad para móvil y escritorio, especialmente sección nueva, carrusel, foco y desplazamiento del modal. Verificar con el responsable el tratamiento de datos y la información de privacidad aplicable al canal elegido. La necesidad y contenido legal no quedan resueltos por esta auditoría.

## Observaciones relevantes

1. **Portfolio ausente y FAQ.** La respuesta 3 de [06](06-faq.md) remite a iniciativas del portfolio aunque podría no haber material publicable. Al integrar el copy, incluir una versión explícita sin ese destino: «Sí. Podés consultar por un producto o proyecto, o plantear una necesidad particular. Cada iniciativa debe evaluarse según su estado; una iniciativa proyectada no implica un producto disponible. Una intervención específica se considera de acuerdo con su alcance y contexto». Ocultar el CTA «Explorar portfolio» si la sección no está habilitada.
2. **Lenguaje del formulario.** En [08](08-contact-modal.md), «Usá un correo en el que podamos contactarte» puede sugerir una estructura plural; se recomienda «Usá un correo donde puedas recibir una respuesta». En la ayuda de `mailto:`, «Se preparará una solicitud» puede sugerir un resultado no comprobable; más preciso: «Se intentará abrir tu aplicación de correo con la consulta. Revisala y enviala desde allí». El estado posterior debe mantener la salvedad de que la apertura y el envío no se comprueban. Son propuestas editoriales pendientes de validación, no cambios funcionales.
3. **Claridad del portfolio y destinos.** Si se habilita contacto por una iniciativa, dejar explícito que el canal es general y que la preselección es una funcionalidad futura; si el canal no funciona, ocultar el CTA. El título «Productos y proyectos» y el rótulo de navegación «Portfolio» son compatibles, pero requieren anclaje coherente al implementarse.
4. **Evidencia y ausencia de cinta.** Si no hay relaciones publicables, pasar directamente de hero a capacidades; no rellenar el espacio con logos ficticios. Una organización sin URL verificable no necesita un enlace inventado. Los nombres Keymex y CCLF solo podrán acompañar sus iniciativas con autorización aplicable.
5. **Voz y formulaciones.** El uso de «vos» para dirigirse al visitante es compatible con una voz institucional unipersonal; evitar primera persona plural que pueda insinuar un equipo. «Real Estate Systems» es descriptor aprobado; la preferencia por «sector inmobiliario» en el cuerpo debe validarse como elección editorial, sin reabrir el descriptor.
6. **Límites del producto y de la simulación.** La descripción de propiedades evita funciones y fecha concretas; conservar «proyectado / no disponible». La simulación describe modelización de consultas y atención inicial sin atribuir mejoras demostradas, automatización o CRM; el proyecto de lotes identifica colaboración y no promete exclusividad ni un sistema HOA integral.

## Mejoras opcionales

- Verificar si el copy del footer, similar al headline, cumple su función de identificación breve o si conviene la alternativa de [09](09-footer.md); la repetición institucional en el cierre de navegación no constituye por sí misma una contradicción.
- Evaluar si el CTA contextual de cada iniciativa aporta valor frente a omitirlo, según exista un canal real y la iniciativa pueda comunicarse; no crear una landing para justificar el enlace.
- Comprobar los saltos de línea del hero y del cierre en la futura maqueta, y reducir texto solo si la lectura visual lo exige. No hay evidencia de incompatibilidad visual ni de ajuste perfecto antes de esa prueba.

## Dictamen de revisión

Las propuestas forman una narrativa coherente con los fundamentos recibidos, con las observaciones anteriores y sin acreditar hechos comerciales por sí mismas. La matriz de decisiones y el documento consolidado deben recoger las adaptaciones condicionales y conservar todos los textos nuevos en estado **pendiente de aprobación humana**. La revisión editorial no sustituye la validación de capacidades, derechos, canal, contenido legal o experiencia implementada.
