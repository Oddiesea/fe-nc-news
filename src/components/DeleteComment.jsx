import React from "react";
import * as api from "../utils/api";
import Button from "../assets/styles/buttonStyle"

const DeleteComment = ({ comment_id, handleDeleteOptimistic }) => {
  const handleDelete = async () => {
    api.deleteComment(comment_id);
    handleDeleteOptimistic(comment_id);
  };
  return <Button onClick={() => handleDelete()}>Delete</Button>;
};

export default DeleteComment;
