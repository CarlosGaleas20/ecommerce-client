import React from 'react';
import CategoriesProducts from './CategoriesProducts';

const Categories = ({categories}) => {

    return (
        <>
            <div className="__categories">
                <div className="__categories_title">
                    <h3>NUESTRAS LÍNEAS DE PRODUCTOS</h3>
                </div>
                <div className="__categories_body">
                    {
                        !categories
                        ? (<Loader active>Cargando categorías</Loader>)
                        : (<CategoriesProducts categories={categories} />)
                    }
                </div>
            </div>
        </>
    )
}

export default Categories;