

MemoSchema = mongoose.Schema({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    created_at: { type: Date, index: { unique: false }, default: Date.now() },
    updated_at: { type: Date, index: { unique: false }, default: Date.now() },
    deleted_at: { type: Date, index: { unique: false }, default: Date.now() },
    del: { type: Boolean, default: false }
})

// console.log('UserSchema 정의함')

// MemoSchema
//     .virtual('password')
//     .set(function (password) {
//         this.salt = this.makeSalt()
//         this.hashed_password = this.encryptPassword(password)
//         console.log(`Virtual password 저장됨 : ${this.hashed_password}`)
//     })
//     .get(function () {
        
//     })

// MemoSchema.methods.encryptPassword = function (plainText, inSalt = this.salt) {
//     if (inSalt) {
//         return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex')
//     }
// }

// MemoSchema.methods.makeSalt = function () {
//     return Math.round(String((new Date().valueOf() * Math.random())))
// }

// MemoSchema.methods.authenticate = function (plainText, inSalt, hashed_password) {

//     console.log('authenticate 호출됨')
//     if (inSalt) {
//         return this.encryptPassword(plainText, inSalt) === hashed_password
//     } else {
//         return this.encryptPassword(plainText) === hashed_password

//     }
// }

// MemoSchema.statics.findById = function (id, callback) {
//     return this.findOne({ id }, callback)
// }

// MemoSchema.statics.findAll = function (callback) {
//     return this.find({}, callback)
// }

module.exports = mongoose.model('memo', MemoSchema)