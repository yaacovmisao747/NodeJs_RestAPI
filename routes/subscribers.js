const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

// const Subscriber = require('../models/testdb')


//routes for :
//Getting All  
//Getting One
//Upating One  
//Deleting One

//Getting all    //Get route
router.get('/', async (req,res) => {
   try{
    const subscribers = await Subscriber.find() //bring in all the subscribers
    res.json(subscribers) //if successful we want to send this using json all the subscribers to the users.
   }catch (err){
     res.status(500).json({message: err.message})// if there is 500 there is error in our server,database not on the user or client's using the API.
   }
}) 
//Getting one
// router.get('/:id',  (req,res) => {
//     res.send(req.params.id)
//     res.send(req.params.name)
// }) 
//Getting one using middleware 
router.get('/:id', getSubscriber, (req,res) => {
  res.json(res.subscriber)  
})
 
//Creating one
router.post('/', async(req,res) => {   //generic route
  const subscriber = new Subscriber({
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
//Updating one
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  } 
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
// router.patch('/:id', getSubscriber, async(req,res) => {
// //last router to work on. update things that are actually sent to us in the reequest
//  if (req.body.name != null)  {
//   console.log(1);
//   res.subscriber.name = req.body.name
//  }
//  if (req.body.subscribedTochannel != null)  {
//   console.log(2);
//   res.subscriber.subscribedTochannel = req.body.subscribedTochannel
//  }
//  try{
//     const updatedSubscriber = await res.subscriber.save()  
//     res.json(updatedSubscriber)
//    // res.send(updatedSubscriber)
//  }catch (err){
//   res.status(400).json( {message: err.mesage})

//  }
// })

//Deleting one   //Delete route
router.delete('/:id', getSubscriber, async(req,res) => { //becos we will calling this using try catch
  try{
    await res.subscriber.remove()
    res.json({ message:"Deleted Subscriber" })
  }catch(err){  
    res.status(500).json({ message: err.message})
  }
})

//MIDDLE WARE
async function getSubscriber(req, res, next) {  
  let subscriber
  //this is middleware. Next= move to next section of our code
  //async becos we are accessing database from this code
   try{
    subscriber = await Subscriber.findById(req.params.id) //get user based on the id
    if (subscriber == null){ //if subscriber does not exist
        return res.status(400).json({message: 'cannot find the subscriber'})
    }
   }catch(err){
    return res.status(500).json({mesasge: err.message})
   }

   res.subscriber = subscriber  //can call in each block of request
   next()   //next piece of middle ware

}  

module.exports = router