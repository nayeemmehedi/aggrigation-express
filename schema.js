const mongoose = require('mongoose');
const {Schema} = mongoose
var validator = require('validator');

const schema = new Schema({
    first_name: String,
    last_name: String,
    email:{
        type: String,
        required: true,
        validate: validator.isEmail

    },
    gender:{
        type: String,
        enum: ["Male", "Female"],
        
    },
    role:{
        type : String,
        enum :["teacher","learner"]
    },
    product:{
        type:String,
        enum :["milk","fish","oil",]
    },
    listOfBook:{type:[String]},

    subBalance: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
    activities:[
        {
            homeTown:{
                type: String,
            },
            age : Number

        }
    ]


})



module.exports.schemaProduct  = mongoose.model('test',schema)

