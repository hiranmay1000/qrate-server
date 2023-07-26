const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    userID: {
        type: String,
        required: true
    },


},
    { timestamps: true }
)


const model = mongoose.model('qrate-users', postSchema)

module.exports = model;