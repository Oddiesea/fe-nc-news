import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";
import { slide as Menu } from "react-burger-menu";
import styled from "styled-components";
import { styles } from "../assets/styles/menuStyle";

const LinkTo = styled(Link)`
text-decoration: "none";
color: inherited;
font-size: 1.2em;
}`;

const HomeLink = styled(Link)`
  font-size: 1.5em;
  text-align: center;
`;
class Nav extends Component {
  state = {
    topics: [],
    menuOpen: false
  };

  render() {
    return (
      <Menu
        styles={styles}
        width={window.innerWidth < 1040 ? "70%" : "20%"}
        isOpen={this.state.menuOpen}
        onStateChange={state => this.handleStateChange(state)}
      >
        <li>
          <HomeLink to={`/`} onClick={() => this.handleLink()}>
            Home
          </HomeLink>
        </li>
        {this.state.topics.map(({ slug }) => {
          return (
            <li key={slug}>
              <LinkTo to={`/topic/${slug}`} onClick={() => this.handleLink()}>
                {`${slug[0].toUpperCase()}${slug.substring(1)}`}
              </LinkTo>
            </li>
          );
        })}
      </Menu>
    );
  }
  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = async () => {
    const topics = await api.getAllTopics();
    this.setState({ topics });
  };

  handleLink = () => {
    this.setState({ menuOpen: false });
  };

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }
}

export default Nav;
