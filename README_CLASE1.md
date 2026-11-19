# Flowlogistic – Clase 1 integrada (v1.5)

Este paquete contiene el portal maestro y los dos recursos aprobados para la Clase 1 de Procesos de Aduanas.

## Estructura
- `index.html`: portal maestro.
- `recursos.json`: catálogo central con los recursos de Clase 1.
- `assets/`: recursos gráficos del portal.
- `recursos/logistica/procesos-de-aduanas/clase-1/evaluacion/index.html`: evaluación HTML.
- El recurso **Material de apoyo** enlaza directamente al Decreto 1165 de 2019 en la Compilación Jurídica de la DIAN.

## Publicación
Sube el contenido de la carpeta `Flowlogistic_Master` a la raíz del repositorio GitHub Pages, conservando las carpetas y rutas. No subas solo el ZIP.

## Nota de integración
La evaluación está configurada con la URL del nuevo Apps Script y el token acordado. El envío usa la pestaña `REGISTRO_EVALUACIONES` y solo se dispara cuando el estudiante responde todas las preguntas y finaliza la prueba. Debe hacerse una prueba real de envío y comprobar la fila en Google Sheets antes de anunciarla como operativa.

## Seguridad
El token incluido en un HTML estático puede ser inspeccionado por quien acceda al archivo. Es una clave de integración básica, no autenticación segura de estudiantes.
