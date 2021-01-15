// Write your "actions" router here!
const Actions = require('./actions-model')
const express = require('express');
const e = require('express');
const router = express.Router()


router.get('/', (req, res) => {
    Actions.get(req.query)
    .then(actions => {
        if(actions){
            res.status(200).json(actions)
        }else{
            res.status(400).json([])
        }
    })
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

router.post('/', (req, res) => {
    Actions.insert(req.body)
    .then(newAction => {
        if(!newAction.project_id || !newAction.description || !newAction.notes){
            res.status(400).json({message: 'please include an id, description, and notes'})
        }else{
            res.status(202).json(newAction)
        }
    })
    .catch(error => {
        res.status(500).json({message: 'there was an error while trying to create new action'})
    })
})

router.put('/:id', (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        if(!action.project_id || !action.description || !action.notes){
            res.status(400).json({message: 'please include project id, description and notes'})
        }else{
        res.status(200).json(action)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'error updating action'
        })
    })
})

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(action => {
        if (!action){
            res.status(400).json({message: 'The post with this id does not exist'})
        }else{
            res.status(200).json({message: 'action successfully deleted'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'something went wrong trying to delete action'})
    })
})

module.exports = router