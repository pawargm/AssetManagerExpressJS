const express = require('express')
const userrouter = express.Router()

const { userTestAPI , createUser, removeAssetFromSellLst, removeAssetFromBuyLst,
        addAssetToBuyLst, updateUser, getUsers , getUserById , removeUser , getBuyLst } 
= require('../controller/usercontroller')

userrouter.route('/testAPI').get(userTestAPI)

//To create an user 
userrouter.route('/createUser').post(createUser)
userrouter.route('/removeSellAssetlst').delete(removeAssetFromSellLst)
userrouter.route('/removeBuyAssetlst').post(removeAssetFromBuyLst)
userrouter.route('/addtoBuyAssetlst').post(addAssetToBuyLst)
userrouter.route('/updateUser').post(updateUser)
userrouter.route('/getUsers').get(getUsers)
userrouter.route('/getUser').post(getUserById)
userrouter.route('/deleteUser').delete(removeUser)
userrouter.route('/getBuyLst').post(getBuyLst)

module.exports = userrouter
