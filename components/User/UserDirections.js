import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import ModalLogin from '../Modales/ModalLogin/ModalLogin';
import UserAddDirection from './UserAddDirection';
import UserListDirections from './UserListDirections';

const UserDirections = () => {

    const [showModal, setShowModal] = useState(false);
    const [formModal, setFormModal] = useState(null)
    const [titleModal, setTitleModal] = useState('');
    const [reloadDirections, setReloadDirections] = useState(false);

    const openModal = (title, address) => {
        setTitleModal(title);
        setFormModal(
            <UserAddDirection
                setShow={setShowModal}
                setReloadDirections={setReloadDirections}
                newAddress={address ? false : true}
                address={address || null}
            />
        );
        setShowModal(true);
    }
    return (
        <>
            <div className="__account_configurartion">
                <div className="__account_tittle-container">
                    <div className="__account_tittle">
                        Direcciones
                </div>
                    <Icon name="plus" link onClick={() => openModal('Nueva Dirección')} />
                </div>

                <div className="__account_data">
                    <UserListDirections 
                        reloadDirections={reloadDirections}
                        setReloadDirections={setReloadDirections}
                        openModal={openModal}
                    />
                </div>
            </div>

            <ModalLogin
                show={showModal}
                setShow={setShowModal}
                title={titleModal}

            >
                {formModal}
            </ModalLogin>
        </>
    )
}

export default UserDirections;
