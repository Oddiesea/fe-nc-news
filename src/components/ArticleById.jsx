import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";
import Comments from "./Comments";
import PostComment from "./PostComment";

class ArticleById extends Component {
  state = {
    article: {}
  };
  render() {
    return (
      <div>
        {Object.keys(this.state.article).length !== 0 && (
          <>
            <ArticleCard article={this.state.article} fullCard={true} />
            <PostComment article_id={this.props.article_id}/>
            <Comments article_id={this.props.article_id} />
          </>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticle();
  }

//   componentDidUpdate(prevProps) {
//     if (prevProps.article_id !== this.props.article_id) {
//       this.fetchArticle(this.props.article_id);
//     }
//   }

  fetchArticle = async () => {
    const { article_id } = this.props;
    const article = await api.getArticleById(article_id);
    this.setState({ article });
  };
}

export default ArticleById;
