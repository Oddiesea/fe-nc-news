import React, { Component } from 'react';
import * as api from "../utils/api";

class PostComment extends Component {
    state = {
        newComment : {
            username: "butter_bridge", body: ''
        }
    }
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

    handleChange = event => {
        const { value} = event.target;
        this.setState(currentState => {
          return {
            newComment: { ...currentState.newComment, body: value }
          };
        });
      };
    
    handleSubmit = async  (event) => {
        event.preventDefault();
        const { username, body } = this.state.newComment;
        const { article_id } = this.props;
        console.log(username, body, article_id)
        const newComment = await api.postComment({article_id, username, body })
        console.log(newComment);
    }
    
}

export default PostComment;