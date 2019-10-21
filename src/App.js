import React, { Component } from "react";
import { Router } from "@reach/router";
import ArticleList from "./components/ArticleList";
import Nav from "./components/Nav";
import Header from "./components/Header";
import ArticleById from "./components/ArticleById";
import ErrorHandler from "./components/ErrorHandler";
import Users from "./components/Users";
import { createGlobalStyle } from "styled-components";
import {navigate} from '@reach/router'

const GlobalStyles = createGlobalStyle`
body {
  @import url('https://fonts.googleapis.com/css?family=PT+Serif');
  font-family: 'PT Serif', serif;
}
a {
  color: #45B39D;
  text-decoration: none; 
}`;

class App extends Component {
  state = {
    user: ""
  };

  render() {
    const user = this.state.user;
    return (
      <>
        <GlobalStyles />
        <Header user={user} userHandler={this.userHandler} />
        <Nav />
        <Router>
          <ArticleList path="/" />
          <ArticleList path="/topic/:topic" />
          <ArticleById path="/articles/:article_id" user={user} />
          <Users path="/login" userHandler={this.userHandler} />
          <ErrorHandler path="error" />
          <ErrorHandler default />
        </Router>
      </>
    );
  }

  userHandler = user => {
    this.setState({ user });
    navigate("/");
  };
}

export default App;
