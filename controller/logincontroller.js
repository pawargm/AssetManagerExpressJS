const User = require('../model/User')
const secretkey = require('../secret.key')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    console.log("login token generation")
    if ('username' in req.body && 'password' in req.body) {
       
        try{
            username = req.body.username
            const user = User.find(
                {'username': { $eq:username}},
            )

            const payload = {
                sub: user.username,
                iat: Date.now()
            }

            const token = jwt.sign(payload, secretkey);
            res.json({ token })
        } catch (err) {
            res.status(401);
            res.json({ mes: "Invalid user Name/ Password" })
        }
    }
}