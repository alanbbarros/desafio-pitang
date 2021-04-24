const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(bodyParser.json());

const patientRoute = require('./src/routes/patient.route');


//Middleware
app.use(cors());
app.use('/', patientRoute);

app.get('/', (req, res) =>{
    res.send('app.js');
});

///CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true 
    }, 
    () => console.log('CONECTADO AO BANCO')
    );


app.listen(process.env.PORT);


