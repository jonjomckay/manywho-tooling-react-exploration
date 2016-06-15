import React, { Component } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

export default class Wrapper extends Component {
    render() {
        return (
            <div className="wrapper">
                <Header />

                <Sidebar />

                <div className="content-wrapper">
                    { this.props.children }
                </div>
            </div>
        );
    }
}