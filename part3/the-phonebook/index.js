const { response } = require("express");
const express = require("express");
const morgan = require("morgan");
const app = express();

morgan.token("obj", function getObj(req) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(morgan(":method :url :status :response-time ms :obj"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  return Math.floor(Math.random() * 1000000);
};

app.get("/info", (req, res) => {
  const info = {
    persons: `<h3>Phonebook has info for ${persons.length} people</h3>`,
    date: new Date().toUTCString(),
  };
  res.send(info.persons + info.date);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const newPerson = {
    id: generateId(),
    name: req.body.name,
    number: req.body.number,
  };
  if (persons.find((person) => person.name === newPerson.name)) {
    res.status(400).send("Name must be unique");
  } else if (!newPerson.name || !newPerson.number) {
    res.status(400).send("Must include name and number");
  } else {
    persons = persons.concat(newPerson);
  }

  res.json(newPerson);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send("<h2>User does not exist</h2>").end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
