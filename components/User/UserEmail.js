import React, { useState } from 'react';
import { Form, Button, Label } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import { updateEmailUser } from '../../api/user';

const UserEmail = ({ user, logout, setReloaderUser }) => {

    const [loading, setLoading] = useState(false);

    const { id, email } = user;

    const initialValues = {
        email: '',
        repeatEmail: ''
    };

    const validations = () => ({
        email: Yup.string()
            .email()
            .required('Debe ingresar nuevamente el correo')
            .oneOf([Yup.ref('repeatEmail')], 'Los correos deben ser iguales'),
        repeatEmail: Yup.string()
            .email()
            .required('Debe ingresar nuevamente el correo')
            .oneOf([Yup.ref('email')], 'Los correos deben ser iguales')
    });

    const { handleSubmit, handleChange, errors } = useFormik({
        initialValues,
        validationSchema: Yup.object(validations()),
        onSubmit: async(formData) => {
            setLoading(true);
            const response = await updateEmailUser(id, formData.email, logout);
            if(!response){
                toast.error(response);
            } else {
                setReloaderUser(true);
                toast.success('Correo actualizado');
            }
            setLoading(false);
        }
    })

    return (
        <>
            <Form className="__user_container" onSubmit={handleSubmit}>
                <div className="__user_container-user">
                    <h4>Cambie su correo: </h4>
                    <Label>Su email actual: {email}</Label>
                    <br />
                    <Label>Nuevo correo:</Label>
                    <Form.Input
                        type="text"
                        name="email"
                        placeholder="correo@gmail.com"
                        autoComplete="off"
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <Label>Repita el correo: </Label>
                    <Form.Input
                        type="text"
                        name="repeatEmail"
                        placeholder="correo@gmail.com"
                        autoComplete="off"
                        onChange={handleChange}
                        error={errors.repeatEmail}
                    />

                    <div className="active">
                        <Button type="submit" className="submit" loading={loading}>Actualizar</Button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default UserEmail;