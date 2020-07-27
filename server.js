const express = require("express");
const path = require("path");

const fs = require("fs");
const notesJSON = "./Develop/db/db.json";
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
app.use(express.static(path.join(__dirname, "./Develop/public")));

//link to index file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});
//link to notes file
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

//add to notes
app.post("/api/notes", (req, res) => {
 let notesData = req.body;
  notes.push(notesData);
  fs.writeFileSync('./Develop/db/db.json', JSON.stringify(notesData), 'utf8');
  res.json(true);
  console.log("Note has been added!")
});

//delete notes
app.delete("/api/notes/:id", function(req, res) {
  notes.splice(req.params.id, 1);
  fs.writeFile(notesJSON, JSON.stringify(notes), (err) => {
    if (err) throw err;
    res.json(notes);
  });
  console.log("Note has been deleted!")
});
