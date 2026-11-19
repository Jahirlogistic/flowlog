/**
 * FLOWLOGISTIC - REGISTRO DE EVALUACIONES
 * Vincular este proyecto de Apps Script a la hoja de cálculo.
 *
 * Payload esperado desde el HTML (JSON):
 * {
 *   "token": "CAMBIAR_ESTE_TOKEN",
 *   "nombres": "Ana",
 *   "apellidos": "Pérez",
 *   "documento": "123456",
 *   "institucion": "Institución educativa",
 *   "evaluacion": "Evaluación 1",
 *   "intentos": 1,
 *   "notaOriginal": 4.5,
 *   "numeroPreguntas": 10,
 *   "salidasSegundos": [2, 5, 12],
 *   "observacionAdicional": ""
 * }
 *
 * "salidasSegundos" debe contener la duración en segundos de cada salida
 * detectada por el HTML. El servidor cuenta como sancionables solo las > 3 s.
 */

const CONFIG = {
  HOJA: 'REGISTRO_EVALUACIONES',
  TOKEN: 'FLW-2026-Aduanas-K9mR7xP4vT2qL8nB6zW5',
  SEGUNDOS_MINIMOS: 3,
  FRACCION_PENALIZACION: 0.50,
  NOTA_MAXIMA: 5.0,
  DECIMALES: 1
};

const ENCABEZADOS = [
  'Fecha y hora',
  'Nombres',
  'Apellidos',
  'Nota original',
  'Nota final',
  'Documento',
  'Institución',
  'Evaluación',
  'Intentos',
  'Observaciones'
];

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return respuesta_({ ok: false, error: 'No se recibieron datos.' });
    }

    const datos = JSON.parse(e.postData.contents);

    if (!datos || datos.token !== CONFIG.TOKEN) {
      return respuesta_({ ok: false, error: 'Token no válido.' });
    }

    validarDatos_(datos);

    const salidas = Array.isArray(datos.salidasSegundos)
      ? datos.salidasSegundos.map(Number).filter(n => Number.isFinite(n) && n >= 0)
      : [];

    const totalSegundos = salidas.reduce((s, n) => s + n, 0);
    const salidaMasLarga = salidas.length ? Math.max(...salidas) : 0;
    const eventosSancionables = salidas.filter(n => n > CONFIG.SEGUNDOS_MINIMOS).length;

    const valorPregunta = CONFIG.NOTA_MAXIMA / Number(datos.numeroPreguntas);
    const descuentoPorEvento = valorPregunta * CONFIG.FRACCION_PENALIZACION;
    const penalizacion = eventosSancionables * descuentoPorEvento;

    const notaOriginal = limitar_(
      redondear_(Number(datos.notaOriginal), CONFIG.DECIMALES),
      0,
      CONFIG.NOTA_MAXIMA
    );

    const notaFinal = redondear_(
      Math.max(0, notaOriginal - penalizacion),
      CONFIG.DECIMALES
    );

    const observaciones = [
      'Cambios sancionables (>3 s): ' + eventosSancionables,
      'Salidas detectadas: ' + salidas.length,
      'Tiempo total fuera: ' + totalSegundos + ' s',
      'Salida más larga: ' + salidaMasLarga + ' s',
      'Penalización aplicada: ' + redondear_(penalizacion, 2),
      datos.observacionAdicional ? 'Novedades: ' + limpiar_(datos.observacionAdicional) : ''
    ].filter(Boolean).join(' | ');

    lock.waitLock(15000);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hoja = ss.getSheetByName(CONFIG.HOJA);
    if (!hoja) throw new Error('No existe la pestaña ' + CONFIG.HOJA);

    asegurarEncabezados_(hoja);

    hoja.appendRow([
      new Date(),
      limpiar_(datos.nombres),
      limpiar_(datos.apellidos),
      notaOriginal,
      notaFinal,
      limpiar_(datos.documento),
      limpiar_(datos.institucion),
      limpiar_(datos.evaluacion),
      Math.max(1, parseInt(datos.intentos, 10) || 1),
      observaciones
    ]);

    return respuesta_({
      ok: true,
      mensaje: 'Evaluación registrada.',
      nota: notaFinal,
      eventosSancionables: eventosSancionables
    });

  } catch (error) {
    return respuesta_({ ok: false, error: error.message || String(error) });
  } finally {
    try {
      if (lock.hasLock()) lock.releaseLock();
    } catch (_) {}
  }
}

function validarDatos_(d) {
  const requeridos = [
    'nombres', 'apellidos', 'documento',
    'institucion', 'evaluacion', 'notaOriginal', 'numeroPreguntas'
  ];

  requeridos.forEach(campo => {
    if (d[campo] === undefined || d[campo] === null || String(d[campo]).trim() === '') {
      throw new Error('Falta el campo obligatorio: ' + campo);
    }
  });

  const nota = Number(d.notaOriginal);
  const preguntas = Number(d.numeroPreguntas);

  if (!Number.isFinite(nota) || nota < 0 || nota > CONFIG.NOTA_MAXIMA) {
    throw new Error('La nota original debe estar entre 0.0 y 5.0.');
  }

  if (!Number.isInteger(preguntas) || preguntas < 1) {
    throw new Error('numeroPreguntas debe ser un entero mayor que cero.');
  }

  if (d.salidasSegundos !== undefined && !Array.isArray(d.salidasSegundos)) {
    throw new Error('salidasSegundos debe ser una lista de duraciones en segundos.');
  }
}

function asegurarEncabezados_(hoja) {
  const rango = hoja.getRange(1, 1, 1, ENCABEZADOS.length);
  const actuales = rango.getValues()[0];
  const vacios = actuales.every(v => v === '');

  if (vacios) {
    rango.setValues([ENCABEZADOS]);
    hoja.setFrozenRows(1);
  } else {
    const coinciden = ENCABEZADOS.every((h, i) => String(actuales[i]).trim() === h);
    if (!coinciden) {
      throw new Error('Los encabezados no coinciden con el formato acordado. Revisa la fila 1.');
    }
  }
}

function limpiar_(valor) {
  const texto = String(valor == null ? '' : valor).trim();
  // Evita que textos recibidos se interpreten como fórmulas en Sheets.
  return /^[=+\-@]/.test(texto) ? "'" + texto : texto;
}

function redondear_(numero, decimales) {
  const factor = Math.pow(10, decimales);
  return Math.round((numero + Number.EPSILON) * factor) / factor;
}

function limitar_(numero, minimo, maximo) {
  return Math.min(maximo, Math.max(minimo, numero));
}

function respuesta_(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Ejecuta esta función manualmente una sola vez para comprobar
 * que el proyecto está vinculado a la hoja y que la pestaña existe.
 */
function probarConexion() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG.HOJA);
  if (!hoja) throw new Error('No se encontró la pestaña ' + CONFIG.HOJA);
  asegurarEncabezados_(hoja);
  Logger.log('Conexión correcta: ' + ss.getName() + ' / ' + hoja.getName());
}
