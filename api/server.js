const express = require('express');
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')
const server = express()

server.use(express.json())
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)
// n
// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.get('/', (req, res) => {
    res.send(
        `<h1>Welcome To Your To-Do List!!</h1>`
    )
})

module.exports = server;
