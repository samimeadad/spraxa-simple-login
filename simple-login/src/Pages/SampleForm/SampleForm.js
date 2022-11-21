import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserModals from '../../Components/UserModals/UserModals';

const SampleForm = () => {
    const [ userData, setUserData ] = useState( {} );
    const [ modalShow, setModalShow ] = useState( false );
    const navigate = useNavigate();

    const handleModalClose = () => setModalShow( false );
    const handleModalShow = () => setModalShow( true );

    const handleUserInputChange = e => {
        try {
            e.preventDefault();
            const field = e.target.name;
            const value = e.target.value;
            const newUserData = { ...userData };
            newUserData[ field ] = value;
            setUserData( newUserData );
        }
        catch ( err ) {
            console.error( err );
        }
    }

    const validateEmail = () => {
        const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return validEmail.test( userData.email );
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        if ( !userData.email || !validateEmail() ) {
            alert( 'Please enter a valid email address!' );
            return;
        }
        else {
            fetch( 'http://localhost:5001/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify( userData )
            } )
                .then( res => res.json() )
                .then( data => {
                    if ( data.insertedId ) {
                        alert( 'New User is added successfully. Thank you.' );
                        navigate( '/users' );
                    }
                } )
        }

    }

    const viewModal = e => {
        e.preventDefault();
        if ( !userData.email || !validateEmail() ) {
            alert( 'Please enter a valid email address!' );
            return;
        }
        else {
            handleModalShow();
        }
    }

    return (
        <Container>
            <h1 className="my-5">This is a Sample Form Page</h1>
            <Form className="w-50 mx-auto my-5">
                <Form.Group className="mb-3">
                    <Form.Control onBlur={ handleUserInputChange } type="text" placeholder="Your Name" name="name" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control onBlur={ handleUserInputChange } type="text" placeholder="Your Username" name="username" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control onBlur={ handleUserInputChange } type="email" placeholder="Your Email" name="email" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control onBlur={ handleUserInputChange } type="text" placeholder="Your Phone" name="phone" />
                </Form.Group>

                <Button className="me-3" variant="primary" type="submit" onClick={ handleFormSubmit }>
                    ADD USER
                </Button>
                <Button variant="success" onClick={ viewModal }>
                    SHOW MODAL
                </Button>
            </Form>

                <UserModals
                    handleModalClose={ handleModalClose }
                    handleModalShow={ handleModalShow }
                    modalShow={ modalShow }
                    name={ userData.name }
                    username={ userData.username }
                    phone={ userData.phone }
                    email={ userData.email }
                ></UserModals>
        </Container>
    );
};

export default SampleForm;