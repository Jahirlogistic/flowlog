# Flowlogistic – Portal Educativo (Master v1)

## Estructura
- `index.html`: portal maestro con acceso, buscador, filtros y panel docente.
- `recursos.json`: catálogo central único de recursos.
- La imagen del docente está incrustada dentro de `index.html` y también se conserva en `assets/profesor-logistica.png`; así el diseño no depende de que la carpeta de imagen se cargue por separado.
- `recursos/`: carpeta para alojar recursos HTML independientes.

## Claves iniciales
- Acceso al portal: `1063956524`
- Panel docente: `8485`

## Agregar recursos
1. Sube el HTML independiente a una ruta dentro de `recursos/`, por ejemplo:
   `recursos/logistica/legislacion/evaluacion-1/index.html`
2. Entra al portal y abre el Panel docente.
3. Registra el título, programa, asignatura, tipo, ruta y descripción.
4. Descarga el nuevo `recursos.json`.
5. Reemplaza el `recursos.json` del repositorio y publica los cambios.

El panel guarda temporalmente los cambios en el navegador y exporta el catálogo. No escribe directamente en GitHub ni sincroniza entre dispositivos.

## Publicación
Sube `index.html`, `recursos.json`, la carpeta `assets/` y la carpeta `recursos/` a la raíz del repositorio que publica GitHub Pages.

## Seguridad importante
Esta versión usa una barrera de contraseña en JavaScript. Las claves quedan visibles para quien inspeccione el código, por lo que **no constituye autenticación segura** ni protege los HTML si están publicados públicamente. GitHub Pages sirve archivos públicos. Para proteger realmente el portal y los recursos se debe integrar autenticación del lado del servidor (por ejemplo, Supabase Auth o Cloudflare Access) y proteger también las rutas de los recursos. No usar esta versión para almacenar datos personales o calificaciones.


## Perfil académico del creador
El portal incluye un apartado "Sobre el docente" con formación académica y formación complementaria extraídas del currículo suministrado. Se excluyeron experiencia laboral, datos de contacto y ubicación personal. La atribución visible es "By Jahir Gomez".


## Ajustes de presentación v1.3
- El perfil académico se abre en una ventana modal independiente desde el botón "Sobre el docente".
- La portada usa redacción dirigida a estudiantes y visitantes, sin hablar del funcionamiento interno del catálogo.
- El perfil está redactado en tercera persona.
- Se mantiene la firma "By Jahir Gomez".


## Actualización v1.4
- Contraseña de acceso al portal actualizada a `1704`.
- La clave del panel docente se mantiene en `8485`.
