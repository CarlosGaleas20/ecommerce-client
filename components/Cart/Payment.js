import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_TOKEN } from '../../utils/constants';
import FormPayment from './FormPayment';

const stripePrimise = loadStripe(STRIPE_TOKEN);

const Payment = ({ products, address, setReload, productsData }) => {
    return (
        <>
            <div>
                <div style={{
                    color: '#007bff',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    margin: '20px 0',
                }}
                >Pago con tarjeta de crédito</div>
                <div>
                    <Elements stripe={stripePrimise}>
                        <FormPayment
                            products={products}
                            address={address}
                            setReload={setReload}
                            productsData={productsData}
                        />
                    </Elements>
                </div>
            </div>
        </>
    )
}

export default Payment;
