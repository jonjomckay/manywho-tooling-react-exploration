import React, { Component } from 'react';

import Spinner from 'react-spinkit';

export default class LoadingSpinner extends Component {
    render() {
        return (
            <div className="loading-spinner">
                <Spinner spinnerName="three-bounce" noFadeIn />
            </div>
        );
    }
}