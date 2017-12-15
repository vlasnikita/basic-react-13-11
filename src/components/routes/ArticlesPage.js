import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import PropTypes from 'prop-types'
import ArticleList from '../ArticleList'
import Article from '../Article'
import { DICTIONARY } from "../../constants/"

class ArticlesPage extends Component {
    static contextTypes = {
        lang: PropTypes.string
    }
    static propTypes = {

    };

    render() {
        console.log('---', 2)
        return (
            <div>
                <ArticleList noArticles={DICTIONARY[this.context.lang].noArticles} />
                <Route path={`${this.props.match.path}/:id`} children={this.getArticle}/>
            </div>
        )
    }

    getArticle = ({ match }) => {
        if (!match) return <h1>{DICTIONARY[this.context.lang].chooseArticles}</h1>
        console.log('---', 3)
        return <Article
                    id={match.params.id}
                    key={match.params.id}
                    increment={DICTIONARY[this.context.lang].incrementBtn}
                    deleteText={DICTIONARY[this.context.lang].deleteText}
                    creationDate={DICTIONARY[this.context.lang].creationDate}
                    open={DICTIONARY[this.context.lang].open}
                    close={DICTIONARY[this.context.lang].close}
                    isOpen
                />
    }
}

export default ArticlesPage