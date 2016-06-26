import React, { Component } from 'react';
import queryString from 'query-string';

import Dashboard from './components/Dashboard';
import DirectorySource from './sources/DirectorySource';
import Flows from './components/flow/Flows';
import FlowEdit from './components/flow/FlowEdit';
import FlowGraph from './components/flow/FlowGraph';
import Login from './components/Login';
import LoginStore from './stores/LoginStore';
import Services from './components/service/Services';
import Type from './components/type/Type';
import Types from './components/type/Types';
import Wrapper from './components/Wrapper';

import { IndexRoute, Router, Route, browserHistory } from 'react-router';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false,
            user: {
                firstName: '',
                lastName: '',
                email: ''
            }
        };
    }

    handleLogin(token) {
        LoginStore.storeToken(token);

        var tokenParameters = queryString.parse(decodeURIComponent(token));

        // Fetch the logged in user. TODO: This definitely won't work if the token structure is changed
        DirectorySource.findUser(tokenParameters.ManyWhoUserId, tokenParameters.Username).then(data => {
            this.setState({
                authenticated: true,
                user: data
            });
        });
    }

    render() {
        if (!this.state.authenticated) {
            document.body.className = 'hold-transition login-page';

            return <Login success={ this.handleLogin.bind(this) } />;
        }

        document.body.className = 'hold-transition skin-black fixed sidebar-mini';

        return (
            <Router history={browserHistory}>
                <Route path="/" user={ this.state.user } component={ Wrapper }>
                    <IndexRoute component={ Dashboard } />

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
                    <Route path="types">
                        <IndexRoute component={ Types } />

                        <Route path=":id" component={ Type } />
                    </Route>
                </Route>
            </Router>
        );
    }
}
