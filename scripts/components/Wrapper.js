import React, { Component } from 'react';
import update from 'immutability-helper';

import ControlSidebar from './ControlSidebar';
import Header from './Header';
import Sidebar from './Sidebar';

export default class Wrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            controlSidebar: {
                visible: false
            }
        };
    }

    closeControlSidebar() {
        this.setState(update(this.state, {
            controlSidebar: {
                $set: { visible: false }
            }
        }));
    }

    openControlSidebar() {
        this.setState(update(this.state, {
            controlSidebar: {
                $set: { visible: true }
            }
        }));
    }

    toggleControlSidebar() {
        this.setState(update(this.state, {
            controlSidebar: {
                $set: { visible: !this.state.controlSidebar.visible }
            }
        }));
    }

    render() {
        return (
            <div className="wrapper">
                <Header />

                <Sidebar />

                <div className="content-wrapper">
                    { this.props.children }
                </div>

                <ControlSidebar visible={ false } />
            </div>
        );
    }
}