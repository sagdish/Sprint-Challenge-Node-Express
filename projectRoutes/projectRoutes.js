const express = require('express');

const router = express.Router();

const db = require('../data/helpers/projectModel.js');

router.get('/', (req, res) => {
  db.get()
  .then(response => res.json(response))
  .catch(error => {
    res.status(500).json({ error: "projects information cannot be retrieved." });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db.get(id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(500).json({ error: "project information cannot be retrieved." });
  });
});

router.get('/actions/:id', (req, res) => {
  const { id } = req.params;
  
  db.getProjectActions(id)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(500).json({ error: "action information cannot be retrieved." });
  });
});

router.post('/', (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const completed = req.body.completed;
  const newProject = req.body;
  
  if(!name || !description) {
    res.status(400).json({ errorMessage: "Please provide name and description for the project." })
  }
  
  db.insert(newProject)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while saving the project to the database." })
  });
  
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const project = req.body;
  
  db.update(id, project)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(500).json({ error: "The post information cannot be modified." });
  });
  
  
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let project;
  
  db.get(id)
  .then(response => {
    project = { ... response };
    
    db.remove(id) 
    .then(response => {
      if(response) {
        res.status(200).json({ deleted: project });
      } else {
        res.status(404).json({ message: "The project with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The project could not be removed" });
    });
    
  })
  .catch(error => {
    res.status(500).json({ error: "project information cannot be deleted." });
  });
  
})



module.exports = router;