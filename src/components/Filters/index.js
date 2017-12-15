import React, { Component } from 'react'
import DateRange from './DateRange'
import SelectFilter from './Select'
import PropTypes from 'prop-types'

class Filters extends Component {
    static contextTypes = {
        lang: PropTypes.string
    }
    static propTypes = {
    };

    render() {
        return (
            <div>
                <SelectFilter lang={this.context.lang} />
                <DateRange lang={this.context.lang} />
            </div>
        )
    }
}

export default Filters