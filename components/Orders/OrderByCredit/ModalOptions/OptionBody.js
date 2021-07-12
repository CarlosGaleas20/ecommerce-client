import React from 'react';
import { Tab } from 'semantic-ui-react';
import Encuesta from './Encuesta';
import OptionDetails from './OptionDetails';

const OptionBody = ({ orders, direccion, order}) => {

    const panes = [
        {
            menuItem: 'Detalles del pedido',
            render: () => (
                <Tab.Pane>
                    <OptionDetails
                        orders={orders}
                        direccion={direccion}
                    />
                </Tab.Pane>
            )
        },
    ];

    const panesDispatch = [
        {
            menuItem: 'Detalles del pedido',
            render: () => (
                <Tab.Pane>
                    <OptionDetails
                        orders={orders}
                        direccion={direccion}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Encuesta de satisfacción',
            render: () => (
                <Tab.Pane>
                    <Encuesta
                        order={order}
                    />
                </Tab.Pane>
            )
        },
    ];


    return (
        <div>
            <Tab className="__product_data-tab" panes={
                order.estadoEntrega === 'Entregado'
                    ? panesDispatch
                    : panes
            } />
        </div>
    )
}

export default OptionBody;