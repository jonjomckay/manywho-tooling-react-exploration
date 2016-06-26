import React, { Component } from 'react';

import EventHandler from "../EventHandler";

export default class Header extends Component {
    toggleControlSidebar() {
        EventHandler.emit('control.toggle');
    }

    render() {
        return (
            <header className="main-header">
                <a href="../../index2.html" className="logo">
                    <span className="logo-mini"><b>M</b>W</span>
                    <span className="logo-lg"><b>Many</b>Who</span>
                </a>
                <nav className="navbar navbar-static-top">
                    <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </a>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown notifications-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-bell-o" />
                                    <span className="label label-warning">10</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="header">You have 10 notifications</li>
                                    <li>
                                        <ul className="menu">
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-users text-aqua" /> 5 new members joined today
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="footer"><a href="#">View all</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" onClick={ this.toggleControlSidebar.bind(this) }><i className="fa fa-gears"></i></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}