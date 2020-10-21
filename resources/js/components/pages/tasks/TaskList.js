import React from 'react';
import { Card, Button, Badge, Spinner, ListGroup } from 'react-bootstrap';

class TaskList extends React.Component {
    state = {  }
    render() { 
        return ( 
            <>
                <div className="row">
                    {
                        this.props.taskList.map((task, index) => (
                            <div className="col-md-3">
                                <Card className="mt-2" key={ index }>
                                    <Card.Header>{ task.name }</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Description: </Card.Title>

                                        <Card.Text>
                                            { task.description }
                                        </Card.Text>

                                        {/* <Button variant="success" className="mr-2" size="sm">view</Button>
                                        <Button variant="dark" className="mr-2" size="sm">Edit</Button>
                                        <Button variant="danger" className="mr-2" size="sm">Delete</Button> */}
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    }
                </div>
            </>
        );
    }
}
 
export default TaskList;