const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());

const patientRoute = require('./src/routes/patient.route');

app.use(cors());
app.use('/schedule', patientRoute)


app.get('/', (req, res) =>{
    res.send('testinggggag');
});

///CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true 
    }, 
    () => console.log('CONECTAMO')
    );


app.listen(process.env.PORT);

