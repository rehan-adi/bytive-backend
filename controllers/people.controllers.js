import People from '../models/people.model.js'


// create new person 
const createPerson = async(req, res) => {
    try {
      const person = new People(req.body);
      const result = await person.save();
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // get all people
  const getAllPeople = async(req, res) => {
    try {
      const people = await People.find();
      res.status(200).json(people);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }



  export  { createPerson, getAllPeople };