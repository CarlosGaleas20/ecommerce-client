import React, { useState } from 'react';
import { Form, Button, Label } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { resetPasswordUser , loginUser } from '../../../api/user';
import useAuth from '../../../hooks/useAuth';

const LoginPage = ({changeRegister, setShow}) => {

    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const initialValues = {
        identifier:'',
        password: ''
    };

    const validations = () => ({
        identifier: Yup.string().email().required('El email es obligatorio'),
        password: Yup.string().required('La contraseña es obligatorio')
    });

    const {handleSubmit, handleChange, errors, setErrors, values} = useFormik({
        initialValues,
        validationSchema: Yup.object(validations()),
        onSubmit: async(formData) =>{
            setLoading(true);
            const response = await loginUser(formData);
            if (response?.jwt) {
                if (response.user.type === 'User') {
                  if (response.user.active) {
                    login(response.jwt);
                    toast.success(`Bienvenido: ${response.user.name} ${response.user.lastname}`);
                    setShow(false);
                  } else {
                    toast.error(`Su cuenta no esta activa. Comuniquese con un administrador.`);
                  }
                } else {
                  toast.error(`Credenciales de la cuenta no validos`);
                }
              } else {
                toast.error(`Error de inicio: ${response.message[0].messages[0].message}`);
              }
              setLoading(false);
        }
    })

    const resetPassword = () =>{
        setErrors({});
        const validateEmail = Yup.string().email().required();

        if(!validateEmail.isValidSync(values.identifier)) {
            setErrors({identifier: 'Es necesario el correo para recuperar la contraseña'});
        }else{
            resetPasswordUser(values.identifier);
        }
    }

    return (
        <>
            <Form className="__login_form" onSubmit={handleSubmit}>
                <Label>Ingresa tu correo:</Label>
                <Form.Input 
                    type="text"
                    name="identifier"
                    placeholder="carlos@gmail.com"
                    autoComplete="off"
                    onChange={handleChange}
                    error={errors.identifier}
                />
                <Label>Ingresa tu contraseña:</Label>
                <Form.Input 
                    type="password"
                    name="password"
                    placeholder="*******"
                    autoComplete="off"
                    onChange={handleChange}
                    error={errors.password}
                />

                <div className="active">
                    <Button type="submit" className="submit" loading={loading}>Ingresar</Button>
                    <div className="sub-active">
                        <Button type="button" onClick={resetPassword}>Olvidaste tu contraseña?</Button>
                        <Button type="button" basic onClick={changeRegister}>No tienes una cuenta? Registrate Gratis</Button>
                    </div>
                    
                </div>
            </Form>
        </>
    )
}

export default LoginPage;
