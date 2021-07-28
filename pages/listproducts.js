import React, { useEffect, useState } from 'react';
import { size } from 'lodash';
import { Loader } from 'semantic-ui-react';
import { getProducts } from '../api/products';
import BasicLayout from "../layouts/BasicLayout";
import ListProductsByCategory from '../components/Products/ListProductsByCategory';
import Seo from '../components/Seo';


const ListProducts = () => {

  const [products, setProducts] = useState(null);

  

  useEffect(() => {
    ( async() => {
      const response = await getProducts(20);
      if(size(response) > 0) setProducts(response);
      else(setProducts([]));
    })()
  }, [])

    const title = 'Productos - Señor de Maca';
    const description = 'Nuestros Productos';

  return (
    <>
      <BasicLayout>
      <Seo title={title} description={description} />
        <div className="__index_container" >
          {!products && <Loader active>Cargando Productos</Loader>}
          {products && size(products) === 0 
          && (
            <div>No hay productos</div>
          )}
          {size(products) > 0 
            &&(<ListProductsByCategory products={products} />)
          }
        </div>
      </BasicLayout>
    </>
  )
}

export default ListProducts;