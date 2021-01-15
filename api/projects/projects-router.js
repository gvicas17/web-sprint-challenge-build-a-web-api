// Write your "projects" router here!
const Projects = require('./projects-model')
const express = require('express')
const router = (express.Router())

router.get('/', (req, res) => {
    Projects.get(req.query)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        if (project){
            res.status(200).json(project)
        }else{
            res.status(404).json({message: 'project with that id not found'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'error retrieving the project'})
    })
})

module.exports = router