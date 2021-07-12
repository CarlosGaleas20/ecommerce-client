import React, { useState } from 'react'
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';

const AuthPage = ({setTitle, setShow}) => {

    const [loginState, setLoginState,] = useState(true);

    const changeLogin = () => {
        setLoginState(true)
        setTitle('Inicio de Sesión')
    }

    const changeRegister = () => {
        setLoginState(false)
        setTitle('Registro de Usuario')
    }


    return (
        <>
           {
               loginState
               ? <LoginPage changeRegister={changeRegister} setShow={setShow} />
               : <RegisterPage changeLogin={changeLogin} />
           } 
        </>
    )
}

export default AuthPage;
