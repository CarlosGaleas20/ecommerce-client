import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { paymentByDeposit, removeAllProductCartApi } from '../../api/cart';
import useCart from '../../hooks/useCart';
import { updateAmountProductBySell } from '../../api/products';
import { sendEmailShop } from '../../api/email';

const FormPaymentDeposit = ({ products, address, setReload, productsData }) => {

    const [loading, setLoading] = useState(false);
    const { auth, logout } = useAuth();
    const { setReloadCart, setProductsCart } = useCart();
    const router = useRouter();
    const crypto = require("crypto");

    const idPedido = crypto.randomBytes(16).toString("hex");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await paymentByDeposit(
                idPedido,
                productsData,
                auth.idUser,
                address.id,
                logout
            );
            if (response) {
                toast.success('Pedido realizado');
                removeAllProductCartApi(auth.idUser, products, logout);
                updateAmountProductBySell(productsData, logout);
                setReloadCart(true);
                setReload(true);
                setProductsCart(0);
                router.push('/orders');
            } else {
                toast.error('Error al realziar el pedido');
            }
        } catch (error) {
            
        }
        setLoading(false);
    }

    return (
        <>
            <div style={{
                margin: '0 auto',
                width: '70%',
            }}>
                <div style={{
                    color: '#007bff',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    margin: '20px 0',
                }}
                >Pago con depósito o transferencia bancaria</div>
                <div style={{
                    textAlign: 'center',
                    fontSize: 16,
                    margin: '5px 0',
                    marginBottom: 20,
                }}
                >El pedido de sus productos se hará valido cuando suba su comprobante de depósito o transferencia en el id de su pedido</div>
                <div style={{
                    width: '70%',
                    margin: '0 auto',
                    marginBottom: 10,
                }}>
                    <Button 
                        primary
                        onClick={handleSubmit}
                        type="submit" 
                        loading={loading}
                        fluid
                        size='big'
                    >
                        Realizar Pedido</Button>
                </div>
                
            </div>

        </>
    )
}

export default FormPaymentDeposit;
