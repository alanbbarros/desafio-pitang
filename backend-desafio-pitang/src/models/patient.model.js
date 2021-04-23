const mongoose = require('mongoose')

const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birthDate:{
        type: String,
        required: true
    },
    bookDate:{
        type: String,
        required: true
    },
    bookHour:{
        type: String,
        required: true
    },
    isVaccinated:{
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Testando', patientSchema);