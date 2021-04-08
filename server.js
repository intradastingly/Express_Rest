const express = require('express');
const uuid = require('uuid');
const app = express();
const PORT = process.env.PORT || 3000;
const userData = require('./Users')

//serve static html page
app.use(express.static('public'))

//parser 
app.use(express.json())
app.use(express.urlencoded({extended: false}))

/* const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next()
}
app.use(logger) */

//Gets all Users
app.get('/api/users', (req, res) => {    
    res.json(userData)
})

//Gets single User
app.get('/api/users/:id', (req, res) => {
    const paramId = req.params.id
    const found = userData.find(user => user.id === paramId)
    found ? res.json(userData.filter(user => user.id === paramId)) 
          : res.status(400).json({msg: `No user with the id of ${paramId}`})
})

//Updates single User
app.put('/api/users/:id', (req, res) => {
    const paramId = req.params.id
    const found = userData.find(user => user.id === paramId)
    if(found){
        for(const user of userData){
            if(user.id === paramId){
                user.name = req.body.name ? req.body.name : user.name;
                user.email = req.body.email ? req.body.email : user.nemail;
                user.status = req.body.status ? req.body.status  : user.status ;
            }
            res.json({msg: 'Member updated', user})
        }
    } else {
        res.status(400).json({msg: `No user with the id of ${paramId}`})
    }
})

//Posts new user
app.post('/api/users', (req, res) => {
    
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: req.body.status
    }

    if(!newUser.name || !newUser.email || !newUser.status){
        return res.status(400).json({msg: 'Please include valid inputs'})
    }

    userData.push(newUser)
    res.status(201).json(userData)
})


app.delete('/api/users/:id', (req,res) => {
    const paramId = req.params.id
    const found = userData.find(user => user.id === paramId)
    const findIndex = userData.findIndex(a => a.id === paramId)
    console.log(findIndex)
    found ? res.json(userData.splice(findIndex, 1)) 
          : res.status(400).json({ msg: `No User with the id of ${paramId}`}) 
    res.json(userData)
})

//server listener
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})