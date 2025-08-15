const pino = require('pino')
const { colorizerFactory } = require('pino-pretty')

module.exports = pino({
    level: process.env.PINI_LOG_LEVEL || 'info',
    formatters: {
        bindings: (bindings) => {
            return {
                process_id: bindings.pid, 
                host: bindings.hostname,
                node_version: process.version,
                os: process.platform,
            }
        },
        level: (label) => {
            return {level: label.toUpperCase()}
        }
    },
    transport: {
        target: 'pino-pretty',
        options: {
            destination: './logs/app.log',
            colorizerFactory: true
        }
    },
    timestamp: pino.stdTimeFunctions.isoTime,
}) 