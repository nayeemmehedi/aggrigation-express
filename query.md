## Query Mongodb ..

#### comparison queary

[eq,ne, in ,nin , gt,gte, lt,lte ]

$eq 🥇
........

যে টি ম্যাচ করছে সেটিr মানগুলি দেবে |
================================================================

exmple : { \_id: 1, item: { name: "ab", code: "123" }, qty: 15, tags: [ "A", "B", "C" ] }
{ \_id: 2, item: { name: "cd", code: "123" }, qty: 20, tags: [ "B" ] }

query 👍

db.inventory.find( { qty: { $eq: 20 } }
or
db.inventory.find( { qty: 20 } )

...//.....//...//...//...//...//...//...//...//

$ne 🥇
......

Not equal হবে specific value .যে টি ম্যাচ করছে সেটি বাদে অন্যান্য মানগুলি দেবে |================================================================

exmple : { \_id: 1, item: { name: "ab", code: "123" }, qty: 15, tags: [ "A", "B", "C" ] }
{ \_id: 2, item: { name: "cd", code: "123" }, qty: 20, tags: [ "B" ] }

query 👍

db.inventory.find( { qty: { $ne: 20 } }

...//.....//...//...//...//...//...//...//...//

$gt / $gte 🥇
.............

greater then হবে বড় গুলি দেখবে|================================================================

exmple : { \_id: 1, item: { name: "ab", code: "123" }, qty: 15, tags: [ "A", "B", "C" ] }
{ \_id: 2, item: { name: "cd", code: "123" }, qty: 20, tags: [ "B" ] }

query 👍

db.inventory.find({ qty: { $gt : 20 } }

...//.....//...//...//...//...//...//...//...//

$lt / $lte 🥇
...........

less then ছোট গুলি দেখবে
================================================================

exmple : { \_id: 1, item: { name: "ab", code: "123" }, qty: 15, tags: [ "A", "B", "C" ] }
{ \_id: 2, item: { name: "cd", code: "123" }, qty: 20, tags: [ "B" ] }

query 👍

db.inventory.find({ qty: { $lt : 20 } }

...//.....//...//...//...//...//...//...//...//

$in / $nin 🥇
..............

"in" একটি অ্যারে নেই যা গুলি ম্যাচ করে, সেগুলি রিটার্ন করে।
================================================================

exmple : db.inventory.insertMany( [
{ "item": "Pens", "quantity": 350, "tags": [ "school", "office" ] },
{ "item": "Erasers", "quantity": 15, "tags": [ "school", "home" ] },
{ "item": "Maps", "tags": [ "office", "storage" ] },
{ "item": "Books", "quantity": 5, "tags": [ "school", "storage", "home" ] }
] )
query 👍

db.inventory.find( { quantity: { $in: [ 5, 15 ] } }, { \_id: 0 } )

...//.....//...//...//...//...//...//...//...//

## Logical Operators

[and ,or ,not ,nor ]

$and / $or🥇
.............

"and" সবসময় একটি অ্যারে হবে এবং এটি ২টি মান তুলনা করবে।
================================================================

db.inventory.find( {
$and: [
{ $or: [ { qty: { $lt : 10 } }, { qty : { $gt: 50 } } ] },
{ $or: [ { sale: true }, { price : { $lt : 5 } } ] }
]
} )

...//.....//...//...//...//...//...//...//...//

## element query Operator

$exists 🥇
..........

    Syntax: { field: { $exists: <boolean> } }

    db.inventory.find( { qty: { $exists: true, $nin: [ 5, 15 ] } } )

"exits" আগে দেখবে আছে কি না" - এটি সর্বদা বুলিয়ান মান ফেরত দেয়।
================================================================

...//.....//...//...//...//...//...//...//...//

$type 🥇
..........

"type" for checking type

type code : ["string" , "object" , "array" , "date" ,"int"]

{ field: { $type: <BSON type> } }

db.addressBook.insertMany(
[
{ "_id" : 1, address : "2030 Martian Way", zipCode : "90698345" },
{ "_id" : 2, address: "156 Lunar Place", zipCode : 43339374 },
]
)

    db.addressBook.find( { "zipCode" : { $type : "string" } } );

...//.....//...//...//...//...//...//...//...//

## evolution query

$expr 🥇
..........

"expr" তুলনা করবে . প্রথমে "expr" তৈরি করা হবে, তারপর এই এক্সপ্রেশনটি OBJ হবে , যেখানে "{gt,lt}" অপারেটরটির মধ্যে দুটি মানের সম্পর্ক যাচাই করতে হবে। এই সম্পর্কটি দেখে, অ্যারের দুটি প্রোডাক্ট তুলনা করতে হবে এবং তাদের মধ্যে তুলনার ফলাফল বের করতে হবে।

example:
{ "\_id" : 1, "category" : "food", "budget": 400, "spent": 450 }

db.monthlyBudget.find( { $expr: { $gt: [ "$spent" , "$budget" ] } } )

...//.....//...//...//...//...//...//...//...//

# update field..

### update Operator

$inc  🥇
...........
query:
.......
db.products.insertOne(
{
_id: 1,
sku: "abc123",
quantity: 10,
metrics: { orders: 2, ratings: 3.5 }
}
)

inc use 
........

db.products.updateOne(
{ sku: "abc123" },
{ $inc: { quantity: -2, "metrics.orders": 1 } }
)

final result:
.............

{
_id: 1,
sku: 'abc123',
quantity: 8,
metrics: { orders: 3, ratings: 3.5 }
}


$min
....

value আর চেয়ে মিনিমাম যে আছে তা দেখাও।"

db.scores.insertOne( { _id: 1, highScore: 800, lowScore: 200 } )



db.scores.updateOne( { _id: 1 }, { $min: { lowScore: 250 } } )

...........
...........
...........

$max 🥇

value আর চেয়ে maximum যে আছে তা দেখাও।"

db.scores.insertOne( { _id: 1, highScore: 800, lowScore: 200 } )



db.scores.updateOne( { _id: 1 }, { $min: { lowScore: 250 } } )


......
.....
......

$rename 🥇


{
     "_id": 3,
     "alias": [ "Amazing grace" ],
     "mobile": "111-111-1111",
     "nmae": { "first" : "grace", "last" : "hopper" }
   }


query:   db.students.updateMany( {}, { $rename: { "nmae": "name" } } )


.....
.....

$set 🥇

update product which one missing only

db.products.updateOne(
   { _id: 100 },
   { $set:
      {
        quantity: 500,
        details: { model: "2600", make: "Fashionaires" },
        tags: [ "coats", "outerwear", "clothing" ]
      }
   }
)


$push  🥇

db.students.insertOne( { _id: 1, scores: [ 44, 78, 38, 80 ] } )

db.students.updateOne(
   { _id: 1 },
   { $push: { scores: 89 } }
)


$each 🥇
......
যদি একসঙ্গে বেশি পুশ করতে হয় তাহলে "$each" ব্যবহার করা হয়।

db.students.updateOne(
   { name: "joe" },
   { $push: { scores: { $each: [ 90, 92, 85 ] } } }
)

$position 🥇

 {
     $push: {
        scores: {
           $each: [ 50, 60, 70 ],
           $position: 0
        }
     }
   }

.............
,,,,,,,,,,,,,
.............
