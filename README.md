# FLOWLOGISTIC · Portal Educativo — versión final 1.7

## Contenido del paquete
- `index.html`: portal principal con acceso, buscador, filtros y panel docente.
- `recursos.json`: catálogo inicial con el material oficial del Decreto 1165 de 2019 y la evaluación de Clase 1.
- `assets/profesor-logistica.png`: imagen del perfil docente (la portada también conserva su imagen integrada).
- `recursos/logistica/procesos-de-aduanas/clase-1/evaluacion/index.html`: evaluación interactiva de Clase 1.

## Claves actuales
- Acceso de estudiantes: **1704**
- Panel docente: **8485**

Estas claves son una barrera visual básica, no autenticación segura. En un sitio estático publicado en GitHub Pages, el código y los recursos pueden ser inspeccionados o abiertos directamente. Para restringir el acceso de verdad se necesita autenticación y control de acceso del lado del servidor.

## Publicación en GitHub Pages
1. Descomprime el ZIP.
2. Abre la carpeta `Flowlogistic_Master_v1_7_FINAL`.
3. Sube **todo el contenido interno** de esa carpeta a la raíz del repositorio (no subas únicamente el ZIP).
4. Conserva exactamente las rutas de `assets/` y `recursos/`.
5. En GitHub, ve a **Settings → Pages** y verifica que publique la rama y carpeta correctas.
6. Abre la URL del sitio y prueba acceso, catálogo y evaluación.

## Recursos del catálogo
El portal carga `recursos.json` desde la misma carpeta que `index.html`. El catálogo debe conservar el formato de la versión 2 y usar los campos `id`, `titulo`, `programa`, `asignatura`, `tipo`, `url` y `descripcion`.

El panel docente guarda cambios en el navegador y permite descargar un nuevo `recursos.json`. Para que los cambios sean visibles para todos, reemplaza el archivo en el repositorio y publica el commit. El panel no modifica GitHub automáticamente.

## Evaluación y registro
La evaluación está enlazada con el Apps Script configurado en el HTML y envía intentos completos a la hoja `REGISTRO_EVALUACIONES`. La llamada del navegador utiliza `no-cors`, por lo que la pantalla no puede confirmar que Google Sheets haya guardado efectivamente la fila. Antes de usarla con estudiantes, realiza un envío de prueba y verifica la fila directamente en la hoja.

El token incluido en el HTML es visible para quien inspeccione el archivo. Es una clave técnica de integración, no una contraseña privada.

## Correcciones de esta versión 1.7
- Se unificó la documentación con las claves reales configuradas en el HTML: `1704` y `8485`.
- Se conservó el catálogo con los dos recursos integrados y sus rutas.
- Se corrigió la carga del catálogo para que una copia local antigua o vacía no sobrescriba el catálogo remoto.
- Se conserva una copia de los recursos agregados localmente que aún no estén en el catálogo publicado.
- Se añadió validación básica de las URL de los recursos para evitar esquemas `javascript:` y `data:`.
- Se aclaró que el envío a Google Sheets requiere verificación en la hoja, porque el navegador no puede leer la respuesta del endpoint `no-cors`.

## Limitaciones conocidas
- No se puede publicar automáticamente en GitHub desde el panel docente.
- Las claves del portal y el PIN docente son visibles en el HTML.
- La disponibilidad del registro depende del despliegue y permisos del Apps Script y de la estructura de la hoja de cálculo.

## Integración de evaluación con Google Sheets
El directorio `integracion/` contiene el Apps Script con el mismo token que la evaluación HTML y una plantilla con la pestaña `REGISTRO_EVALUACIONES`. La integración solo quedará operativa cuando el script se instale en la hoja correcta, se autorice y se publique como aplicación web. Sigue `integracion/LEEME_INTEGRACION.md` y verifica una fila de prueba. No se puede confirmar el despliegue remoto desde este paquete local.
