import React, { useState } from 'react';
import { Form, Button, Label } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { registerMesages } from '../../api/order';

const ContactForm = () => {

    const [loading, setLoading] = useState(false);

    const initialValues = {
        nombre:'',
        email: '',
        asunto: '',
        mensaje: ''
    };

    const validations = () => ({
        nombre: Yup.string().required('El nombre es obligartio'),
        email: Yup.string().email().required('El email es obligatorio'),
        asunto: Yup.string().required('el asunto es obligatorio'),
        mensaje: Yup.string().required('El mensaje es obligartio'),
    });

    const {handleSubmit, handleChange, errors, values} = useFormik({
        initialValues,
        validationSchema: Yup.object(validations()),
        onSubmit: async(formData) =>{
            setLoading(true);
            const response = await registerMesages(formData);
            if(response){
                toast.success('Mensaje Enviado');
                resetForm();
            }else {
                toast.error('Hubo algun error');
                
            }
            setLoading(false);
        }
    })

    const resetForm = () => {
        values.nombre = '';
        values.email = '';
        values.asunto = '';
        values.mensaje = '';
    }


    return (
        <>
            <Form className="__login_form" onSubmit={handleSubmit}>
                <Label>Ingresa tu nombre:</Label>
                <Form.Input 
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre"
                    autoComplete="off"
                    onChange={handleChange}
                    error={errors.nombre}
                    value={values.nombre}
                />
                <Label>Ingresa tu correo:</Label>
                <Form.Input 
                    type="text"
                    name="email"
                    placeholder="Tu correo"
                    autoComplete="off"
                    onChange={handleChange}
                    error={errors.email}
                    value={values.email}
                />
                <Label>Ingresa el asunto:</Label>
                <Form.Input 
                    type="text"
                    name="asunto"
                    placeholder="Asunto"
                    autoComplete="off"
                    onChange={handleChange}
                    error={errors.asunto}
                    value={values.asunto}
                />
                <Label>Ingresa el mensaje:</Label>
                <Form.Input 
                    type="text"
                    name="mensaje"
                    placeholder="Tu mensaje"
                    autoComplete="off"
                    onChange={handleChange}
                    error={errors.mensaje}
                    value={values.mensaje}
                />

                <Button type="submit" className="submit" loading={loading}>Enviar</Button>

            </Form>
        </>
    )
}

export default ContactForm;
