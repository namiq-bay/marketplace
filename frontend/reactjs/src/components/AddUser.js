import React, {Component} from "react";
import {Button, Card, Col, Form} from "react-bootstrap";
import {faEdit, faList, faPlusSquare, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import MyToast from "./MyToast";

export default class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.accountChange = this.accountChange.bind(this);
        this.submitAccount = this.submitAccount.bind(this);
    }

    initialState = {
        id: '', username: '', name: '', surname: '', email: '', birthDate: '', location: ''
    };

    componentDidMount() {
        const userID = this.props.match.params.id;
        if (userID) {
            this.findUserByID(userID);
        }
    }

    findUserByID = (userID) => {
        axios.get("http://localhost:8080/account/" + userID)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        username: response.data.username,
                        name: response.data.name,
                        surname: response.data.surname,
                        email: response.data.email,
                        birthDate: response.data.birthDate,
                        location: response.data.location
                    });
                }
            }).catch((error) => {
            console.error("Error: " + error);
        });
    }

    submitAccount = event => {
        event.preventDefault();

        const account = {
            username: this.state.username,
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            birthDate: this.state.birthDate,
            location: this.state.location
        };

        axios.post("http://localhost:8080/account/", account)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true, "method": "post"});
                    setTimeout(() => this.setState({"show": false}), 3000);
                } else {
                    this.setState({"show": false});
                }
            });
        this.setState(this.initialState);
    };

    updateAccount = event => {
        event.preventDefault();

        const account = {
            id: this.state.id,
            username: this.state.username,
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            birthDate: this.state.birthDate,
            location: this.state.location
        };

        axios.put("http://localhost:8080/account/", account)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true, "method": "put"});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    setTimeout(() => this.userList(), 3000);
                } else {
                    this.setState({"show": false});
                }
            });
        this.setState(this.initialState);
    };


    resetAccount = () => {
        this.setState(() => this.initialState);
    };

    accountChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    userList = event => {
        return this.props.history.push("/all");
    }

    render() {
        const {username, name, surname, email, birthDate, location} = this.state;
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show}
                             message={this.state.method === "put" ? "User updated successfully" : "User added successfully"}
                             type={"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon
                            icon={this.state.id ? faEdit : faPlusSquare}/> {this.state.id ? "Update user" : "Add new user"}
                    </Card.Header>

                    <Form onReset={this.resetAccount} onSubmit={this.state.id ? this.updateAccount : this.submitAccount}
                          id="userFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="username"
                                                  value={username} onChange={this.accountChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Username"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="name"
                                                  value={name} onChange={this.accountChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter your name"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridSurname">
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="surname"
                                                  value={surname} onChange={this.accountChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter your surname"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  value={email} onChange={this.accountChange}
                                                  type="email" name="email"
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter your e-mail"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridBirthDate">
                                    <Form.Label>Birth Date</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  value={birthDate} onChange={this.accountChange}
                                                  type="date" name="birthDate"
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter your birth date"/>
                                </Form.Group>


                                <Form.Group as={Col} controlId="formGridLocation">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control required autoComplete="off" name="location"
                                                  onChange={this.accountChange}
                                                  className={"bg-dark text-white"}
                                                  as="select">
                                        <option>Choose your location</option>
                                        <option value="BAKU">Baku</option>
                                        <option value="GANJA">Ganja</option>
                                        <option value="KHANKANDI">Khankandi</option>
                                        <option value="SHUSHA">Shusha</option>
                                        <option value="LACHIN">Lachin</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button variant="success" size="sm" type="submit">
                                <FontAwesomeIcon icon={faSave}/>{this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button variant="info" size="sm" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>{' '}
                            <Button variant="info" size="sm" type="button" onClick={this.userList.bind()}>
                                <FontAwesomeIcon icon={faList}/> User List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}