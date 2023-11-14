const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
exports.app = app;
const PORT = process.env.PORT || 4000;


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) =>
    {res.sendFile(path.join(__dirname, '/public/notes.html'))
});
    
app.get('/api/notes', (req, res) =>
// return res.json(notes);
    {fs.readFile('db/db.json', (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
            return res.json(notes);
            });
});
    
    app.listen(PORT, () =>
        {console.log(`app listening at http://localhost:${PORT}`)
});
    
    app.post('/api/notes', (req, res) => {
    
        let newNote = req.body;
        
        console.log(newNote);

        fs.readFile('db/db.json',  function(err, data){
            if (err) throw err;
            let notes = JSON.parse(data);
            newNote.id = notes.length + 1;
                //in that, parse data you get back
        //let Notearray = array.length-1 
        
        //array.length-1 
        // newNote.id += 1
        //push newNote into Notearray
        notes.push(newNote)
        //writeFile("db/db.json", JSON.stringify(newNote), function(err){})
        
    
        fs.writeFile('db/db.json', JSON.stringify(notes), function(err){
            if (err) throw err;
            return res.json(notes)
            console.log("saved into db.json")
        });
        });

    }
    
    );
    
    app.delete('/api/notes/:id', function(req, res){
    
    fs.readFile('db/db.json',function(err, data){
        if (err) throw err;
        let notes = JSON.parse(data);
        let id = req.params.id;
        let newNotes = notes.filter(note => note.id != id);
        for (i = 0; i < newNotes.length; i++){
            newNotes[i].id = i + 1;
        }
        
        console.log(newNotes)
        fs.writeFile('db/db.json', JSON.stringify(newNotes), function(err){
            if (err) throw err;
            return res.status(202).send();
            console.log('saved into db.json')
        });




    
    });
});
    