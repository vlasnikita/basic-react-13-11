import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'
import {connect} from 'react-redux'
import {createCommentListByArticleSelector} from '../selectors'
import {loadCommentsByArticleId} from "../AC/index";

class CommentList extends Component {
    static propTypes = {
        article: PropTypes.object.isRequired,
        //from toggleOpen decorator
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

    componentWillReceiveProps({article, isOpen}) {
        if(!this.props.isOpen && isOpen) loadCommentsByArticleId(article.id)
    }

    render() {
        const {isOpen, toggleOpen} = this.props
        const text = isOpen ? 'hide comments' : 'show comments'
        return (
            <div>
                <button onClick={toggleOpen}>{text}</button>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        const {article: { id }, isOpen, comments} = this.props
        if (!isOpen) return null

        const commentKeys = Object.keys(comments)
        const body = !!commentKeys.length ? (
            <ul>
                {commentKeys.map(key => <li key = {key}>
                    <Comment {...comments[key]} />
                </li>)}
            </ul>
        ) : <h3>No comments yet</h3>

        return (
            <div>
                {body}
                <CommentForm articleId = {id} />
            </div>
        )
    }
}

const createMapStateToProps =()=> {
    const commentListSelector = createCommentListByArticleSelector()

    return (state, ownProps) => ({
        comments: commentListSelector(state, ownProps)
    })
}

export default connect(createMapStateToProps, {loadCommentsByArticleId})(toggleOpen(CommentList))