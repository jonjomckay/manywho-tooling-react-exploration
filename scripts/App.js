import React, { Component } from 'react';

import Sidebar from './components/Sidebar';

import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Flows from './components/Flows';

import { Router, Route, hashHistory } from 'react-router';

export default class App extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Dashboard}>
                    <Route path="flows" component={ Flows } />
                </Route>
            </Router>
        );
    }
}
