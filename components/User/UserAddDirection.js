import React, { useEffect, useState } from 'react';
import { Grid, Dropdown, Form, Label, TextArea, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { createUserAddress, updateUserAddress } from '../../api/user';
import { size } from 'lodash';

const UserAddDirection = ({ setShow, setReloadDirections, newAddress, address }) => {

    const { user, logout } = useAuth();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (address) {
            setActive(true);
            setData({
                title: address.title,
                canton: address.canton,
                cuidad: address.cuidad,
                calle: address.calle,
            })
        }
    }, [address])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        setLoading(true);
        if (size(data.title) > 0 && size(data.canton) > 0 && size(data.cuidad) > 0 && size(data.calle) > 0) {
            const urlA = (data.title);
            const urlLower = urlA.replace(/\s+/g, '');
            const urlAccent = urlLower.toLowerCase();
            const urlPoint = urlAccent.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const urlSlash = urlPoint.replace(/\./g, '');
            const validate = urlSlash.replace(/\//g, '');
            const option ={
                opcion1: 'retiroenellocal',
                opcion2: 'retirarenellocal',
            };
            if(validate === option.opcion1 || validate === option.opcion2 ){
                toast.error('Titulos de dirección no permitidos');
            } else{
                if (newAddress) {
                    await addAddress(data);
                } else {
                    await updateAddress(data);
                }
            }
        } else {
            toast.error('Debe llenar todos los campos');
        }
        setLoading(false);
    }

    const addAddress = async (data) => {
        setLoading(true);
        const dataUser = {
            ...data,
            users_permissions_user: user.id
        };
        const response = await createUserAddress(user.id, dataUser, logout);
        if (!response) {
            toast.error(response);
        } else {
            toast.success('Dirección Agregada');
            setShow(false);
            setReloadDirections(true);
        }
        setLoading(false);
    }

    const updateAddress = async (formData) => {
        setLoading(true);
        const data = {
            ...formData,
            users_permissions_user: user.id
        };
        const response = await updateUserAddress(address.id, data, logout);
        if (!response) {
            toast.error(response);
        } else {
            toast.success('Dirección Modificada');
            setShow(false);
            setReloadDirections(true);
        }
        setLoading(false);
    }

    const handleChange = (e, { value }) => {
        setActive(true);
        setData({
            ...data,
            canton: value,
        });
    }
    const handleChangeCuidad = (e, { value }) => {
        setData({
            ...data,
            cuidad: value,
        });
    }
    const handleChangeTextTitle = (e, { value }) => {
        setData({
            ...data,
            title: value,
        });
    }
    const handleChangeTextCalle = (e, { value }) => {
        setData({
            ...data,
            calle: value,
        });
    }

    const optionsCanton = [
        { key: '1', value: 'Latacunga', text: 'Latacunga' },
    ]
    const optionsParroquia = [
        { key: '1', value: 'Eloy Alfaro', text: 'Eloy Alfaro' },
        { key: '2', value: 'Ignacio Flores', text: 'Ignacio Flores' },
        { key: '3', value: 'Juan Montalvo', text: 'Juan Montalvo' },
        { key: '4', value: 'Mulaló', text: 'Mulaló' },
        { key: '5', value: 'La Matriz', text: 'La Matriz' },
        { key: '6', value: 'San Buenaventura', text: 'San Buenaventura' },
        { key: '7', value: 'Poaló', text: 'Poaló' },
    ]

    return (
        <>
            <Form className="__login_form">
                <Label>Titulo de la dirección:</Label>
                <Form.Input
                    type="text"
                    name="title"
                    placeholder="Casa/Oficina/etc"
                    autoComplete="off"
                    onChange={handleChangeTextTitle}
                    value={data.title}
                />
                <Label>Canton:</Label>
                <Dropdown
                    style={{
                        padding: '10px',
                        fontSize: 15,
                        marginBottom: 10,
                    }}
                    placeholder='Selecciona una opción'
                    options={optionsCanton}
                    onChange={handleChange}
                    value={data.canton}
                    name="canton"
                    fluid
                    selection
                />
                <Label>Parroquia:</Label>
                <Dropdown
                    style={{
                        padding: '10px',
                        fontSize: 15,
                        marginBottom: 10,
                    }}
                    placeholder='Selecciona una opción'
                    options={
                        active &&
                        optionsParroquia}
                    onChange={handleChangeCuidad}
                    value={data.cuidad}
                    name="cuidad"
                    fluid
                    selection
                />
                <Label>Calles:</Label>
                <Form.Input
                    type="text"
                    name="calle"
                    placeholder="Av. Colombia"
                    autoComplete="off"
                    onChange={handleChangeTextCalle}
                    value={data.calle}
                />

                <div className="active">
                    <Button type="submit" className="submit" loading={loading} onClick={handleSubmit}>
                        {newAddress ? 'Crear Dirección' : 'Actualizar Dirección'}
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default UserAddDirection;