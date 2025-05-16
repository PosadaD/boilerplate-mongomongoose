require('dotenv').config();
let mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true
  },
  favoriteFoods:{
    type: [String]
  }
})

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John Doe",        
    age: 30,                 
    favoriteFoods: ["Pizza", "Sushi"]  
  });

  person.save((error, data)=>{
    if (error) return done(error);

    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, data)=>{
    if (error) return done(error);
    done(null, data);
  })
 
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (error, data)=>{
    if(error) return done(error);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (error, data)=>{
    if (error) return done(error);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, data)=>{
    if (error) return console.log(error);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (error, personData)=>{
    if (error) return console.log(error);

    personData.favoriteFoods.push(foodToAdd);

    personData.save((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName},{ $set: { age: ageToSet } },{ new: true }, (error, data)=>{
    if (error) return console.log(error);
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, data)=>{
    if (error) return console.log(error);
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (error, data)=>{
    if (error) return console.log(error)
    done(null, data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0}).exec((error, data)=>{
    if(error) return console.log;
    console.log(data);
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
