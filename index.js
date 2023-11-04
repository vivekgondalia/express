const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const logger = require("./logger");
const authenticator = require("./authenticator");
const express = require("express");
const app = express();

//Install Middlewares - More is good but also slows down the app
app.use(express.json());
app.use(express.static("public"));
app.use(helmet());
app.use(logger);
app.use(authenticator);

//Configuration

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log(">>>Middleware - Morgan enabled...");
}

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
    return res
      .status(404)
      .send("The exercise with the given ID was not found.");

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
//Input Validation - 1)Define Schema, 2)validate again req.body
app.post("/api/exercises", (req, res) => {
  //1)validate
  const { error } = validateExercise(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //2)create
  const exercise = {
    id: exercises.length + 1,
    name: req.body.name,
    category: req.body.category,
  };
  exercises.push(exercise);

  res.send(exercise);
});

//PUT
app.put("/api/exercises/:id", (req, res) => {
  //1)find
  const exercise = exercises.find((e) => e.id == parseInt(req.params.id));
  if (!exercise)
    return res
      .status(404)
      .send("The exercise with the given ID was not found.");

  //2)validate
  const { error } = validateExercise(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //3)update
  exercise.name = req.body.name;
  exercise.category = req.body.category;

  res.send(exercise);
});

//DELETE
app.delete("/api/exercises/:id", (req, res) => {
  //1)Find
  const exercise = exercises.find((e) => e.id == parseInt(req.params.id));
  if (!exercise)
    return res
      .status(404)
      .send("The exercise with the given ID was not found.");

  //2)Delete
  const index = exercises.indexOf(exercise);
  exercises.splice(index, 1);

  //3)Return deleted object
  res.send(exercise);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));

function validateExercise(exercise) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    category: Joi.string().min(2).required(),
  });

  return schema.validate(exercise);
}
