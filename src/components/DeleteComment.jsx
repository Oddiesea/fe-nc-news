import React, { Component } from 'react';
import * as api from "../utils/api";

class DeleteComment extends Component {
    render() {
        return (
            <button onClick={() => this.handleDelete()}>Delete</button>
        );
    }
    handleDelete = async () => {
        const {comment_id} = this.props
        api.deleteComment(comment_id)
        this.props.handleDeleteOptimistic(comment_id)
    }
}

export default DeleteComment;