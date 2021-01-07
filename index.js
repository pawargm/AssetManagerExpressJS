const express = require('express')
const app = express()
const mongoose = require('mongoose')
const assetrouter = require('./router/assetrouter')
const userrouter = require('./router/userrouter')
const cors = require('cors')

app.use(cors())
app.use(express.json())

/**
 * To use MongoDB using mongooes 
 * const mongoose = require("mongoose");
 * const dbPath = "mongodb://<dbuser>:<dbpassword>@ds250607.mlab.com:38485/test-db";
 * mongoose.connect(dbPath, {
 *       useNewUrlParser: true,
 *  });
 */
//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/assetDB', {useNewUrlParser:true}, ()=>console.log('Mongoose Connected'))


//Asset Test  API
app.use(require('./mware/auth'))
app.use('/asset', assetrouter)

//User Test API
app.use(require('./mware/auth'))
app.use('/user', userrouter)

app.use('/login', require('./controller/logincontroller'))

app.listen(5001, () => console.log('Server is running'))
