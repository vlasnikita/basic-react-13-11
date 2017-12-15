import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { DICTIONARY } from "../constants/"

class LanguageToggler extends Component {
    static contextTypes = {
        lang: PropTypes.string
    }

    render() {
        return (
            <div>
                <button style={style} onClick={this.props.onClick}>{ DICTIONARY[this.context.lang].langBtn }</button>
            </div>
        );
    }
}

const style = {position: 'absolute', top: '15px', right: '15px'}

LanguageToggler.propTypes = {};
LanguageToggler.defaultProps = {};

export default LanguageToggler;
