import React, { Component } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Header />

                <Sidebar />

                { this.props.children }
            </div>
        );
    }
}