const express = require('express')
const app = express()
const port = 8080
const cors = require('cors')
const connect = require('./connectdb')
const mongoose = require('mongoose')

connect()
app.use(cors())
app.use(express.json())


// ***task*** prepare shcema and model

let peopleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});

let Person = mongoose.model("Person", peopleSchema);


//***task*** create a person and save it to DB using .save method

let omda = new Person({name : 'Imed',age : 29,favoriteFoods:['tacos','chips','Kamouniya']})
//omda.save()
// i put it in a comment so it doesnt create new one every time

// ***task*** create and save a record

let arrayOfPeople = [
    {name : 'omda',age : 29,favoriteFoods:['couscous','slata']},
    {name : 'abbes',age : 29,favoriteFoods:['lablebi','mechwi']},
    {name : '3ebs',age : 29,favoriteFoods:['sea food','lasania']}
]
//Person.create(arrayOfPeople)
// i put it in comment so it doesent creat this  record again


//***task*** Use model.find() to Search Your Database

const search = async()=>{
    const find = await Person.find({name:'omda'})
    console.log(find)
}
//search()

//***task*** Use model.findOne() to Return a Single Matching Document from Your Database
const searching = async ()=>{
    const findOne = await Person.findOne({favoriteFoods : 'lablebi'})
    console.log(findOne)
}
//searching()

//***task*** Perform Classic Updates by Running Find, Edit, then Save

const classics = async ()=>{
    // find by id
    const person = await Person.findById('642614d8114be6db6ac4f68c')
    // update
    person.favoriteFoods.push('kounefa')
    // save
    person.save()
    console.log(person)
}
//classics()
//i put it in comment so it doesent update again nd again nd again

//***task*** Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = async ()=>{
    const person = await Person.findOneAndUpdate({name : '3ebs'},{age : 18},{new : true})
    console.log(person)
}
//findAndUpdate()

//***task*** Delete One Document Using model.findByIdAndRemove
const findToRemove = async()=>{
    const person = await Person.findByIdAndRemove('6426120ab8de86a83574af61')
    console.log(person)
}
//findToRemove()

//***task***MongoDB and Mongoose - Delete Many Documents with model.remove()
const deleteMany = async()=>{
    const purge = await Person.deleteMany({age:9})
    console.log('purged')
}
//deleteMany()
//i added many people to the collection so i can perform this test


//***last task***Chain Search Query Helpers to Narrow Search Results
const finallyOver = async()=>{
    const person = await Person.find({favoriteFoods:'burritos'}).sort({name : 'asc'}).limit(2).select('-age').exec()

    console.log(person)
    console.log('ch9awlek fel fen')
}
finallyOver()
// started by adding many people who likes burittos so i can try it
// faddit w 3yit



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))