import React, { Component } from 'react';
import gravatar from 'gravatar';

import SidebarLink from './SidebarLink';

export default class Sidebar extends Component {
    getUserFullName() {
        return this.props.user.firstName + ' ' + this.props.user.lastName;
    }

    render() {
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src={ gravatar.url(this.props.user.email, { size: 96, default: 'identicon' })} className="img-circle" alt={ this.getUserFullName() } />
                        </div>
                        <div className="pull-left info">
                            <p>{ this.getUserFullName() }</p>
                            <a href="#"><i className="fa fa-circle text-success"/> Online</a>
                        </div>
                    </div>
                    <form action="#" method="get" className="sidebar-form">
                        <div className="input-group">
                            <input type="text" name="q" className="form-control" placeholder="Search..."/>
                            <span className="input-group-btn">
                                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"/></button>
                            </span>
                        </div>
                    </form>

                    <ul className="sidebar-menu">
                        <SidebarLink to="/">
                            <i className="fa fa-dashboard"/> <span>Dashboard</span>
                        </SidebarLink>
                        <SidebarLink to="/flows">
                            <i className="fa fa-envira"/> <span>Flows</span>
                        </SidebarLink>
                        <SidebarLink to="/services">
                            <i className="fa fa-exchange"/> <span>Services</span>
                        </SidebarLink>
                        <SidebarLink to="/types">
                            <i className="fa fa-ellipsis-v"/> <span>Types</span>
                        </SidebarLink>
                        <li>
                            <a href="#">
                                <i className="fa fa-dot-circle-o"/> <span>Values</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-th"/> <span>Pages</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-picture-o"/> <span>Assets</span>
                            </a>
                        </li>
                        <SidebarLink to="/tenant">
                            <i className="fa fa-tree"/> <span>Tenant</span>
                        </SidebarLink>

                        <li className="header">TOOLS</li>
                        <li>
                            <a href="#">
                                <i className="fa fa-wrench"/> <span>API</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-upload"/> <span>Import &amp; Export</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-cog"/> <span>Macros</span>
                            </a>
                        </li>

                        <li className="header">CUSTOM</li>
                        <li>
                            <a href="#">
                                <i className="fa fa-play"/> <span>Players</span>
                            </a>
                        </li>

                        <li className="header">HELP</li>
                        <li>
                            <a href="#">
                                <i className="fa fa-graduation-cap"/> <span>Docs</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-heart-o"/> <span>Support</span>
                            </a>
                        </li>
                    </ul>
                </section>
            </aside>
        );
    }
}