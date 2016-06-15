import React, { Component } from 'react';

import FlowsSource from '../../sources/FlowsSource';

import LoadingSpinner from '../LoadingSpinner';

export default class FlowGraph extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flow: {
                developerName: ''
            },
            loading: true
        };
    }
    
    componentWillMount() {
        console.log(this.props);

        FlowsSource.find(this.props.params.id).then(data => {
            this.setState({ flow: data, loading: false });
        });
    }
    
    render() {
        if (this.state.loading) {
            return (
                <LoadingSpinner />
            );
        }

        return (
            <div>
                <section className="content-header">
                    <h1>Flow Graph for { this.state.flow.developerName }</h1>
                </section>

                <section className="content">
                    <p>Don't be silly, I haven't figured out the graph stuff yet</p>
                </section>
            </div>
        );
    }
}