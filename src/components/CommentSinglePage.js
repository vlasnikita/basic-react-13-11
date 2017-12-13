import React, {Component} from 'react'
import Comment from './Comment'
import {connect} from 'react-redux'
import Loader from './common/Loader'
import { loadCommentsPage } from '../AC'
import { commentsPageSelector, commentsLoadingSelector } from '../selectors'

class CommentSinglePage extends Component {

    componentDidMount() {
        const { loadCommentsPage, page } = this.props
        loadCommentsPage(page)
    }

    render() {
        const { comments } = this.props

        if(!comments) return null
        return (
            <ul>
                {comments.map(({id}) => <li key = {id}><Comment id = {id} /></li>)}
            </ul>
        )
    }

}

const mapStateToProps = (state, props) => ({
    comments: commentsPageSelector(state, props),
    loading: commentsLoadingSelector(state)
})

export default connect(mapStateToProps, { loadCommentsPage })(CommentSinglePage)