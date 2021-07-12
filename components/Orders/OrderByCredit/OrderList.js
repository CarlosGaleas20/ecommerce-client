import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { map } from 'lodash';
import OrderIdPedido from './OrderIdPedido';

const OrderList = ({ orderList }) => {

    const [total, setTotal] = useState(null)

    useEffect(() => {
        let list = 0;
        map(orderList, (order) =>{
            if(order.estadoEntrega === 'No entregado'){
                list = list + 1;
            }
        })
        setTotal(list);
    }, [orderList])

    return (
        <>
            {
                !orderList
                    ? (<h2>No has comprado ningun producto</h2>)
                    : (
                        <Grid>
                            {
                                map(orderList, (order) => {
                                    if(order.estadoEntrega === 'No entregado')
                                    return(
                                    <OrderIdPedido
                                        key={order.id}
                                        order={order}
                                    />
                                    )
                                })
                            }
                            {
                                total === 0 &&
                                <div style={{
                                    padding: 20,
                                    margin: 20,
                                    textAlign: 'center',
                                    width: '100%',
                                }}>
                                    <h2 style={{
                                        color: '#007bff'
                                    }}
                                    >Tus compras han sido entregadas.</h2>
                                    <p>Puedes realizar más compras de productos.</p>
                                </div>
                            }
                        </Grid>
                    )
            }
        </>
    )
}

export default OrderList;
