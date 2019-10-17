import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

const Header = ({ user }) => {
  const Header = styled.section`
    padding: 0.1em;
    background: #17202a;
    display: inline-grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    position: fixed;
    top: 0;
    justify-content: space-between;
    min-width: 100vw;
    border-bottom: 1px solid #ccc;
    box-shadow: 2px 2px 2px #d3d3d3;
  `;

  const Title = styled.h1`
    grid-column-start: 2;
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

  const Login = styled.div`
  grid-column-start: 3;
  `
  return (
    <Header className="Header">
      <Link to="/">
        <Title>NC News</Title>
      </Link>
      {user !== "" ? (
        <Login>
          {" "}
          <Link to="#" onClick={() => this.props.userHandler("")}>
            Log-Out
          </Link>{" "}
          <p>Logged in: {user}</p>{" "}
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
