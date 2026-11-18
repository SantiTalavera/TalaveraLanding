# Modal de contacto comercial — propuesta editorial

**Estado:** propuesta pendiente de aprobación humana. Fuente: [Tesis de la marca, §§ 4.4, 7.4 y 8.1](https://app.notion.com/p/41cbac03703980bb8cc3e18250644c4f). Los textos siguientes no describen funcionalidades ya implementadas salvo donde se indica.

## A. Función estratégica

Ofrecer una puerta de entrada común para consultar por una necesidad empresarial, una iniciativa del portfolio o una colaboración. Facilita contexto suficiente para valorar la consulta sin exigir que el visitante haya definido una solución. Una eventual instancia de diagnóstico se consideraría después, según el caso; el contacto no constituye diagnóstico ni lo compromete.

## B. Auditoría del contenido existente

El modal activo en `DEMO_MODE` es `DemoDiagnosticDialog.jsx`: muestra «Diagnóstico estratégico / Demostración», «Empecemos por la operación» y la aclaración de que no se envían ni guardan datos. Solicita nombre, correo, organización opcional, tipo de necesidad y descripción; al pulsar «Simular solicitud» limpia el formulario y confirma que no hubo envío ni almacenamiento. Sus opciones presuponen, entre otras cosas, producto existente y consultoría estratégica. Esta experiencia es demostrativa.

`DiagnosticDialog.jsx`, utilizado fuera del modo demo, solicita nombre, correo, organización opcional y contexto; el asunto aún dice «Diagnóstico estratégico». Usa `VITE_DIAGNOSTIC_EMAIL` para intentar abrir un enlace `mailto:`. Su estado preparado indica que, si existe un cliente configurado, el visitante puede revisar y enviar allí; no comprueba apertura, envío ni recepción. Si falta la dirección, informa indisponibilidad. Su botón actual «Enviar solicitud» puede crear una expectativa incorrecta. No hay aquí evidencia de un sistema de recepción real.

El panel existente tiene hasta 42 rem de ancho, altura máxima del viewport con scroll y dos columnas de campos a partir de 640 px. Una selección y ayudas adicionales requieren verificar extensión, desplazamiento, foco y lectura móvil en una etapa posterior. El header y cierre implementados todavía dicen «Diagnóstico estratégico», aunque el CTA aprobado es «Iniciar conversación».

## C. Propuesta recomendada

### Encabezado y expectativas

**Título:** Iniciar conversación

**Introducción:** Contá brevemente qué necesidad, iniciativa u oportunidad querés conversar. No necesitás tener una solución definida.

**Ayuda general:** Compartí solo la información necesaria para entender el contexto. No incluyas datos personales de terceros, información confidencial ni documentación sensible.

**Indicación de campos:** Todos los campos son obligatorios salvo que se indique «opcional».

### Campos

| Elemento | Condición | Placeholder u opciones | Ayuda visible y propósito |
| --- | --- | --- | --- |
| Nombre | Obligatorio | «Tu nombre» | Identificar a la persona de contacto. |
| Correo electrónico | Obligatorio | «nombre@organizacion.com» | «Usá un correo donde puedas recibir una respuesta.» Permite responder; no presupone correo corporativo. |
| Organización | Opcional | «Nombre de la organización» | Aporta contexto sin excluir iniciativas individuales. |
| Motivo de la consulta | Obligatorio; selección única | Opción inicial «Seleccioná una opción»; «Necesidad empresarial»; «Producto o proyecto»; «Colaboración u oportunidad estratégica». | «Elegí la opción que mejor describa tu consulta.» Orienta la conversación sin requerir un diagnóstico. |
| Contexto de la consulta | Obligatorio | «Describí brevemente tu contexto y qué te gustaría conversar.» | «Podés mencionar el objetivo, la iniciativa de interés o la oportunidad que identificaste.» Permite comprender relevancia y posible encaje. |

No se solicita presupuesto, facturación, cantidad de activos, cargo, teléfono ni información confidencial. El encaje comercial completo —capacidad de decisión, inversión, alcance e impacto— podrá explorarse posteriormente, sin inferirlo del formulario. Si una futura interacción desde el portfolio preselecciona «Producto o proyecto», debe permitir cambiar la opción y preservar la iniciativa seleccionada; tal comportamiento aún no existe.

### Validación propuesta

Mostrar el mensaje junto al campo correspondiente y conservar lo ingresado cuando falle la validación.

| Caso | Mensaje |
| --- | --- |
| Nombre vacío | «Ingresá tu nombre.» |
| Correo vacío | «Ingresá tu correo electrónico.» |
| Correo con formato inválido | «Ingresá un correo electrónico válido.» |
| Motivo sin seleccionar | «Seleccioná un motivo de consulta.» |
| Contexto vacío | «Contá brevemente el contexto de tu consulta.» |

La validación propuesta de correo solo verifica formato, no propiedad ni entrega. No definir límites de caracteres arbitrarios sin una decisión técnica posterior.

### Textos por mecanismo

**A. Demostración privada actual**

- Aviso antes de los campos: «Este formulario es una simulación: los datos no se envían ni se guardan.»
- CTA: «Simular consulta».
- Estado tras simular: «Simulación completada. No se envió ni almacenó ninguna consulta.»
- No presentar estados de entrega o recepción reales. El formulario actual se limpia al simular o cerrar; cualquier cambio de esa conducta requiere implementación posterior.

**B. Preparación de correo mediante `mailto:`**, si el canal está configurado y se aprueba ese mecanismo

- Ayuda previa al CTA: «Se intentará abrir tu aplicación de correo con la consulta. Revisala y enviala desde allí.»
- CTA: «Preparar correo».
- Estado después de solicitar la apertura: «Si tenés una aplicación de correo configurada, revisá y enviá la consulta desde allí.»
- Si falta configuración del canal: «El contacto por correo no está disponible en este momento.» Si se dispone de otro canal verificado, ofrecerlo; de lo contrario no inventarlo.
- El estado no confirma que se haya abierto la aplicación, enviado el correo ni recibido la consulta. Conservar lo escrito ante errores o una configuración ausente es una recomendación para la futura implementación, no una garantía del prototipo.

**C. Eventual recepción mediante backend**, solamente después de implementarlo y verificarlo

- CTA: «Enviar consulta».
- Durante la operación: «Enviando consulta…».
- Solo tras confirmación fiable del sistema de recepción: «Recibimos tu consulta. Gracias por escribir.»
- Ante una falla confirmada: «No se pudo enviar la consulta. Revisá tu conexión e intentá nuevamente.» Conservar los datos ingresados para reintentar.
- Si el resultado de la operación es incierto: «No pudimos confirmar si la consulta se recibió.» Ofrecer un canal alternativo únicamente si está verificado; no asegurar que falló ni recomendar reintentos automáticos que puedan duplicarla.

**Acción secundaria común:** «Cancelar». **Cierre accesible:** «Cerrar contacto».

El visitante puede esperar plantear su consulta y, con `mailto:`, revisar y enviar personalmente el correo. La recepción real y cualquier respuesta dependen del mecanismo habilitado; no se promete un diagnóstico gratuito, reunión, entregable ni plazo.

## D. Alternativas

1. **Título «Contanos tu consulta».** Enfatiza la acción; «Iniciar conversación» conserva correspondencia exacta con el CTA aprobado.
2. **Motivo opcional.** Reduce fricción, pero dificulta distinguir recorridos. Se recomienda obligatorio por su utilidad y porque solo ofrece tres opciones amplias.
3. **Sin organización.** Reduce aún más los datos solicitados, pero perdería contexto útil para evaluar la oportunidad. Se recomienda mantenerla opcional.

## E. Justificación

Las tres intenciones representan los recorridos empresarial, de portfolio y de colaboración, sin exigir que la consulta adopte una categoría técnica. El contexto libre permite identificar una necesidad u oportunidad sin pedir información sensible. Separar simulación, preparación de correo y recepción confirmada evita atribuir al prototipo capacidades que no tiene. La voz directa admite tanto necesidades operativas como oportunidades nuevas y es compatible con la estructura unipersonal.

## F. Dependencias

- Header y CTA final mantienen «Iniciar conversación» y deben abrir el contacto general, no el diagnóstico.
- El portfolio solo puede dirigir a una iniciativa publicable; sus estados deben ser explícitos, en especial el producto proyectado no disponible. La preselección es una mejora futura, no una capacidad existente.
- La definición de canal, dirección, infraestructura y eventual tratamiento de datos condiciona el texto realmente visible. Las condiciones de diagnóstico y de contratación siguen pendientes y no se incluyen como promesas.

## G. Impacto estructural

Puede conservarse la estructura modal, la cuadrícula, la gestión de foco y el área desplazable, sujetas a comprobación posterior. Se necesitarían cambios para reemplazar el enfoque de diagnóstico, alinear campos y selección entre modos, actualizar validaciones y configurar mensajes según mecanismo. Cualquier preselección desde portfolio o recepción mediante backend requiere funcionalidad adicional. Esta propuesta no implementa nada.

## H. Restricciones de publicación

No habilitar una experiencia que aparente recibir consultas sin un canal funcional y verificado. Confirmar la dirección y probar `mailto:` en los dispositivos y clientes admitidos antes de ofrecerlo; el comportamiento depende de la configuración del visitante. Un backend requiere una confirmación fiable para mostrar recepción y un tratamiento de errores adecuado. Verificar la información y enlaces de privacidad aplicables con el responsable antes de publicar. El modo demostración debe permanecer inequívocamente identificado y no constituir contacto real.

## I. Decisiones para validación humana

1. Aprobar título, introducción y lenguaje del contacto general.
2. Aprobar los campos obligatorios y opcionales, y las tres intenciones propuestas.
3. Elegir el mecanismo que se habilitará y aprobar sus textos y expectativas; confirmar el canal cuando corresponda.
4. Aprobar o descartar la preselección futura desde portfolio.
