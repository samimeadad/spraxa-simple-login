import React, { Component } from 'react'
import { Card, Col } from 'react-bootstrap'

export default class SingleUser extends Component {
    render () {
        return (
            <Col xs={ 12 } sm={ 12 } md={ 4 } lg={ 4 }>
                <div>
                    <Card style={ { width: '18rem' } }>
                        <Card.Body>
                            <Card.Title>{ this?.props?.user?.name }</Card.Title>
                            <Card.Text>
                                { this?.props?.user?.username }
                            </Card.Text>
                            <Card.Text>
                                { this?.props?.user?.email }
                            </Card.Text>
                            <Card.Text>
                                { this?.props?.user?.phone }
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </Col>
        )
    }
}
