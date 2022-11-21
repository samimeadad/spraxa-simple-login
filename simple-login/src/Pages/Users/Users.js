import axios from 'axios';
import React, { PureComponent } from 'react'
import { Container, Row } from 'react-bootstrap';
import GetUrl from '../../Components/SingleUserModals/GetUrl/GetUrl';
import SingleUser from './SingleUser';

export default class Users extends PureComponent {
    constructor ( props ) {
        super( props );
        this.state = {
            users: []
        };
    }

    componentDidMount () {
        const url = GetUrl();
        const ApiUrl = `${ url }/getAllUsers`;

        axios.get( ApiUrl )
            .then( response => {
                this?.setState( { users: response.data } );
            } )
            .catch( error => console.error( error ) )
    }

    render () {
        return (
            <Container className="mt-5">
                <h1 className="my-5">Total Users: { this?.state?.users?.length }</h1>
                <Row className="g-4 container">
                    {
                        this?.state?.users?.map( user => <SingleUser key={ user?.name } user={ user }></SingleUser> )
                    }
                </Row>
            </Container>
        )
    }
}
