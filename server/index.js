require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandingMidddleware');
const path = require('path');
const pino = require('pino-http');
const logger = require('./logger')
const cron = require('node-cron');
const clearLogFile = require('./logs/logCleaner');

const PORT = process.env.PORT;

const app = express()

cron.schedule('* * * * *', () => {
    clearLogFile()
})

app.use(pino.pinoHttp({logger}))
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)

const start = async() => {
    try {
        logger.info("Hi")
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
