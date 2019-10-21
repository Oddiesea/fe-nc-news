import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";
import styled from "styled-components";

class ArticleList extends Component {
  state = {
    articles: [],
    sort_by: "created_at"
  };
  render() {
    const Main = styled.div`
      padding-top: 5em;
      padding-left: 1em;
      padding-right: 1em;
      background: whitesmoke;
    `;
    const SortWrapper = styled.div`
      display: flex;
      justify-content: flex-end;
    `;
    const Select = styled.select`
    margin-right: 1em;
    border: 1px solid #1C2833;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    :focus {
      box-shadow: 0 0 1px 1px rgba(69, 179, 157, .7);
    }
    `;
    const articles = this.state.articles;
    return (
      <Main className="MainBody">
        <SortWrapper>
          <label>
            <Select value={this.state.sort_by} onChange={this.changeSortBy}>
              <option value="created_at">Newest</option>
              <option value="comment_count">Most Comments</option>
              <option value="votes">Top Articles</option>
            </Select>
          </label>
        </SortWrapper>
        {articles.map(article => {
          return (
            <ArticleCard article={article} key={`${article.article_id}card`} />
          );
        })}
      </Main>
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
