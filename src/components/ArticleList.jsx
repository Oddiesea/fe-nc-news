import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";

class ArticleList extends Component {
  state = {
    articles: [],
    sort_by: "created_at"
  };
  render() {
    const articles = this.state.articles;
    return (
      <div className="MainBody">
        <label>
          <select value={this.state.sort_by} onChange={this.changeSortBy}>
            <option value="created_at">Newest</option>
            <option value="comment_count">Most Comments</option>
            <option value="votes">Top Articles</option>
          </select>
        </label>
        {articles.map(article => {
          return (
            <ArticleCard article={article} key={`${article.article_id}card`} />
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) {
      this.fetchArticles(this.props.topic);
    }
    if (prevState.sort_by !== this.state.sort_by) {
      this.fetchArticles(this.props.topic, null, this.state.sort_by);
    }
  }

  fetchArticles = async (topic, author, sort_by) => {
    const articles = await api.getArticles(topic, author, sort_by);
    this.setState({ articles });
  };

  changeSortBy = e => {
    const sort_by = e.target.value;
    this.setState({ sort_by });
  };
}

export default ArticleList;
