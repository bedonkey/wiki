import React from 'react';
import * as API from '../api';

import {Link} from 'react-router';

export default class PageList extends React.Component {
    state = {
        loaded: false,
        pages: {},
        pagesResult: {},
        newPageTitle: '' 
    }

    constructor (props, context) {
        super(props, context)
        this.context = context;
    }

    componentDidMount() {
        API.pages.on('value', ss => this.setState({
            pages: ss.exportVal() || {},
            pagesResult: ss.exportVal() || {},
            loaded: true
        }));
    }
    render () {
        let items = this.state.loaded ? Object.keys(this.state.pagesResult).map(id => <li key={id} className={this.state.pagesResult[id].sections ? '' : 'no-content'}> 
            <Link to='page' params={{ id: id }}>{this.state.pagesResult[id].title}</Link>
        </li>) :
            [<li key='loading'> <em> Loading... </em> </li>];

        return <div>
            { this.props.user ? 
                <input type='text' 
                        className='u-full-width'
                        value={this.state.newPageTitle}
                        placeholder='New Page ...'
                        onChange={this.update} 
                        onKeyPress={this.createPage}/> :
                        null
            }
            <ul> {items} </ul>
        </div>;
    }

    update = evt => {
        var searchText = evt.target.value.toLowerCase();
        var pagesResult = {};
        if (evt.target.value) {
            Object.keys(this.state.pages).map(id => {
                if (this.state.pages[id].title.toLowerCase().indexOf(searchText) != -1) {
                    pagesResult[id] = this.state.pages[id];
                }
            });
        } else {
            pagesResult = this.state.pages;
        }
        this.setState({ pagesResult: pagesResult });
        this.setState({ newPageTitle: evt.target.value });
    }
    createPage = evt => {
        if (evt.charCode !== 13) return;
        var title = this.state.newPageTitle.replace(/\b./g, function(m){ return m.toUpperCase(); });
        var id = API.pages.push({ title: title, userCreate: this.props.user.username});
        this.context.router.transitionTo('page', { id: id.key() });
        this.setState({ newPageTitle: '' });
    }
}

PageList.contextTypes = {
    router: React.PropTypes.func.isRequired
};
