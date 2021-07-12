import React, { useState } from 'react';
import { Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import moment from 'moment';
import 'moment/locale/es';
import OrderModal from './OrderModal';

const OrderItem = ({order}) => {

    const { producto, totalPedido, createdAt, direccion } = order;
    const { title, poster, url } = producto;
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="container">
                <div className="container_info">
                    <Link href={`/${url}`}>
                        <a>
                            <Image src={poster.url} alt={title} />
                        </a>
                    </Link>
                </div>
                <div className="container_info-data">
                    <h2>{title}</h2>
                    <p>${totalPedido}</p>
                </div>
                <div className="container_other">
                    <p className="container_other-date">
                        {moment(createdAt).format('L')} - {moment(createdAt).format('LT')}
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
                    title={title}
                    direccion={direccion}
                />
            </div>
        </>
    )
}

export default OrderItem;