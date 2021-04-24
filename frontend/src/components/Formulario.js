import { React, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from './DatePicker'
import * as Yup from 'yup';
import moment from 'moment';
import {
    setHours,
    setMinutes,
    addDays,
    getDate,
    getMonth,
    getYear,
    getHours
  } from 'date-fns';
import axios from '../service/api';
import {
    Button, Col, Row, Card
  } from 'react-bootstrap';
import Toast from 'react-toastify';
import '../App.css';
import { toast, ToastContainer } from 'react-toastify';


const initialValues = {
    name:'',
    birthDate: null,
    bookDate: null,
}

const validationSchema = Yup.object({
    name: Yup.string().required('Nome Obrigatório!'),
    birthDate: Yup.date().required('Data de Nascimento Obrigatória!'),
    bookDate: Yup.date().required('Agendamento Obrigatório!'),
})

let submitSucess = false;
 
const Formulario = () =>{
 
    const onSubmit = async values =>{

        const patient = {
            name: values.name,
            birthDate: `${getDate(values.birthDate)}/${getMonth(values.birthDate)+1}/${getYear(values.birthDate)}`,
            bookDate: `${getDate(values.bookDate)}/${getMonth(values.bookDate)+1}/${getYear(values.bookDate)}`,
            bookHour: `${getHours(values.bookDate)}`,
            isVaccinated: false,
            annotation: ' '
        }

        try{
            await axios.post('/schedules', patient)
            submitSucess = true;
            toast.success('Usuário Criado Com Sucesso!')
        }catch(e){
            toast.warn('Algo deu errado... Tente se Cadastrar Novamente')
            console.log(e);
        }

    }

    return(
        <div>
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
            await onSubmit(values);

            submitSucess ? resetForm() : console.log('nao deu certo');
        }}
        > 
            <Form autoComplete="off">
                <Col>

                <Card>
                <label htmlFor='name' >Nome</label>
                <Field type='text' id='name' name='name'/>
                <ErrorMessage name='name' />
                </Card>
            
                <Card>
                <label htmlFor='birthDate' >Data de Nascimento</label>
                <DatePicker
                id='birthDate' 
                name='birthDate'
                maxDate = {new Date()}
                showYearDropdown
                dropdownMode="select"
                dateFormat='dd/MM/yyyy'
                />
                </Card>


                <Card>
                <label htmlFor='bookDate' >Data da Vacina</label>
                <DatePicker 
                id='bookDate' 
                name='bookDate'
                minDate = {new Date()}
                showTimeSelect
                includeTimes={[
                    setHours(setMinutes(new Date(), 0), 8),
                    setHours(setMinutes(new Date(), 0), 9),
                    setHours(setMinutes(new Date(), 0), 10),
                    setHours(setMinutes(new Date(), 0), 11),
                    setHours(setMinutes(new Date(), 0), 12),
                    setHours(setMinutes(new Date(), 0), 13),
                    setHours(setMinutes(new Date(), 0), 14),
                    setHours(setMinutes(new Date(), 0), 15),
                    setHours(setMinutes(new Date(), 0), 16),
                    setHours(setMinutes(new Date(), 0), 17),
                  ]}
                dateFormat='dd/MM/yyyy h:mm aa'
                />
                </Card>


                <Button type='submit' >Submit</Button >

                
                </Col>
            </Form>
        </Formik>

        </div>
    )
}
export default Formulario;