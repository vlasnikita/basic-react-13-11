import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import CommentPagination from '../CommentPagination'
import CommentSinglePage from '../CommentSinglePage'
import {connect} from 'react-redux'
import { commentsTotalSelector, commentsPageSelector } from '../../selectors'
import { loadAllComments } from '../../AC'

class CommentsPage extends Component {

    componentDidMount() {
        const { loadAllComments } = this.props
        loadAllComments()
    }

    render() {
        console.log('---', this.props.match)
        return (
            <div>
                <Route path={`/comments/:page`} children={this.getCommentPage}/>
                <CommentPagination total={this.props.total} />
            </div>
        )
    }

    getCommentPage =({ match })=> {
        if (!match) return <h1>Please select page</h1>
        return <CommentSinglePage
            page={match.params.page}
            key={match.params.page} />
    }
}

const mapStateToProps = (state, props) => ({
    total: commentsTotalSelector(state),
    comments: commentsPageSelector(state, props)
})

export default connect(mapStateToProps, { loadAllComments })(CommentsPage)