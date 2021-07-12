import React from 'react';
import ListProductsTotal from './ListProductsTotal';

const ListProductsByCategory = ({products, category}) => {

    return (
        <>
        <div className="__products">
                <div className="__products_title">
                    <h3>{category}</h3>
                </div>
                <div className="__products_body">
                    {
                        !products
                        ? (<Loader active>Cargando productos</Loader>)
                        : (<ListProductsTotal products={products} />)
                    }
                </div>
        </div>
        </>
    )
}

export default ListProductsByCategory;
