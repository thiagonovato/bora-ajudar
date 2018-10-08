import React, { Component } from 'react'
import { auth } from './base'
import { Redirect, Route, Link } from 'react-router-dom'
import AdminCampanha from './AdminCampanha';

const AdminHome = props => <p>Seja bem vindo. Admin Home.</p>

export default class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isAuthing: true,
            isLoggedIn: false,
            user: null
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            this.setState({
                isAuthing: false,
                isLoggedIn: !!user,
                user: user
            })
        })
    }

    logout() {
        auth.signOut()
    }

    render() {
        if (this.state.isAuthing) {
            return <p>Aguarde...</p>
        }
        if (!this.state.isLoggedIn) {
            return <Redirect to='/login' />
        }
        return (
            <div className='card'>
                <h1>Painel Admin - <button onClick={this.logout}>Logout</button></h1>
                <Route path='/' component={AdminHome} />
                <Route path={`${this.props.match.url}/campanhas`} component={AdminCampanha} />
            </div>
        )
    }
}

