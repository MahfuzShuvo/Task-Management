import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { Container } from "react-bootstrap";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProjectList from "./pages/projects/ProjectList";
import ProjectCreate from './pages/projects/ProjectCreate';
import { PUBLIC_URL } from '../constants';

export class App extends Component {
    render() {
        return (
            <Router>
                <Header />
                <div>
                    <Container className="p-4">
                        <Switch>
                            <Route path={`${PUBLIC_URL}/about`}>
                                <About />
                            </Route>
                            <Route path={`${PUBLIC_URL}/contact`}>
                                <Contact />
                            </Route>
                            <Route path={`${PUBLIC_URL}/projects`}>
                                <ProjectList />
                            </Route>
                            <Route path={`${PUBLIC_URL}/project/create`}>
                                <ProjectCreate />
                            </Route>
                            <Route path={`${PUBLIC_URL}`}>
                                <Home />
                            </Route>
                        </Switch>

                        <Footer />
                    </Container>
                </div>

               
            </Router>
        );
    }
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
