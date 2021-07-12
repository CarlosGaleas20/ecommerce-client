import { size } from 'lodash';
import React, { useEffect, useState } from 'react'
import Seo from '../components/Seo';
import BasicLayout from '../layouts/BasicLayout';
import { getDatosEmpresa, getMarcas } from '../api/categories'
import { Loader } from 'semantic-ui-react';
import InfoEmpresa from '../components/About/InfoEmpresa';

const About = () => {

    const [datos, setDatos] = useState(null);
    const [marcas, setMarcas] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await getDatosEmpresa();
            if (size(response) > 0) setDatos(response);
            else (setDatos({}));
        })()
    }, [])

    useEffect(() => {
        (async () => {
          const response = await getMarcas();
          if (size(response) > 0) setMarcas(response);
          else (setMarcas([]));
        })()
      }, [])

    const title = 'Sobre Nosotros - Señor de Maca';
    const description = 'Sobre Nosotros';
    return (
        <>
            <BasicLayout>
                <Seo title={title} description={description} />
                {
                    !datos
                        ? (<Loader active>Cargando</Loader>)
                        : (<InfoEmpresa datos={datos} marcas={marcas} />)
                }
            </BasicLayout>
        </>
    )
}

export default About;
