import React, { Component } from "react";
import { Link } from "@reach/router";
import VoterBox from "./VoterBox";
import Card from "../assets/styles/cardStyle";
import styled from "styled-components";

const ArticleHeader = styled.h2`
  font-size: 1.7em;
  text-decoration: underline;
  font-weight: bold;
`;
const DateAndTopic = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ArticleLink = styled(Link)`
  font-size: 1.3em;
  text-decoration: underline;
`;

const TopicLink = styled(Link)`
font-size: 1.1em;
padding-right: 1em;
`;

class ArticleCard extends Component {
  state = {
    fullCard: false
  };
  render() {
    const {
      article: {
        article_id,
        title,
        body,
        topic,
        author,
        created_at,
        comment_count,
        votes
      }
    } = this.props;
    const bodyStub = this.makeBodyStub(body);
    const { fullCard } = this.state;
    return (
      <Card>
        {fullCard ? (
          <ArticleHeader>{title}</ArticleHeader>
        ) : (
          <ArticleLink to={`/articles/${article_id}`}>{title}</ArticleLink>
        )}
        <p> {this.props.fullCard ? body : bodyStub}</p>
        <p>{author}</p>
        {!fullCard && <p>comments : {comment_count}</p>}
        {fullCard && this.props.user !== "" ? (
          <VoterBox item_id={article_id} type_article={true} votes={votes} />
        ) : (
          <p>Votes: {votes}</p>
        )}
        <DateAndTopic>
          <p>{new Date(created_at).toUTCString().substring(5, 22)}</p>
          <TopicLink to={`/${topic}`}>{topic}</TopicLink>
        </DateAndTopic>
      </Card>
    );
  }

  componentDidMount() {
    this.props.fullCard && this.setState({ fullCard: true });
  }

  makeBodyStub = body => {
    return `${body.split(" ").reduce((string, word) => {
      return string.length + word.length < 180 ? string + " " + word : string;
    })}...`;
  };
}

export default ArticleCard;
