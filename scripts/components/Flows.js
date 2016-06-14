import React, { Component } from 'react';

import FlowsSource from '../sources/FlowsSource';

import Flow from './Flow';

export default class Flows extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flows: []
        };
    }

    componentWillMount() {
        console.log(FlowsSource);

        FlowsSource.findAll().then(data => {
            this.setState({ flows: data });
        });
    }

    render() {
        var flows = [];

        this.state.flows.forEach(function (flow) {
            flows.push(<Flow key={ flow.id.id } flow={ flow } />);
        });

        return (
            <div className="content-wrapper">
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