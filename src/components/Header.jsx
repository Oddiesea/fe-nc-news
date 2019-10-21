import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

const Header = ({ user }) => {
  const Header = styled.header`
    padding: 0.1em;
    background: #17202a;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-around;
    position: fixed;
    top: 0;
    min-width: 100vw;
    border-bottom: 1px solid #ccc;
    box-shadow: 2px 2px 2px #d3d3d3;
  `;

  const Title = styled.h1`
    grid-column: 2/3 ;
    font-size: 1.5em;
    text-align: center;
    color: #52be80;
    :hover {
      text-decoration: none;
    }
    :visited {
      text-decoration: none;
    }
  `;

  const LoggedIn = styled.p`
  color: #58D68D;
  font-size: 0.8em;
  `

  const Login = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column-reverse;
  `
  return (
    <Header className="Header">
      <p></p>
      <Link to="/">
        <Title>NC News</Title>
      </Link>
      {user !== "" ? (
        <Login>
          {" "}
          <Link to="#" onClick={() => this.props.userHandler("")}>
            Log-Out
          </Link>{" "}
          <LoggedIn>Logged in: {user}</LoggedIn>{" "}
        </Login>
      ) : (
        <Login>
          {" "}
          <Link to="/login">Login</Link>{" "}
        </Login>
      )}
    </Header>
  );
};

export default Header;
