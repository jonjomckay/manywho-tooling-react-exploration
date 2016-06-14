import React, { Component } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Header />

                <Sidebar />

                <div className="content-wrapper">
                    { this.props.children }
                </div>
            </div>
        );
    }
}