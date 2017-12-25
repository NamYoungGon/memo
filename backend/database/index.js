// mongoose 모듈
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

let database = {
    connection: null,
    models: {}
};

function init(...arg) {
    connect(...arg)
}

function connect(app, config) {
    const { url, options } = config.database

    mongoose.connect(url, options)
    database.connection = mongoose.connection
    autoIncrement.initialize(database.connection)
    
    // 데이터베이스 연결 시 동작
    database.connection.on('open', () => {
        console.log('connected on database')
    })
    
    database.connection.on('disconnected', () => {
        console.log('disconnected to database')
    })
    
    database.connection.on('error', console.error.bind(console.log, 'mongoose connection error'))

    create(app, config)
}

function create(app, config) {
    const { models } = config.database
    let curModel 
    
    models.forEach((data, index) => {
        curModel = require(data.file)(autoIncrement)
        database.models[data.name] = curModel
    })

    app.set('database', database)
    global.database = database
}

function getDatabase() {
    return database
}

module.exports = {
    init,
    database: getDatabase
}