# Preparación para publicación — TALAVERA

**Publicación no acreditada ni autorizada por este documento.** Fuente editorial: [Tesis §§ 8–9](https://app.notion.com/p/41cbac03703980bb8cc3e18250644c4f), [D01–D19](../communication/12-decisions-pending.md) y [AUD-01–06](../communication/10-editorial-audit.md). El repositorio es público: conservar pruebas sensibles, permisos y datos de consultas fuera de él.

## Condiciones y responsables

Los responsables son roles propuestos, no asignaciones confirmadas. El responsable de lanzamiento debe confirmar personas, evidencia, fecha y decisión.

| Condición | Responsable propuesto | Evidencia necesaria y consecuencia |
| --- | --- | --- |
| Portfolio y organizaciones | Marca/comercial y titular de derechos | Verificar relación, alcance, estado, activos y permisos específicos; ocultar ficha o cinta sin respaldo. Anonimizar no reemplaza permisos. |
| Separación demo/producción | Responsable técnico | Verificar configuración real y exclusión por defecto de contenido, rutas y formularios ficticios; bloquear lanzamiento ante exposición. |
| Recepción comercial | Técnico y operación comercial | Probar validación, persistencia, confirmación, deduplicación, protección y notificaciones recuperables. Un fallo de notificación no debe borrar la consulta ni indicar falsamente que no se recibió. Bloquea lanzamiento comercial. |
| Privacidad y datos | Privacidad/legal y técnico | Política vigente y accesible, tratamiento, conservación, acceso y seguridad revisados; necesaria antes de recibir datos públicos. Revisar términos y cookies según tecnologías y obligaciones aplicables. |
| Destinos y perfiles | Responsable de contenido | Comprobar enlaces, perfiles oficiales y contenido real; ocultar destinos inexistentes y soporte no disponible. |
| QA de integración | Técnico y marca | Registrar versión probada y resultados de funcionalidad, accesibilidad, responsive, navegación, coherencia editorial y seguridad; corregir bloqueos. |
| Decisión final | Responsable de publicación designado | Revisar evidencias y autorizar expresamente el lanzamiento; este archivo no constituye autorización. |

Landings especializadas, publicaciones de Perspectivas, CRM completo y definición comercial del diagnóstico no bloquean por sí solos: ocultar destinos no disponibles. El diagnóstico es una posible etapa posterior, no una promesa del contacto.

## Evidencia de esta revisión

- El 25-11-2026 se consultó Notion §§ 8–9 y GitHub informó visibilidad pública. La aprobación de Notion es editorial y de criterios, no técnica ni comercial.
- Se leyó el componente de organizaciones: contiene el título excepcional y un complemento; esto prueba presencia en fuente, no renderizado, permisos ni aprobación del complemento.
- La implementación posterior incorpora contexto editable del portfolio y filtros de visibilidad; la recepción real sigue deshabilitada. Las URL externas de organizaciones y landings se restringen a HTTPS sin credenciales.
- En la revisión de integración se ejecutaron `npm.cmd run test` (3 pruebas aprobadas), `npm.cmd run lint` y `npm.cmd run build` (aprobados).
- El agente funcional informó comprobación del modal contextual editable y de la vista de producción sin secciones ni formulario demo. Las cuatro combinaciones de secciones se ejercitaron en pruebas unitarias de la política; solo ambas visibles y ninguna fueron observadas en navegador.
- No se completó la auditoría visual y de interacción en escritorio, tablet y móvil, ambos temas, las cuatro combinaciones y movimiento reducido; tampoco se certificaron accesibilidad integral, seguridad ni recepción real. No interpretar las pruebas unitarias como validación responsive.
- El usuario confirmó posteriormente la dirección fotográfica y el modo fijo. Verificar los derechos, origen y condiciones de uso de las fotografías y su resultado integrado antes de publicar; el trabajo del otro agente queda fuera de esta revisión.
- En una prueba móvil de 390 × 844 se navegó a cada una de las tres dimensiones de Capacidades: cada tarjeta recibió el foco y quedó visible debajo del encabezado, sin desbordamiento horizontal de la página. La cobertura de otras resoluciones sigue pendiente.
- Con la configuración de demostración actual se navegó a Simulación de atención comercial y se comprobó que el formulario abre con «Producto o proyecto» y el identificador de esa iniciativa, y muestra el aviso de simulación. En móvil se comprobó que Ingeniería y tecnología recibe el foco y queda bajo el encabezado.

## Estado de avance

| Clasificación | Estado y siguiente acción |
| --- | --- |
| Resuelto | La documentación editorial identifica Notion como autoridad y conserva la excepción posterior del título de Organizaciones. |
| Bloqueante de publicación | Recepción comercial, privacidad, autorizaciones de relaciones y portfolio, y validación integral de integración siguen pendientes según los responsables y evidencias anteriores. |
| Requiere decisión humana | Designar responsables, aprobar evidencia de derechos y decidir la publicación una vez cerradas las condiciones. |
| Pendiente de implementación posterior | Backend comercial, persistencia y notificaciones, expresamente fuera de este alcance. |
| Mejora opcional | Analizar el peso y la carga de las fotografías tras validar necesidades de rendimiento. |

La preparación técnica para contenido definitivo y la siguiente fase comercial permanece condicionada a completar la auditoría de integración. La landing no está lista ni autorizada para publicarse.
