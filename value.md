//kichu find krte hyle ata use krte hy.

db.user.find()

////////////////////////////////

//count koita user ase ta find krte

db.user.find().count()


////////////////////////////////

// limit kore user load krbo

db.user.find().limit(2)

////////////////////////////////


//skip krte pari
db.user.find().skip(2).limit(2)

////////////////////////////////


//sort 
 boro thke choto
db.user.find().sort({age:-1})

////////////////////////////////


//progection - sob property lgbe na , kichu lgbe..0 dile bad 
db.user.find().projection({name:1, age:0})


////////////////////////////////



db.user.find()

////////////////////////////////


//skills :["js","python"]
eikhne joto jaiga js ase sob dkhbe

db.user.find({skills:"js"})


////////////////////////////////


jdi oi array tai lge thle oitai bosabo

db.user.find({skills :["js","python"]})


////////////////////////////////


//address:{city:"dhaka"} amn jsi thke
db.user.find({"address.city":'dahaka"})

////////////////////////////////


//array of obj o same 
addrss:[{name:"nayeem"},{name:"saad"}]

db.user.find({"address.name":"nayeem"})


////////////////////////////////
