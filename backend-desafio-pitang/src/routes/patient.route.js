const express = require('express');
const router = express.Router();
const UserTeste = require('../models/patient.model');


// GET THE PATIENT
router.get('/', async (req, res) =>{   
    try{
        const user = await UserTeste.find()
        res.json(user.map(u => u.name))
    }catch(e){
        res.json({ message: e })
    }
})

//SUBMIT PATIENT
router.post('/', async (req, res) =>{
    const patient = new UserTeste({
        name: req.body.name,
        birthDate: req.body.birthDate,
        bookDate: req.body.bookDate
    });
    try{
    const savedPatient = await patient.save()
    res.json(savedPatient)
    }catch(error){
        res.json({message: `${error} CAI AQUIII`})
    }

})

router.get('/')

module.exports = router;