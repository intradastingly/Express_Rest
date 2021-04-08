const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const userData = require('./Users')

//serve static html page
app.use(express.static('public'))

//parser 
app.use(express.json())

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next()
}

app.use(logger)

//Gets all Users
app.get('/api/users', (req, res) => {    
    res.json(userData)
})

//Gets single User
app.get('/api/users/:id', (req, res) => {
    const found = userData.some(user => user.id === parseInt(req.params.id))
    if(found){
        res.json(userData.filter(user => user.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({msg: `No user with the id of ${req.params.id}`})
    }
})

//Posts new user
app.post('/api/users', (req, res) => {
    userData.push(req.body)
    res.status(201).json(req.body)
})

app.put('/api/users', (req, res) => {

})

app.delete('/api/users/:id', (req,res) => {
    console.log(req.params.id)
    const index = userData.find(user => user.id === parseInt(req.param.id))
    const deletedUser = userData.splice(index, 1)
    console.log(deletedUser)
    res.json(deletedUser)
})

//server listener
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})