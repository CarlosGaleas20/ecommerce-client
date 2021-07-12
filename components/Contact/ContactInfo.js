import React from 'react';
import { Button } from 'semantic-ui-react';
import { sendEmailShop } from '../../api/email';

const ContactInfo = ({info}) => {

    const { email, telefono, direccion, horarioApertura } = info;

    const handleSend = async() => {
        const data ={
            mensaje: 'Ahora si sirve XD',
        }
        const response = await sendEmailShop(data);
        console.log(response);
    }

    return (
        <>
            <h4>Siempre antentos.</h4>
            <h4>Escribemos para solventar tus dudas</h4>
            <p className="description">Email:</p>
            <p>{email}</p>
            <p className="description">Teléfonos:</p>
            <p>{telefono}</p>
            <p className="description">Dirección:</p>
            <p>{direccion}</p>
            <p className="description">Horario de atención:</p>
            <p>{horarioApertura}</p>
            <Button
                onClick={handleSend}
            >
                Enviar
            </Button>
        </>
    )
}

export default ContactInfo;
