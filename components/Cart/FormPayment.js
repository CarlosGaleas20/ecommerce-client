import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { paymentCart, removeAllProductCartApi } from '../../api/cart';
import useCart from '../../hooks/useCart';
import { updateAmountProductBySell } from '../../api/products';
import { sendEmailShop } from '../../api/email';
import moment from 'moment';
import 'moment/locale/es';

const FormPayment = ({products, address, setReload, productsData}) => {

    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const {auth, logout} = useAuth();
    const { setProductsCart } = useCart();
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
            if(response[0].id) {
                const fecha = moment(response[0].createdAt).format(' Do MMMM YYYY');
                const prueba = await sendEmailShop(
                    response[0].idPedido,
                    productsData,
                    response[0].users_permissions_user,
                    response[0].direccion,
                    fecha,
                )
                console.log(prueba);
                toast.success('Compra realizada');
                removeAllProductCartApi(auth.idUser, products, logout);
                updateAmountProductBySell(productsData, logout);
                setReload(true);
                setProductsCart(0);
                router.push('/orders');
            } else{
                toast.error('Error al realizar el pedido');
            }
        }
        setProductsCart(0);
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
