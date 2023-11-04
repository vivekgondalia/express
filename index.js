const express = require("express");
const app = express();

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

app.get("/api/workout/:year/:month", (req, res) => {
  res.send(req.params);
});

app.get("/api/workout/:year/", (req, res) => {
  res.send(req.query);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
