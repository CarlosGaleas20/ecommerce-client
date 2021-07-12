import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router'
import '../scss/_styles.scss';
import 'semantic-ui-css/semantic.min.css';
import { ToastContainer, toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthContext from '../context/AuthContext';
import { deleteToken, getMeUser, getToken, setToken } from '../api/user';
import { getCategories } from '../api/categories';
import CartContext from '../context/CartContext';
import { addProductCart, countProductsCartApi, getProductsCartServer, removeProductCart, removeAll } from '../api/cart';

function MyApp({ Component, pageProps }) {

  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [reloaderUser, setReloaderUser] = useState(false);
  const [productsCart, setProductsCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id
      })
    } else {
      setAuth(null);
    }
    setReloaderUser(false);
  }, [reloaderUser])

  useEffect(async () => {
    const response = await getMeUser(logout);
    if (response) {
      setUser(response);
    } else {
      setUser(null);
    }
  }, [auth])

  useEffect(async () => {
    const response = await getCategories();
    setCategories(response || [])
  }, [])

  useEffect(async() => {
    if(auth) {
      const response = await countProductsCartApi(auth.idUser)
      setProductsCart(response);
      setReloadCart(false);
    }
  }, [reloadCart, auth])


  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id
    });
  }

  const logout = () => {
    if (auth) {
      deleteToken();
      setAuth(null);
      router.push('/');
    }
  }

  const addProduct = (product) => {
    const token = getToken();
    if(token) {
      addProductCart(product);
      setReloadCart(true);
    } else {
      toast.warning('Para compara debe iniciar sesión');
    }
  }

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  }

  const removeAllProduct = () => {
    removeAll();
    setReloadCart(true);
  }

  const authData = useMemo(() => ({
    auth,
    user,
    login,
    logout,
    setReloaderUser,
    categories
  }), [auth, user, categories])

  const cartData = useMemo(() => ({
    productsCart,
    setReloadCart,
    setProductsCart,
    removeProductCart: (product) => removeProduct(product),
    removeAllProductsCart: () => removeAllProduct()
  }), [productsCart])

  return (
    <>
      <AuthContext.Provider value={authData}>
        <CartContext.Provider value={cartData}>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
          />
        </CartContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default MyApp
