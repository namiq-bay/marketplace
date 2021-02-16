import React, {Component} from "react";
import {Button, ButtonGroup, Card, Image, Table} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";
import {Link, Route} from "react-router-dom";


export default class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        this.findAllUsers();
    };

    findAllUsers() {
        axios.get("http://localhost:8080/account/all/")
            .then(response => response.data)
            .then((data) => {
                this.setState({users: data})
            });
    };

    deleteUser = (userID) => {
        axios.delete("http://localhost:8080/account/" + userID)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    this.setState({
                        users: this.state.users.filter(user => user.id !== userID)
                    });
                } else {
                    this.setState({"show": false});
                }
            });
    };

    render() {
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={"User deleted successfully!"} type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faList}/> User List</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>E-mail</th>
                                <th>Birth date</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody> {
                                this.state.users.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="6">No Users Available.</td>
                                    </tr> :
                                    this.state.users.map((user) => (
                                        <tr key={user.id}>
                                            <td>
                                                <Image src={user.photoID} roundedCircle width={25}
                                                       height={25}/> {user.username}
                                            </td>
                                            <td>{user.name}</td>
                                            <td>{user.surname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.birthDate}</td>
                                            <td>{user.location}</td>
                                            <td>
                                                <ButtonGroup>

                                                    <Link to={"/edit/" + user.id}
                                                          className="btn btn-sm btn-outline-primary"><FontAwesomeIcon
                                                        icon={faEdit}/></Link>{' '}
                                                    <Button size="sm" variant="outline-danger"
                                                            onClick={this.deleteUser.bind(this, user.id)}><FontAwesomeIcon
                                                        icon={faTrash}/></Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))
                            }
                            </tbody>

                        </Table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
