import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";
import { slide as Menu } from 'react-burger-menu'
import styled from 'styled-components';
import {styles} from './menuStyle';

class Nav extends Component {
  state = {
    topics: [],
    menuOpen: false
  };

  render() {
    const LinkTo = styled(Link)`
    
    ` 
    return (
      <Menu styles={ styles } width={window.innerWidth < 1040 ? '70%':'20%'} isOpen={ this.state.menuOpen }
      onStateChange={(state) => this.handleStateChange(state)}>
        { this.state.topics.map(({slug }) => {
          return (
            <li key={slug}>
              <Link to={`/topic/${slug}`} onClick={() => this.handleLink()}>
                {`${slug[0].toUpperCase()}${slug.substring(1)}`}
              </Link>
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
    this.setState({menuOpen: false})
  }

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }


}

export default Nav;

