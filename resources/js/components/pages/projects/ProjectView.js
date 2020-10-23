import Axios from 'axios';
import React from 'react';
import { Card, Button, Badge, Spinner, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constants';
import moment from 'moment';
import TaskCreate from '../tasks/TaskCreate';
import TaskList from '../tasks/TaskList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes, faPauseCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import ProjectEdit from './ProjectEdit';


class ProjectView extends React.Component {
    state = {
        project: {},
        taskList: [],
        isLoading: false,

        toggleAddTask: false
    };

    componentDidMount() {
        this.getProjectDetails();
    
    }

    getProjectDetails = () => {
        this.setState({ isLoading: true });
        Axios.get(`http://localhost/task/api/projects/${this.props.match.params.id}`).then((res) => {
            
            const project = res.data.data;
            const taskList = res.data.data.tasks;

            this.setState({
                project,
                taskList,
                isLoading: false,
            });
        });
    };

    toggleAddTask = () => {
        this.setState({
            toggleAddTask: !this.state.toggleAddTask
        });
    };
    toggleEditProject = () => {
        this.setState({
            toggleEditProject: !this.state.toggleEditProject
        });
    };

    onCompleteTaskCreate = (task) => {
        this.toggleAddTask();

        let tasks = this.state.taskList;
        
        tasks.unshift(task);

        this.setState({
            taskList: tasks,
        });
    };
    onCompleteEditProject = () => {
        this.toggleEditProject();

        this.getProjectDetails();
    };

    render() { 
        const mystyle = {
            backgroundColor: "#f8fafc",
            border: "none"
          };
        return ( 
            <>
                <div className="header-part">
                    <div className="float-left d-flex">
                    { !this.state.toggleEditProject && (
                            <>
                                <h2>{ this.state.project.name }</h2>
                            </>
                        )
                    }
                    { this.state.toggleEditProject && (
                            <>
                                <h2>Edit Project</h2>
                            </>
                        )
                    }
                         
                         <Button className="ml-2" onClick={ () => this.toggleEditProject() } style={{background: "transparent", border: "none"}}>
                            { !this.state.toggleEditProject && (
                                    <span>
                                        <FontAwesomeIcon icon={faEdit} style={{color: "#239aff"}} />
                                    </span>
                                )
                            }
                            { this.state.toggleEditProject && (
                                    <span>
                                        <FontAwesomeIcon icon={faTimes} style={{color: "#e3342f"}} />
                                    </span>
                                )
                            }
                        </Button>
                    </div>
                    <div className="float-right">
                        <Button variant="secondary" className="mr-2" onClick={ () => this.toggleAddTask() }>
                            { !this.state.toggleAddTask && (
                                    <span>+ Add Task</span>
                                )
                            }
                            { this.state.toggleAddTask && (
                                    <span>Cancel</span>
                                )
                            }
                        </Button>
                    </div>
                </div>
                <div className="clearfix"></div>
                <hr/>
                <div className="row">
                    <div className="col-md-6">
                    {
                        this.state.toggleEditProject && (
                            <ProjectEdit 
                                project = { this.state.project }
                                onCompleteEditProject = { this.onCompleteEditProject }
                            />
                        )
                    }
                    </div>
                    <div className="col-md-6">
                    {
                        this.state.toggleAddTask && (
                            <TaskCreate 
                                project_id = { this.props.match.params.id }
                                onCompleteTaskCreate = { this.onCompleteTaskCreate }
                            />
                        )
                    }
                    </div>
                </div>
                {
                    (this.state.toggleAddTask || this.state.toggleEditProject) && (
                       
                        <hr/>
                    )
                }
                
                <div className="body-part">
                    <div className="float-left">
                    { !this.state.toggleEditProject && (
                            <>
                                <ListGroup>
                                    <ListGroup.Item  style={ mystyle }><b>Date: </b><span>{ moment(this.state.project.created_at).format("LL") }</span></ListGroup.Item>
                                    <ListGroup.Item  style={ mystyle }><b>Time: </b><span>{ moment(this.state.project.created_at).format("LT") }</span></ListGroup.Item>
                                    <ListGroup.Item style={ mystyle }>
                                        <b>Description: </b>
                                        <p>{ this.state.project.description }</p>
                                    </ListGroup.Item>
                                </ListGroup>
                            </>
                        )
                    }
                        
                    </div>
                    <div className="float-right">
                        {this.state.project.status == 0 && ( 
                            <>
                            <button className="btn btn-outline-danger sm" disabled>
                                <FontAwesomeIcon className="mr-2" icon={faPauseCircle} style={{color: "#e3342f"}} />
                                Pending
                            </button>
                                
                            </> )}
                        {this.state.project.status == 1 && ( 
                            <>
                                <button className="btn btn-outline-success sm" disabled>
                                    <FontAwesomeIcon className="mr-2" icon={faCheckCircle} style={{color: "#38c172"}} />
                                    Completed
                                </button>
                            </> )}
                    </div>
                </div>
                <div className="clearfix"></div>
                {
                    this.state.isLoading && (
                        <div className="text-center mt-5">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    )
                }
                <hr/>
                <TaskList taskList = { this.state.taskList } />
                
            </>
        );
    }
}
 
export default ProjectView;

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