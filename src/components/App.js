import React from 'react';
import {RouteHandler} from 'react-router';

import Login from './Login';
import PageList from './PageList';

export default class App extends React.Component {
    state = { user: USER }

    render () {
        return <div id="container">
            <div id="header">
                <Login user={this.state.user} setUser={this.setUser} />
            </div>
            <div id="sidebar">
                <h1> <a href="/">VNDS Wiki</a> </h1>
                <PageList user={this.state.user} />
            </div>
            <div id="mainContent">
                <RouteHandler user={this.state.user} />
            </div>
        </div>;
    }
    setUser = (user) => this.setState({ user: user });
}
