import React from "react";
import "./App.css";
import {Router} from "@reach/router";
import ArticleList from "./components/ArticleList";
import Nav from "./components/Nav";
import Header from "./components/Header";
import ArticleById from "./components/ArticleById";

function App() {
  return (
    <div className="App">
        <Header />
        <Nav />
        <Router>
          <ArticleList path="/"/>
          <ArticleList path="/topic/:topic"/>
          <ArticleById path="/articles/:article_id"/>
        </Router>
   
    </div>
  );
}

export default App;
