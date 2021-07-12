import React from 'react';
import { Tab } from 'semantic-ui-react';
import Encuesta from './Encuesta';
import OptionDetails from './OptionDetails';
import VaucherOrder from './VaucherOrder';
import VaucherOrderEdit from './VaucherOrderEdit';
import VaucherOrderSend from './VaucherOrderSend';

const OptionBody = ({ orders, direccion, order, setReloadOrder, setShowModal }) => {

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
        {
            menuItem: 'Vaucher',
            render: () => (
                <Tab.Pane>
                    {
                        order.estadoEntrega === 'No validado'
                            ? (<VaucherOrder
                                order={order}
                                setReloadOrder={setReloadOrder}
                                setShowModal={setShowModal}
                            />)
                            : (order.estadoEntrega === 'Validado'
                                ? (<VaucherOrderEdit
                                    order={order}
                                    setReloadOrder={setReloadOrder}
                                    setShowModal={setShowModal}
                                />)
                                : (order.estadoEntrega === 'Entregado' || order.estadoEntrega === 'Despachado'
                                    && (<VaucherOrderSend
                                        order={order}
                                        setReloadOrder={setReloadOrder}
                                        setShowModal={setShowModal}
                                    />))
                            )
                    }
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
            menuItem: 'Vaucher',
            render: () => (
                <Tab.Pane>
                    {<VaucherOrderSend
                        order={order}
                        setReloadOrder={setReloadOrder}
                        setShowModal={setShowModal}
                    />
                    }
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