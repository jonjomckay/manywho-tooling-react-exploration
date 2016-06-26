import React, { Component } from 'react';

import EventHandler from '../../EventHandler';

export default class ActionButtons extends Component {
    closeControlSidebar() {
        EventHandler.emit('control.close');
    }

    onSubmit() {
        this.props.onSubmit().then(() => {
            this.closeControlSidebar();
        });
    }

    render() {
        return (
            <div className="bottom-actions">
                <span className="btn btn-default" onClick={ this.onSubmit.bind(this) }>Save</span>
                <span className="btn btn-danger" onClick={ this.closeControlSidebar.bind(this) }>Cancel</span>
            </div>
        );
    }
}