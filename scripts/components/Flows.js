import React, { Component } from 'react';

import FlowsSource from '../sources/FlowsSource';

import Flow from './Flow';
import LoadingSpinner from './LoadingSpinner';

export default class Flows extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flows: [],
            loading: true
        };
    }

    componentWillMount() {
        FlowsSource.findAll().then(data => {
            this.setState({ flows: data, loading: false });
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <LoadingSpinner />
            );
        }

        var flows = [];

        this.state.flows.forEach(function (flow) {
            flows.push(<Flow key={ flow.id.id } flow={ flow } />);
        });

        return (
            <div>
                <section className="content-header">
                    <h1>Flows</h1>
                </section>

                <section className="content">
                    <div className="row">
                        { flows }
                    </div>
                </section>
            </div>
        );
    }
}