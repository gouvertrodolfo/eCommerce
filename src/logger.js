import log4js from 'log4js';

log4js.configure({
  appenders: {
    consola: { type: 'console' },
    archivoErrores: { type: 'file', filename: 'error.log' },
    archivoDebug: { type: 'file', filename: 'debug.log' },
    loggerConsola: {
      type: 'logLevelFilter',
      appender: 'consola',
      level: 'info',
    },
    loggerArchivoWarning: {
      type: 'logLevelFilter',
      appender: 'archivoWarning',
      level: 'warn',
    },
    loggerArchivoErrores: {
      type: 'logLevelFilter',
      appender: 'archivoErrores',
      level: 'error',
    }
  },
  categories: {
    default: {
      appenders: ['loggerConsola'],
      level: 'all',
    },
    prod: {
      appenders: ['loggerArchivoErrores', 'loggerArchivoWarning'],
      level: 'all',
    },
  },
})

let logger = null

if (process.env.NODE_ENV === 'PROD') {
  logger = log4js.getLogger('prod')
} else {
  logger = log4js.getLogger()
}


export default logger;