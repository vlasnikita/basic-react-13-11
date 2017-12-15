import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {increment} from '../AC'
import { DICTIONARY } from "../constants/"

class Counter extends Component {
    static contextTypes = {
        lang: PropTypes.string
    }

    render() {
        return (
            <div>
                <h1>{this.props.count}</h1>
                <button onClick = {this.onClick}>{DICTIONARY[this.context.lang].incrementBtn}</button>
            </div>
        )
    }

    onClick = () => {
        this.props.handleIncrement()
    }
}

const mapStateToProps = (state) => ({
    count: state.counter
})

export default connect(mapStateToProps, {
    handleIncrement: increment
})(Counter)