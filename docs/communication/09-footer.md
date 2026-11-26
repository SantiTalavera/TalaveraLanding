> **Registro historico, sustituido:** este documento conserva propuestas y observaciones anteriores, no la especificacion vigente. Consultar [decisiones aprobadas](12-decisions-pending.md), [auditoria](10-editorial-audit.md) y [preparacion de publicacion](../implementation/release-readiness.md).

# Footer — propuesta editorial

**Estado:** propuesta pendiente de aprobación humana. Fuente doctrinal: [Tesis de la marca, §§ 6, 7 y 8.1](https://app.notion.com/p/41cbac03703980bb8cc3e18250644c4f).

## A. Función estratégica

Ofrecer continuidad institucional y navegación secundaria al final del recorrido, con acceso al contacto general y a destinos existentes. Reafirmar la especialización de TALAVERA sin repetir el argumento de cierre ni sugerir una estructura empresarial mayor.

## B. Auditoría del contenido existente

`Footer.jsx` muestra el logotipo, el descriptor «Real Estate Systems» y «Sistemas para aportar estructura y claridad a operaciones complejas en real estate.». El texto reduce el campo a operaciones existentes y no explicita ingeniería de sistemas. Renderiza cuatro categorías provenientes de datos: Legales, Productos, Recursos y Soporte; construye la columna Productos a partir de `products` activos con destino y coloca el botón «Contacto» dentro de Soporte, conectado al diálogo de diagnóstico.

En demostración los enlaces legales, recursos, soporte y redes apuntan a rutas `#demo/...`; los productos son ficticios. En producción las listas de enlaces y redes están vacías; existe un registro HOA activo sin destino, que no acredita oferta disponible. No hay que trasladar esas iniciativas anteriores a la navegación pública. La cuadrícula actual tiene cuatro columnas y dos en móvil; la marca ocupa una columna aparte y su párrafo admite hasta 19 rem. Puede renderizar categorías vacías. El header aprobado —Capacidades, Portfolio, Perspectivas y Firma— todavía difiere de lo implementado.

## C. Propuesta recomendada

**Marca:** TALAVERA  
**Descriptor:** Real Estate Systems  
**Copy institucional:** Ingeniería de sistemas aplicada al negocio inmobiliario.

**Categorías y destinos:**

| Categoría | Enlace visible recomendado | Destino y condición |
| --- | --- | --- |
| Capacidades | Capacidades | Sección institucional de la página principal cuando esté implementada y accesible. |
| Portfolio | Productos y proyectos | Sección de portfolio únicamente si hay contenido publicable; cada iniciativa puede enlazarse por separado cuando su destino y publicación estén habilitados. |
| Perspectivas | Publicaciones | Publicaciones reales y accesibles; ocultar la categoría mientras no existan. |
| Firma | Sobre TALAVERA; Enfoque; Colaboraciones | Solo páginas o secciones con contenido real, suficiente y accesible. No crear destinos vacíos. |
| Firma | Contacto | Abrir el mecanismo general de contacto cuando exista y esté habilitado; permite necesidades, iniciativas y colaboraciones sin presuponer diagnóstico. |
| Soporte | Soporte de producto | Mostrar únicamente para un producto activo con canal específico disponible; no usar el contacto comercial como sustituto automático. |
| Legales | Términos y condiciones; Política de privacidad | Solo documentos vigentes, aplicables y accesibles, una vez revisados y habilitados. No dar a entender que existen por figurar aquí. |

**Redes sociales:** enlaces identificados por nombre —por ejemplo, LinkedIn, Instagram, X o TikTok— únicamente a perfiles oficiales existentes y verificados; ocultar el bloque si no hay destinos habilitados. La selección depende de los canales efectivamente activos, no de su mención estratégica.

**Franja inferior:** `© [año] TALAVERA. Todos los derechos reservados.` La representación y actualización del año se resolverán durante implementación; no constituye una afirmación adicional sobre forma jurídica. Mantener el descriptor solo si aporta claridad y no duplica innecesariamente la marca.

## D. Alternativas

1. **Copy:** «Ingeniería y conocimiento sectorial para el negocio inmobiliario.» Añade conocimiento sectorial pero hace menos explícita la disciplina de sistemas; se prefiere la opción recomendada.
2. **Copy:** «Sistemas y estrategia para negocios inmobiliarios.» Es breve, pero «estrategia» podría comunicar una oferta no delimitada y no explica que la ingeniería es de sistemas.
3. **Navegación compacta:** agrupar destinos secundarios bajo «Explorar» y «Firma» si hay pocos enlaces habilitados. Ahorra espacio, aunque pierde correspondencia directa con las categorías aprobadas; no reemplaza los rótulos del header.

## E. Justificación

Una línea institucional breve retoma la disciplina y el sector sin convertir el footer en otro hero. Las categorías siguen la navegación aprobada y se habilitan progresivamente. Separar contacto comercial y soporte preserva expectativas: una consulta empresarial no es automáticamente una solicitud de ayuda de producto, ni un diagnóstico contratado.

## F. Dependencias

- Capacidades y su destino aún deben implementarse en una fase posterior; Portfolio depende de estados y permisos, y Perspectivas de publicaciones reales.
- El CTA «Iniciar conversación» y el enlace «Contacto» deben llegar al mismo mecanismo general cuando esté operativo; el texto y los estados del modal dependen del medio de recepción elegido.
- Legales y soporte dependen de contenido y canales realmente habilitados; ninguna de las etiquetas propuestas habilita su publicación por sí sola.
- El título público de Portfolio puede ser «Productos y proyectos», mientras la categoría de navegación aprobada permanece «Portfolio».

## G. Impacto estructural

Se pueden conservar logotipo, descriptor, área social y franja inferior. Será necesario sustituir la fuente y clasificación de enlaces, permitir categorías variables y ocultar las vacías, desvincular contacto general de Soporte y reemplazar el destino de diagnóstico por el contacto comercial. La cuadrícula de cuatro columnas y dos en móvil deberá adaptarse al número real de grupos y revisarse visualmente; categorías adicionales no implican que deban mostrarse simultáneamente. No implementar cambios en esta fase.

## H. Restricciones de publicación

- Verificar cada destino, contenido y autorización antes de mostrar el enlace; retirar rutas `#demo/...` y productos ficticios.
- No publicar centro de soporte ficticio ni enlaces a productos proyectados como disponibles.
- Confirmar perfiles oficiales y destinos reales antes de mostrar redes. Ocultar categorías completas sin enlaces habilitados.
- Habilitar legales únicamente con contenido aplicable y vigente; su necesidad y alcance deben revisarse antes de publicar.
- El contacto debe describir y ejecutar el mecanismo real. Si solo prepara un correo, no afirmar recepción ni envío.

## I. Decisiones para validación humana

1. Aprobar el copy institucional y su relación con el descriptor.
2. Aprobar los grupos y destinos propuestos, con habilitación progresiva según su existencia.
3. Aprobar la ubicación de Contacto en Firma y la presentación separada de Soporte cuando corresponda.
4. Validar qué perfiles, documentos legales y canales de soporte se mostrarán una vez existan y estén verificados.
