MongoDB Aggregation

Aggregation Pipeline Stages::
............................
1.$match - match koro
2.$group - group koro
3.$limit - limit koro
4.$prject - ki ki dekte chay dekhao
5.$sort - sort koro
6.$addFields - new field add koro.
7.$count - count koro
8.$lookup -  foreign value look up koro





1.Aggregation $match 🥇🥇
...................

db.listingsAndReviews.aggregate([ 
  { $match : { property_type : "House" } },
  { $limit: 2 },
  { $project: {
    "name": 1,
    "bedrooms": 1,
    "price": 1
  }}
])

2.Aggregation $group
......................

db.listingsAndReviews.aggregate(
    [ { $group : { _id : "$property_type" } } ]
)

example 👍

 const value  =  await schemaProduct.aggregate([

      {$match : { }},
      {$group :
          
          {
             _id :"$gender" , person : {$push : {name :"$first_name"
          
          }}}},

    ])


result: 
[
  { _id: 'Aparthotel' },
  { _id: 'Apartment' },
  { _id: 'Barn' } ]



3.Aggregation $project
.................

db.restaurants.aggregate([
  {
    $project: {
      name: 1,
      cuisine: 1,
      address: 1,
      "person.age":1,
      _id : 0
    }
  },
  {
    $limit: 5
  }
])

4.Aggregation $addFields 🥇🥇
......................

{
  _id: 1,
  student: "Maya",
  homework: [ 10, 5, 10 ],
  quiz: [ 10, 8 ],
  extraCredit: 0
}

db.scores.aggregate( [
   {
     $addFields: {
       totalHomework: { $sum: "$homework" } ,
       totalQuiz: { $sum: "$quiz" }
     }
   }
] )

solutions:

{
  "_id" : 1,
  "student" : "Maya",
  "homework" : [ 10, 5, 10 ],
  "quiz" : [ 10, 8 ],
  "extraCredit" : 0,
  "totalHomework" : 25,
  "totalQuiz" : 18,
  "totalScore" : 43
}




5..Aggregation $lookup 🥇🥇
.......................

from: The collection to use for lookup in the same database

localField: The field in the primary collection that can be used as a unique identifier in the from collection.

foreignField: The field in the from collection that can be used as a unique identifier in the primary collection.

as: The name of the new field that will contain the matching documents from the from collection.


db.comments.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "_id",
      as: "movie_details",
    },
  },
  {
    $limit: 1
  }
])


6..Aggregation $limit 🥇🥇
.....................

db.movies.aggregate([ { $limit: 1 } ])





7..Aggregation $sort 🥇🥇
...................

db.listingsAndReviews.aggregate([ 
  { 
    $sort: { "accommodates": -1 } 
  },
  {
    $project: {
      "name": 1,
      "accommodates": 1
    }
  },
  {
    $limit: 5
  }
])







8.Aggregation $count 🥇🥇
...................

db.restaurants.aggregate([
  {
    $match: { "cuisine": "Chinese" }
  },
  {
    $count: "totalChinese"
  }
])


