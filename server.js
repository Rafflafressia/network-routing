// Declaring Dependencies
const express = require("express");
const path = require("path"); 
const notes = require("./routes/notes"); //change this to correct route path | Imports notes router
const app = express();

const PORT = process.env.PORT || 3001; 

// Middleware
// Middleware to serve up assets to public folder
app.use(express.static('public'));

// Middleware for parsing JSON urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/notes", notes);

// GET route for index html page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
); 

// GET route for notes html page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

// Returns index for unexpected calls
app.get("*", (req, res) => 
    res.sendFile(path.join(__dirname, './public/index.html'))
);

// Lets us know things are connected
app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);


