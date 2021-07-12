import React, { useEffect, useState } from 'react';
import { Table, Image, Icon, Button } from 'semantic-ui-react';
import useAuth from '../../hooks/useAuth';
import { getProductCartApi, removeProductCartApi, updateAmountProductCart } from '../../api/cart'
import { toast } from 'react-toastify';
import useCart from '../../hooks/useCart';
import { size } from 'lodash';


const CartSummaryItem = ({product, setReload}) => {

    const [loading, setLoading] = useState(false);
    const [loadingAmountA, setLoadingAmountA] = useState(false);
    const [loadingAmountS, setLoadingAmountS] = useState(false);
    const { user, logout } = useAuth();
    const { setReloadCart } = useCart();
    const [ amount, setAmount] = useState(null);
    const [ amountProduct, setamountProduct] = useState(null);
    const [ realoadCartProductItem, setrealoadCartProductItem] = useState(false);

    useEffect(() => {
        if (product) {
            (async () => {
                const response = await getProductCartApi(user.id, product.id, logout);
                if (size(response) > 0) {
                    setAmount(response[0].cantidad);
                    setamountProduct(response[0]);
                } 
            })()
            setrealoadCartProductItem(false);
        }
    }, [product, realoadCartProductItem])


    const removeProduct = async() => {
        setLoading(true);
        if(user) {
            await removeProductCartApi(user.id, product.id, logout);
            setReload(true);
            setReloadCart(true);
            toast.success('Producto eliminado');
        }
        setLoading(false);
    }

    const handleAdd = async() =>{
        setLoadingAmountA(true);
        if(amountProduct) {
            await updateAmountProductCart(amountProduct.id, (amount + 1), logout);
        }
        setrealoadCartProductItem(true);
        setReload(true);
        setLoadingAmountA(false);
    }

    const handleSubs = async() =>{
        setLoadingAmountS(true);
        if(amountProduct) {
            await updateAmountProductCart(amountProduct.id, (amount - 1), logout);
        }
        setrealoadCartProductItem(true);
        setReload(true);
        setLoadingAmountS(false);
    }

    return (
        <>
            <Table.Row className="__cart_summary-product">
                <Table.Cell>
                    <Icon
                        name="close" link
                        loading={loading}
                        onClick={removeProduct} />
                    <Image src={product.poster.url} alt={product.title} />
                    {product.title}
                </Table.Cell>
                <Table.Cell>${product.price}</Table.Cell>
                <Table.Cell>{product.discount}%</Table.Cell>
                <Table.Cell>
                    <Button
                        disabled={amount<2 ? true : false}
                        onClick={handleSubs}
                        loading={loadingAmountS}
                    >-</Button>
                    {amount}
                    <Button
                        disabled={(amount + 1) === product.amount   ? true : false}
                        onClick={handleAdd}
                        loading={loadingAmountA}
                    >+</Button>
                </Table.Cell>
                <Table.Cell>${((product.price * amount) - ((product.price * amount) * (product.discount / 100))).toFixed(2)}</Table.Cell>
            </Table.Row>
        </>
    )
}

export default CartSummaryItem;
