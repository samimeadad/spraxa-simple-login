import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useFirebase from '../../Hooks/useFirebase';

const Header = () => {
    const { user, logout } = useFirebase();
    return (
        <header className="header" style={ { backgroundColor: "#f5ece4" } }>
            <Navbar collapseOnSelect expand="lg" className="nav navbar container" variant="light">
                <Navbar.Brand>
                    <NavLink to="/home" className="text-decoration-none text-primary">
                        Spraxa Simple Login
                    </NavLink>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* menu bar and primary route button */ }
                    <Nav className="me-auto ms-5">
                        <NavLink className="me-5 text-dark text-decoration-none" to="/home">HOME</NavLink>
                        <NavLink className="me-5 text-dark text-decoration-none" to="/users">USERS</NavLink>
                        <NavLink className="me-5 text-dark text-decoration-none" to="/about">ABOUT US</NavLink>
                        <NavLink className="me-5 text-dark text-decoration-none" to="/contact">CONTACT US</NavLink>
                    </Nav>

                    <Nav className="p-3">
                        <NavLink to="/sampleform"><Button className="btn border py-2 px-3 text-light" style={ { backgroundColor: "red" } }>ADD USER</Button></NavLink>
                    </Nav>

                    {/* login and signup section with conditional rendering*/ }
                    <Nav className="p-3">
                        {
                            !user.email ? <span><NavLink className="me-3 text-danger text-decoration-none fw-bold" to="/login">Login</NavLink><NavLink className="text-danger text-decoration-none fw-bold" to="/register">Sign-Up</NavLink></span> :
                                <button className="btn btn-info border border-danger me-2" onClick={ logout }>Log out: <span className="fw-bold text-danger">{ user?.email }</span></button>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header >
    );
};

export default Header;