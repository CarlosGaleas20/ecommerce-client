import React, { useEffect, useState } from 'react';
import { size, forEach } from 'lodash';
import { Loader } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import useAuth from '../hooks/useAuth';
import { getFavoriteProduct } from '../api/favorites';
import ListProductsByCategory from '../components/Products/ListProductsByCategory';
import { useRouter } from 'next/router';
import Seo from '../components/Seo';

const WishList = () => {

    const [products, setProducts] = useState(null);
    const { auth, user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!auth && !user) {
            router.replace('/');
            toast.error('Debe estar logueado para acceder');
            return null;
        }
        return null;
    }, [auth])

    useEffect(() => {
        if(user){
            (async () => {
                const response = await getFavoriteProduct(user.id, logout);
                if (size(response) > 0) {
                    const productList = [];
                    forEach(response, (data) => {
                        productList.push(data.producto);
                    });
                    setProducts(productList)
                } else {
                    setProducts([]);
                }
            })()
        }
    }, [])

    const title = 'Tus favorítos - Señor de Maca';
    const description = 'Tus productos favorítos';

    return (
        <>
            {
                (auth && user)
                    ? (
                        <BasicLayout className="__products_favorites">
                            <Seo title={title} description={description} />
                            <div className="__products_favorites-block">
                                <div className="title">
                                    Lista de Favoritos
                                </div>
                                <div className="data">
                                    {!products && <Loader active>Cargando Productos</Loader>}
                                    {products && size(products) === 0
                                        && (
                                            <div className="data-not-found">No hay productos favoritos</div>
                                        )}
                                    {size(products) > 0
                                        && (<ListProductsByCategory products={products} />)
                                    }
                                </div>
                            </div>
                        </BasicLayout>
                    )
                    : (<Loader active>Verificando Usuario</Loader>)
            }
        </>
    )
}

export default WishList;
