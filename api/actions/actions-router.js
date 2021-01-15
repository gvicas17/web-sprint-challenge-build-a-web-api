// Write your "actions" router here!
const Actions = require('./actions-model')
const express = require('express');
const router = express.Router()
const {checkNewAction} = require('../middleware/index')


router.get('/', async (req, res, next) => {
    Actions.get()
    .then(actions => {
        if(actions){
            res.status(200).json(actions)
        }else{
            res.status(400).json([])
        }
    })
    .catch(err => {
        next(err)
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



router.post('/', checkNewAction, (req, res) => {
    Actions.insert(req.body)
    .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(err => {
            res.json(500).json(err)
        })
    })


router.put('/:id', checkNewAction, (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action)
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