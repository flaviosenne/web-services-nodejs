const { join } = require('path')
const { createLogger, transports, format } = require('winston')
require('winston-daily-rotate-file');


const log = createLogger({
    level: "debug",
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
        format.align(),
        format.printf(info => `[${info.timestamp}] - ${info.level} : ${info.message}`)
    ),
    transports: [
        new transports.DailyRotateFile({
            filename: join(__dirname,  'logs', 'arquivo-de-log-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            maxFiles: '30d',
        }),
        new transports.Console()
    ]
})

module.exports = { log }