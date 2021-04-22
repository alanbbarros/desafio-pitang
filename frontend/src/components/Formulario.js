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
    getYear
  } from 'date-fns';
import axios from 'axios';


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
 
const Formulario = () =>{
 
    const onSubmit = values =>{
        let ano = getYear(values.birthDate),
            mes = getMonth(values.birthDate),
            dia = getDate(values.birthDate)
        console.log(dia, mes+1, ano);
        console.log(`Vacina dia ${values.bookDate.getDate()} as ${values.bookDate.getHours()}:`);

        const patient = {
            name: values.name,
            birthDate: `${getDate(values.birthDate)}/${getMonth(values.birthDate)}/${getYear(values.birthDate)}`,
            bookDate: values.bookDate
        }

        axios.post('http://localhost:4000/schedule', patient)
            .then(res => console.log(res.data))
    }

    return(
        <div>
        <h1> Agendamento Vacina</h1>
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        > 
            <Form autoComplete="off">
                <label htmlFor='name' >Nome</label>
                <Field type='text' id='name' name='name'/>
                <ErrorMessage name='name' />
            
                <label htmlFor='birthDate' >Data de Nascimento</label>
                <DatePicker
                id='birthDate' 
                name='birthDate'
                maxDate = {new Date()}
                showYearDropdown
                dropdownMode="select"
                dateFormat='dd/MM/yyyy'
                />

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

                <button type='submit' >Submit</button>
            </Form>
        </Formik>
        </div>
    )
}
export default Formulario;