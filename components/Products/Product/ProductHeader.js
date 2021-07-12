import React, { useEffect, useState } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import classNames from 'classnames';
import { size } from 'lodash';
import { toast } from 'react-toastify';
import { addFavoriteProduct, deleteFavoriteProduct, searchFavorite } from '../../../api/favorites';
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';
import { addProductCartApi, getProductCartApi } from '../../../api/cart';

export const ProductHeader = ({product}) => {

    const {title, description, price, discount, id, amount} = product;

    const [isFavorite, setIsFavorite] = useState(false);
    const [cartProduct, setcartProduct] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingCart, setLoadingCart] = useState(false);
    const [reloadFavorite, setReloadFavorite] = useState(false);
    const [reloadCartProduct, setReloadCartProduct] = useState(false);

    const { user, logout } = useAuth();
    const { setReloadCart } = useCart();

    useEffect(() => {
        if(user){
            (async() => {
                const response = await searchFavorite(user.id, id, logout);
                if(size(response) > 0) setIsFavorite(true);
                else setIsFavorite(false);
            })()
        }
        setReloadFavorite(false);
    }, [product, reloadFavorite]);

    useEffect(() => {
        if(user){
            (async() => {
                const response1 = await getProductCartApi(user.id, id, logout);
                if(size(response1) > 0) setcartProduct(true);
                else setcartProduct(false);
            })()
        }
        setReloadCartProduct(false);
    }, [product, reloadCartProduct]);

    const addFavorite = async() => {
        setLoading(true);
        if(user) {
            await addFavoriteProduct(user.id, id, logout);
            setReloadFavorite(true);
            toast.success('Producto añadido a favoritos');
        } else{
            toast.warning('Debe estar logueado para usar Favoritos');
        }
        setLoading(false);
    }

    const deleteFavorite = async() => {
        setLoading(true);
        if(user) {
            await deleteFavoriteProduct(user.id, id, logout);
            setReloadFavorite(true);
            toast.success('Producto eliminado de favoritos');
        } else{
            toast.warning('Debe estar logueado para usar Favoritos');
        }
        setLoading(false);
    }

    const addProduct = async() => {
        setLoadingCart(true);
        if(user) {
            const response = await addProductCartApi(user.id, id, logout);
            console.log(response);
            setReloadCartProduct(true);
            setReloadCart(true);
            toast.success('Producto añadido al carrito de compras');
        } else{
            toast.warning('Debe estar logueado para comprar');
        }
        setLoadingCart(false);
    }

    const deleteProduct = () => {
        if(user) {
            toast.warning('El producto ya existe en el carrito');
        } else{
            toast.warning('Debe estar logueado para comprar');
        }
    }


    return (
        <>
        <div className="__product_data-container-title">
            {title}
            <Icon 
                name="heart"
                link
                loading={loading}
                className={classNames({
                    like: isFavorite,
                })}
                onClick={isFavorite ? deleteFavorite : addFavorite}
            />
        </div>
        <div className="__product_data-container-delivery">
            Entraga a domicilio en 24 horas maximo
        </div>
        <div 
            className="__product_data-container-description" 
            dangerouslySetInnerHTML={{__html: description}}
        />
        <div className="__product_data-container-buy">
            <div className="__product_data-container-buy-price">
                <p>Precio de venta: ${price}</p>
                <div className="__product_data-container-buy-price-actions">
                    <p>-{ discount }%</p>
                    <p>${ (price - Math.floor(price * discount) / 100).toFixed(2) }</p>
                </div>
            </div>
            <Button
                className="__product_data-container-buy-btn"
                loading={loadingCart}
                onClick={cartProduct ? deleteProduct : addProduct}
                disabled={amount < 5 ? true : false}
            >{amount < 5 ? "No hay stock" : "Comprar"}</Button>
        </div>
        </>
    )
}

export default ProductHeader;