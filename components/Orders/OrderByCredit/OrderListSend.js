import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { map } from 'lodash';
import OrderIdPedido from './OrderIdPedido';

const OrderListSend = ({ orderList }) => {

    const [total, setTotal] = useState(null);

    useEffect(() => {
        let list = 0;
        map(orderList, (order) =>{
            if(order.estadoEntrega === 'Entregado'){
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
                                    if(order.estadoEntrega === 'Entregado')
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
                                    >Tus compras no han sido entregadas aún.</h2>
                                    <p>Muy pronto un administrador despachara tus compras realizadas</p>
                                </div>
                            }
                        </Grid>
                    )
            }
        </>
    )
}

export default OrderListSend;
