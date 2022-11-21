import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from "react-router-dom";
import useFirebase from "../../Hooks/useFirebase";

const PrivateRoute = ( { children } ) => {
    const { auth, isLoading } = useFirebase();
    const location = useLocation();

    if ( isLoading ) {
        return <div className="text-center my-5"><Spinner animation="border" variant="danger" /></div>
    }

    else if ( auth.currentUser ) {
        return children;
    }
    else {
        return ( <Navigate to="/login" state={ { from: location } } /> );
    }
};

export default PrivateRoute;