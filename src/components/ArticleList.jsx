import React, { Component } from 'react';
import * as api from "../utils/api";
import ArticleCard from './ArticleCard';

class ArticleList extends Component {
    state = {
        articles : []
    }
    render() {
        return (
            <div className="MainBody">
                {this.state.articles.map(article => {
                     return <ArticleCard  article={article}   key={`${article.article_id}card`}/>
                }) }
            </div>
        );
    }

    componentDidMount() {
        this.fetchArticles();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topic !== this.props.topic){
          this.fetchArticles(this.props.topic);
        } 
      }

    fetchArticles = async (topic) => {
        const articles = await api.getArticles(topic);
        this.setState({articles});
    }
}

export default ArticleList;