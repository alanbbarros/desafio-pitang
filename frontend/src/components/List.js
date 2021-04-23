import React, { useState, useEffect } from 'react'
import axios from '../utils/api';
import { Table, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const List = () =>{

    const [bookings, setBookings] = useState([]);
    const [estadoTeste, setEstadoTeste] = useState([]);

    toast.configure();

    const statusHandler = async (booking) =>{
        try{
            const newStatus = !booking.isVaccinated;
            const data = await axios.put(`/schedules/${booking._id}`, {isVaccinated: newStatus})
            toast.success();
            fetchBookings();
        }catch(e){
            console.log({message: e});
        }
    }

    const deleteHandler = async (booking) =>{
        try{
            await axios.delete(`/schedules/${booking._id}`)
            toast.success('Paciente Removido')
            fetchBookings();
        }catch(e){
            console.log({message: e});
        }
    }

    const fetchBookings = async () =>{
        try{
            const res = await axios.get('/schedules')
            setBookings(res.data)
            console.log(res.data);
        }
        catch(e){
            console.log(e);
        }
    }

    const teste = async () =>{
        setBookings([...bookings, {
            _id: 'a',
            name: 'lolll',
            birthDate: 'TESTE1',
            bookDate: 'TESTAE',
            bookHour: 'TESTEEE',
            isVaccinated: true
        }])
    }

    useEffect(() => {
        fetchBookings();
      }, [], );

    return(
        <div>
            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>Nome</th>
                <th>Data de Aniversário</th>
                <th>Data da Vacina</th>
                <th>Hora da Vacina</th>
                <th>Status</th>
                <th>Paciente Vacinado?</th>
                <th>Remover</th>
                </tr>
            </thead>

            <tbody>
                {
                bookings.map(booking => (
                    <tr key={booking._id}>
                    <td>{booking.name}</td>
                    <td>{booking.birthDate}</td>
                    <td>{booking.bookDate}</td>
                    <td>{booking.bookHour}:00 {booking.bookHour > 11 ? 'PM' : 'AM'}</td>
                    <td>{booking.isVaccinated ? 'sim' : 'nao'}</td>
                    <td key={booking.name} ><Button onClick={() => statusHandler(booking)} >Marcar Vacinação</Button></td>
                    <td><Button size='sm' variant="danger" onClick={() => deleteHandler(booking)} >Remover</Button></td>
                </tr>
                ))
                }
            </tbody>
            </Table>
            {
                estadoTeste.map(item =>(
                    <h2 key={item._id} >{item}</h2>
                ))
            }
            <Button onClick={() => teste()} >teste</Button>
        </div>
    )
}

export default List;