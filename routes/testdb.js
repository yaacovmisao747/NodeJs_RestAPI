const express = require('express')
const router = express.Router()
const UserP = require('../models/testdb')

//Getting all for testdb database
router.get('/', async (req,res) => {
    try{
     const subscribers = await UserP.find() //bring in all the subscribers
     res.json(subscribers) //if successful we want to send this using json all the subscribers to the users.
    }catch (err){
      res.status(500).json({message: err.message})// if there is 500 there is error in our server,database not on the user or client's using the API.
    }
  }) 

  //Creating one
router.post('/', async(req,res) => {   //generic route
    const subscriber = new UserP({
      name: req.body.name,
      subscribedTochannel: req.body.subscribedTochannel
    })
    try{
      const newSubscriber = await subscriber.save()
      res.status(201).json(newSubscriber)
    }catch (err){
      res.status(400).json({message: err.message})//stm wrong with user input not server
    }
  })
  
  module.exports = router
