import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DICTIONARY } from "../constants/"

class UserForm extends Component {
    static contextTypes = {
        lang: PropTypes.string
    }

    handleChange = ev => {
        const {value} = ev.target
        this.props.onChange(value)
    }

    render() {
        return (
            <div>
                {DICTIONARY[this.context.lang].usernameLabel}: <input value = {this.props.value} onChange = {this.handleChange} />
            </div>
        )
    }
}

export default UserForm