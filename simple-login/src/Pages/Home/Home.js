import React from 'react';
import { Container } from 'react-bootstrap';
import Users from '../Users/Users';

const Home = () => {
    return (
        <Container className="my-5">
            <h1>Welcome To Home Page</h1>
            <Users></Users>
        </Container>
    );
};

export default Home;