import React, { Component } from 'react';

import update from 'immutability-helper';

import LoginSource from '../sources/LoginSource';
import LoginStore from '../stores/LoginStore';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remembered: false,
            notification: {
                type: '',
                title: '',
                message: ''
            }
        }
    }

    componentWillMount() {
        var token = LoginStore.getToken();

        if (token) {
            this.setState(update(this.state, {
                remembered: {
                    $set: true
                },
                notification: {
                    $set: {
                        type: 'info',
                        title: 'Hold on...',
                        message: 'Logging you in'
                    }
                }
            }));

            this.props.success(token);
        }
    }

    handlePasswordChange(event) {
        this.setState(update(this.state, {
            password: { $set: event.target.value }
        }));
    }

    handleUsernameChange(event) {
        this.setState(update(this.state, {
            username: { $set: event.target.value }
        }));
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState(update(this.state, {
            notification: {
                $set: {
                    type: 'info',
                    title: 'Hold on...',
                    message: 'Logging you in'
                }
            }
        }));
        
        LoginSource.login(this.state.username, this.state.password).then(token => {
            this.props.success(token);
        }).catch(error => {
            this.setState(update(this.state, {
                notification: {
                    $set: {
                        type: 'danger',
                        title: 'Oops!',
                        message: error
                    }
                }
            }));
        });
    }

    render() {
        var notification = <span />;
        if (this.state.notification.type) {
            notification = (
                <div className={`callout callout-${ this.state.notification.type }`}>
                    <h4>{ this.state.notification.title }</h4>

                    <p>{ this.state.notification.message }</p>
                </div>
            );
        }

        var inputs = <span />;
        if (this.state.remembered === false) {
            inputs = (
                <div>
                    <form onSubmit={ this.handleSubmit.bind(this) }>
                        <div className="form-group has-feedback">
                            <input type="text" className="form-control" placeholder="Username" onChange={ this.handleUsernameChange.bind(this) } />
                            <span className="glyphicon glyphicon-envelope form-control-feedback"/>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" className="form-control" placeholder="Password" onChange={ this.handlePasswordChange.bind(this) } />
                            <span className="glyphicon glyphicon-lock form-control-feedback"/>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <button type="submit" className="btn btn-primary btn-block btn-flat">Login</button>
                            </div>
                        </div>
                    </form>
                    <a href="#">I forgot my password</a><br />
                    <a href="register.html" className="text-center">Register a new membership</a>
                </div>
            );
        }

        return (
            <div className="hold-transition login-page">
                <div className="login-box">
                    <div className="login-logo">
                        <span><b>Many</b>Who</span>
                    </div>
                    <div className="login-box-body">

                        { notification }

                        { inputs }

                    </div>
                </div>
            </div>
        );
    }
}