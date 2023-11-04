const Joi = require("joi");
const express = require("express");
const app = express();

//Allows us to read request body in JSON
app.use(express.json());

const exercises = [
  { id: 1, name: "Shoulder Press", category: "Shoulder" },
  { id: 2, name: "Side Raise", category: "Shoulder" },
  { id: 3, name: "Front Raise", category: "Shoulder" },
  { id: 4, name: "Shoulder Barbell", category: "Shoulder" },
  { id: 5, name: "Suitcase Carry", category: "Shoulder" },
  { id: 6, name: "Side Plank", category: "Shoulder" },
  { id: 7, name: "Bird Dog", category: "Shoulder" },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/exercises", (req, res) => {
  res.send(exercises);
});

app.get("/api/exercises/:id", (req, res) => {
  const exercise = exercises.find((e) => e.id == parseInt(req.params.id));
  if (!exercise)
    res.status(404).send("The exercise with the given ID was not found.");

  res.send(exercise);
});

//REQUEST PARAM
app.get("/api/workout/:year/:month", (req, res) => {
  res.send(req.params);
});

//QUERY PARAM
app.get("/api/workout/:year/", (req, res) => {
  res.send(req.query);
});

//POST
//Input Validation - Define Schema, validate again req.body
app.post("/api/exercises", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    category: Joi.string().min(2).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const exercise = {
    id: exercises.length + 1,
    name: req.body.name,
    category: req.body.category,
  };

  exercises.push(exercise);
  res.send(exercise);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
