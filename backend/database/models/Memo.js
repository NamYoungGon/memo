const mongoose = require('mongoose')

function init(autoIncrement) {

    const Schema = mongoose.Schema({
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        created_at: { type: Date, index: { unique: false }, default: Date.now() },
        updated_at: { type: Date, index: { unique: false }, default: Date.now() },
        deleted_at: { type: Date, index: { unique: false }},
        del: { type: Boolean, default: false }
    })
    
    Schema.plugin(autoIncrement.plugin, { 
        model: 'Memo',
        field: 'no',
        startAt: 0,
        incrementBy: 1
    })

    Schema.statics.findAll = function () {
        return this.find({})
    }

    return mongoose.model('memos', Schema)
}

module.exports = init