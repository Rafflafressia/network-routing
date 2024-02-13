// Declare dependencies
const express = require('express')
const fs = require("fs");
const uuid = require("uuid");
const router = express.Router(); 
let notes = require('../db/db.json'); // representation of the notes object data

// GET request to get all the notes
router.get("/", (req, res) => {
    res.json(notes); // returns the data when this route is accessed
});


// Route to GET singular note
router.get("/:id", (req, res) => {

    // Finds a note with the ID that's been requested
    const notesID = notes.some(notes => notes.id === req.params.id);
    
    // If it's true, return the song with the specific ID
    if (notesID) {
        res.json(notes.filter(notes => notes.id === req.params.id));

    // If there's no matching note, error message claiming the id was not found
    } else {
        res.status(404).json({
            msg:`ur dumb ${req.params.id}, you've given me a bad id`
        });
    }
});

router.post("/", (req, res)=> {
    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uuid.v4(),
    };
    
    if( title && text ){
        
        notes.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) =>{
            if (err){
                console.log("Error writing", err);
            }
            {
                console.log("Data has been written to the file");
            }
        });

        res.json(notes);
        
    } else {
        res.json('Error in posting new note.');
    }
});

module.exports = router;

