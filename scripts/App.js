import React, { Component } from 'react';

import Dashboard from './components/Dashboard';
import Flows from './components/flow/Flows';
import FlowEdit from './components/flow/FlowEdit';
import FlowGraph from './components/flow/FlowGraph';
import Services from './components/service/Services';

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
                    <Route path="services">
                        <IndexRoute component={ Services } />
                    </Route>
                </Route>
            </Router>
        );
    }
}
