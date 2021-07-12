import React, { useEffect, useState } from 'react';
import {Container, Grid} from 'semantic-ui-react';
import useAuth from '../../../hooks/useAuth';
import AuthPage from '../../Auth/AuthPage';
import ModalLogin from '../../Modales/ModalLogin/ModalLogin';
import CategoryMenu from './CategoryMenu';
import MenuUser from './MenuUser';


const MenuApp = () => {

    const [showModal, setShowModal] = useState(false);

    const [title, setTitle] = useState('Inicio de Sesión');


    const {user, logout} = useAuth();

    const viewModal = () => setShowModal(true);



    return (
        <>
        <div className="__header_menu">
            <Container>
                <Grid className="__header_menu">
                    <Grid.Column width={6} className="__header_menu_left">
                        <CategoryMenu />
                    </Grid.Column>
                    <Grid.Column width={10} className="__header_menu_right">
                        {
                            (user !== undefined)
                            && (<MenuUser 
                                    setShow={viewModal} 
                                    user= {user}
                                    logout = {logout}
                                />)
                        }
                    </Grid.Column>
                </Grid>
            </Container>
            <ModalLogin 
                show={showModal} 
                setShow={setShowModal}
                title={title}
            >
                <AuthPage setTitle={setTitle} setShow={setShowModal} />
            </ModalLogin>
        </div>
        </>
    );
}

export default MenuApp;
