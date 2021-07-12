import React from 'react';
import { Loader } from 'semantic-ui-react';
import CategoriesList from './CategoriesList';

const TotalCategories = ({categories}) => {

    


    return (
        <>
            <div className="__total">
                <div className="__total_title">
                    <h3>NUESTRAS LÍNEAS DE PRODUCTOS</h3>
                </div>
                <div className="__total_body">
                    {
                        !categories
                        ? (<Loader active>Cargando categorías</Loader>)
                        : (<CategoriesList slides={categories} />)
                    }
                </div>
            </div>
        </>
    )
}

export default TotalCategories;
