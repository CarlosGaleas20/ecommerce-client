import React from 'react';
import { Tab } from 'semantic-ui-react';
import OrderCreditBody from './OrderByCredit/OrderCreditBody';
import OrderDepositBody from './OrderByDeposit/OrderDepositBody';
import DatsDeposit from './DatsDeposit';

const OrderBody = ({orderList, orderListDeposit, setReloadOrder, infoDeposit}) => {

    const panes = [
        {
            menuItem: 'Pedidos a traves de un Deposito Bancario',
            render: ()=>(
                <Tab.Pane>
                    <OrderDepositBody
                        orderList={orderListDeposit}
                        setReloadOrder={setReloadOrder}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Pedidos con tarjeta de crédito',
            render: ()=>(
                <Tab.Pane>
                    <OrderCreditBody
                        orderList={orderList}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Datos de la cuenta de deposito',
            render: ()=>(
                <Tab.Pane>
                    <DatsDeposit
                        infoDeposit={infoDeposit}
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

export default OrderBody;