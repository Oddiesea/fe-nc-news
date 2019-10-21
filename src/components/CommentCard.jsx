import React from 'react';
import DeleteComment from "./DeleteComment";
import VoterBox from "./VoterBox";
import PostComment from "./PostComment";
import styled from "styled-components";
import Card from "../assets/styles/cardStyle";
import { deleteComment } from '../utils/api';

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

// const {comment:{ comment_id, created_at, body, author, votes }} = this.props;
// const {deletedComments, user} = this.props 

const CommentCard = ({comment:{ comment_id, created_at, body, author, votes }, deletedComments, user, handleDeleteOptimistic}) => {
    return (
        <div>
            {!deletedComments.includes(comment_id) && (
                <Card key={`${comment_id}`}>
                  <CommentHeader>{author}</CommentHeader>
                  <CommentAndVotes>
                    <p>{body}</p>

                    <VoterWrapper>
                      {user !== "" && user !== author ? (
                        <VoterBox
                          item_id={comment_id}
                          type_article={false}
                          votes={votes}
                        />
                      ) : (
                        <p>Votes: {votes}</p>
                      )}
                      {user === author && (
                        <DeleteComment
                          comment_id={comment_id}
                          handleDeleteOptimistic={handleDeleteOptimistic}
                        />
                      )}
                    </VoterWrapper>
                  </CommentAndVotes>
                  <p>{new Date(created_at).toUTCString().substring(5, 22)}</p>
                </Card>
              )}
        </div>
    );
};

export default CommentCard;