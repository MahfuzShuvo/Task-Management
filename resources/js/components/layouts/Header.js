import React, { useState } from 'react';
import { Container, Navbar, Nav, NavDropdown, Image, Figure } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Header = () => {

  const [publicURL, setPublicURL] = useState("/task");

  return (
	<Navbar bg="dark" variant="dark" expand="lg" sticky="top">
		<Container>
			<Navbar.Brand href="#">
				<Link to={`${publicURL}`}>
					<img
				        src="public/assets/images/logo3.png"
				        width="100"
				        height="36"
				        className="d-inline-block align-top"
				        alt="task logo"
				    />
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="#">
						<Link to={`${publicURL}`}>Home</Link>
					</Nav.Link>
					<Nav.Link href="#">
						<Link to={`${publicURL}/contact`}>Contact</Link>
					</Nav.Link>
					<Nav.Link href="#">
						<Link to={`${publicURL}/about`}>About</Link>
					</Nav.Link>
					<NavDropdown title="Dropdown" id="basic-nav-dropdown">
						<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar>
  )
}

export default Header;