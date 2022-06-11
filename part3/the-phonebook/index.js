const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

morgan.token("obj", function getObj(req) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(morgan(":method :url :status :response-time ms :obj"));
app.use(cors());
app.use(requestLogger);
app.use(express.static("build"));

app.get("/", (req, res) => {
  res.send("<h1>The-Phonebook</h1>");
});

app.get("/info", (req, res) => {
  const length = Person.find({}).then((result) => {
    return result.length;
  });
  const info = {
    persons: `<h3>Phonebook has info for ${length} people</h3>`,
    date: new Date().toUTCString(),
  };
  res.send(info.persons + info.date);
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => {
    res.json(result);
  });
});

app.post("/api/persons", (req, res) => {
  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  });
  if (!person.name || !person.number) {
    res.status(400).send("Must include name and number");
  } else {
    person.save().then((result) => {
      res.json(person);
    });
  }
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((result) => {
    if (result) {
      res.json(result);
    } else {
      res.status(404).send("<h2>User does not exist</h2>").end();
    }
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    number: body.number,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
