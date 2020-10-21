import React, { useState } from 'react';
import { Container, Navbar, Nav, NavDropdown, Image, Figure } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PUBLIC_URL } from '../../constants';

const Header = () => {

//   const [publicURL, setPublicURL] = useState("/task");

  return (
	<Navbar bg="dark" variant="dark" expand="lg" sticky="top">
		<Container>
			<Link to={`${PUBLIC_URL}`}>
				<Navbar.Brand>
						<img
							src="public/assets/images/logo3.png"
							width="100"
							height="36"
							className="d-inline-block align-top"
							alt="task logo"
						/>
				</Navbar.Brand>
			</Link>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Link to={`${PUBLIC_URL}`}>
						<Nav.Item className="text-white mr-2 mt-2">Home</Nav.Item>
					</Link>
					<Link to={`${PUBLIC_URL}/projects`}>
						<Nav.Item className="text-white mr-2 mt-2">Projects</Nav.Item>
					</Link>
					<Link to={`${PUBLIC_URL}/about`}>
						<Nav.Item className="text-white mr-2 mt-2">About</Nav.Item>
					</Link>
					<Link to={`${PUBLIC_URL}/contact`}>
						<Nav.Item className="text-white mr-2 mt-2">Contact</Nav.Item>
					</Link>
					{/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
						<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
					</NavDropdown> */}
				</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar>
  )
}

export default Header;