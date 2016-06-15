import React, { Component } from 'react';

import FlowsSource from '../../sources/FlowsSource';

import FlowTile from './FlowTile';
import LoadingSpinner from '../LoadingSpinner';
import Sort from "../../utils/Sort";

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

        var flowTiles = [];

        this.state.flows.sort(Sort.byLastModified).slice(0, 3).forEach(function (flow) {
            flowTiles.push(<FlowTile key={ flow.id.id } flow={ flow } />);
        });

        var flows = [];

        this.state.flows.sort(Sort.byDeveloperName).forEach(function (flow) {
            flows.push(
                <tr key={ flow.id.id }>
                    <td>{ flow.developerName }</td>
                    <td>{ flow.developerSummary || <em>No description</em> }</td>
                    <td title={ flow.dateModified }>{ relativeDate(Date.parse(flow.dateModified)) }</td>
                </tr>
            );
        });

        return (
            <div>
                <section className="content-header">
                    <h1>Flows</h1>
                </section>

                <section className="content">
                    <div className="row">
                        { flowTiles }
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-body no-padding">
                                    <table className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <th>Name</th>
                                                <th>Summary</th>
                                                <th>Last Updated</th>
                                            </tr>

                                            { flows }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}