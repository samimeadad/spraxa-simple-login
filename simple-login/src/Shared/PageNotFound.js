import React, { Component } from 'react';

class PageNotFound extends Component {
    componentDidMount () {
        console.log( "PageNotFound.js: componentDidMount()" );
    }

    render () {
        return (
            <div>
                <h1>Page Not Found!</h1>
            </div>
        );
    }
}

export default PageNotFound;