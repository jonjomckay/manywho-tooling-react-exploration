import React, { Component } from 'react';

import Dashboard from './components/Dashboard';
import Flows from './components/Flows';
import FlowEdit from './components/FlowEdit';
import FlowGraph from './components/FlowGraph';

import { IndexRoute, Router, Route, hashHistory } from 'react-router';

export default class App extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Dashboard}>
                    <Route path="flows">
                        <IndexRoute component={ Flows } />
                        <Route path=":id">
                            <IndexRoute component={ FlowGraph } />
                            <Route path="edit" component={ FlowEdit } />
                        </Route>
                    </Route>
                </Route>
            </Router>
        );
    }
}
