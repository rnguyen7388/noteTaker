//Dependecies
const express = require("express");
const path = require("path");

const fs = require("fs");
const notesHTML = "./Develop/db/db.json";
let notes = [];
//Sets up Express
const app = express();
const PORT = process.env.PORT || 8080;

//accessing port
app.listen(PORT, () => {
  console.log(`Server listening at Port: ${PORT}`);
});
//Sets up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//link to index file
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});
//link to notes file
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
notes = fs.readFileSync("db/db.json", "utf8");
  res.json(notes);
});

//post


//delete
app.delete("/api/notes/:id", function (req, res) {
  const deleteId = req.params.id;
  notes = notes.filter((note) => {
    return note.id != deleteId;
  });
  fs.writeFile(notesHTML, JSON.stringify(notes), (err) => {
    if (err) throw err;
    res.json(notes);
  });
});

