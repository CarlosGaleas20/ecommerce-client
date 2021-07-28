import React from 'react';

const ContactInfo = ({info}) => {

    const { email, telefono, direccion, horarioApertura } = info;

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
        </>
    )
}

export default ContactInfo;
