import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import ArticleList from "./components/ArticleList";
import Nav from "./components/Nav";
import Header from "./components/Header";
import ArticleById from "./components/ArticleById";
import ErrorHandler from "./components/ErrorHandler";
import Users from "./components/Users";


class App extends Component {
  state = {
    user: ''
  }
  render() {
    const user = this.state.user;
    return (
      <div className="App">
        <Header user={user} userHandler={this.userHandler}/>
        <Nav />
        <Router>
          <ArticleList path="/" />
          <ArticleList path="/topic/:topic" />
          <ArticleById path="/articles/:article_id" user={user}/>
          <Users path="/login" userHandler={this.userHandler}/>
          <ErrorHandler path="error" />
          <ErrorHandler default />
        </Router>
      </div>
    );
  }

  userHandler = (user) => {
    this.setState({user})
  }
}

export default App;
