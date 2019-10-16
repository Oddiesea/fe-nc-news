import React, { Component } from "react";
import * as api from "../utils/api";
import styled from "styled-components";

class Users extends Component {
  state = {
    users: []
  };
  render() {
    const User = styled.div`
      margin-right: 10px;
      padding: 5px 10px;
      margin: 8px 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 2px 2px 2px #D3D3D3;
    `;
    const UserAvatar = styled.img`
      margin-right: 10px;
      width: 100px;
      height: 100px;
      border: 1px solid #ccc;
      border-radius: 4px;
    //   box-shadow: inset 3px 3px 3px rgba(0,0,0,0.6)
    `;
    return (
      <div>
        {this.state.users.map(({ username, name, avatar_url }) => {
          return (
            <User key={`${username}Card`}>
              <p>{username}</p>
              <p>{name}</p>
              <UserAvatar src={avatar_url} alt="avatar" />
              <button onClick={() => this.props.userHandler(username)}>
                Login
              </button>
            </User>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    this.fetchAllUsers();
  }

  fetchAllUsers = async () => {
    const users = await api.getAllUsers();
    this.setState({ users });
  };
}

export default Users;
