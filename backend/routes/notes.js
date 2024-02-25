const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router()
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route 1 :Get All the Notes using: GET "/api/auth/getuser". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id });

        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send(" Internal server error");
    }


})
// Route 2 : Add a new  Notes using: POST "/api/auth/addnote". login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 1 }),

    body('description', 'description must be lengeth of 5 Characters').isLength({ min: 1 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If there are errors,reture bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savenote = await note.save()
        res.json(savenote)
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send(" Internal server error");
    }
})

// Route 3 : Update  an existing  Notes using: PUT "/api/auth/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a newnote object
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (title) { newNote.description = description };
        if (title) { newNote.tag = tag };

        //find the note to be upadte and upadte it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) {
            console.log(error.message);
            res.status(500).send(" Internal server error");
        }

    })



// Route 4 : Deleting an existing  Notes using: DELETE "/api/auth/deletenote". login required
router.delete('/deletingnote/:id', fetchuser, async (req, res) => {
    
    try {
        //find the note to be upadte and upadte it and delete
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleteing" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(" Internal server error");
    }
})
module.exports = router