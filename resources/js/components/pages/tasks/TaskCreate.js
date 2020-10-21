import Axios from 'axios';
import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Card, Button, Badge, Spinner, Form } from 'react-bootstrap';
import { PUBLIC_URL } from '../../../constants';
import { storeNewTask } from '../../../services/TaskServices';

class TaskCreate extends React.Component {
    state = {
        isLoading: false,
        name: '',
        description: '',
        errors: {}
    };

    componentDidMount() {}

    changeInput = (e) => {
        this.setState ({
            [e.target.name]: e.target.value,
        });
    };

    submitForm = async (e) => {
        e.preventDefault();
        const { history } = this.props;

        this.setState({
            isLoading: true
        });
        const postBody = {
            name: this.state.name,
            description: this.state.description,
            project_id: this.props.project_id,
        };
        const response = await storeNewTask(postBody);
        if(response.success) {
            this.setState({
                name: '',
                description: '',
                isLoading: false,
            });
            this.props.onCompleteTaskCreate(response.data);
        } else {
            console.log('errors', response.errors);
            this.setState({
                errors: response.errors,
                isLoading: false,
            });
        }
    };
    
    render() { 
        return ( 
            <>
                {/* <div className="header-part">
                    <div className="float-left">
                        <h2>New Task</h2>
                    </div>
                    <div className="float-right">
                        <Link to={`${PUBLIC_URL}/projects`} className="btn btn-secondary">All Tasks</Link>
                    </div>
                </div>
                <div className="clearfix"></div>
                <hr/> */}
                
                {
                    <div className="row justify-content-md-center mb-3">
                        <div className="col-6">
                        <Card>
                            <Card.Body>
                                <h4 className="text-center">New Task</h4>
                                <Form onSubmit = { this.submitForm }>
                                    <Form.Group controlId="name">
                                        <Form.Label>Task Title</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter task name" 
                                            name="name" 
                                            value= { this.state.name }
                                            onChange = { (e) => this.changeInput(e) }
                                        />
                                        {
                                            this.state.errors && this.state.errors.name && (
                                                <Form.Text className="text-danger">
                                                    {this.state.errors.name[0]}
                                                </Form.Text>
                                            )
                                        }
                                    </Form.Group>
                            
                                    <Form.Group controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows="2" 
                                            placeholder="Enter task description" 
                                            name="description" 
                                            value= { this.state.description }
                                            onChange = { (e) => this.changeInput(e) }
                                        />
                                        {
                                            this.state.errors && this.state.errors.description && (
                                                <Form.Text className="text-danger">
                                                    {this.state.errors.description[0]}
                                                </Form.Text>
                                            )
                                        }
                                    </Form.Group>

                                    {
                                        this.state.isLoading && (
                                            <Button variant="primary" type="button" disabled>
                                                <Spinner animation="border" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </Spinner>
                                                Saving...
                                            </Button>
                                        )
                                    }

                                    {
                                        !this.state.isLoading && (
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        )
                                    }

                                </Form>
                            </Card.Body>
                        </Card>
                        </div>
                    </div>
                }
                <hr/>
                
            </>
        );
    }
}
 
export default withRouter(TaskCreate);

// function ProjectList() {
//   return (
//     <>
//         <h2>Project List</h2>
//         <hr/>
//         <Card className="mt-2">
//             <Card.Header>Featured <Badge variant="primary">New</Badge></Card.Header>
//             <Card.Body>
//                 <Card.Title>Special title treatment</Card.Title>

//                 <Card.Text>
//                     With supporting text below as a natural lead-in to additional content.
//                 </Card.Text>

//                 <Button variant="success" className="mr-2">view</Button>
//                 <Button variant="dark" className="mr-2">Edit</Button>
//                 <Button variant="danger" className="mr-2">Delete</Button>
//             </Card.Body>
//         </Card>
//     </>
    
//   )
// }

// export default ProjectList;