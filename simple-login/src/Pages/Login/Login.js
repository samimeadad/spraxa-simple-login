import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useFirebase from '../../Hooks/useFirebase';
import loginImage from '../../images/login.jpg';

const Login = () => {
    const { signInUsingGoogle, processUserLogin, error } = useFirebase();
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

    //function for validate the email
    const validateEmail = () => {
        const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return validEmail.test( email );
    }

    const handleGoogleLogin = () => {
        signInUsingGoogle( navigation, location );
    }

    //function for user login with email and password
    const handleUserLogin = e => {
        e.preventDefault();
        if ( !email || !validateEmail() ) {
            setErrMessage( 'Please input a valid email!' );
            return;
        }
        else if ( !password ) {
            setErrMessage( 'Please input your password' );
            return;
        }
        else if ( password.length < 6 ) {
            setErrMessage( 'Password must be at least 6 characters long' );
            return;
        }

        else {
            processUserLogin( email, password, navigation, location );
        }
    }

    return (
        <div className="container mx-auto my-5">
            <Row className="text-center">
                <Col xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                    <div className="container mt-5">
                        <form onSubmit={ handleUserLogin }>
                            <h3 className="text-primary fw-bold">Please Login</h3>

                            <div className="row mb-3">
                                <div className="col-sm-12">
                                    <input onBlur={ emailInputFieldChange } type="email" className="form-control" placeholder="Email" required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12">
                                    <input onBlur={ passwordInputFieldChange } type="password" className="form-control" placeholder="Password (Minimum 6 Characters)" required />
                                </div>
                            </div>
                            <button onClick={ handleUserLogin } type="submit" className="btn btn-primary"> Login With Email</button>
                            <button onClick={ handleGoogleLogin } className="ms-3 btn btn-success"> Login With Google</button>
                        </form>

                        <hr className="text-danger" />
                        <p className="my-3"><Link to="/register" className="btn btn-danger">New User?</Link></p>
                        {/* render the messages on the UI conditionally */ }
                        {
                            !error ? <div className="row mt-3 text-danger">{ errMessage }</div> : <div className="row mt-3 text-danger">{ error }</div>
                        }
                    </div>
                </Col>
                <Col xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                    <img src={ loginImage } alt="loginImage" className="img-fluid" />
                </Col>
            </Row>
        </div >
    );
};

export default Login;