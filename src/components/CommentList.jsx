import React, { Component } from "react";
import * as api from "../utils/api";
import PostComment from "./PostComment";
import styled from "styled-components";
import CommentCard from "./CommentCard";
const CommentLabel = styled.span`
  padding: 2em;
  text-decoration: underline;
`;

class Comments extends Component {
  state = {
    user_img: "../assets/images/avatar.png",
    comments: [],
    deletedComments: []
  };
  render() {
    const { user } = this.props;
    const { deletedComments } = this.state;


    return (
      <div>
        <CommentLabel>Comments:</CommentLabel>
        {user !== "" && (
          <PostComment
            article_id={this.props.article_id}
            handlePostOptimistic={this.handlePostOptimistic}
            user={user}
          />
        )}
        {this.state.comments.map(comment => {
          return (
            <CommentCard
              comment={comment}
              deletedComments={deletedComments}
              user={user}
              handleDeleteOptimistic={this.handleDeleteOptimistic}
            />
          );
        })}
      </div>
    );
  }
  componentDidMount() {
    this.fetchComments();
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
