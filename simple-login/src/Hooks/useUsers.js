import axios from "axios";
import { useEffect, useState } from "react";
import GetUrl from "../Components/SingleUserModals/GetUrl/GetUrl";


// custom hook for notes api call from the backend server to display the notes on UI
const useUsers = () => {
    //Declare the state variables for notes to be stored
    const [ users, setUsers ] = useState( [] );
    const url = GetUrl();
    //useEffect hook to fetch the notes data from the backend server
    useEffect( () => {
        const ApiUrl = `${ url }/getAllUsers`;
        axios.get( ApiUrl )
            .then( response => {
                setUsers( response.data );
            } )
            .catch( error => console.error( error ) )
    }, [] );

    //return notes state variable and setNotes function for external use
    return [ users, setUsers ];
}

//export the entire function for external use
export default useUsers;