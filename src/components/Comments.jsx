import React, { Component } from "react";
import * as api from "../utils/api";
import DeleteComment from "./DeleteComment";
import VoterBox from "./VoterBox";
import PostComment from "./PostComment";
import styled from 'styled-components';

class Comments extends Component {
  state = {
    user: "",
    comments: [],
    deletedComments: []
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
    const {user} = this.props;
    return (
      <div>
        Comments:
        {user !== '' &&(<PostComment
          article_id={this.props.article_id}
          handlePostOptimistic={this.handlePostOptimistic}
          user={user}
        />)}
        {this.state.comments.map(
          ({ comment_id, created_at, body, author, votes }) => {
            return (
              !this.state.deletedComments.includes(comment_id) && (
                <Card key={`${comment_id}`}>
                  {body}
                  <p>{author}</p>
                  <p>{new Date(created_at).toUTCString().substring(5, 22)}</p>
                  {user !== '' && this.state.user !== author ? (
                    <VoterBox
                      item_id={comment_id}
                      type_article={false}
                      votes={votes}
                    />
                  ) : (
                    <p>Votes: {votes}</p>
                  )}
                  {this.state.user === author && (
                    <DeleteComment
                      comment_id={comment_id}
                      handleDeleteOptimistic={this.handleDeleteOptimistic}
                    />
                  )}
                </Card>
              )
            );
          }
        )}
      </div>
    );
  }
  componentDidMount() {
    const {user} = this.props
    this.fetchComments();
    this.setState({user});
  }

  handleDeleteOptimistic = comment_id => {
    this.setState(currentState => {
      return { deletedComments: [...currentState.deletedComments, comment_id] };
    });
  };

  handlePostOptimistic = newComment => {
    this.setState(currentState => {
      return { comments: [newComment, ...currentState.comments] };
    });
  };

  fetchComments = async () => {
    const { article_id } = this.props;
    const comments = await api.getCommentsByArticleId(article_id);
    this.setState({ comments });
  };
}

export default Comments;
