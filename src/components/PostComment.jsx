import React, { Component } from "react";
import * as api from "../utils/api";
import Card from "../assets/styles/cardStyle"
import Button from "../assets/styles/buttonStyle"

class PostComment extends Component {
  state = {
    body: ""
  };
  render() {
    return (
      <Card className="post-comment">
        <form onSubmit={this.handleSubmit}>
          <label>
            <textarea
              onChange={this.handleChange}
              rows="4"
              cols={window.innerWidth < 1040 ? 35 : 80}
              placeholder="Leave a comment..."
              name="name"
              value={this.state.body}
              required
            />
          <Button className="submit-button">Post Comment</Button>
          </label>
        </form>
      </Card>
    );
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({body : value});
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { body } = this.state;
    const { article_id, user} = this.props;
    const newComment = await api.postComment(article_id, user, body);
    this.props.handlePostOptimistic(newComment);
    this.setState({body: ''})
  };
}

export default PostComment;
