require("dotenv").config();
require("./mongo");
const express = require("express");
const app = express();
const Person = require("./models/Person");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("home");
});

app.get("/info", (req, res) => {
  Person.find({}).then((result) => {
    res.send(
      `<div>
          <p>Phonebook has info for ${result.length} people</p>
          <p>Get request was made at ${new Date()}</p>
      </div>`
    );
  });
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => {
    res.json(result);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;

  Person.findById(id)
    .then((result) => {
      if (result) return res.json(result);
      res.status(404).end();
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;

  Person.findByIdAndDelete(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  const { name, number } = newPerson;

  if (name === undefined) {
    res.status(400).json({ error: "Name must be complete." });
  } else {
    newPerson
      .save()
      .then((result) => {
        res.status(201).json(result.toJSON());
      })
      .catch((err) => next(err));
  }
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const { id } = req.params;

  const noteUpdated = {
    number: body.number,
  };

  Person.findByIdAndUpdate(id, noteUpdated, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
});

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
