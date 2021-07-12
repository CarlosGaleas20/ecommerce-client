import React from 'react';
import Head from 'next/head';

const Seo = ({title, description}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta property="description" content={description} />
        </Head>
    )
}

Seo.defaultProps = {
    title: "Señor de Maca",
    description: "La mejor tienda para tus productos ferreteros",
}

export default Seo;
