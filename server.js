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
  const noteData = req.body;
  noteData.id = parseInt(notes.length);
  fs.readFile(notesJSON, "utf-8", (err, data) => {
    let allNotes = JSON.parse(data);
    allNotes.push(noteData);
    fs.writeFile(notesJSON, JSON.stringify(allNotes), (err) => {
         if (err) throw err;
      res.json(allNotes);
    });
  });
});

//delete notes
app.delete("/api/notes/:id", (req, res) => {
  const deleteId = req.params.id;
  notes = notes.filter((note) => {
    return note.id != deleteId;
  });
  fs.writeFile(notesJSON, JSON.stringify(notes), (err) => {
    if (err) throw err;
    res.json(notes);
  });
});



