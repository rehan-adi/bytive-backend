import express from 'express';
import {createPerson, getAllPerson, updatePerson, deletePerson } from '../controllers/people.controllers.js'

const router = express.Router();



// Create new person 
router.post('/create', createPerson);

// get all people
router.get('/allpeople', getAllPerson);

// update person 
router.put('/update/:id', updatePerson);

// delete person
router.delete('/delete/:id', deletePerson);


export default router;