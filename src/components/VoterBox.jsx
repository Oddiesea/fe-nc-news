import React, { Component } from "react";
import * as api from "../utils/api";
import Button from "../assets/styles/buttonStyle";
import styled from "styled-components";

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

class VoterBox extends Component {
  state = {
    votes: 0,
    type_article: false,
    votedUp: false,
    votedDown: false
  };
  render() {
    const { item_id } = this.props;
    return (
      <div>
        Votes: {this.state.votes}
        <ButtonDiv>
          <Button
            onClick={
              this.state.votedUp
                ? () => this.handleVote(item_id, -1, "votedUp")
                : () => this.handleVote(item_id, 1, "votedUp")
            }
          >
            Upvote
          </Button>
          <Button
            onClick={
              this.state.votedDown
                ? () => this.handleVote(item_id, 1, "votedDown")
                : () => this.handleVote(item_id, -1, "votedDown")
            }
          >
            Downvote
          </Button>
        </ButtonDiv>
      </div>
    );
  }
  componentDidMount() {
    const { votes, type_article } = this.props;
    this.setState({ votes, type_article });
  }
  handleVote = (id, inc, toggleVote) => {
    this.state.type_article
      ? api.sendArticleVote(id, inc)
      : api.sendCommentVote(id, inc);
    this.setState(currentSate => {
      return {
        votes: currentSate.votes + inc,
        [toggleVote]: !this.state[toggleVote]
      };
    });
  };
}

export default VoterBox;
