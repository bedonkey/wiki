import React from 'react';
import Router from 'react-router';
import App from './components/App';
import Page from './components/Page';
import Help from './components/Help';

const {Route} = Router;
const {Redirect} = Router.Redirect;

var routes = <Route handler={App}>
    <Route name='page' path='/page/:id' handler={Page} />
    <Route name='home' path='/' handler={Page} />
    <Route name='help' path='/help' handler={Help} />
</Route>;

Router.run(routes, Router.HistoryLocation, Root => 
    React.render(<Root />, document.getElementById('app')));
