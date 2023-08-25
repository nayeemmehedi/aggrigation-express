Aggregation Pipeline Operator::
............................
1.$add - array - 2 ta field add krbe .
2.$eq - array - true ,false return if both matches
3.$floor - 1 value -> point por bad dei
4.$mod - array - 2 ta compare vagses return

5.$push - itemsSold: { $push:  { item: "$item", quantity: "$quantity" } } -> "itemsSold" : [
      { "item" : "abc", "quantity" : 10 }]
      
6.$sum -array - 2 ta value
7.$multiply - array - 2 ta
7.$avg -1 value
8.$max - 1 value
9.$min -1 value


Aggregation Pipeline Operator::: 
............................

1.$add (aggregation) 👍👍

syntex : 
    
    { $add: [ <expression1>, <expression2>, ... ] }

Examples : 

{ "_id" : 1, "item" : "abc", "price" : 10, "fee" : 2, date: ISODate("2014-03-01T08:00:00Z") }
{ "_id" : 2, "item" : "jkl", "price" : 20, "fee" : 1, date: ISODate("2014-03-01T09:00:00Z") }
{ "_id" : 3, "item" : "xyz", "price" : 5,  "fee" : 0, date: ISODate("2014-03-15T09:00:00Z") }

Add Numbers: 

db.sales.aggregate(
   [
     { $project: { item: 1, total: { $add: [ "$price", "$fee" ] } } }
   ]
)

result 👍
 
 { "_id" : 1, "item" : "abc", "total" : 12 }
{ "_id" : 2, "item" : "jkl", "total" : 21 }
{ "_id" : 3, "item" : "xyz", "total" : 5 }



2.$eq👍👍
.........

true when the values are equivalent.

false when the values are not equivalent.


{ "_id" : 1, "item" : "abc1", description: "product 1", qty: 300 }
{ "_id" : 2, "item" : "abc2", description: "product 2", qty: 200 }
{ "_id" : 3, "item" : "xyz1", description: "product 3", qty: 250 }
{ "_id" : 4, "item" : "VWZ1", description: "product 4", qty: 300 }
{ "_id" : 5, "item" : "VWZ2", description: "product 5", qty: 180 }



db.inventory.aggregate(
   [
     {
       $project:
          {
            item: 1,
            qty: 1,
            qtyEq250: { $eq: [ "$qty", 250 ] },
            _id: 0
          }
     }
   ]
)


{ "item" : "abc1", "qty" : 300, "qtyEq250" : false }
{ "item" : "abc2", "qty" : 200, "qtyEq250" : false }
{ "item" : "xyz1", "qty" : 250, "qtyEq250" : true }
{ "item" : "VWZ1", "qty" : 300, "qtyEq250" : false }
{ "item" : "VWZ2", "qty" : 180, "qtyEq250" : false }


3.$floor (aggregation) 👍👍
......................

db.samples.insertMany(
   [
      { _id: 1, value: 9.25 },
      { _id: 2, value: 8.73 },
      { _id: 3, value: 4.32 },
      { _id: 4, value: -5.34 }
   ]
)


db.samples.aggregate([
   { $project: { value: 1, floorValue: { $floor: "$value" } } }
])


{ "_id" : 1, "value" : 9.25, "floorValue" : 9 }
{ "_id" : 2, "value" : 8.73, "floorValue" : 8 }
{ "_id" : 3, "value" : 4.32, "floorValue" : 4 }
{ "_id" : 4, "value" : -5.34, "floorValue" : -6 }


4.$mod (aggregation) 👍👍
.............
vagses 

db.conferencePlanning.insertMany( [
   { "_id" : 1, "city" : "New York", "hours" : 80, "tasks" : 7 },
   { "_id" : 2, "city" : "Singapore", "hours" : 40, "tasks" : 4 }
] )


db.conferencePlanning.aggregate(
   [
     { $project: { remainder: { $mod: [ "$hours", "$tasks" ] } } }
   ]
)


The operation returns the following results:

{ "_id" : 1, "remainder" : 3 }

{ "_id" : 2, "remainder" : 0 }

$multiply (aggregation) 👍👍
.......................
% gun 
syntex:

{ $multiply: [ <expression1>, <expression2>, ... ] }

