const fs = require('fs')
const path = require('path')

const logFilePath = path.join(__dirname, 'app.log')

function clearLogFile() {
    fs.writeFile(logFilePath, '', (err) => {
        if(err) {
            console.error("Ошибка очистки логов!")
        } else {
            console.log("Файл с логами очищен!")
        }
    })
}

module.exports = clearLogFile;