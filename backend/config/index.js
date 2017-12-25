module.exports = {
    port: 3001,
    database: {
        url: 'mongodb://test:1234@ds159926.mlab.com:59926/memo-tutorial',
        models: [
            {
                file: './models/Memo', 
                name: 'Memo',
            }
        ],
        options: {
            autoReconnect: true,
            useMongoClient: true,
        }
    },
}