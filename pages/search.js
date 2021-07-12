import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { size } from 'lodash';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import { searchProducts } from '../api/products';
import { Loader } from 'semantic-ui-react';
import ListProductsByCategory from '../components/Products/ListProductsByCategory';

const Search = () => {

    const [products, setProducts] = useState(null);
    const { query } = useRouter();

    useEffect(() => {
        document.getElementById("searh-product").focus();
    }, [])

    useEffect(() => {
        (async () => {
            if (size(query.query) > 0) {
                const response = await searchProducts(query.query);
                if (size(response) > 0) setProducts(response);
                else setProducts([])
            } else setProducts([]);
        })()
    }, [query])



    return (
        <>
            <BasicLayout className="__search">
                {!products && <Loader active>Cargando Productos</Loader>}
                {products && size(products) === 0
                    && (
                        <div className="data-not-found">No hay productos</div>
                    )}
                {size(products) > 0
                    && (<ListProductsByCategory products={products} />)
                }
            </BasicLayout>

        </>
    )
}

export default Search;
