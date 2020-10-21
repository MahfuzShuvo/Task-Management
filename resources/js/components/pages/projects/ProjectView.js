import Axios from 'axios';
import React from 'react';
import { Card, Button, Badge, Spinner, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constants';
import moment from 'moment';
import TaskCreate from '../tasks/TaskCreate';
import TaskList from '../tasks/TaskList';

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

    onCompleteTaskCreate = (task) => {
        this.toggleAddTask();

        let tasks = this.state.taskList;
        
        tasks.unshift(task);

        this.setState({
            taskList: tasks,
        });
    };

    render() { 
        const mystyle = {
            backgroundColor: "#f8fafc",
            border: "none"
          };
        return ( 
            <>
                <div className="header-part">
                    <div className="float-left">
                        <h2>{ this.state.project.name }</h2>
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
                {
                    this.state.toggleAddTask && (
                        <TaskCreate 
                            project_id = { this.props.match.params.id }
                            onCompleteTaskCreate = { this.onCompleteTaskCreate }
                        />
                    )
                }
                <div className="body-part">
                    <div className="float-left">
                    <ListGroup>
                        <ListGroup.Item  style={ mystyle }><b>Date: </b><span>{ moment(this.state.project.created_at).format("LL") }</span></ListGroup.Item>
                        <ListGroup.Item  style={ mystyle }><b>Time: </b><span>{ moment(this.state.project.created_at).format("LT") }</span></ListGroup.Item>
                        <ListGroup.Item style={ mystyle }>
                            <b>Description: </b>
                            <p>{ this.state.project.description }</p>
                        </ListGroup.Item>
                    </ListGroup>
                        
                        
                    </div>
                    <div className="float-right">
                        <b><Badge variant="warning">No. of Task: {this.state.taskList.length}</Badge></b>
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