import React, { Component } from 'react';

import EmptyControl from './controls/EmptyControl';

import EventHandler from '../EventHandler';

export default class ControlSidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            control: <EmptyControl key="" />,
            saveCallback: function() {},
            visible: false
        };
    }

    closeControlSidebar() {
        this.setState({
            control: <EmptyControl key="" />,
            saveCallback: this.state.saveCallback,
            visible: false
        });
    }

    toggleControlSidebar() {
        this.setState({
            control: this.state.control,
            saveCallback: this.state.saveCallback,
            visible: !this.state.visible
        });
    }

    componentDidMount() {
        EventHandler.on('control.render', (control, saveCallback) => {
            this.setState({
                control: control,
                saveCallback: saveCallback,
                visible: true
            });
        });

        EventHandler.on('control.close', () => {
            this.closeControlSidebar();
        });

        EventHandler.on('control.toggle', () => {
            this.toggleControlSidebar();
        });
    }

    render() {
        var sidebarClasses = 'control-sidebar control-sidebar-dark';

        if (this.state.visible) {
            sidebarClasses += ' control-sidebar-open';
        }

        return (
            <div>
                <aside className={ sidebarClasses }>
                    <form className="form-horizontal">
                        <ul className="nav nav-tabs nav-justified control-sidebar-tabs" />

                        <div className="tab-content">
                            <div className="tab-pane active" id="control-sidebar-home-tab">
                                { this.state.control }
                            </div>
                        </div>
                    </form>
                </aside>

                <div className="control-sidebar-bg"></div>
            </div>
        );
    }
}