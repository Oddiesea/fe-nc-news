import React, { Component } from "react";
import * as api from "../utils/api";
import styled from "styled-components";

class PostComment extends Component {
  state = {
    newComment: {
      user: "",
      body: ""
    }
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
    return (
      <Card className="post-comment">
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              onChange={this.handleChange}
              type="text"
              placeholder="Leave a comment..."
              name="name"
              value={this.state.newComment.body}
              required
            />
          </label>
          <button className="submit-button">Post Comment</button>
        </form>
      </Card>
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
