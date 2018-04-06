const express = require('express');

const router = express.Router();

const db = require('../data/helpers/actionModel.js');

router.get('/', (req, res) => {
  db.get()
  .then(response => res.json(response))
  .catch(error => {
    res.status(500).json({ error: "acions information cannot be retrieved." });
  });
});

router.get('/:projectId', (req, res) => {
  const { projectId } = req.params;
  
  db.get(projectId)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(500).json({ error: "action information cannot be retrieved." });
  });
});

router.post('/', (req, res) => {
  const notes = req.body.notes;
  const description = req.body.description;
  const completed = req.body.completed;
  const newAction = req.body;
  
  if(!notes || !description) {
    res.status(400).json({ errorMessage: "Please provide notes and description for the project." })
  }
  
  db.insert(newAction)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while saving the action to the database." })
  });
  
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const action = req.body;
  
  db.update(id, action)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(500).json({ error: "The action information cannot be modified." });
  });
  
  
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let action;
  
  db.get(id)
  .then(response => {
    action = { ... response };
    
    db.remove(id) 
    .then(response => {
      if(response) {
        res.status(200).json({ deleted: action });
      } else {
        res.status(404).json({ message: "The action with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The action could not be removed" });
    });
    
  })
  .catch(error => {
    res.status(500).json({ error: "action information cannot be deleted." });
  });
  
})



module.exports = router;