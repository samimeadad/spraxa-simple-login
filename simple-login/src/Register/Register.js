import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useFirebase from '../Hooks/useFirebase';
import registerImage from '../images/register.jpg';

const Register = () => {
    const { registerNewUser, signInUsingGoogle, error } = useFirebase();
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ errMessage, setErrMessage ] = useState( '' );
    const navigation = useNavigate();
    const location = useLocation();

    //set the email input value to the state variable
    const emailInputFieldChange = e => {
        setEmail( e.target.value );
    }

    //set the password input value to the state variable
    const passwordInputFieldChange = e => {
        setPassword( e.target.value );
    }

    //validate the email
    const validateEmail = () => {
        const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return validEmail.test( email );
    }

    const clearInputFields = () => {
        setEmail( () => "" );
        setPassword( () => "" );
    }

    //function for register/sign-up operation
    const handleRegister = e => {
        e.preventDefault();
        if ( !email || !validateEmail() ) {
            setErrMessage( 'Please input a valid email!' );
            return;
        }
        else if ( !password ) {
            setErrMessage( 'Please input your password' );
        }
        else if ( password.length < 6 ) {
            setErrMessage( 'Password must be at least 6 characters long' );
            return;
        }

        else {
            registerNewUser( email, password, navigation, location );
            // setErrMessage( 'Yeah! New User Registered!' );
        }
    }

    //rendering on the UI
    return (
        <div className="container mx-auto my-5">
            <Row className="text-center">
                <Col xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                    <img src={ registerImage } alt="loginImage" className="img-fluid" />
                </Col>
                <Col xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                    <div className="container mt-5">
                        <form onSubmit={ handleRegister }>
                            <h3 className="text-danger fw-bold">Please Register</h3>

                            <div className="row mb-3">
                                <div className="col-sm-12">
                                    <input onBlur={ emailInputFieldChange } type="email" className="form-control" id="inputEmail3" placeholder="Your Email" required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12">
                                    <input onBlur={ passwordInputFieldChange } type="password" className="form-control" id="inputPassword3" placeholder="Password (Minimum 6 Characters)" required />
                                </div>
                            </div>
                            <button onClick={ handleRegister } type="submit" className="btn btn-danger"> Register With Email</button>
                            <button onClick={ signInUsingGoogle } className="ms-3 btn btn-success"> Register With Google</button>
                        </form>
                        <hr className="text-danger" />
                        <p className="my-3"><Link to="/login" className="btn btn-primary">Already Registered?</Link></p>
                        {
                            !error ? <div className="row mt-3 text-danger">{ errMessage }</div> : <div className="row mt-3 text-danger">{ error }</div>
                        }
                    </div>
                </Col>
            </Row>
        </div >
    );
};

export default Register;