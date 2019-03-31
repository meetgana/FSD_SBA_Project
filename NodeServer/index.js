const express = require ('express');
const mongoose = require('mongoose')
const bodyparser = require('body-parser');
const cors = require('cors');
const user = require ('./routes/users');
const project = require ('./routes/projects');
const task = require ('./routes/task');
const parenttask = require ('./routes/parenttask')

const app = express();
app.use(cors());
app.use(bodyparser.json());

mongoose.connect('mongodb://localhost:27017/ProjectDB', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
let connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');

    //set up the middleware
    app.use('/users', user);
    app.use('/projects', project);
    app.use('/tasks', task);
    app.use('/parenttasks', parenttask);
    
    //start the Server
    app.listen(4000, () => {
        console.log (`Server is running in port 4000`); 
    })
})