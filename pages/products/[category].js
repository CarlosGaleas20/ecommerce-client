import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { size } from 'lodash';
import { Loader, Pagination } from 'semantic-ui-react';
import { getProductsByCategory } from '../../api/products';
import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import ListProductsByCategory from '../../components/Products/ListProductsByCategory';
import { getTotalProdcutsByCategory } from '../../api/categories';
import ProductsPagination from '../../components/Pagination/ProductsPagination';
import Seo from '../../components/Seo';


const Category = () => {

    const limitPage = 10;
    const { query } = useRouter();
    const [products, setProducts] = useState(null);
    const [totalProducts, setTotalProducts] = useState(null);
    const [title, setTitle] = useState('Categorías - Señor de Maca');
    const [description, setDescription] = useState('Tu Categorías');

    const getStartedItem = () => {
        const currentPage = parseInt(query.page);
        if(!query.page || currentPage === 1) return 0;
        else return currentPage * limitPage - limitPage;
    }

    useEffect(() => {
        (async () => {
            if(query.category) {
                const response = await getProductsByCategory(
                    query.category,
                    limitPage,
                    getStartedItem()
                );
                setProducts(response);
                if(size(response) > 0 ){
                    setTitle(`${response[0].category.title} - Señor de Maca`);
                    setDescription(`Los productos en la categoría: ${response[0].category.title}`)
                }
            }
        })()
    }, [query])

    useEffect(() => {
        (async () => {
            const response = await getTotalProdcutsByCategory(query.category);
            setTotalProducts(response);
            }
        )()
    }, [query])

    return (
        <BasicLayout>
            <div className="__index_container" >
            <Seo title={title} description={description} />
                {!products && <Loader active>Cargando Productos</Loader>}
                {products && size(products) === 0
                    && (
                        <div>No hay productos</div>
                    )}
                {size(products) > 0
                    && (<ListProductsByCategory products={products} category={query.category} />)
                }
                { totalProducts 
                    ? (<ProductsPagination 
                        totalProducts={totalProducts}
                        page={query.page ? parseInt(query.page) : 1}
                        limitPage={limitPage}
                        />)
                    : null
                }
            </div>
        </BasicLayout>
    )
}

export default Category;
