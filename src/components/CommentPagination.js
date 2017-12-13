import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'

class CommentPagination extends Component {
    render() {
        const pageCount = Math.ceil(this.props.total/5)
        const commentElements = []
        for(let i = 1; i <= pageCount; i++)
            commentElements.push(
                <span key={i}>
                    <NavLink activeStyle={{color: 'red'}} to={`/comments/${i}`}><b>{i}</b></NavLink>
                </span>
            )
        return (
            <div>
                {commentElements}
            </div>
        )
    }
}
export default CommentPagination