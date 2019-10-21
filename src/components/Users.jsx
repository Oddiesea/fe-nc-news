import React, { Component } from "react";
import * as api from "../utils/api";
import styled from "styled-components";
import Button from "../assets/styles/buttonStyle"

const UserWrapper = styled.div`
display: grid;
grid-template-columns: ${window.innerWidth < 1040 ? "1fr" : "1fr 1fr"};
padding: 5em;
align-items: center;
background: whitesmoke;
`;
const User = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 5em;
padding: 5px 10px;
margin: 8px 5px;
border-bottom: 1px solid #ccc;
border-right: 1px solid #ccc;
border-radius: 4px;
box-shadow: 2px 2px 2px #d3d3d3;
background: white;
`;
const UserAvatar = styled.img`
margin-right: 10px;
width: 100px;
height: 100px;
margin-right: 50px;
margin-left: 50px;
margin-bottom: 1em;
border: 1px solid #ccc;
border-radius: 4px;
//   box-shadow: inset 3px 3px 3px rgba(0,0,0,0.6)
`;

const UserHeader = styled.h2`
font-size: 1.3em;
text-decoration: underline;
`

class Users extends Component {
  state = {
    users: []
  };
  render() {
    return (
      <UserWrapper>
        {this.state.users.map(({ username, name, avatar_url }) => {
          return (
            <User key={`${username}Card`}>
              <UserHeader>{username}</UserHeader>
              <p>{name}</p>
              <UserAvatar src={avatar_url} alt="avatar" />
              <Button onClick={() => this.props.userHandler(username)}>
                Login
              </Button>
            </User>
          );
        })}
      </UserWrapper>
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
