require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

//to connect server with react npm install cors and use below
// const cors = require("cors")  
// app.use (cors())

mongoose.connect(process.env.irl, { useNewUrlParser: true })

// mongoose.set('strictQuery', true); 

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())  //allow us to use middle ware

const  subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)  

//from test.db.js ===========================
const  testDbRouter = require('./routes/testdb')
app.use('/testdb', testDbRouter)  
//===========================================

app.listen(3000, () => console.log('Server Started'))





// ===========================================================
//middle ware : function that executes when routes are hit
//routes
//crud : GET-fetch data POST-push data to database, patch-update, delete-delete data

//++++++++++++++++++++++++++++++++//
 


 

 
