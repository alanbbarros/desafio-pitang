
const { json } = require('body-parser');
const UserTeste = require('../models/patient.model');
var firstSortBy = require('thenby');

class patientController{
//GET 

    async getSchedules(req, res){


        try{
            const data = await UserTeste.find();

            const newData = data.sort(firstSortBy('bookDay').thenBy('bookHour'))
            res.json(newData)
        }catch(e){
            res.json({message: `${e} cai aqui`})
        }
    }

    async setBooking(req, res){
        try{
        const data = req.body

        //VERIFICA A QUANTIDADE DE AGENDAMENTOS PARA ESSE HORÁRIO
        const maxHorario = 2;
        const maxDia = 20;
        const hourCount = await UserTeste.find({bookHour: data.bookHour, bookDate: data.bookDate})
        const dayCount = await UserTeste.find({bookDate: data.bookDate})
        const younger = await UserTeste.find({bookDate: data.bookDate, bookHour: data.bookHour, birthDate: { $gte: data.birthDate}})

        if(dayCount.length < maxDia && hourCount.length < maxHorario){
            const savedPatient = await UserTeste.create({
                name: data.name,
                birthDate: data.birthDate,
                bookDate: data.bookDate,
                bookHour: data.bookHour,
                isVaccinated: false,
                annotation: ' '
            })
            res.send({savedPatient})
        }
        else if(younger){
            const replaceBooking = await UserTeste.findOneAndReplace(
                {bookDate: data.bookDate, bookHour: data.bookHour, birthDate: { $gte: data.birthDate}},
                {
                    name: data.name,
                    birthDate: data.birthDate,
                    bookDate: data.bookDate,
                    bookHour: data.bookHour,
                    isVaccinated: false,
                    annotation: ' '
                }
                )
            res.send(replaceBooking)
        }
        }catch(e){
            res.json({message: `${e} CAI AQUIII`})
        }
    }

    async updateBooking(req, res){
        const { bookingId } = req.params;
        try{
        console.log(req.body);
        const data = await UserTeste.findByIdAndUpdate(bookingId, req.body)
        res.json(data);
        }catch(e){
            res.json({message: `${e} caimo pickBooking`})
        }
    }

    async deleteBooking(req, res){
        const { bookingId } = req.params;
        try{
            const schedule = await UserTeste.findByIdAndDelete(bookingId);
            res.json(schedule)
        }catch(e){
            console.log({message: `${e} PARAMO NO DELETEBOOKING`});
        }
    }

}

module.exports = new patientController();