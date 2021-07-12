import React, { useState } from 'react';
import { Form, Button, Label } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import { updatePassUser } from '../../api/user';

const UserEmail = ({ user, logout, setReloaderUser }) => {

    const [loading, setLoading] = useState(false);

    const { id, email } = user;

    const initialValues = {
        password: '',
        repeatPassword: ''
    };

    const validations = () => ({
        password: Yup.string()
            .required('Debe ingresar una contraseña')
            .oneOf([Yup.ref('repeatPassword')], 'Los contraseñas deben ser iguales'),
        repeatPassword: Yup.string()
            .required('Debe ingresar la misma contraseña')
            .oneOf([Yup.ref('password')], 'Los contraseñas deben ser iguales')
    });

    const { handleSubmit, handleChange, errors } = useFormik({
        initialValues,
        validationSchema: Yup.object(validations()),
        onSubmit: async(formData) => {
            setLoading(true);
            const response = await updatePassUser(id, formData.password, logout);
            if(!response){
                toast.error(response);
            } else {
                setReloaderUser(true);
                toast.success('Contraseña actualizada');
            }
            setLoading(false);
        }
    })

    return (
        <>
            <Form className="__user_container" onSubmit={handleSubmit}>
                <div className="__user_container-user">
                    <h4>Cambie su contraseña: </h4>
                    <Label>Nuevo contraseña:</Label>
                    <Form.Input
                        type="password"
                        name="password"
                        placeholder="*******"
                        autoComplete="off"
                        onChange={handleChange}
                        error={errors.password}
                    />
                    <Label>Repita la contraseña: </Label>
                    <Form.Input
                        type="password"
                        name="repeatPassword"
                        placeholder="*******"
                        autoComplete="off"
                        onChange={handleChange}
                        error={errors.repeatPassword}
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