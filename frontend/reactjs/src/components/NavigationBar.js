import React from "react";

import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Book_icon_1.png" width="25"
                         height="25" alt="brend"/>
                    Market PLace
                </Link>
                <Nav className="mr-auto">
                    <Link to={"login"} className="nav-link">Log in</Link>
                    <Link to={"add"} className="nav-link">Add User</Link>
                    <Link to={"all"} className="nav-link">User List</Link>
                </Nav>
            </Navbar>
        );
    }
}

export default NavigationBar;