import React from 'react';
import * as API from '../api';

export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            err: null
        }
    }

    signin = evt => this.sign('in', evt);
    signup = evt => this.sign('up', evt);
    sign = (name, evt) => {
        var username = React.findDOMNode(this.refs.username).value,
            password = React.findDOMNode(this.refs.password).value;

        API['sign' + name](username, password)
        .then(
            data => {
                if (data.signedIn) {
                    this.props.setUser(data.user);
                } else {
                    alert(data.message);
                }
            }
        );
    }
    signout = evt => API.signout().then(data => this.props.setUser(null));

    render() {
        if (this.props.user)
            return <div className='row'>
                <span> Hi {this.props.user.username}! </span>
                <span> <a href="" onClick={this.signout}> Sign Out </a> </span>
                <a href="/help"><i className="help fa fa-question-circle" aria-hidden="true"></i></a>
            </div>;

        return <div className='row'>
            <input placeholder='Username' ref='username' type='text' />
            <input placeholder='Password' ref='password' type='password' />
            <button onClick={this.signin}> Sign In </button>
            <a href="/help"><i className="help fa fa-question-circle" aria-hidden="true"></i></a>
        </div>;
    }
}
