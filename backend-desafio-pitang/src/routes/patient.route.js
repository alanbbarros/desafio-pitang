const express = require('express');
const router = express.Router();
const UserTeste = require('../models/patient.model');
const patientController = require('../controller/patient.controller');


// GET THE PATIENT
router.get('/schedules', patientController.getSchedules);
router.post('/schedules', patientController.setBooking);
router.put('/schedules/:bookingId', patientController.pickBooking)
router.delete('/schedules/:bookingId', patientController.deleteBooking)

//SUBMIT PATIENT


module.exports = router;