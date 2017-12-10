import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createCommentSelector} from '../selectors'
import Loader from "./common/Loader";

const Comment =({ user, text })=>{
        return (
            <div>
                {text} <b>by {user}</b>
            </div>
        )
}

Comment.propTypes = {
    comment: PropTypes.shape({
        text: PropTypes.string.isRequired,
        user: PropTypes.string
    })
}

export default Comment