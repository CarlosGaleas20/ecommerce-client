import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Loader } from 'semantic-ui-react';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import { getProductsByUrl } from '../api/products';
import ProductBody from '../components/Products/Product/ProductBody';

const Product = () => {

    const [product, setProduct] = useState(null);

    const { query } = useRouter();

    useEffect(() => {
        ( async() => {
            const response = await getProductsByUrl(query.product);
            setProduct(response);
        })()
    }, [query])

    return (
        <div>
            <BasicLayout className="__product_data" >
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
