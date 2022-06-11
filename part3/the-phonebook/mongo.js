const mongoose = require("mongoose");
const generateId = () => {
  return Math.floor(Math.random() * 1000000);
};

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
}
if (process.argv.length < 5 && process.argv.length > 3) {
  console.log(
    "Please provide a name and number: node mongo.js <password> name number"
  );
}
const password = process.argv[2];

const url = process.env.MONGODB_URI;

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);
if (process.argv.length === 3) {
  mongoose.connect(url);
  console.log("phonebook:");
  Person.find({})
    .then((result) => {
      result.forEach((person) => {
        console.log(person.name + " " + person.number);
      });
      mongoose.connection.close();
    })
    .catch((err) => console.log(err));
} else if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");

      const person = new Person({
        id: generateId(),
        name: process.argv[3],
        number: process.argv[4],
      });

      return person.save();
    })
    .then(() => {
      console.log(
        `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
      );
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
