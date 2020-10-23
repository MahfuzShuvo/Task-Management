import Axios from 'axios';
import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Card, Button, Badge, Spinner, Form } from 'react-bootstrap';
import { PUBLIC_URL } from '../../../constants';
import { updateProject } from '../../../services/ProjectServices';

class ProjectEdit extends React.Component {
    state = {
        isLoading: false,
        id: this.props.project.id,
        name: this.props.project.name,
        description: this.props.project.description,
        status: this.props.project.status,
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
            status: this.state.status,
        };
        const response = await updateProject(this.state.id, postBody);
        if(response.success) {
            this.setState({
                name: '',
                description: '',
                isLoading: false,
            });
            this.props.onCompleteEditProject();
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
                        <h2>New Project</h2>
                    </div>
                    <div className="float-right">
                        <Link to={`${PUBLIC_URL}/projects`} className="btn btn-secondary">All Projects</Link>
                    </div>
                </div>
                <div className="clearfix"></div>
                <hr/> */}
                
                {
                    
                            <Card>
                                <Card.Body>
                                    <Form onSubmit = { this.submitForm }>
                                        <Form.Group controlId="name">
                                            <Form.Label>Project Name</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Enter project name" 
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
                                                placeholder="Enter project description" 
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
                                        <Form.Group controlId="status">
                                            <Form.Label>Status</Form.Label>
                                            <Form.Control 
                                                as = "select" 
                                                value = { this.state.status } 
                                                name = "status"
                                                onChange = { (e) => this.changeInput(e) }
                                                >
                                                    <option value={0}>Pending</option>
                                                    <option value={1}>Completed</option>
                                            </Form.Control>
                                        </Form.Group>

                                        {
                                            this.state.isLoading && (
                                                <Button variant="primary" type="button" disabled>
                                                    <Spinner animation="border" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </Spinner>
                                                    updating ...
                                                </Button>
                                            )
                                        }

                                        {
                                            !this.state.isLoading && (
                                                <Button variant="primary" type="submit">
                                                    Update
                                                </Button>
                                            )
                                        }

                                    </Form>
                                </Card.Body>
                            </Card>
                        
                }
                
            </>
        );
    }
}
 
export default withRouter(ProjectEdit);

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