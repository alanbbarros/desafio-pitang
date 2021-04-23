import React, { useState, useEffect } from 'react'
import axios from '../utils/api';
import { Table, Button } from 'react-bootstrap';



const List = () =>{

    const [bookings, setBookings] = useState([]);
    const [estadoTeste, setEstadoTeste] = useState([]);


    console.log(estadoTeste);
    const statusHandler = async (booking) =>{
        try{
            const data = await axios.delete(`/schedules/${booking._id}`)
            data.data._id = !data.data._id;
        }catch(e){
            console.log({message: e});
        }
    }

    const fetchBookings = async () =>{
        try{
            const res = await axios.get('/schedules')
            setBookings(res.data)
        }
        catch(e){
            console.log(e);
        }
    }

    const teste = () =>{
        setEstadoTeste(['alan', 2]);
    }

    useEffect(() => {
        fetchBookings();
      }, [], );

    return(
        <div>
            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Data de Aniversário</th>
                <th>Data da Vacina</th>
                <th>Hora da Vacina</th>
                <th>Status</th>
                <th>Paciente Vacinado?</th>
                </tr>
            </thead>

            <tbody>
                {
                bookings.map(booking => (
                    <tr key={booking._id}>
                    <td>id</td>
                    <td>{booking.name}</td>
                    <td>{booking.birthDate}</td>
                    <td>{booking.bookDate}</td>
                    <td>{booking.bookHour}</td>
                    <td>{booking.isVaccinated ? 'sim' : 'nao'}</td>
                    <td key={booking.name} ><Button onClick={() => statusHandler(booking)} >test</Button></td>
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