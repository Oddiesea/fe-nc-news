import React, { Component } from "react";
import {Link} from "@reach/router";
import VoterBox from "./VoterBox";

class ArticleCard extends Component {
    state = {
        fullCard : false
    }
  render() {
    const {article: {article_id, title, body, topic, author, created_at, comment_count, votes }} = this.props;
    const bodyStub = this.makeBodyStub(body);
    const {fullCard} = this.state;
    return(
      <>
       <Link to={`/articles/${article_id}`}> 
       <p> {title}</p>
       <p> {this.props.fullCard?body:bodyStub}</p>
       <p>{author}</p>
       <p>{(new Date(created_at)).toUTCString()}</p>
       <p>topic: {topic}</p>
       {!fullCard&&<p>comments : {comment_count}</p>}
       </Link>
       {/* {!fullCard &&  */}
       <VoterBox item_id={article_id} type_article={true} votes={votes}/>

       </>
    )
  }

  componentDidMount() {
    (this.props.fullcard && this.setState({fullCard: true}))
  }

  makeBodyStub = (body) => {
    return `${body.split(' ').reduce((string, word) => {
      return string.length + word.length < 180? string + ' ' + word : string;
  })}...`
  }


}

export default ArticleCard;
