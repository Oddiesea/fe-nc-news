import React, { Component } from "react";
import * as api from "../utils/api";
import DeleteComment from "./DeleteComment";
import VoterBox from "./VoterBox";

class Comments extends Component {
  state = {
    user: "tickle122",
    comments: [],
    deletedComments: []
  };
  render() {
    return (
      <div>
        {this.state.comments.map(
          ({ comment_id, created_at, body, author, votes }) => {
            return (
              !this.state.deletedComments.includes(comment_id) && (
                <li key={`${comment_id}`}>
                  {body}
                  <p>{author}</p>
                  <p>{new Date(created_at).toUTCString()}</p>
                  <p>{votes}</p>
                  {this.state.user !== author ? (
                    <VoterBox
                      item_id={comment_id}
                      type_article={true}
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
                </li>
              )
            );
          }
        )}
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

  fetchComments = async () => {
    const { article_id } = this.props;
    const comments = await api.getCommentsByArticleId(article_id);
    this.setState({ comments });
  };
}

export default Comments;
