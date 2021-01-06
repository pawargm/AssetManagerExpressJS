const express = require('express')
const assetrouter = express.Router()

const { assetTestAPI , createAsset, getAssets, getAssetByAddress , updateAsset, removeAsset  } 
= require('../controller/assetcontroller')

assetrouter.route('/testAPI').get(assetTestAPI)
//routerMongoDB.route('/:id').get(getStudent)

assetrouter.route('/createAsset').post(createAsset)
assetrouter.route('/getAssets').get(getAssets)

//Filter by address like by city or by colony etc
assetrouter.route('/getAssets').post(getAssetByAddress)

//To update Asset values
//This API gets used by user code path
assetrouter.route("/updateAsset").post(updateAsset)

//To Remove Asset Value 
//This API gets used by user code path
assetrouter.route("/removeAsset").delete(removeAsset)

module.exports = assetrouter