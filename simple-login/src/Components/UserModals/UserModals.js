import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const UserModals = ( { handleModalClose, modalShow, name, username, phone, email } ) => {
    return (
        <>
            <Modal show={ modalShow } onHide={ handleModalClose }>
                <Modal.Header closeButton>
                    <Modal.Title>{ name }</Modal.Title>
                </Modal.Header>
                <Modal.Body>User Name: { username }</Modal.Body>
                <Modal.Body>Phone: { phone }</Modal.Body>
                <Modal.Body>Email: { email }</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ handleModalClose }>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserModals;