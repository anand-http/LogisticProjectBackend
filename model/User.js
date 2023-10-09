const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type: String
    },
    region:{
        type:String
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },    
    lastLoginDate: {
        type: Date,
        required: false,
        default: null
    },
    firstLoginDate: {
        type: Date,
        required: false,
        default: null
    },
    creationDate: {
        type: Date,
        required: false,
    },
    refreshToken: String,
    EmloyeeActive:{
        type: Boolean,
        required: false,
        default: true
        
    }
});

module.exports = mongoose.model('User', userSchema);