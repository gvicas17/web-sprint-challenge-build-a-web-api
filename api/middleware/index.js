const Actions = require('../actions/actions-model')

function checkNewAction(req, res, next) {
    const {project_id, description, notes} = req.body
    if(project_id, description, notes){
        next()
    }else{
        res.status(400).json({message: 'please provide id, description, and notes'})
    }
    }

    function checkNewProject(req, res, next) {
        const {name, description} = req.body
        if(name, description){
            next()
        }else{
            res.status(400).json({message: 'please provide name and description'})
        }
        }

    module.exports= {checkNewAction, checkNewProject}