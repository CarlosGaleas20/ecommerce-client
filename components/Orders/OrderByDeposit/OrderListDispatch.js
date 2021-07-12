import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { map } from 'lodash';
import OrderIdPedido from './OrderIdPedido';

const OrderList = ({ orderList, setReloadOrder }) => {

    const [total, setTotal] = useState(null)

    useEffect(() => {
        let list = 0;
        map(orderList, (order) =>{
            if(order.estadoEntrega === 'Despachado'){
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
                                    if(order.estadoEntrega === 'Despachado')
                                    return(
                                    <OrderIdPedido
                                        key={order.id}
                                        order={order}
                                        setReloadOrder={setReloadOrder}
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
                                    >No tienes compras despachadas.</h2>
                                    <p>Perfecto. Se han entregado todas tus compras.</p>
                                </div>
                            }
                        </Grid>
                    )
            }
        </>
    )
}

export default OrderList;
