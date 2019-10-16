import React, { Component } from "react";
import { Link } from "@reach/router";
import VoterBox from "./VoterBox";
import styled from "styled-components";

class ArticleCard extends Component {
  state = {
    fullCard: false
  };
  render() {
    const Card = styled.div`
    margin-right: 10px;
    padding: 5px 10px;
    margin: 8px 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 2px 2px 2px #D3D3D3;
  `;
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
            <p>{title}</p>
          ) : (
            <Link to={`/articles/${article_id}`}>{title}</Link>
          )}
          <p> {this.props.fullCard ? body : bodyStub}</p>
          <p>{author}</p>
          <p>{new Date(created_at).toUTCString().substring(5, 22)}</p>
          <p>topic: {topic}</p>
          {!fullCard && <p>comments : {comment_count}</p>}
          {fullCard && this.props.user !== "" ? (
            <VoterBox item_id={article_id} type_article={true} votes={votes} />
          ) : (
            <p>Votes: {votes}</p>
          )}
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
