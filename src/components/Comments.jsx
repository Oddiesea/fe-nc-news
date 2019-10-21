import React, { Component } from "react";
import * as api from "../utils/api";
import DeleteComment from "./DeleteComment";
import VoterBox from "./VoterBox";
import PostComment from "./PostComment";
import styled from "styled-components";
import Card from "../assets/styles/cardStyle";

const CommentLabel = styled.span`
  padding: 2em;
`;

const CommentHeader = styled.span`
  size: 2em;
  font-weight: bold;
`;

const CommentAndVotes = styled.div`
  display: flex;
  justify-content: space-between;
`;

const VoterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5em;
`;

class Comments extends Component {
  state = {
    user: "",
    user_img: "../assets/images/avatar.png",
    comments: [],
    deletedComments: []
  };
  render() {
    const { user } = this.props;
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
        {this.state.comments.map(
          ({ comment_id, created_at, body, author, votes }) => {
            return (
              !this.state.deletedComments.includes(comment_id) && (
                <Card key={`${comment_id}`}>
                  <CommentHeader>{author}</CommentHeader>
                  <CommentAndVotes>
                    <p>{body}</p>

                    <VoterWrapper>
                      {user !== "" && this.state.user !== author ? (
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
                    </VoterWrapper>
                  </CommentAndVotes>
                  <p>{new Date(created_at).toUTCString().substring(5, 22)}</p>
                </Card>
              )
            );
          }
        )}
      </div>
    );
  }
  componentDidMount() {
    const { user } = this.props;
    this.fetchComments();
    this.setState({ user });
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
