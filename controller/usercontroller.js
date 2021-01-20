const Asset = require('../model/Asset')
const User = require('../model/User')

exports.userTestAPI = (req, res, next) => {
    console.log("UserTestAPI: start")
    res.status(200).json({ "Message": "UserTestAPI: start" });
}

exports.createUser = async (req, res, next) => {
    console.log("createUser:start")

    if (typeof req.body.username !== "undefined") {
        userId = req.body.username 
    }
    if (typeof req.body.emailid !== "undefined") {
        userId = userId + req.body.emailid
    }
    if (typeof req.body.contactno !== "undefined"){
        userId = userId + req.body.contactno
    }
    
    const user = new User(
        {
            _id: userId,
            username : req.body.username,
            emailid: req.body.emailid,
            contactno: req.body.contactno,
            address: req.body.address,
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            assetlstsell: req.body.assetlstsell,
            assetlstbuy: req.body.assetlstbuy,
            password: req.body.password,
            role: "normal user"
        })
    try{
        const saveUser = await user.save()
        res.json(saveUser)
    } catch (err) { res.json({message: err})}

}
exports.removeAssetFromSellLst = async (req, res, next) => { 

    console.log("removeAssetFromSellLst:start")

    assetObjId = req.body.assetid//"5fe6e4564089cd6948febfb5" //this is Object id 
    console.log("Type of assetid")
    console.log(typeof assetObjId)
  
    User.update({"username":req.body.username}, {$pull:{assetlstsell:req.body.assetid}},
        function(err,log){
            console.log("Asset also gets removed from users object" + log + err);
        })
    res.json({msg:"Success"})
}

exports.removeAssetFromBuyLst = async (req, res, next) => { 

    console.log("removeAssetFromBuyLst:start")

    assetObjId = req.body.assetid//"5fe6e4564089cd6948febfb5" //this is Object id 
    console.log("Type of assetid")
    console.log(req.body)
    console.log(typeof assetObjId)
  
    User.update({"username":req.body.username}, {$pull:{assetlstbuy:req.body.assetid}},
        function(err,log){
            console.log("Asset also gets removed from users object" + log + err);
        })
    res.json({msg:"Success"})
}

exports.addAssetToBuyLst = async (req, res, next) => { 

    console.log("addAssetToBuyLst:start")

    assetObjId = req.body.assetid//"5fe6e4564089cd6948febfb5" //this is Object id 
    console.log("Type of assetid")
    console.log(typeof assetObjId)
  
    User.update({"username":req.body.username}, {$push:{assetlstbuy:req.body.assetid}},
        function(err,log){
            console.log("Asset gets added to BuyList" + log + err);
        })
    res.json({msg:"Success"})
}

//This function gets used by User APIS
exports.updateUser = async (req, res, next) => { 

    console.log("updateUser:start")
    
    User.update({"username":req.body.username},req.body,
    
        function(err,log){
            console.log("record gets updated "+ log)
        }
    )
    res.json({msg:"Success"})
}

//To gets all Users list
exports.getUsers = async (req, res, next) => {
    
    console.log("getUSer:start")
    try{
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.json({msg:err})
    }
}

//To gets assetbuylst from user
exports.getBuyLst = async (req, res, next) => {
    
    console.log("getBuyLst:start")
    let userbuyassetdetail = []
    try{
        console.log("username")
        console.log(req.body.username)
        const assetlstbuyObj = await User.find({"username":req.body.username}, {"assetlstbuy":1, "_id":0})
        
        //console.log(assetlstbuyObj)
        var i
   
        for(i = 0; i < assetlstbuyObj[0].assetlstbuy.length; i++) {
            try{
                const assetid = assetlstbuyObj[0].assetlstbuy[i]
                //console.log(assetlstbuyObj[0].assetlstbuy[i])
                const assetObj = await Asset.find(
                    {
                        '_id':assetid
                    })
                   // console.log(assetObj)
                    userbuyassetdetail.push(assetObj[0])
            } catch (err) {
                console.log("Inner exception")
                res.json({msg:err})
            }           
        }
        //console.log(userbuyassetdetail)
        res.json(userbuyassetdetail)
    } catch (err) {
        console.log("Outer exception")
        console.log(err)
        res.json({msg:err})
    }
}

//To gets assetselllst from user
exports.getSellLst = async (req, res, next) => {
    
    console.log("getSellLst:start")
    let usersellassetdetail = []
    try{
        console.log("username")
        console.log(req.body.username)
        const assetlstsellObj = await User.find({"username":req.body.username}, {"assetlstsell":1, "_id":0})
        
        //console.log(assetlstbuyObj)
        var i
   
        for(i = 0; i < assetlstsellObj[0].assetlstsell.length; i++) {
            try{
                const assetid = assetlstsellObj[0].assetlstsell[i]
                //console.log(assetlstbuyObj[0].assetlstbuy[i])
                const assetObj = await Asset.find(
                    {
                        '_id':assetid
                    })
                   // console.log(assetObj)
                   if( assetObj[0] != null ) {
                        //console.log("NOT NULL")
                        //console.log(assetObj[0])
                        usersellassetdetail.push(assetObj[0])
                   }
            } catch (err) {
                console.log("Inner exception")
                res.json({msg:err})
            }           
        }
        //console.log(userbuyassetdetail)
        res.json(usersellassetdetail)
    } catch (err) {
        console.log("Outer exception")
        console.log(err)
        res.json({msg:err})
    }
}



//Function to filter data by userid
exports.getUserById = async (req, res, next) => {
    
    console.log("getUserById:start")
    try{
        username = req.body.username
        const user = await User.find(
            {'username': { $eq:username}},
        )
        res.json(user)
    } catch (err) {
        res.json({msg:err})
    }
}

//Remove user by userid
exports.removeUser = async (req, res, next) => { 

    console.log("removeUser:start")

    User.count({"username":req.body.username},function(err,count){
        console.log("No Of Records in users Schema:"+count);
        if(count != 0) {
            User.remove({"username":req.body.username},
                function(err,log){
                    console.log("record gets updated "+ log)
                }
            )               
      
            res.json({msg:"Success"})
        } else {                
            res.json({msg:"Record is not present in DB"})
        }
    })
}
