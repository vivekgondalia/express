const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/exercises", (req, res) => {
  res.send([
    "Shoulder Press",
    "Side Raise",
    "Front Raise",
    "Shoulder Barbell",
    "Suitcase Carry",
    "Side Plank",
    "Bird Dog",
  ]);
});

app.listen(3000, () => console.log("Listening on Port 3000..."));
