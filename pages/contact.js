import { size } from 'lodash';
import React, { useEffect, useState } from 'react'
import Seo from '../components/Seo';
import BasicLayout from '../layouts/BasicLayout';
import { Loader } from 'semantic-ui-react';
import { getInfoContact } from '../api/order';
import ContactBody from '../components/Contact/ContactBody';

const Contact = () => {

    const [info, setInfo] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await getInfoContact();
            if (size(response) > 0) setInfo(response);
            else (setInfo({}));
        })()
    }, [])



    const title = 'Contactenos - Señor de Maca';
    const description = 'Sobre Nosotros';
    return (
        <>
            <BasicLayout>
                <Seo title={title} description={description} />
                {
                    !info
                        ? (<Loader active>Cargando</Loader>)
                        : (<ContactBody info={info} />)
                }
            </BasicLayout>
        </>
    )
}

export default Contact;
