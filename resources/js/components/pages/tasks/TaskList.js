import React from 'react';
import { Card, Button, Badge, Spinner, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPauseCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

class TaskList extends React.Component {
    state = {  }
    render() { 
        return ( 
            <>
                <div className="header-part">
                    <div className="float-left d-flex">
                        <h5>Task Lists</h5>
                    </div>
                    <div className="float-right">
                        <b><Badge variant="warning">No. of Task: { this.props.taskList.length }</Badge></b>
                    </div>
                </div>
                
                <div className="clearfix"></div>
                <div className="row">
                
                    {
                        this.props.taskList.map((task, index) => (
                            <div className="col-md-3">
                                <Card className="mt-3" key={ index }>
                                    <Card.Header>
                                        
                                        <div className="float-left d-flex">
                                            <h5>{ task.name }</h5>
                                        </div>
                                        <div className="float-right">
                                            {task.status == 0 && ( 
                                                <>
                                                    <FontAwesomeIcon icon={faPauseCircle} style={{color: "#e3342f"}} />
                                                </> )}
                                            {task.status == 1 && ( 
                                                <>
                                                    <FontAwesomeIcon icon={faCheckCircle} style={{color: "#38c172"}} />
                                                </> )}
                                            
                                        </div>
                                    </Card.Header>
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