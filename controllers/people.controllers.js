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
  const getAllPerson = async(req, res) => {
    try {
      const people = await People.find();
      res.status(200).json(people);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


  const updatePerson = async (req, res) => {
    const id = req.params.id;
      try {
        const person = await People.findByIdAndUpdate(id, req.body, { new: true });

        if(!person){
          return res.status(404).json({ message: "Person not found." });
        }

        res.status(200).json(person);
      } catch (error) {
        res.status(400).json({ message: error.message });
        console.log('Failed to update person', error);
      };
    }


    const deletePerson = async(req, res)  => {
      const id = req.params.id;
       try {
         const deletedPerson = await People.findByIdAndDelete(id);

         if (!deletedPerson) {
          return res.status(404).json({ message: "Person not found." });
         }

         res.status(200).json({ message: "Person deleted successfully.", deletedPerson });

       } catch (error) {
         res.status(400).json({ message: error.message });
         console.log('Failed to delete person', error);
       }
    }


    const personById = async(req, res) => {
          const personId = req.params.id;
          try {
            if(!personId) {
              return res.status(404).json({ message: "Person not found." });
            }
            const person = await People.findById(personId);
            return res.status(200).json(person);
          } catch (error) {
            
          }
    }
 


  export  { createPerson, getAllPerson, updatePerson, deletePerson, personById };