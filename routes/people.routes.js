import express from 'express';
import {createPerson, getAllPeople} from '../controllers/people.controllers.js'

const router = express.Router();



// Create new person 
router.post('/create', createPerson);
router.get('/allpeople', getAllPeople);


export default router;