import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

const Header = ({ user }) => {
  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: #DC143C;
    :hover {
      text-decoration: none;
    }
    :visited {
      text-decoration: none;
    }
  `;
  const Header = styled.section`
    padding: 0.5em;
    background:	#696969;
    display: flex;
    align-items: center;
    // position: fixed;
    // top: 0;
    justify-content: space-between;
    min-width: 80vw;
    border-bottom: 1px solid #ccc;
    box-shadow: 2px 2px 2px #d3d3d3;
  `;
  return (
    <Header className="Header">
      <Link to="/">
        <Title>NC News</Title>
      </Link>
      {user !== "" ? (
        <>
          {" "}
          <Link to="#" onClick={() => this.props.userHandler("")}>
            Log-Out
          </Link>{" "}
          <p>Logged in: {user}</p>{" "}
        </>
      ) : (
        <>
          {" "}
          <Link to="/login">Login</Link>{" "}
        </>
      )}
    </Header>
  );
};

export default Header;
