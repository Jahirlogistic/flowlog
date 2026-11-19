# Integración de evaluación con Google Sheets

## Archivos
- `Flowlogistic_Google_Apps_Script.gs`: código del receptor POST. Su token coincide con el configurado en la evaluación HTML incluida en este paquete.
- `Plantilla_REGISTRO_EVALUACIONES.xlsx`: plantilla con la pestaña y los 10 encabezados que el script espera.

## Configuración obligatoria
1. Crea una hoja de cálculo de Google a partir de la plantilla, o prepara una hoja con una pestaña llamada `REGISTRO_EVALUACIONES`.
2. La fila 1 debe contener exactamente estos encabezados, en este orden: Fecha y hora, Nombres, Apellidos, Nota original, Nota final, Documento, Institución, Evaluación, Intentos, Observaciones.
3. En Google Apps Script, crea un proyecto **vinculado a esa hoja de cálculo** y pega el contenido de `Flowlogistic_Google_Apps_Script.gs`.
4. Ejecuta `probarConexion()` desde el editor y concede los permisos solicitados.
5. Implementa como **Aplicación web**: ejecutar como tu cuenta y acceso según la política de tu institución.
6. Copia la URL `/exec` del despliegue y confirma que sea la misma que está en el bloque `sheets.endpoint` del HTML de evaluación.
7. Si cambias el token en uno de los dos lados, cámbialo también en el otro.
8. Haz una evaluación de prueba completa y confirma que se añadió una fila en `REGISTRO_EVALUACIONES`.

## Importante
El navegador utiliza `fetch(..., mode: "no-cors")`. Por esa restricción, el HTML no puede leer la respuesta del servidor: puede mostrar que la solicitud se envió, pero eso no demuestra que la hoja recibió la fila. La verificación final se hace directamente en Google Sheets.

El token se incluye en el HTML estático y puede ser inspeccionado. Es una clave de integración básica, no un secreto ni un mecanismo de autenticación fuerte.
