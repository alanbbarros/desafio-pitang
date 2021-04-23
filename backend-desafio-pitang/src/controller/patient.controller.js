
const { json } = require('body-parser');
const UserTeste = require('../models/patient.model');

class patientController{
//GET 

    async getSchedules(req, res){
        try{
            const data = await UserTeste.find();
            res.json(data)
        }catch(e){
            res.json({message: `${e} cai aqui`})
        }
    }

    async setBooking(req, res){
        const data = req.body
        console.log(data.birthDate);

        
        //VERIFICA A QUANTIDADE DE AGENDAMENTOS PARA ESSE HORÁRIO
        const hourCount = await UserTeste.countDocuments({bookdate: data.bookDate})
        console.log(hourCount);

        try{
        const savedPatient = await UserTeste.create({
            name: data.name,
            birthDate: data.birthDate,
            bookDate: data.bookDate,
            bookHour: data.bookHour,
            isVaccinated: false
        })
        res.send({savedPatient})
        console.log(savedPatient);
        }catch(error){
            res.json({message: `${error} CAI AQUIII`})
        }
    }

    async pickBooking(req, res){
        try{
        const data = await UserTeste.findById(req.params.bookingId)
        res.json(data);
        }catch(e){
            res.json({message: `${e} caimo pickBooking`})
        }
    }

    async deleteBooking(req, res){
        const { bookingId } = req.params;
        try{
            const schedule = await UserTeste.findByIdAndDelete(bookingId);
        }catch(e){
            console.log({message: `${e} PARAMO NO DELETEBOOKING`});
        }
    }

}

module.exports = new patientController();