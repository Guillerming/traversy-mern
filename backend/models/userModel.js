const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please provide a name for the user'],
    },
    email: {
        type: String,
        require: [true, 'Please provide an e-mail'],
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'Please provide a password'],
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)