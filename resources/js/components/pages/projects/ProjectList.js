import Axios from 'axios';
import React from 'react';
import { Card, Button, Badge, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constants';

class ProjectList extends React.Component {
    state = {
        projectList: [],
        isLoading: false
    };

    componentDidMount() {
        this.getProjectLists();
    
    }

    getProjectLists = () => {
        this.setState({ isLoading: true });
        Axios.get('http://localhost/task/api/projects').then((res) => {
            
            const projectList = res.data.data;
            this.setState({
                projectList,
                isLoading: false,
            });
        });
    };

    render() { 
        return ( 
            <>
                <div className="header-part">
                    <div className="float-left">
                        <h2>Project List <Badge variant="warning">{this.state.projectList.length}</Badge></h2>
                    </div>
                    <div className="float-right">
                        <Link to={`${PUBLIC_URL}/project/create`} className="btn btn-secondary">+ Create Project</Link>
                    </div>
                </div>
                <div className="clearfix"></div>
                <hr/>
                {
                    this.state.isLoading && (
                        <div className="text-center mt-5">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    )
                }
                <div className="row">
                    {
                        this.state.projectList.map((project, index) => (
                            <div className="col-md-3">
                                <Card className="mt-2" key={ index }>
                                    <Card.Header>{ project.name } <Badge variant="primary">{ project.tasks_count } task</Badge></Card.Header>
                                    <Card.Body>
                                        <Card.Title>Description: </Card.Title>

                                        <Card.Text>
                                            { project.description }
                                        </Card.Text>

                                        <Button variant="success" className="mr-2">view</Button>
                                        <Button variant="dark" className="mr-2">Edit</Button>
                                        <Button variant="danger" className="mr-2">Delete</Button>
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
 
export default ProjectList;

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