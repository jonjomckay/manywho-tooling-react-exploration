import React, { Component } from 'react';

import relativeDate from 'relative-date';

export default class RelativeDate extends Component {
    render() {
        var parsedDate = Date.parse(this.props.date);

        var date = relativeDate(parsedDate);
        if (parsedDate === -62135596800000) {
            date = (
                <em>Unknown</em>
            );
        }

        return (
            <span title={ this.props.date }>
                { date }
            </span>
        );
    }
}