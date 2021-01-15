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

router.post('/', (req, res) => {
    Projects.insert(req.body)
    .then(newProject=> {
        if(!newProject.name || !newProject.description){
            res.status(400).json({message: 'please include an name & description'})
        }else{
            res.status(202).json(newProject)
        }
    })
    .catch(error => {
        res.status(500).json({message: 'there was an error while trying to create new project'})
    })
})

router.put('/:id', (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project=> {
        if(!project.name|| !project.description){
            res.status(400).json({message: 'please include project name & description'})
        }else{
        res.status(200).json(project)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'error updating project'
        })
    })
})

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(project=> {
        if (!project){
            res.status(400).json({message: 'The project with this id does not exist'})
        }else{
            res.status(200).json({message: 'project successfully deleted'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'something went wrong trying to delete project'})
    })
})
module.exports = router