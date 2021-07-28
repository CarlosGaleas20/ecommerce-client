import React, { useEffect, useState } from 'react';
import { size, forEach } from 'lodash';
import { getOrders, getOrdersByDeposit } from '../api/order';
import useAuth from '../hooks/useAuth';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import OrderBody from '../components/Orders/OrderBody';
import { Loader } from 'semantic-ui-react';
import { getInfoDeposit } from '../api/infoContact';
import Seo from '../components/Seo';

const Orders = () => {

    const [orders, setOrders] = useState(null);
    const [infoDeposit, setInfoDeposit] = useState(null);
    const [orderList, setOrderList] = useState(null);
    const [orderListDeposit, setOrderListDeposit] = useState(null);
    const [reloadOrder, setReloadOrder] = useState(false);
    const { auth, logout } = useAuth();


    useEffect(() => {
        (async () => {
            if (auth) {
                const response = await getOrders(auth.idUser, logout);
                setOrders(response);
                if (size(response) > 0) {
                    const orderListPrueba = [];
                    forEach(response, (data) => {
                        const found = orderListPrueba.find(element => element.idPedido === data.idPedido);
                        if (!found) {
                            orderListPrueba.push(data);
                        }
                    });
                    setOrderList(orderListPrueba);
                } else {
                    setOrderList([]);
                }
            }
        })()
    }, [auth])

    useEffect(() => {
        (async () => {
            if (auth) {
                const response = await getOrdersByDeposit(auth.idUser, logout);
                setOrders(response);
                if (size(response) > 0) {
                    const orderListPrueba = [];
                    forEach(response, (data) => {
                        const found = orderListPrueba.find(element => element.idPedido === data.idPedido);
                        if (!found) {
                            orderListPrueba.push(data);
                        }
                    });
                    setOrderListDeposit(orderListPrueba);
                } else {
                    setOrderListDeposit([]);
                }
            }
            setReloadOrder(false);
        })()
    }, [auth, reloadOrder])

    useEffect(() => {
        (async () => {
                const response = await getInfoDeposit(logout);
                setOrders(response);
                if (size(response) > 0) {
                    setInfoDeposit(response);
                } else {
                    setInfoDeposit([]);
                }
        })()
    }, [])

    const title = 'Tus compras - Señor de Maca';
    const description = 'Tus compras de productos realizadas';

    return (
        <BasicLayout className="__orders">
            <Seo title={title} description={description} />
            <div className="__orders_block">
                <div className="title">Compras</div>
                <div className="data">
                    {
                        size(orders) === 0
                            ? (<Loader active>Cargando compras</Loader>)
                            : <OrderBody 
                                orders={orders}
                                orderList={orderList}
                                orderListDeposit={orderListDeposit}
                                setReloadOrder={setReloadOrder}
                                infoDeposit={infoDeposit}
                            />
                    }
                </div>
            </div>
        </BasicLayout>
    )
}

export default Orders;
