import React from 'react';
import * as API from '../api';
import {RouteHandler} from 'react-router';
import Section from './Section';

export default class Page extends React.Component {
    state = { page: {} }

    constructor (props, context) {
        super(props, context)
        this.context = context;
    }

    componentDidMount() {
        if (!this.props.params.id) {
            this.props.params.id = 'HOME';
        }
        API.pages.child(this.props.params.id).on('value', this.updateContent);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.params.id) {
            this.props.params.id = 'HOME';
        }
        API.pages.child(this.props.params.id).off('value', this.updateContent);
        API.pages.child(nextProps.params.id).on('value', this.updateContent);
    }

    updateContent = (snapshot) => {
        let json = snapshot.exportVal();
        if (json) {
            this.setState({
                page: json,
                sections: json.sections
            });
        }
    }

    deletePage = () => {
        API.pages.child(this.props.params.id).remove();
        this.context.router.transitionTo('/page/HOME');
    }

    render () {
        let sections = [];
        let deleteBtn;

        if (this.state.page.title) { // Data is loaded
            if (this.state.sections) {
                sections = Object.keys(this.state.sections).map( id => <Section 
                            key={id} 
                            user={this.props.user}
                            path={this.props.params.id + '/sections/' + id}
                            section={this.state.sections[id]} />)
            }
        
            if (this.props.user)
                sections.push(<div className="addSession" key='addSection'> 
                    <button onClick={this.addSection}> Add Section </button>
                </div>);
        }
        if (this.props.user && (this.state.page.userCreate == this.props.user.username || this.props.user.username == 'admin'))
            deleteBtn = <i className="delete fa fa-trash" aria-hidden="true" onClick={this.deletePage}></i>

        return <article>
            <h1> {this.state.page.title || 'Loading...'} </h1>
            {deleteBtn}
            {sections}
        </article>;
    }

    addSection = evt => {
        let id;

        if (!this.state.sections) {
            id = 1;
            this.state.sections = {};
        } else {
            id = Math.max(...Object.keys(this.state.sections)) + 1;
        }

        this.state.sections[id] = {
            editor: this.props.user.username
        }

        this.setState({
            sections: this.state.sections 
        });
    }
}
Page.contextTypes = {
    router: React.PropTypes.func.isRequired
};