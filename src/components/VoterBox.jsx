import React, { Component } from "react";
import * as api from "../utils/api";

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
        <button
          onClick={
            this.state.votedUp
              ? () => this.handleVote(item_id, -1, "votedUp")
              : () => this.handleVote(item_id, 1, "votedUp")
          }
        >
          Upvote
        </button>
        <button
          onClick={
            this.state.votedDown
              ? () => this.handleVote(item_id, 1, "votedDown")
              : () => this.handleVote(item_id, -1, "votedDown")
          }
        >
          Downvote
        </button>
      </div>
    );
  }
  componentDidMount() {
    const { votes, type_article } = this.props;
    this.setState({ votes, type_article });
  }
  handleVote = (id, inc, toggleVote) => {
    // const refVote = {votedDown : "votedUp", votedUp: "votedDown"}
    // if (!this.state[toggleVote] === this.state[refVote[toggleVote]]) inc = inc + inc;
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
