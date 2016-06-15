import React, { Component } from 'react';
import update from 'immutability-helper';

import FlowsSource from '../../sources/FlowsSource';

import AuthenticationTypeSelector from './AuthenticationTypeSelector';
import LoadingSpinner from '../LoadingSpinner';
import ServiceSelector from './ServiceSelector';

export default class FlowEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flow: {
                allowJumping: false,
                authorization: {
                    globalAuthenticationType: '',
                    serviceElementId: ''
                },
                developerName: '',
                developerSummary: '',
                stateExpirationLength: 0
            },
            loading: true
        };
    }

    componentWillMount() {
        FlowsSource.find(this.props.params.id).then(data => {
            this.setState({ flow: data, loading: false });
        });
    }

    handleAuthenticationTypeChange(event) {
        this.setState(update(this.state, {
            flow: {
                authorization: {
                    globalAuthenticationType: {
                        $set: event.target.value
                    }
                }
            }
        }));
    }

    handleAllowJumpingChange(event) {
        this.setState(update(this.state, {
            flow: {
                allowJumping: { $set: event.target.checked }
            }
        }));
    }

    handleNameChange(event) {
        this.setState(update(this.state, {
            flow: {
                developerName: { $set: event.target.value }
            }
        }));
    }

    handleAuthenticationServiceChange(event) {
        console.log(event.target.value);

        this.setState(update(this.state, {
            flow: {
                authorization: {
                    serviceElementId: {
                        $set: event.target.value
                    }
                }
            }
        }));
    }

    handleStateExpirationChange(event) {
        this.setState(update(this.state, {
            flow: {
                stateExpirationLength: { $set: parseInt(event.target.value) }
            }
        }));
    }

    handleSummaryChange(event) {
        this.setState(update(this.state, {
            flow: {
                developerSummary: { $set: event.target.value }
            }
        }));
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState(update(this.state, { loading: { $set: true } }));

        FlowsSource.update(this.state.flow).then(data => {
            this.setState({ flow: data, loading: false });
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <LoadingSpinner />
            );
        }

        return (
            <div>
                <section className="content-header">
                    <h1>
                        { this.state.flow.developerName }
                        <small>Preview</small>
                    </h1>
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="box box-info">
                                <form className="form-horizontal" onSubmit={ this.handleSubmit.bind(this) }>
                                    <div className="box-body">
                                        <div className="col-sm-offset-1">
                                            <h3>General</h3>
                                        </div>

                                        <br />

                                        <div className="form-group">
                                            <label htmlFor="flow-name" className="col-sm-1 control-label">Name</label>
                                            <div className="col-sm-3">
                                                <input type="text" className="form-control" id="flow-name" placeholder="Name" value={ this.state.flow.developerName } onChange={ this.handleNameChange.bind(this) } />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="flow-summary" className="col-sm-1 control-label">Summary</label>
                                            <div className="col-sm-5">
                                                <textarea className="form-control" id="flow-summary" placeholder="Summary" value={ this.state.flow.developerSummary } onChange={ this.handleSummaryChange.bind(this) } />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="flow-state-expiration" className="col-sm-1 control-label">State Expiration</label>

                                            <div className="col-sm-2">
                                                <div className="input-group">
                                                    <input type="number" className="form-control" id="flow-state-expiration" placeholder="0" value={ this.state.flow.stateExpirationLength } onChange={ this.handleStateExpirationChange.bind(this) } />

                                                    <span className="input-group-addon">seconds</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-sm-offset-1 col-sm-10">
                                                <div className="checkbox">
                                                    <label>
                                                        <input type="checkbox" id="flow-allow-jumping" checked={ this.state.flow.allowJumping } onChange={ this.handleAllowJumpingChange.bind(this) } /> Allow jumping
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-offset-1">
                                            <h3>Identity</h3>
                                        </div>


                                        <br />

                                        <div className="form-group">
                                            <label htmlFor="flow-authorization-service" className="col-sm-1 control-label">Service</label>


                                            <ServiceSelector
                                                selected={ this.state.flow.authorization.serviceElementId }
                                                onChange={ this.handleAuthenticationServiceChange.bind(this) } />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="flow-authorization-type" className="col-sm-1 control-label">Type</label>

                                            <div className="col-sm-2">
                                                <AuthenticationTypeSelector
                                                    type={ this.state.flow.authorization.globalAuthenticationType }
                                                    onChange={ this.handleAuthenticationTypeChange.bind(this) } />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-footer">
                                        <div className="col-sm-offset-1">
                                            <button type="submit" className="btn btn-info">Save</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}