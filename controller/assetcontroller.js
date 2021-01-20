const Asset = require('../model/Asset')
const User = require('../model/User')

exports.assetTestAPI = (req, res, next) => {
    console.log("AssetTestAPI: start")
    res.status(200).json({ "Message": "AssetTestAPI: start" });
}

exports.createAsset = async (req, res, next) => {
    console.log("createAsset:start")
    const asset = new Asset(
        {
            title : req.body.title,
            //assetId : req.body.assetId,
            type : req.body.type, //type as in rental, plot to sell
            area: req.body.area,
            address : req.body.address,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            price: {
                value : req.body.price.value,
                negotiable: req.body.price.negotiable

                
            },
            description: req.body.description,
            maindoordirection: req.body.maindoordirection,
            pitures: req.body.pitures,
            username: req.body.username
        })
    console.log("AssetObj")
    console.log(asset)
    try{
        const saveAsset = await asset.save()
        console.log(saveAsset.id)
        console.log(typeof saveAsset.id.valueOf())
        //Save that asset id to owner table
        
        User.update({username:req.body.username}, {$push:{assetlstsell:saveAsset.id.valueOf()}},
            
            function(err,log){
                console.log("LOG:"+log);
            }            
            )
        res.json(saveAsset)
    } catch (err) { 
        console.log("Exception")    
        res.json({message: err})
    }

}


//To gets all asset list
exports.getAssets = async (req, res, next) => {
    
    console.log("getAssets:start")
    try{
        const assets = await Asset.find()
        res.json(assets)
    } catch (err) {
        console.log("In exceptions")
        res.json({msg:err})
    }
}

//Function to filter data by city, colony & road
exports.getAssetByAddress = async (req, res, next) => {
    
    console.log("getAssetByAddress:start")
    try{
        city = req.body.address.city
        colony = req.body.address.colony
        road = req.body.address.road

        const assets = await Asset.find(
            {
            $or: [
                {'address.city': { $eq:city}},
                {'address.colony': {$eq: colony}},
                {'address.road': {$eq: road}}
                ]
            })
        res.json(assets)
    } catch (err) {
        res.json({msg:err})
    }
}

//This function gets used by User APIS
exports.updateAsset = async (req, res, next) => { 

    console.log("updateAsset:start")
    
    Asset.update({"_id":req.body.assetid},req.body,
    
        function(err,log){
            console.log("record gets updated "+ log)
        }
    )
    res.json({msg:"Success"})
}

//This function gets used by User APIS 
//This API will get request like below
/*
{
    "assetid":"5fe6dead940aa20624c4f9a6",
    "userid": "Gopal@1234gpawar916@gmail.com9923111045"
}
 *
 */
exports.removeAsset = async (req, res, next) => { 

    console.log("removeAsset:start")

    assetObjId = req.body.assetid//"5fe6e4564089cd6948febfb5" //this is Object id 
    console.log("Type of assetid")
    console.log(typeof assetObjId)
    Asset.count({"_id":assetObjId},function(err,count){
        console.log("No Of Records in users Schema:"+count);
        if(count != 0) {
            Asset.remove({"_id":assetObjId},
                function(err,log){
                    console.log("record gets updated "+ log)
                }
            )               
            User.update({_id:req.body.userid}, {$pull:{assetlstsell:req.body.assetid}},
            
                function(err,log){
                    console.log("Asset also gets removed from users object" + log + err);
                }            
                )
            res.json({msg:"Success"})
        } else {                
            res.json({msg:"Record is not present in DB"})
        }
    })
}
