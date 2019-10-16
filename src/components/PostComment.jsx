import React, { Component } from "react";
import * as api from "../utils/api";

class PostComment extends Component {
  state = {
    newComment: {
      user: "",
      body: ""
    }
  };
  render() {
    return (
      <div className="post-comment">
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="Your text here."
              name="name"
              value={this.state.newComment.body}
              required
            />
          </label>
          <button className="submit-button">Post Comment</button>
        </form>
      </div>
    );
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({ newComment: { user } }, () => console.log(this.state));
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState(currentState => {
      return {
        newComment: { ...currentState.newComment, body: value }
      };
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { user, body } = this.state.newComment;
    const { article_id } = this.props;
    const newComment = await api.postComment(article_id, user, body);
    this.props.handlePostOptimistic(newComment);
    this.setState({ newComment: { body: "" } });
  };
}

export default PostComment;
