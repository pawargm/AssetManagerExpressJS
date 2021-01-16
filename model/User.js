const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        role: {             //Role in sense of Admin or general user
            type: String,
            required: false 
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password:{
            type:String,
            required: true
        },
        emailid: {
            type: String,
            required: true
        },
        contactno: {
            type: String,
            required: true
        },
        address:{
            type:String,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        gender: {
            type: String,
            required:false
        },
        age: {
            type: Number,
            required: false
        },
        assetlstsell: {
            type: Array,
            required: false,
            unique: true
        },
        assetlstbuy: {
            type: Array,
            required: false,
            unique: true
        } 
    }
)

module.exports = mongoose.model('User', UserSchema)