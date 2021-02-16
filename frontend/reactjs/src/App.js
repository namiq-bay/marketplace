import React from 'react';
import './App.css';

import {Container, Row, Col} from "react-bootstrap";

import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import AddUser from "./components/AddUser";
import Footer from "./components/Footer";


import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import UserList from "./components/UserList";

function App() {
    const marginTop = {
        marginTop: "20px"
    };

    return (
        <Router>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} style={marginTop}>
                        <Switch>
                            <Route path="/" exact component={Welcome}/>
                            <Route path="/login" exact component={Login}/>
                            <Route path="/add" exact component={AddUser}/>
                            <Route path="/edit/:id" exact component={AddUser}/>
                            <Route path="/all" exact component={UserList}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Router>
    );
}

export default App;
