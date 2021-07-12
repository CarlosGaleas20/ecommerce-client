import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { map, forEach } from 'lodash';
import CartSummaryItem from './CartSummaryItem';

const CartSummary = ({products, reload, setReload, productsData}) => {


    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let price = 0;
        forEach(productsData, (product) =>{
            price += ((product.producto.price * product.cantidad) - ((product.producto.price * product.cantidad) * (product.producto.discount / 100)));
        })
        setTotalPrice(price);
    }, [reload, productsData])

    

    return (
        <div className="__cart_summary">
            <div className="title">Resumen del Carrito</div>
            <div className="data">
                <Table celled structured>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Producto</Table.HeaderCell>
                            <Table.HeaderCell>Valor U.</Table.HeaderCell>
                            <Table.HeaderCell>Descuento</Table.HeaderCell>
                            <Table.HeaderCell>Cantidad</Table.HeaderCell>
                            <Table.HeaderCell>Valor total</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {map(products, (product) => (
                            <CartSummaryItem
                                key={product.id}
                                product={product}
                                setReload={setReload}
                            />
                        ))}
                        <Table.Row className="__cart_summary-resume">
                            <Table.Cell className="clear" />
                            <Table.Cell colSpan="3">Total:</Table.Cell>
                            <Table.Cell className="total-price">${(totalPrice).toFixed(2)}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
            
        </div>
    )
}

export default CartSummary;
