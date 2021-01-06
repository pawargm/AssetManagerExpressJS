const mongoose = require('mongoose')

/**
 * To use MongoDB using mongooes 
 * const mongoose = require("mongoose");
 * const dbPath = "mongodb://<dbuser>:<dbpassword>@ds250607.mlab.com:38485/test-db";
 * mongoose.connect(dbPath, {
 *       useNewUrlParser: true,
 *  });
 */

const AssetSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: false
        },
        type : {
            type: String,
            required: false
        },
        area : {
            type: String,
            required : false
        },
        address : {
           city :{
               type: String,
               required : true
           },
           colony:{
               type:String,
               required: true
           },
           road:{
               type:String,
               required:true
           },
           detailaddress:{
               type:String,
               required: false
           }
        },
        longitude : {
            type: String,
            required: false
        },
        latitude : {
            type: String,
            required: false
        },
        price: {
           value : {
               type: String,
               required:true
           },
           negotiable: {
               type: Boolean,
               required: true
           }
        },
        description: {
            type: String,
            required: false
        },
        maindoordirection: {
            type: String,
            required: false
        },
        pitures: {
            type: String,
            required: false
        }
    }
)

module.exports = mongoose.model('Asset', AssetSchema)