const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
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

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
