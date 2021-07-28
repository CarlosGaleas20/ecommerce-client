import { size } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import { getCategories } from '../api/categories';
import Categories from '../components/Categories/Categories';
import Seo from '../components/Seo';
import BasicLayout from '../layouts/BasicLayout';

const ListCategories = () => {

    const [categories, setCategories] = useState(null);

    useEffect(() => {
        (async () => {
          const response = await getCategories();
          if (size(response) > 0) setCategories(response);
          else (setCategories([]));
        })()
      }, [])

    const title = 'Productos - Señor de Maca';
    const description = 'Nuestras Categorías';


    return (
        <>
            <BasicLayout>
                <Seo title={title} description={description} />
                {
                    !categories
                    ? (<Loader active>Cargando</Loader>)
                    : (<Categories categories={categories} />)
                }
            </BasicLayout>  
        </>
    )
}

export default ListCategories;
