const express = require('express');
const app = express();
const port = 3000;

const userData = [];

//serve static html page
app.use(express.static('public'))

//parser 
app.use(express.json())

//endpoints
app.get('/', (req, res) => {
    console.log('test')
})

//server listener
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})