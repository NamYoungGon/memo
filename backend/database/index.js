// mongoose 모듈
const mongoose = require('mongoose')

let database


function connect() {
    const databaseUrl = 'mongodb://test:1234@ds159926.mlab.com:59926/memo-tutorial'
    
    mongoose.Promise = global.Promise
    mongoose.connect(databaseUrl)
    database = mongoose.connection
    
    // 데이터베이스 연결 시 동작
    database.on('open', () => {

    })

    database.on('disconnected', () => {
        console.log('데이터베이스 연결 해제')
    })

    database.on('error', console.error.bind(console.log, 'mongoose 연결 에러'))
}