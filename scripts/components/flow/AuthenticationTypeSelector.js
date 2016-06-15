import React, { Component } from 'react';

export default class AuthenticationTypeSelector extends Component {
    render() {
        return (
            <div>
                <select className="form-control" value={ this.props.type } onChange={ this.props.onChange }>
                    <option value="ALL_USERS">All Account Users</option>
                    <option value="PUBLIC">Public</option>
                    <option value="SPECIFIED">Specified</option>
                </select>
            </div>
        );
    }
}