{ "_id" : 1, "item" : "abc", "price" : 10, "quantity": 2, date: ISODate("2014-03-01T08:00:00Z") }
{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity": 1, date: ISODate("2014-03-01T09:00:00Z") }
{ "_id" : 3, "item" : "xyz", "price" : 5, "quantity": 10, date: ISODate("2014-03-15T09:00:00Z") }


db.sales.aggregate(
   [
     { $project: { date: 1, item: 1, total: { $multiply: [ "$price", "$quantity" ] } } }
   ]
)

{ "_id" : 1, "item" : "abc", "date" : ISODate("2014-03-01T08:00:00Z"), "total" : 20 }
{ "_id" : 2, "item" : "jkl", "date" : ISODate("2014-03-01T09:00:00Z"), "total" : 20 }
{ "_id" : 3, "item" : "xyz", "date" : ISODate("2014-03-15T09:00:00Z"), "total" : 50 }



5.$push (aggregation) 👍👍
.....................

{ $push: <expression> }

{ "_id" : 1, "item" : "abc", "price" : 10, "quantity" : 2, "date" : ISODate("2014-01-01T08:00:00Z") }
{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "date" : ISODate("2014-02-03T09:00:00Z") }
{ "_id" : 3, "item" : "xyz", "price" : 5, "quantity" : 5, "date" : ISODate("2014-02-03T09:05:00Z") }
{ "_id" : 4, "item" : "abc", "price" : 10, "quantity" : 10, "date" : ISODate("2014-02-15T08:00:00Z") }
{ "_id" : 5, "item" : "xyz", "price" : 5, "quantity" : 10, "date" : ISODate("2014-02-15T09:05:00Z") }
{ "_id" : 6, "item" : "xyz", "price" : 5, "quantity" : 5, "date" : ISODate("2014-02-15T12:05:10Z") }
{ "_id" : 7, "item" : "xyz", "price" : 5, "quantity" : 10, "date" : ISODate("2014-02-15T14:12:12Z") }

db.sales.aggregate(
   [
   { $sort: { date: 1, item: 1 } },
   {
       $group:
         {
           _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
           itemsSold: { $push:  { item: "$item", quantity: "$quantity" } }
         }
     }
   ]
)

{
   "_id" : { "day" : 46, "year" : 2014 },
   "itemsSold" : [
      { "item" : "abc", "quantity" : 10 },
      { "item" : "xyz", "quantity" : 10 },
      { "item" : "xyz", "quantity" : 5 },
      { "item" : "xyz", "quantity" : 10 }
   ]
}
{
   "_id" : { "day" : 34, "year" : 2014 },
   "itemsSold" : [
      { "item" : "jkl", "quantity" : 1 },
      { "item" : "xyz", "quantity" : 5 }
   ]
}
{
   "_id" : { "day" : 1, "year" : 2014 },
   "itemsSold" : [ { "item" : "abc", "quantity" : 2 } ]
}


6.$sum 👍

Calculates and returns the collective sum of numeric values .$sum ignores non-numeric values.

$sum
 is available in these stages:

 1.$addFields
 2.$group
 3.$match
 4.$project

 { "_id" : 1, "item" : "abc", "price" : 10, "quantity" : 2, "date" : ISODate("2014-01-01T08:00:00Z") }
{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "date" : ISODate("2014-02-03T09:00:00Z") }
{ "_id" : 3, "item" : "xyz", "price" : 5, "quantity" : 5, "date" : ISODate("2014-02-03T09:05:00Z") }
{ "_id" : 4, "item" : "abc", "price" : 10, "quantity" : 10, "date" : ISODate("2014-02-15T08:00:00Z") }
{ "_id" : 5, "item" : "xyz", "price" : 5, "quantity" : 10, "date" : ISODate("2014-02-15T09:05:00Z") }





 db.sales.aggregate(
   [
     {
       $group:
         {
           _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
           totalAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
           count: { $sum: 1 }
         }
     }
   ]
)


ans 👍

{ "_id" : { "day" : 46, "year" : 2014 }, "totalAmount" : 150, "count" : 2 }
{ "_id" : { "day" : 34, "year" : 2014 }, "totalAmount" : 45, "count" : 2 }
{ "_id" : { "day" : 1, "year" : 2014 }, "totalAmount" : 20, "count" : 1 }


7.avg 👍

{ "_id" : 5, "item" : "xyz", "price" : 5, "quantity" : 10, "date" : ISODate("2014-02-15T09:12:00Z") }
{ "_id" : 5, "item" : "xyz", "price" : 5, "quantity" : 6, "date" : ISODate("2014-02-15T09:12:00Z") }

avg : 8

 avgQuantity: { $avg: "$quantity" }



7. $min 👍

 group e minmum value konta ..

 minQuantity: { $min: "$quantity" }



8. $ max 👍

 group e maxmum value 

  maxQuantity: { $max: "$quantity" } 
