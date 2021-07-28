import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Loader } from 'semantic-ui-react';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import { getProductsByUrl } from '../api/products';
import ProductBody from '../components/Products/Product/ProductBody';
import Seo from '../components/Seo';
import { size } from 'lodash';

const Product = () => {

    const [product, setProduct] = useState(null);
    const [title, setTitle] = useState('Producto - Señor de Maca');
    const [description, setDescription] = useState('Tu Producto');

    const { query } = useRouter();

    useEffect(() => {
        ( async() => {
            const response = await getProductsByUrl(query.product);
            setProduct(response);
            if(size(response) > 0 ) {
                setTitle(`${response.title} - Señor de Maca`);
                setDescription(`Tu producto seleccionado: ${response.title}`)
            }
        })()
    }, [query])

    return (
        <div>
            <BasicLayout className="__product_data" >
            <Seo title={title} description={description} />
                {
                    !product
                    ? (<Loader active>Cargando Producto</Loader>)
                    : (<ProductBody product={product} />)
                }
            </BasicLayout>
        </div>
    )
}

export default Product;
