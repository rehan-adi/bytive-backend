import express from 'express';
import {signupRootUser, login} from '../controllers/auth.controllers.js'

const router = express.Router();



// Create new person 
router.post('/signup', signupRootUser);
router.post('/login', login);


export default router;