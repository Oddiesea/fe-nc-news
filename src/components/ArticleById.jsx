import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";
import Comments from "./Comments";
import {errorMiddleware} from "../utils/index"
import styled from "styled-components";

class ArticleById extends Component {
  state = {
    article: {},
    user: ''
  };
  render() {
    const { user } = this.props;
    const Main = styled.div`
    padding-top: 5em;
    padding-left: 1em;
    padding-right: 1em;
    `
    return (
      <Main>
        {Object.keys(this.state.article).length !== 0 && (
          <>
            <button onClick={() => window.history.back()}>Back</button>
            <ArticleCard article={this.state.article} fullCard={true} user={user}/>
            <Comments article_id={this.props.article_id} user={user}/>
          </>
        )}
      </Main>
    );
  }

  componentDidMount() {
    const { user } = this.props;
    this.fetchArticle();
    this.setState({user})
  }

  fetchArticle = async () => {
    const { article_id } = this.props;
    try {
      const article = await api.getArticleById(article_id);
      this.setState({ article });} 
      catch(error) {errorMiddleware(error)}

  };
}

export default ArticleById;
