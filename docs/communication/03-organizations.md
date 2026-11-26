# Organizaciones — excepción posterior y registro histórico

La instrucción posterior de cierre establece el título «El valor se construye en conjunto» como excepción al título aprobado en D05 de Notion. El componente actual contiene además «Relaciones que conectan conocimiento, ingeniería y nuevas oportunidades de desarrollo»; se registra como texto observado en código, sin evidencia independiente de aprobación editorial. Esta excepción no modifica D04 ni los requisitos de clasificación inequívoca, evidencia y autorización de cada relación. La presencia en código no prueba renderizado ni publicación segura.

> **Archivo histórico:** el contenido siguiente documenta una propuesta anterior sustituida donde contradice la tesis o la excepción indicada. No usarlo como especificación vigente. Ver [decisiones](12-decisions-pending.md).

**Estado:** propuesta pendiente de aprobación humana. La recomendación de publicación es mantener esta sección oculta hasta verificar las relaciones y las condiciones indicadas. Fuente doctrinal: [Tesis de la marca, §§ 7.2 y 7.5](https://app.notion.com/p/41cbac03703980bb8cc3e18250644c4f).

## A. Función estratégica

Aportar legitimidad contextual mediante relaciones empresariales verificables, después de que el hero presente la identidad y antes de que Capacidades explique las formas de intervención. La sección es complementaria: su ausencia no impide comprender la propuesta. Un logotipo aislado no demuestra un resultado, una contratación ni una asociación.

## B. Auditoría del contenido existente

- `ClientsMarquee.jsx` no muestra título contextual y asigna a toda la sección la etiqueta accesible «Clientes». Filtra organizaciones por presencia de logotipo y URL; representa enlaces y duplica visualmente el conjunto para la animación.
- En `mock/content.js` hay diez nombres y logotipos de muestra con rutas `#demo/organizaciones/...`. Son datos ficticios de demostración: no acreditan relaciones comerciales ni autorización. `DEMO_MODE` está activo.
- `production.js` contiene `clients = []`, por lo que el componente no muestra la cinta en producción. La ausencia de registros no prueba que no existan relaciones; solo indica que no están incorporadas allí.
- La cinta animada admite logotipos de hasta 10 × 4 rem por enlace, un grupo de ancho mínimo de pantalla y espaciado amplio; tiene 20 rem de padding superior. Hay que revisar el vacío espacial si se oculta o reduce. La animación tiene alternativa para movimiento reducido. No hay soporte visible para una clasificación por relación.
- «Clientes» induciría a error si la cinta mezclara clientes, colaboradores u otras relaciones. Requerir una URL para cada logotipo tampoco es equivalente a contar con permiso ni evidencia.

## C. Propuesta recomendada

**Estado inicial de publicación:** no mostrar sección ni título mientras no haya evidencia suficiente, autorización y clasificación comprobada. No sustituir los logotipos ficticios por nombres inferidos de proyectos.

**Si se habilita con un conjunto homogéneo de clientes acreditados:**

- Título contextual: **Organizaciones que confiaron en TALAVERA**.
- Elementos: nombre y logotipo autorizado de cada organización, acompañado cuando corresponda por un enlace público verificado. El título se usa solo si cada relación supone efectivamente una contratación o confianza profesional documentada y publicable; por sí solo no implica resultados.
- Etiqueta accesible de la región: **Organizaciones que confiaron en TALAVERA**.

**Si se habilitan relaciones de distinta naturaleza:** no reunirlas bajo el título anterior ni bajo «Clientes». Recomendar grupos con clasificación visible y constatada, por ejemplo **Clientes** y **Colaboraciones**, únicamente cuando los registros de cada grupo lo justifiquen. Si no puede comunicarse cada relación de forma clara, omitir la cinta o ese registro. No incluir nombres, logotipos ni grupos vacíos como relleno.

La sección no necesita texto introductorio ni CTA; su función es contextualizar, no competir con Capacidades o Portfolio.

## D. Alternativas

1. **«Organizaciones con las que TALAVERA ha colaborado»**: apta solo cuando todas las relaciones incluidas constituyan colaboraciones verificables y publicables; no es sinónimo universal de cliente ni de asociación empresarial.
2. **«Relaciones empresariales»**, con subtítulos visibles por tipo: permite reunir categorías diferentes si cada vínculo se explica correctamente; exige más estructura y evidencia, y un título genérico sin categorías podría resultar ambiguo.
3. **Sin título visible, con clasificación junto a cada organización**: reduce peso visual, pero exige etiquetas textuales inequívocas y una etiqueta accesible equivalente; una cinta de logotipos sola no permite distinguir relaciones.

## E. Justificación

La autoridad relacional puede complementar el posicionamiento de ingeniería inmobiliaria sin simular equipo, trayectoria, cartera ni resultados. El título recomendado hace explícito qué relación se comunica; las clasificaciones evitan atribuir una condición común inexistente. Capacidades explicará la intervención y Portfolio mostrará iniciativas verificadas: los logotipos no deben sustituir esa evidencia.

## F. Dependencias

- Hero presenta identidad; Capacidades continúa con las tres dimensiones de intervención. Si la cinta se oculta, el recorrido pasa directamente de uno a otra.
- Portfolio puede mencionar organizaciones únicamente dentro del alcance y los permisos específicos de cada iniciativa; no se infiere que esas organizaciones deban integrar esta cinta.
- La identidad de cada organización, tipo y período de relación, contexto de publicación, permisos y destino del enlace requieren comprobación independiente. No se cuenta aquí con documentación suficiente para afirmar que alguna relación concreta sea publicable.

## G. Impacto estructural

Puede conservarse la condición que oculta la sección sin registros, así como el comportamiento de movimiento reducido. La futura implementación requiere reemplazar la etiqueta accesible «Clientes» por una denominación coherente con los datos; incorporar título y, para relaciones heterogéneas, agrupaciones o etiquetas visibles. Una organización autorizada sin destino enlazable debe poder representarse sin enlace, en lugar de obligar una URL ficticia. Revisar el espacio y la composición al ocultar la cinta y cuando haya pocos elementos; no repetir logotipos para aparentar cantidad. La duplicación técnica de la animación no debe generar accesibilidad duplicada. Ningún cambio se implementa en esta fase.

## H. Restricciones de publicación

1. Verificar la existencia e identidad de cada organización y el tipo de relación que efectivamente mantuvo con TALAVERA; documentar el alcance de la afirmación.
2. Confirmar autorización para nombrarla y utilizar su marca en este contexto, junto con las condiciones aplicables de uso y presentación. La presencia en una maqueta no constituye permiso.
3. Verificar que el título, agrupación, enlace y cualquier descripción correspondan exactamente a la relación acreditada. No afirmar resultados o asociaciones a partir de un logotipo.
4. Retirar todos los activos y rutas demostrativos de la versión pública. Si la evidencia o autorización es insuficiente, ocultar el registro; si no queda un conjunto suficiente para que la cinta resulte significativa y legible, ocultar toda la sección. La suficiencia se determinará según el contexto, no mediante una cantidad inventada.
5. Comprobar accesibilidad, enlaces habilitados y composición en pantallas pequeñas; una organización sin URL verificable no debe dirigir a una ruta ficticia.

## I. Decisiones para validación humana

1. Aprobar mantener la sección oculta hasta contar con evidencia y autorizaciones suficientes.
2. Aprobar el título propuesto para un conjunto homogéneo de clientes acreditados, o elegir otra formulación según la naturaleza real de las relaciones.
3. Si hay relaciones heterogéneas publicables, aprobar su clasificación y la presentación agrupada o individual antes de habilitarlas.
