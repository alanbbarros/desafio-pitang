import React, { useState, useEffect } from 'react'
import axios from '../service/api';
import { Table, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const List = () =>{

    const [bookings, setBookings] = useState([]);
    const [annotation, setAnnotation] = useState([]);

    toast.configure();

    const statusHandler = async (booking) =>{
        try{
            const newStatus = !booking.isVaccinated;
            const data = await axios.put(`/schedules/${booking._id}`, {isVaccinated: newStatus})
            newStatus ? toast.success(`${booking.name} marcado como vacinado`) : toast.success(`${booking.name} marcado como não vacinado`)
            fetchBookings();
        }catch(e){
            console.log({message: e});
        }
    }

    const commentHandler = async (booking) =>{
        try{
            const data = await axios.put(`/schedules/${booking._id}`, {annotation: annotation})
            toast.success(`Novo Comentário adicionado ao paciente ${booking.name}`)
            fetchBookings();
            setAnnotation();
        }catch(e){
            console.log({message: e});
        }
    }

    const deleteHandler = async (booking) =>{
        try{
            await axios.delete(`/schedules/${booking._id}`)
            toast.success(`${booking.name} removido`)
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
                <th>Status do Paciente</th>
                <th>Alterar Status do Paciente</th>
                <th>Editar Anotação</th>
                <th>Anotações</th>
                <th>Remover</th>
                </tr>
            </thead>

            <tbody>
                {
                bookings.map(booking =>{ 
                    return(
                    <tr key={booking._id}>
                    <td>{booking.name}</td>
                    <td>{booking.birthDate}</td>
                    <td>{booking.bookDate}</td>
                    <td>{booking.bookHour}:00 {booking.bookHour > 11 ? 'PM' : 'AM'}</td>
                    <td>{booking.isVaccinated ? 'VACINADO' : 'NÃO VACINADO'}</td>
                    <td> <Button variant='secondary' onClick={() => statusHandler(booking)} >Alterar Status</Button></td>
                    <td>
                    <input onChange={(e) => setAnnotation(e.target.value)} />
                    <Button type='submit' onClick={(e) => commentHandler(booking)} >+</Button>
                    </td>
                    <td>{booking.annotation}</td>
                    <td><Button size='sm' variant="danger" onClick={() => deleteHandler(booking)} >Remover</Button></td>
                </tr>
                )})
                }
            </tbody>
            </Table>
        </div>
    )
}

export default List;