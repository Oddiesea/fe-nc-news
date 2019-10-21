import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";
import Button from "../assets/styles/buttonStyle"
import Comments from "./CommentList";
import {errorMiddleware} from "../utils/index"
import styled from "styled-components";

const Main = styled.div`
padding-top: 5em;
padding-left: 1em;
padding-right: 1em;
background: whitesmoke;
`
const Border = styled.div`
border-bottom: 1px solid #ccc;
padding: 1em;
margin: 1em;
`
class ArticleById extends Component {
  state = {
    article: {},
    user: ''
  };
  render() {
    const { user } = this.props;
    return (
      <Main>
        {Object.keys(this.state.article).length !== 0 && (
          <>
            <Button onClick={() => window.history.back()}>Back</Button>
            <ArticleCard article={this.state.article} fullCard={true} user={user}/>
            <Border />
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
