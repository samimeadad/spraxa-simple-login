import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import GetUrl from './GetUrl/GetUrl';

const SingleUserModals = ( { handleModalClose, modalShow, userId } ) => {
    const [ selectedUser, setSelectedUser ] = useState( {} );
    const url = GetUrl();
    const navigate = useNavigate();

    useEffect( () => {
        const ApiUrl = `${ url }/users/${ userId }`;

        axios.get( ApiUrl )
            .then( response => {
                setSelectedUser( response.data );
            } )
            .catch( error => console.error( error ) )
    }, [ userId, url ] );

    const handleUserInputChange = ( e ) => {
        try {
            e.preventDefault();
            const field = e.target.name;
            const value = e.target.value;
            const newSelectedUser = { ...selectedUser };
            newSelectedUser[ field ] = value;
            setSelectedUser( newSelectedUser );
        }
        catch ( err ) {
            console.error( err );
        }
    };

    const handleUpdate = () => {
        axios.put( `http://localhost:5001/users/${ userId }`, selectedUser )
            .then( response => {
                if ( response.status === 200 ) {
                    handleModalClose();
                    alert( "User updated successfully!" );
                    navigate( '/' );
                }
            } )
            .catch( error => console.error( error ) )
    }

    const handleDelete = ( e ) => {
        e.preventDefault();
        const proceed = window.confirm( "Are you sure to delete the user data?" );
        if ( proceed ) {
            axios.delete( `http://localhost:5001/users/${ userId }` )
                .then( response => {
                    if ( response.status === 200 ) {
                        handleModalClose();
                        alert( "User deleted successfully!" );
                        navigate( '/' );
                    }
                } )
                .catch( error => console.error( error ) )
        }
    }
    return (
        <>
            <Modal show={ modalShow } onHide={ handleModalClose }>
                <Modal.Header closeButton>
                    <Modal.Title>{ selectedUser?.name }</Modal.Title>
                </Modal.Header>
                <Modal.Body>User Name:
                    <input type="text" value={ selectedUser?.username } onChange={ handleUserInputChange } name="username"></input>
                </Modal.Body>
                <Modal.Body>Phone: <input type="text" value={ selectedUser?.phone } onChange={ handleUserInputChange } name="phone"></input></Modal.Body>
                <Modal.Body>Email: <input type="text" value={ selectedUser?.email } onChange={ handleUserInputChange } name="email"></input></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ handleModalClose }>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ handleUpdate }>
                        Update
                    </Button>
                    <Button variant="danger" onClick={ handleDelete }>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SingleUserModals;