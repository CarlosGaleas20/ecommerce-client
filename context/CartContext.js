import { createContext } from 'react';

const CartContext = createContext({
    productsCart: 0,
    setReloadCart: () => null,
    setProductsCart: () => null,
    removeProductCart: () => null,
    removeAllProductsCart: () => null,
});

export default CartContext;