const express = require('express');
const router = express.Router();
const UserTeste = require('../models/patient.model');
const patientController = require('../controller/patient.controller');


// GET THE PATIENT
router.get('/schedules', patientController.getSchedules);
// ADD NEW PATIENT
router.post('/schedules', patientController.setBooking);
//UPDATE PATIENT BASED ON ID
router.put('/schedules/:bookingId', patientController.updateBooking)
//DELETE PATIENT
router.delete('/schedules/:bookingId', patientController.deleteBooking)



module.exports = router;