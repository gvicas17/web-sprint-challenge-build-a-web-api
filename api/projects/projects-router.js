// Write your "projects" router here!
const Projects = require('./projects-model')
const express = require('express');
const router = (express.Router())
const{ checkNewProject } =require('../middleware/index')
router.get('/', async (req, res, next) => {
    Projects.get()
    .then(projects => {
        if(projects){
            res.status(200).json(projects)
        }else{
            res.status(400).json([])
        }
    })
    .catch(err =>{
        next(err)
    })
  });


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

router.get('/:id/actions', (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        if (project){
            res.status(200).json(project.actions)
        }else{
            res.status(404).json([])
        }
    })
    .catch(err => {
        res.status(500).json({message: 'error retrieving the project'})
    })
})


router.post('/', checkNewProject, (req, res) => {
    Projects.insert(req.body)
    .then(newProject=> {
            res.status(202).json(newProject)
        })
    .catch(error => {
        res.status(500).json({message: 'there was an error while trying to create new project'})
    })
})

router.put('/:id', checkNewProject, (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project=> {
        res.status(200).json(project)
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
            res.status(404).json({message: 'The project with this id does not exist'})
        }else{
            res.status(200).json({message: 'project successfully deleted'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'something went wrong trying to delete project'})
    })
})
module.exports = router