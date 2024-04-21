import express from 'express';
import {createPerson, getAllPerson, updatePerson, deletePerson, personById } from '../controllers/people.controllers.js'
import auth from '../middleware/auth.js'

const router = express.Router();



// Create new person 
router.post('/create', auth, createPerson);

// get all people
router.get('/allpeople', getAllPerson);

// update person 
router.put('/update/:id', auth, updatePerson);

//single person
router.get('/singleperson/:id', auth, personById);

// delete person
router.delete('/delete/:id', auth, deletePerson);


export default router;