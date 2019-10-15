import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";

class Nav extends Component {
  state = {
    topics: []
  };
  render() {
    return (
      <nav className="Nav">
        { this.state.topics.map(({slug }) => {
          return (
            <li key={slug}>
              <Link to={`/topic/${slug}`}>
                {`${slug[0].toUpperCase()}${slug.substring(1)}`}
              </Link>
            </li>
          );
        })}
      </nav>
    );
  }
  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = async () => {
    const topics = await api.getAllTopics();
    this.setState({ topics });
  };
}

export default Nav;
