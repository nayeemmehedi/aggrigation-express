const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { schemaProduct } = require("./schema");
const app = express();
require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


mongoose.set("strictQuery", true);

mongoose
  .connect(
    process.env.DATABASE_FILE || "mongodb://0.0.0.0:27017/testing"
  )
  .then(() => console.log("db conntected..")
  );

/**
 * find()
 * 
 * https://www.mongodb.com/docs/manual/reference/operator/query-array/
 * 
 * 
 * aggrigation
 * https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/
 * @param find({}) => db.user.find({}) - all value get 
 * @param count()=> db.user.find({}).count() - all value koita ta payar jnno
 * @param limit(2)=> db.user.find({}).limit(2) - limit kore dite pari
 * @param skip(2)=> db.user.find({}).skip(2) - skip kore dite pari
 * @param sort({age : 1})=> db.user.find({}).sort({age: 1}) sort hbe. ->sort({"activities.age":1})
 * @param projection({name:1, age:0}) => db.user.find().projection({name:1, age:0}) -sob property lgbe na , kichu lgbe..0 dile bad ,1 dile thkbe..
 * 
 *  @param address:[{name:"nayeem"},{name:"saad"}]
 * 
 * @returns 
 * @returns
 * 
 * @params gt,gte ,lt ,lte  => db.user.find({"activitis.age": {$gt : 80}})
 * @params eq,ne  => await schemaProduct.find({   "activities.age" : { $in : [20,32]}}) ,ei 2 tai anbe ..
 * 
 * @return 
 * @return 
 * 
 * @logical operator -> and or
 * 
 * @params (and,or) akta array nei ,tar vtr match kore ..
 * 
 * db.user.find({$or : [{ "activities.age" :20} ,{role:"teacher"} ]})
 * 


 * db.user.find({"address.name":"nayeem"})


 * 
 */

  app.get('/',async (req, res) => {
    //  schemaProduct.index( { first_name: "text" } )
    // const value = await schemaProduct.find({ $text: { $search:"Jacinta"} })
    const value  =  await schemaProduct.aggregate([
      {"$match" : { role:"teacher"}},
     


    ])
    
    res.send({totalLength :value.length, value : value });
  })


app.listen(4000);