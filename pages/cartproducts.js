import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import { getProductsCartUser } from '../api/cart';
import CartBody from '../components/Cart/CartBody';
import useAuth from '../hooks/useAuth';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import { size, forEach } from 'lodash';
import { toast } from 'react-toastify';
import Seo from '../components/Seo';


export const Cartproducts = () => {

    const [products, setProducts] = useState(null);
    const [productsData, setProductsData] = useState(null);
    const [reload, setReload] = useState(false);
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
        if (user) {
            (async () => {
                const response = await getProductsCartUser(user.id, logout);
                if (size(response) > 0) {
                    const productList = [];
                    const productList1 = [];
                    forEach(response, (data) => {
                        productList.push(data.producto);
                        productList1.push(data);
                    });
                    setProducts(productList);
                    setProductsData(productList1);
                } else {
                    setProducts([]);
                    setProductsData([]);
                }
            })()
            setReload(false);
        }
    }, [auth, reload])

    const title = 'Tu carrito - Señor de Maca';
    const description = 'Tu carrito de compras';


    return (
        <>
            <BasicLayout className="__cart">
            <Seo title={title} description={description} />
                <div className="data">
                    {!products && <Loader active>Cargando Carrito</Loader>}
                    {products && size(products) === 0
                        && (
                            <div className="_data-not-found">No hay productos en el carrito</div>
                        )}
                    {size(products) > 0
                        && (<CartBody
                                products={products}
                                reloadCart={reload}
                                setReload={setReload}
                                productsData={productsData}
                            />)
                    }
                </div>

            </BasicLayout>
        </>
    )
}

export default Cartproducts;
