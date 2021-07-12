import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import {size} from 'lodash';
import useAuth from '../../hooks/useAuth';
import { paymentCart, removeAllProductCartApi } from '../../api/cart';
import useCart from '../../hooks/useCart';
import { updateAmountProductBySell } from '../../api/products';
import { sendEmailShop } from '../../api/email';

const FormPayment = ({products, address, setReload, productsData}) => {

    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const {auth, logout} = useAuth();
    const { setReloadCart } = useCart();
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const result = await stripe.createToken(cardElement);

        if(result.error) {
            toast.error(result.error.message);
        } else {
            const response = await paymentCart(
                result.token,
                productsData,
                auth.idUser,
                address.id,
                logout
            );
            if(size(response) > 0) {
                toast.success('Compra realizada');
                removeAllProductCartApi(auth.idUser, products, logout);
                updateAmountProductBySell(productsData, logout);
                setReloadCart(true);
                setReload(true);
                router.push('/orders');
            } else{
                toast.error('Error al realziar el pedido');
            }
        }
        setLoading(false);
    }

    return (
        <>
            <form className="form_payment" onSubmit={handleSubmit}>
                <CardElement />
                <Button type="submit" loading={loading}>Pagar</Button>
            </form>
        </>
    )
}

export default FormPayment;
