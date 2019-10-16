import React, { Component } from "react";
import * as api from "../utils/api";
import DeleteComment from "./DeleteComment";
import VoterBox from "./VoterBox";
import PostComment from "./PostComment";

class Comments extends Component {
  state = {
    user: "",
    comments: [],
    deletedComments: []
  };
  render() {
    const {user} = this.props;
    return (
      <div>
        {user !== '' &&(<PostComment
          article_id={this.props.article_id}
          handlePostOptimistic={this.handlePostOptimistic}
          user={user}
        />)}
        {this.state.comments.map(
          ({ comment_id, created_at, body, author, votes }) => {
            return (
              !this.state.deletedComments.includes(comment_id) && (
                <li key={`${comment_id}`}>
                  {body}
                  <p>{author}</p>
                  <p>{new Date(created_at).toUTCString()}</p>
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
                </li>
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
