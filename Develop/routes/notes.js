// Declare dependencies
const express = require('express')
const fs = require("fs");
const uuid = require("uuid");
const router = express.Router(); 
const notes = require('./Develop/db/db.json'); // representation of the notes object data

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
