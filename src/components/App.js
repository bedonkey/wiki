import React from 'react';
import {RouteHandler} from 'react-router';

import Login from './Login';
import PageList from './PageList';

export default class App extends React.Component {
    state = { 
        user: USER,
        sidebarShow: false
    }

    closeSidebar = () => {
        if (this.state.sidebarShow) {
            this.setState({ sidebarShow: false })
        } else {
            this.setState({ sidebarShow: true })
        }
        console.log('Close Sidebar: ' + this.state.sidebarShow)
    }

    render () {
        return <div id="container">
            <div id="header">
                <Login user={this.state.user} setUser={this.setUser} />
            </div>
            <div id="sidebar" className={this.state.sidebarShow ? 'show' : 'hide'}>
                <h1> <a href="/">VNDS Wiki</a> </h1>
                <i className="fa fa-bars" aria-hidden="true" onClick={this.closeSidebar}></i>
                <PageList user={this.state.user} />
            </div>
            <div id="mainContent" className={this.state.sidebarShow ? 'hide' : 'show'}>
                <i className="fa fa-bars" aria-hidden="true" onClick={this.closeSidebar}></i>
                <RouteHandler user={this.state.user} />
            </div>
        </div>;
    }
    setUser = (user) => this.setState({ user: user });
}
