import React, { useState } from 'react';
import { Form, Button, Label } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import { updateNameUser } from '../../api/user';

const UserData = ({ user, logout, setReloaderUser }) => {

    const [loading, setLoading] = useState(false);

    const { name, lastname, id } = user;

    const initialValues = {
        name: name,
        lastname: lastname
    };

    const validations = () => ({
        name: Yup.string().required('Su nombre es obligatorio'),
        lastname: Yup.string().required('Su apellido es obligatorio')
    });

    const { handleSubmit, handleChange, errors, values } = useFormik({
        initialValues,
        validationSchema: Yup.object(validations()),
        onSubmit: async(formData) => {
            setLoading(true);
            const response = await updateNameUser(id, formData, logout);
            if(!response){
                toast.error(response);
            } else {
                setReloaderUser(true);
                toast.success('Datos actualizados correctaemnte');
            }
            setLoading(false);
        }
    })

    return (
        <>
            <Form className="__user_container" onSubmit={handleSubmit}>
                <div className="__user_container-user">
                    <h4>Cambie sus datos: </h4>
                    <Label>Tu nombre:</Label>
                    <Form.Input
                        type="text"
                        name="name"
                        placeholder="Tu nombre"
                        autoComplete="off"
                        onChange={handleChange}
                        error={errors.name}
                        value={values.name}
                    />
                    <Label>Tu apellido:</Label>
                    <Form.Input
                        type="text"
                        name="lastname"
                        placeholder="Tu apellido"
                        autoComplete="off"
                        onChange={handleChange}
                        error={errors.lastname}
                        value={values.lastname}
                    />

                    <div className="active">
                        <Button type="submit" className="submit" loading={loading}>Actualizar</Button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default UserData;
