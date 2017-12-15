import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { DICTIONARY } from "../../constants/"

class Loader extends Component {
    static contextTypes = {
        lang: PropTypes.string
    }
    render() {
        return (
            <h2>{DICTIONARY[this.context.lang].loading}</h2>
        )
    }
}

Loader.propTypes = {};
Loader.defaultProps = {};

export default Loader;
