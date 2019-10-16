import React, { Component } from 'react';
import * as api from "../utils/api";

class Users extends Component {
    state = {
        users : []
    }
    render() {
        return (
            <div>
                {this.state.users.map(({username, name, avatar_url}) => {
                return (<li key={`${username}Card`}>
                    <p>{username}</p>
                    <p>{name}</p>
                    <img src={avatar_url} alt="avatar"/>
                    <button onClick={() => this.props.userHandler(username)}>Login</button>
                </li>)
                }) }
            </div>
        );
    }

    componentDidMount() {
        this.fetchAllUsers();
    }

    fetchAllUsers = async () => {
        const users = await api.getAllUsers();
        this.setState({users})
    }
}

export default Users;