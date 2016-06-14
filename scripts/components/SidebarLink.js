import React, { Component } from 'react';

import { Link } from 'react-router';

export default class SidebarLink extends Component {
    static contextTypes = {
        router: React.PropTypes.object
    };

    render() {
        let isActive = this.context.router.isActive(this.props.to, false);

        return (
            <li className={ isActive ? "active" : "" }>
                <Link {...this.props}>
                    {this.props.children}
                </Link>
            </li>
        );
    }
}