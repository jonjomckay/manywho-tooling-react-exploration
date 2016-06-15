import React, { Component } from 'react';

import Dashboard from './components/Dashboard';
import Flows from './components/flow/Flows';
import FlowEdit from './components/flow/FlowEdit';
import FlowGraph from './components/flow/FlowGraph';
import Login from './components/Login';
import LoginStore from './stores/LoginStore';
import Services from './components/service/Services';

import { IndexRoute, Router, Route, hashHistory } from 'react-router';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false
        };
    }

    handleLogin(token) {
        LoginStore.storeToken(token);

        this.setState({
            authenticated: true
        });
    }

    render() {
        if (!this.state.authenticated) {
            document.body.className = 'hold-transition login-page';

            return <Login success={ this.handleLogin.bind(this) } />;
        }

        document.body.className = 'hold-transition skin-black fixed sidebar-mini';

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
