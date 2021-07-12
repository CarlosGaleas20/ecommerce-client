import React from 'react'
import { Icon } from 'semantic-ui-react';
import { Modal } from 'react-bootstrap'

const ModalLogin = (props) => {

    const { show, setShow, title, children, ...rest } = props;

    const onClose = () => setShow(false);


    return (
        <>
           <Modal 
                className="__modal_login"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={onClose}
            {...rest}
            >
                <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>   
            </Modal> 
        </>
    )
}

export default ModalLogin;
