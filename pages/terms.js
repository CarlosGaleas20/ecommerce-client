import { size } from 'lodash';
import React, { useEffect, useState } from 'react'
import Seo from '../components/Seo';
import BasicLayout from '../layouts/BasicLayout';
import { Loader } from 'semantic-ui-react';
import { getTerms } from '../api/order';
import Terminos from '../components/Contact/Terminos';

const Terms = () => {

    const [terminos, setTerminos] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await getTerms();
            if (size(response) > 0) setTerminos(response);
            else (setTerminos({}));
        })()
    }, [])



    const title = 'Terminos y Condiciones - Señor de Maca';
    const description = 'Sobre Nosotros';
    return (
        <>
            <BasicLayout>
                <Seo title={title} description={description} />
                {
                    !terminos
                        ? (<Loader active>Cargando</Loader>)
                        : (<Terminos terminos={terminos} />)
                }
            </BasicLayout>
        </>
    )
}

export default Terms;