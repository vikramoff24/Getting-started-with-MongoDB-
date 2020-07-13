//jshint esversion:6
const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});
//Schema - blueprint used by mongodb
const fruitSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Please check your data entry, no name specified !"]},
  rating:{
  type:Number,
  min:1,
  max:10
},
  review:String
});
//Model- for setting the collection name.
const Fruit=mongoose.model("Fruit",fruitSchema);
//creating the document using the model Fruit.
const fruit=new Fruit({

  rating:10 ,
  review:"Pretty solid as a fruit."
});
fruit.save();
const personSchema=new mongoose.Schema({
  name:String,
  age:Number,
  favouriteFruit:fruitSchema
});
//Model- for setting the collection name.
const Person=mongoose.model("Person",personSchema);

const pineapple=new Fruit({
  name: "Pineapple",
  score:9,
  review:"Great fruit."
});
pineapple.save();

 const mango=new Fruit({
   name: "Mango",
   score:9,
   review:"Yummy fruit."
 });
 mango.save();
//creating the document using the model Fruit.
const person=new Person({
  name:"Amy",
age:12,
favouriteFruit:pineapple
});
person.save();

// const kiwi=new Fruit({
//   name:"kiwi",
//   score:10,
//   review:"The best fruit!"
//   });
//   const orange=new Fruit({
//     name:"Orange",
//     score:4,
//     review:"Too sour for me!"
//   });
//   const banana=new Fruit({
//     name:"Banana",
//     score:3,
//     review:"Weird texture"
//   });

//   Fruit.insertMany([kiwi,orange,banana],function(err)
// {
//   if(err){
//     console.log(err);
//   }
//   else
//   {
//     console.log("Successfully saved all the fruits to fruitsDB");
//   }
// });

//Read data from database

Fruit.find(function(err,fruits){
  if(err)
  {
    console.log(err);
  }
  else{
  mongoose.connection.close();
    fruits.forEach(function(fruit)
  {
    console.log(fruit.name);
  });
  }
});
//Update
Fruit.updateOne({_id:"5f0c66e735da714f64ab1c70"},{name:"Peach"},function(err)
{
  if(err){
    console.log(err);
  }else{
    console.log("Successfully updated the document.");
  }
})
Person.updateOne({name:'john'},{favouriteFruit:mango},function(err)
{
  if(err){
    console.log(err);
  }else{
    console.log("Successfully updated the document.");
  }
})
//Delete
Fruit.deleteOne({_id:"5f0c7fb13f3e2e68602ccd9c"},function(err)
{
  if(err){
    console.log(err);
  }else{
    console.log("Successfully deleted the document.");
  }
})
// Person.deleteMany({ name:/john/ }, function (err) {  if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully deleted the document.");
//   }});
