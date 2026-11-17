# TALAVERA — prototipo privado

Aplicación React + Vite. Ejecutar `npm install` y `npm run dev` desde este directorio. La versión actual es un prototipo privado: no publicarla en producción.

## Modo demostración

`src/data/config.js` activa explícitamente `DEMO_MODE`. Los contenidos y enlaces ficticios están en `src/data/mock/content.js` y las imágenes provisionales en `src/assets/mock/`. Los destinos `#demo/...` abren vistas de demostración internas, sin páginas externas ni errores 404. Las organizaciones y productos de muestra no representan relaciones comerciales reales.

El diagnóstico es una simulación sin backend: no envía ni almacena los datos ingresados, y limpia los campos al simular o cerrar. El espacio del hero está reservado para una futura escena, sin Three.js.

Para preparar el lanzamiento: cambiar `DEMO_MODE` a `false`, completar `src/data/production.js` con datos y destinos verificados, configurar el canal de diagnóstico y retirar `src/data/mock/`, `src/assets/mock/`, las vistas y el formulario demostrativos junto con sus importaciones. Revisar también que no se incluyan referencias ficticias en el build.

Comandos de validación: `npm run lint` y `npm run build`. No hay script de typecheck ni suite de pruebas configurados.

## Portfolio: pendientes antes de publicar

Las tres iniciativas del portfolio están en `src/data/mock/content.js` y solo se muestran en modo demostración. La administración de propiedades es un producto proyectado; no debe presentarse como disponible. La publicación de CCLF requiere autorización de los demás participantes. Verificar también el alcance y la información publicable del proyecto de simulación. Las rutas `#demo/portfolio/...` son placeholders, no landings definitivas. La futura sección de Soluciones deberá presentar consultoría y arquitectura operativa, desarrollo e implementación tecnológica, y colaboraciones estratégicas.
