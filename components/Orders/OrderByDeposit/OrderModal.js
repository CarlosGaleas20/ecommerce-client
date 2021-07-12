import React, { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import ModalLogin from '../../Modales/ModalLogin/ModalLogin';
import { getOrdersByDepositByIdPedido } from '../../../api/order';
import useAuth from '../../../hooks/useAuth';
import OptionBody from './ModalOptions/OptionBody';

const OrderModal = ({ showModal, setShowModal, direccion, title, order, setReloadOrder }) => {

    const [orders, setOrders] = useState(null);
    const { auth, logout } = useAuth();

    useEffect(() => {
        (async () => {
            if (auth) {
                const response = await getOrdersByDepositByIdPedido(auth.idUser, order.idPedido, logout);
                setOrders(response);
            }
        })()
    }, [order])

    return (
        <>
            <ModalLogin
                show={showModal}
                setShow={setShowModal}
                size="lg"
                title={title}
            >
                {
                    orders
                        ? (
                            <OptionBody
                                order={order}
                                orders={orders}
                                direccion={direccion}
                                setReloadOrder={setReloadOrder}
                                setShowModal={setShowModal}
                            />
                        )
                        : (<Loader active>Cargando información</Loader>)
                }

            </ModalLogin>
        </>
    )
}

export default OrderModal;
