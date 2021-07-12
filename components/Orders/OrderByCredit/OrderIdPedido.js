import React, { useState } from 'react';
import { Grid, Icon, Image } from 'semantic-ui-react';
import Link from 'next/link';
import moment from 'moment';

import OrderModal from './OrderModal';

const OrderIdPedido = ({ order }) => {

    const [showModal, setShowModal] = useState(false);


    return (
        <>
            {
                order        
                    && (
                        <>
                            <Grid.Column mobile={16} tablet={8} computer={8}>
                                <div className="container">
                                    <div className="container_info">
                                        <Link href={`/${order.producto.url}`}>
                                            <a>
                                                <Image src={order.producto.poster.url} alt={order.producto.title} />
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="container_info-data">
                                        <h2>Su pedido</h2>
                                        <p>Total pagado: ${order.totalPedido}</p>
                                    </div>
                                    <div className="container_other">
                                        <p className="container_other-date">
                                            {moment(order.createdAt).format('L')} - {moment(order.createdAt).format('LT')}
                                        </p>
                                        <Icon
                                            name="eye"
                                            circular
                                            link
                                            onClick={() => setShowModal(true)}
                                        />
                                    </div>
                                    <OrderModal
                                        showModal={showModal}
                                        setShowModal={setShowModal}
                                        title={`Su id de pedido: ${order.idPedido}`}
                                        direccion={order.direccion}
                                        order={order}
                                    />
                                </div>
                            </Grid.Column>
                        </>
                    )
            }
        </>

    )
}

export default OrderIdPedido;
