import React, { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import useUsers from '../../Hooks/useUsers';
import SingleUserModals from '../../Components/SingleUserModals/SingleUserModals';

const UsersTable = () => {
    const [ users ] = useUsers();
    const [ userId, setUserId ] = useState();
    const [ modalShow, setModalShow ] = useState( false );

    const handleModalClose = () => {
        setModalShow( false );
    }

    const handleModalShow = ( id ) => {
        setUserId( id );
        setModalShow( true );
    }

    return (
        <Container className="container my-5">
            <h1 className="my-5">Total Users in Tabular Format: { users?.length }</h1>
            <Table striped bordered responsive className="sortable">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>User Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map( user => <tr key={ user?._id }>
                            <td>{ user?._id }</td>
                            <td>
                                <Button onClick={ () => handleModalShow( user?._id ) } variant="link" className="text-decoration-none text-dark">{ user?.name }</Button>
                            </td>
                            <td>{ user?.username }</td>
                            <td>{ user?.phone }</td>
                            <td>{ user?.email }</td>
                        </tr> )
                    }
                </tbody>
            </Table>
            { modalShow ?
                <SingleUserModals
                    handleModalClose={ handleModalClose }
                    modalShow={ modalShow }
                    userId={ userId }
                ></SingleUserModals>
                : null }
        </Container>
    );
}

export default UsersTable;