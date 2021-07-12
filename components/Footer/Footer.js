import React from 'react';

const Footer = () => {

    const fecha = new Date().getFullYear();

    return (
        <>
            <div className="__footer">
                <div className="__footer_body">
                    ©{fecha} Señor de Maca S.A. Todos los derechos reservados
                </div>
            </div>
        </>
    )
}

export default Footer;
