import React, { Component } from 'react';
import gravatar from 'gravatar';

import EventHandler from "../EventHandler";

export default class Header extends Component {
    toggleControlSidebar() {
        EventHandler.emit('control.toggle');
    }

    getUserFullName() {
        return this.props.user.firstName + ' ' + this.props.user.lastName;
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
                            <li className="dropdown user user-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                    <img src={ gravatar.url(this.props.user.email, { size: 96, default: 'identicon' })} className="user-image" alt={ this.getUserFullName() } />
                                    <span className="hidden-xs">{ this.getUserFullName() }</span>
                                </a>
                                <ul className="dropdown-menu">
                                    {/* User image */}
                                    <li className="user-header">
                                        <img src={ gravatar.url(this.props.user.email, { size: 160, default: 'identicon' })} className="img-circle" alt={ this.getUserFullName() } />
                                        <p>
                                            <span>{ this.getUserFullName() }</span>
                                            <small>Member since Nov. 2012</small>
                                        </p>
                                    </li>
                                    {/* Menu Body */}
                                    <li className="user-body">
                                        <div className="row">
                                            <div className="col-xs-4 text-center">
                                                <a href="#">Followers</a>
                                            </div>
                                            <div className="col-xs-4 text-center">
                                                <a href="#">Sales</a>
                                            </div>
                                            <div className="col-xs-4 text-center">
                                                <a href="#">Friends</a>
                                            </div>
                                        </div>
                                        {/* /.row */}
                                    </li>
                                    {/* Menu Footer*/}
                                    <li className="user-footer">
                                        <div className="pull-left">
                                            <a href="#" className="btn btn-default btn-flat">Profile</a>
                                        </div>
                                        <div className="pull-right">
                                            <a href="#" className="btn btn-default btn-flat">Sign out</a>
                                        </div>
                                    </li>
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