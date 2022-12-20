const mongoose = require('mongoose') 

const subscriberSchema = new mongoose.Schema({
  name: {
  type: String,
  required: true
  },
  subscribedTochannel: {
    type: String,
    required: true,
  },
  subscribeDate: {
    type: Date,
    required: false,
    default: Date.now

  }
})   //this is javascript object 
    //this object have keys for diff properties of our subscriber

module.exports = mongoose.model('Subscriber', subscriberSchema)