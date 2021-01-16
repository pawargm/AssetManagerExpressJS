const jwt = require('jsonwebtoken')
const secretkey = require('../secret.key')

module.exports = (req, res, next) => {

    console.log("Validation JWT Token")

    if ( req.url.startsWith('/asset') || req.url.startsWith('/user') ) {
        const auth = req.headers['authorization'];
        if (!auth) {
            res.status(401);
            res.json({ err: 'Authorization is missing' })
            return;
        }

        const [barer, token] = auth.split(' ');

        if (!token) {
            res.status(401);
            res.json({ msg: 'Token is missing' })
            return

        }
        try {
            jwt.verify(token, secretkey)
            next();
        } catch (err) {
            res.status(401);
            res.json({ err: 'Invalid token' })
        }

    }
    else {
        next();
    }
}

