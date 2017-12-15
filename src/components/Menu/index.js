import React, { Component, Fragment } from 'react'
import MenuItem from './MenuItem'
import PropTypes from 'prop-types'
import { DICTIONARY } from "../../constants/"

//console.log('---', React.Fragment)
class Menu extends Component {
    static contextTypes = {
        lang: PropTypes.string
    }

    render() {
        return (
            <Fragment>
                <h2>{DICTIONARY[this.context.lang].menu}:</h2>
                {this.props.children}
            </Fragment>
        )
    }
}

export {MenuItem}
export default Menu