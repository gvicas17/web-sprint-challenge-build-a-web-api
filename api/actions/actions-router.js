// Write your "actions" router here!
const Actions = require('./actions-model')
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    Actions.get(req.query)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the actions',
        });
      });
  });


router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
    .then(action => {
        if (action){
            res.status(200).json(action)
        }else{
            res.status(404).json({message: 'action with that id not found'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'error retrieving the action'})
    })
})

// router.post('/', (req, res) => {
//     Actions.insert(req.body)
//     .then(newAction => {
//         if(newAction)
//     })
// })

// router.put('/:id', (req, res) => {
    
// })

// router.delete('/:id', (req, res) => {

// })

module.exports = router