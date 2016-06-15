import React, { Component } from 'react';

import Spinner from 'react-spinkit';

export default class LoadingSpinnerForm extends Component {
    render() {
        return (
            <div className="loading-spinner-form">
                <Spinner spinnerName="double-bounce" noFadeIn />
            </div>
        );
    }
}