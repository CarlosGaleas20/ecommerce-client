import React from 'react';
import { Tab } from 'semantic-ui-react';
import OrderList from './OrderList';
import OrderListSend from './OrderListSend';
import OrderListDispatch from './OrderListDispatch';

const OrderCreditBody = ({orderList}) => {

    const panes = [
        {
            menuItem: 'Pedidos no despachados',
            render: ()=>(
                <Tab.Pane>
                    <OrderList
                        orderList={orderList}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Pedidos despachados',
            render: ()=>(
                <Tab.Pane>
                    <OrderListDispatch
                        orderList={orderList}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Pedidos entregados',
            render: ()=>(
                <Tab.Pane>
                    <OrderListSend
                        orderList={orderList}
                    />
                </Tab.Pane>
            )
        },
    ];
    return (
        <div>
            <Tab className="__product_data-tab" panes={panes} />
        </div>
    )
}

export default OrderCreditBody;