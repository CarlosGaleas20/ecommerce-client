import React, { useState } from 'react';
import { Form, Radio } from 'semantic-ui-react';
import Payment from './Payment';
import FormPaymentDeposit from './FormPaymentDeposit';

const PaymentMethod = ({ products, address, setReload, productsData }) => {

    const [method, setMethod] = useState('Deposito');
    const handleChange = (e, { value }) => {
        setMethod(value);
    }

    return (
        <>
            <div className="__products_payment">
                <div className="title">Pago</div>
                <div className="terms">
                    <h3>Debe seleccionar la forma en la que desea realizar el pago de sus productos.</h3>
                </div>
                <div className="data">
                    <Form>
                        <Form.Field>
                            El metodo de pago seleccionado es:  <b>{
                                method === 'Deposito'
                                    ? ' Pago a traves de un depósito o transferencia bancaria'
                                    : ' Pago a traves de una tarjeta de crédito'
                            }</b>
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                toggle
                                label='Depósito o transferencia bancaria'
                                name='radioGroup'
                                value='Deposito'
                                checked={method === 'Deposito'}
                                onChange={handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                toggle
                                label='Tarjeta de crédito'
                                name='radioGroup'
                                value='Tarjeta'
                                checked={method === 'Tarjeta'}
                                onChange={handleChange}
                            />
                        </Form.Field>
                    </Form>
                    {
                        method === 'Deposito'
                            ? (<FormPaymentDeposit
                                products={products}
                                address={address}
                                setReload={setReload}
                                productsData={productsData}
                            />)
                            : (<Payment
                                products={products}
                                address={address}
                                setReload={setReload}
                                productsData={productsData}
                            />)
                    }
                </div>
            </div>
        </>
    )

}

export default PaymentMethod;