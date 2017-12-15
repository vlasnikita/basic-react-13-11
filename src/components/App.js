import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Switch, NavLink, Redirect} from 'react-router-dom'
import ArticlesPage from './routes/ArticlesPage'
import CommentsPage from './routes/CommentsPage'
import UserForm from './UserForm'
import Filters from './Filters'
import Counter from './Counter'
import Menu, {MenuItem} from './Menu'
import LanguageToggler from './LanguageToggler'
import { DICTIONARY } from "../constants/"

class App extends Component {
    static childContextTypes = {
        username: PropTypes.string,
        lang: PropTypes.string
    }

    getChildContext() {
        return {
            username: this.state.user,
            lang: this.state.lang
        }
    }

    state = {
        user: '',
        lang: 'EN'
    }

    handleUserChange = user => this.setState({ user })
    handleLangClick = () => {
        this.setState({ lang: this.state.lang === 'EN' ? 'RU' : 'EN' })
    }

    render() {
        const { lang } = this.state
        return (
            <div>
                <h1>{DICTIONARY[lang].appName}</h1>
                <LanguageToggler onClick={this.handleLangClick}/>
                <UserForm value = {this.state.user} onChange = {this.handleUserChange}/>
                <Menu>
                    <MenuItem url="/counter">{DICTIONARY[lang].counter}</MenuItem>
                    <MenuItem url="/articles">{DICTIONARY[lang].articles}</MenuItem>
                    <MenuItem url="/filters">{DICTIONARY[lang].filters}</MenuItem>
                    <MenuItem url="/comments/1">{DICTIONARY[lang].comments}</MenuItem>
                </Menu>
                <Switch>
                    <Redirect from="/" exact to="/articles"/>
                    <Route path="/counter" component={Counter} strict exact/>
                    <Route path="/filters" component={Filters}/>
                    <Route path="/articles/new" render={() => <h1>New Article</h1>}/>
                    <Route path="/articles" component={ArticlesPage}/>
                    <Route path="/comments" component = {CommentsPage}/>
                    <Route path="/error" component = {() => <h1>Oooops!</h1>}/>
                    <Route path="*" render={() => <h1>Not found</h1>}/>
                </Switch>
            </div>
        )
    }
}

export default App