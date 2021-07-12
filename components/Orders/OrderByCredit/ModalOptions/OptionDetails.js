import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { map } from 'lodash';
import Link from 'next/link';

const OptionDetails = ({ orders, direccion }) => {

    const { provincia, canton, cuidad, calle } = direccion;

    return (
        <>
            {
                direccion.title === 'Retiro en el local'
                    ? (
                        <>
                            <h3>Debes acercarte a la siguiente dirección a retirar tu producto.</h3>
                            <p>{canton}</p>
                            <p>{cuidad}</p>
                            <p>{calle}</p>
                            <div
                                style={{
                                    marginBottom: 50,
                                }}
                            ></div>
                        </>
                    )
                    : (
                        <>
                            <h3>El pedido se envio a la siguiente dirección:</h3>
                            <p>{direccion.title}</p>
                            <p>{provincia}</p>
                            <p>{canton}</p>
                            <p>{cuidad}</p>
                            <p>{calle}</p>
                        </>
                    )
            }
            <h3>Los productos comprados son:</h3>
            <Grid>
                {
                    map(orders, (order) => (
                        <Grid.Column mobile={16} tablet={16} computer={16} key={order._id}>
                            <div className="container">
                                <div className="container_info">
                                    <Link href={`/${order.producto.url}`}>
                                        <a>
                                            <Image src={order.producto.poster.url} alt={order.producto.title} />
                                        </a>
                                    </Link>
                                </div>
                                <div className="container_info-data">
                                    <h2>Nombre del producto: {order.producto.title}</h2>
                                    <p>Total a pagar: ${order.producto.price - ((order.producto.price * order.producto.discount)) / 100}</p>
                                    <p>Cantidad comprada: {order.totalProducto}</p>
                                </div>
                            </div>
                        </Grid.Column>
                    ))
                }
            </Grid>
        </>
    )
}

export default OptionDetails;
