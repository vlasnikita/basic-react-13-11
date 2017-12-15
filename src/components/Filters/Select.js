import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { connect } from 'react-redux'
import { changeSelection } from '../../AC'
import {articlesSelector} from '../../selectors'
import { DICTIONARY } from "../../constants/"

import 'react-select/dist/react-select.css'

class SelectFilter extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired
    };

    handleChange = selected => this.props.changeSelection(selected.map(option => option.value))

    render() {
        const { articles, selected, lang } = this.props
        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        return <Select
            options={options}
            value={selected}
            onChange={this.handleChange}
            placeholder={DICTIONARY[lang].selectPlaceholder}
            multi
        />
    }
}

export default connect(state => ({
    selected: state.filters.selected,
    articles: articlesSelector(state)
}), { changeSelection })(SelectFilter)