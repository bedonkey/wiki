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
    }

    render () {
        return <div id="container">
            <div id="header">
                <Login user={this.state.user} setUser={this.setUser} />
            </div>
            <div id="sidebar" className={this.state.sidebarShow ? 'show' : 'hide'}>
                <div className="logo"> <a href="/"><img src="/images/wiki.png" height="120px"/></a> </div>
                <i className="fa fa-bars" aria-hidden="true" onClick={this.closeSidebar}></i>
                <PageList user={this.state.user}  closeSidebar={this.closeSidebar}/>
            </div>
            <div id="mainContent" className={this.state.sidebarShow ? 'hide' : 'show'}>
                <i className="fa fa-bars" aria-hidden="true" onClick={this.closeSidebar}></i>
                <RouteHandler user={this.state.user}/>
            </div>
        </div>;
    }
    setUser = (user) => this.setState({ user: user });
}
