const mongoose = require("mongoose")

const userAddressSchema = new mongoose.Schema({
    pincode: String,
    city: String,
    street: String
})

const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    age: {
        type: Number,
        required: false, 
        min:3,
        max:20,
        validate: {
            validator: v => v % 2 ===0,
            // message: props => `${props.value} is not even`
        }
    },
    address: userAddressSchema,
    updatedat: {
        immutable: true,
        type: Date,
        default: () => Date.now()
    }
    
})

module.exports = mongoose.model("testdb", userSchema)
// module.exports = mongoose.model("UserQ", userAddressSchema)
