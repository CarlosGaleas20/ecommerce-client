import React, { useState } from 'react';
import { Form, Button, Label } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import { registerUser } from '../../../api/user';

const RegisterPage = ({changeLogin}) => {

    const [loading, setLoading] = useState(false);

    const initialValues = {
        name:'',
        lastname: '',
        username: '',
        email: '',
        password: ''
    };

    const validations = () => ({
        name: Yup.string().required('El nombre es obligatorio'),
        lastname: Yup.string().required('El apellido es obligatorio'),
        username: Yup.string().required('El User Name es obligatorio'),
        email: Yup.string().email().required('El email es obligatorio'),
        password: Yup.string().min(6, true).required('La contraseña es obligatorio')
    });

    const {handleSubmit, handleChange, errors} = useFormik({
        initialValues,
        validationSchema: Yup.object(validations()),
        onSubmit: async(formData) =>{
            setLoading(true);
            const response = await registerUser(formData);
            if(response?.jwt){
                toast.success('Usuario Registrado Correctamente');
                changeLogin();
            }else {
                toast.error(`Error de registro: ${response.message[0].messages[0].message}`);
                
            }
            setLoading(false);
        }
    })

    return (
        <>
            <Form className="__login_form" onSubmit={handleSubmit}>
                <Label>Ingresa tu nombre:</Label>
                <Form.Input 
                    type="text"
                    name="name"
                    placeholder="Carlos"
                    autoComplete="off"
                    onChange={handleChange}
                    error={errors.name}
                />
                <Label>Ingresa tu apellido:</Label>
                <Form.Input 
                    type="text"
                    name="lastname"
                    placeholder="Galeas"
                    autoComplete="off"
                    onChange={handleChange}
                    error={errors.lastname}
                />
                <Label>Ingresa tu UserName:</Label>
                <Form.Input 
                    type="text"
                    name="username"
                    placeholder="Carlos20"
                    autoComplete="off"
                    onChange={handleChange}
                    error={errors.username}
                />
                <Label>Ingresa tu correro:</Label>
                <Form.Input 
                    type="text"
                    name="email"
                    placeholder="carlos@gmail.com"
                    autoComplete="off"
                    onChange={handleChange}
                    error={errors.email}
                />
                <Label>Ingresa una contraseña:</Label>
                <Form.Input 
                    type="password"
                    name="password"
                    placeholder="*******"
                    autoComplete="off"
                    onChange={handleChange}
                    error={errors.password}
                />

                <div className="active">
                    <Button type="submit" className="submit" loading={loading}>Registrate</Button>
                    <Button type="button" basic onClick={changeLogin}>Tienes una cuenta? Logueate</Button>
                </div>
            </Form>
        </>
    )
}

export default RegisterPage;
