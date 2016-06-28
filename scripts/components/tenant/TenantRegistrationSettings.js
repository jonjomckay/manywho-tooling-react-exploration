import React, { Component } from 'react';
import update from 'immutability-helper';
import DirectorySource from "../../sources/DirectorySource";
import Sort from "../../utils/Sort";

export default class TenantRegistrationSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notifySpecified: false,
            settings: {
                type: '',
                notify: ''
            },
            users: []
        };
    }

    componentWillMount() {
        if (this.props.settings) {
            this.setState(update(this.state, {
                $set: { settings: this.props.settings }
            }));
        }

        if (this.props.notificationType === 'SPECIFIC') {
            this.setState(update(this.state, {
                $set: { notifySpecified: true }
            }));
        }

        DirectorySource.getUsers().then(users => {
            this.setState(update(this.state, {
                $set: { users: users }
            }));
        });
    }

    getNotificationTypes() {
        return [
            {
                name: 'All users',
                value: 'ALL'
            },
            {
                name: 'A specific user',
                value: 'SPECIFIC'
            },
            {
                name: 'Nobody',
                value: 'NONE'
            }
        ];
    }

    getTypes() {
        return [
            {
                name: 'Manual',
                value: 'MANUAL'
            },
            {
                name: 'Request',
                value: 'REQUEST'
            },
            {
                name: 'Self',
                value: 'SELF'
            }
        ];
    }

    onChangeType(e) {
        this.setState(update(this.state, {
            settings: { $merge: { type: e.target.value } }
        }));
    }

    onChangeNotificationType(e) {
        this.setState(update(this.state, {
            settings: { $merge: { notify: e.target.value } }
        }));
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(this.state);
    }

    render() {
        var types = this.getTypes().map(function (type) {
            return (<option key={ type.value } value={ type.value }>{ type.name }</option>);
        });

        var notificationTypes = this.getNotificationTypes().map(function (notificationType) {
            return (<option key={ notificationType.value } value={ notificationType.value }>{ notificationType.name }</option>);
        });

        var specifiedUsers = <span></span>;

        if (this.state.settings.notify === 'SPECIFIC') {
            var users = this.state.users.sort(Sort.byFirstName).map(function (user) {
                if (user.username) {
                    return (<option key={ user.id } value={ user.id }>{ user.firstName } { user.lastName }</option>);
                }
            });

            specifiedUsers = (
                <div className="col-sm-5">
                    <select id="tenant-registration-specified-user" className="form-control">
                        { users }
                    </select>
                </div>
            );
        }

        return (
            <div className="example-modal">
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span></button>
                                <h4 className="modal-title">Edit Tenant Registration Settings</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label htmlFor="tenant-registration-type" className="col-sm-2 control-label">Type</label>
                                        <div className="col-sm-3">
                                            <select id="tenant-registration-type" className="form-control" value={ this.state.settings.type } onChange={ this.onChangeType.bind(this) }>
                                                { types }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="tenant-registration-notify" className="col-sm-2 control-label">Notify</label>
                                        <div className="col-sm-4">
                                            <select id="tenant-registration-notify" className="form-control" value={ this.state.settings.notify } onChange={ this.onChangeNotificationType.bind(this) }>
                                                { notificationTypes }
                                            </select>
                                        </div>

                                        { specifiedUsers }
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={ this.onSubmit.bind(this) }>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}