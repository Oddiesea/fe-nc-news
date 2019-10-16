import React from "react";
import * as api from "../utils/api";

const DeleteComment = ({ comment_id, handleDeleteOptimistic }) => {
  const handleDelete = async () => {
    api.deleteComment(comment_id);
    handleDeleteOptimistic(comment_id);
  };
  return <button onClick={() => handleDelete()}>Delete</button>;
};

export default DeleteComment;
