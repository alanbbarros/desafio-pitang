import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import { Field, ErrorMessage } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import PTBR from 'date-fns/locale/pt-BR';

const Calendar = ({ label, name, ...rest }) => {

  return (
    <div>
      <label htmlFor={name} >{label}</label>
      <Field name={name}>
        {
          ({form, field}) =>{
            const { setFieldValue } = form
            const { value } = field
            return (
            <DatePicker 
            id={name} 
            {...field} 
            {...rest} 
            selected={value} 
            onChange={val => setFieldValue(name, val)}
            locale={PTBR}
            />
            )
          }
        }
      </Field>
      <ErrorMessage name={name} />
    </div>

  );
}

export default Calendar;